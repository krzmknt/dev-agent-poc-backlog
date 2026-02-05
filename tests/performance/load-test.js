import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Ramp up to 100 users
    { duration: '2m', target: 100 },  // Stay at 100 users for 2 minutes
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(50)<200', 'p(95)<1000', 'p(99)<2000'], // Response time thresholds
    http_req_failed: ['rate<0.01'], // Error rate < 1%
    errors: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.LOAD_TEST_URL || 'http://localhost:5173';

export default function () {
  // Test homepage
  let response = http.get(`${BASE_URL}/`);
  check(response, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage loads in < 2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);

  sleep(1);

  // Test product listing
  response = http.get(`${BASE_URL}/api/products`);
  check(response, {
    'products status is 200': (r) => r.status === 200,
    'products API responds in < 500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(1);

  // Test product detail
  const productId = Math.floor(Math.random() * 10) + 1;
  response = http.get(`${BASE_URL}/api/products/${productId}`);
  check(response, {
    'product detail status is 200': (r) => r.status === 200,
    'product detail responds in < 300ms': (r) => r.timings.duration < 300,
  }) || errorRate.add(1);

  sleep(1);

  // Test search
  response = http.get(`${BASE_URL}/api/products/search?q=test`);
  check(response, {
    'search status is 200': (r) => r.status === 200,
    'search responds in < 500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(2);
}

export function handleSummary(data) {
  return {
    'load-test-results.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data, options) {
  const indent = options?.indent || '';
  const colors = options?.enableColors || false;

  let summary = '';
  summary += `${indent}✓ Total requests: ${data.metrics.http_reqs.values.count}\n`;
  summary += `${indent}✓ Request duration (p50): ${data.metrics.http_req_duration.values['p(50)']}ms\n`;
  summary += `${indent}✓ Request duration (p95): ${data.metrics.http_req_duration.values['p(95)']}ms\n`;
  summary += `${indent}✓ Request duration (p99): ${data.metrics.http_req_duration.values['p(99)']}ms\n`;
  summary += `${indent}✓ Failed requests: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n`;
  summary += `${indent}✓ Virtual users: ${data.metrics.vus.values.value}\n`;

  return summary;
}
