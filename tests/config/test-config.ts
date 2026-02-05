/**
 * Base test configuration
 */
export interface TestConfig {
  testEnvironment: 'jsdom' | 'node';
  setupFiles: string[];
  setupFilesAfterEnv: string[];
  collectCoverageFrom: string[];
  coverageThreshold: CoverageThreshold;
  testTimeout: number;
}

/**
 * Coverage threshold configuration
 */
export interface CoverageThreshold {
  global: {
    branches: number;
    functions: number;
    lines: number;
    statements: number;
  };
}

/**
 * E2E test configuration
 */
export interface E2ETestConfig {
  baseURL: string;
  headless: boolean;
  viewport: { width: number; height: number };
  timeout: number;
  retries: number;
  screenshot: 'on' | 'off' | 'only-on-failure';
  video: 'on' | 'off' | 'retain-on-failure';
}

/**
 * Performance test thresholds
 */
export interface PerformanceThresholds {
  firstContentfulPaint: number;  // ms
  largestContentfulPaint: number; // ms
  cumulativeLayoutShift: number;
  timeToInteractive: number;      // ms
  totalBlockingTime: number;      // ms
}

/**
 * Load test configuration
 */
export interface LoadTestConfig {
  targetURL: string;
  virtualUsers: number;
  duration: number;              // seconds
  rampUpTime: number;            // seconds
  requestsPerSecond: number;
  thresholds: LoadTestThresholds;
}

/**
 * Load test thresholds
 */
export interface LoadTestThresholds {
  http_req_duration_p50: number;   // ms
  http_req_duration_p95: number;   // ms
  http_req_duration_p99: number;   // ms
  http_req_failed_rate: number;    // percentage
}

/**
 * Default test configuration
 */
export const defaultTestConfig: TestConfig = {
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/config/vitest.setup.ts'],
  setupFilesAfterEnv: [],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testTimeout: 10000,
};

/**
 * Default E2E test configuration
 */
export const defaultE2EConfig: E2ETestConfig = {
  baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
  headless: process.env.CI === 'true',
  viewport: { width: 1280, height: 720 },
  timeout: 30000,
  retries: process.env.CI === 'true' ? 2 : 0,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
};

/**
 * Default performance thresholds
 */
export const defaultPerformanceThresholds: PerformanceThresholds = {
  firstContentfulPaint: 1500,      // 1.5s
  largestContentfulPaint: 2500,    // 2.5s
  cumulativeLayoutShift: 0.1,
  timeToInteractive: 3500,         // 3.5s
  totalBlockingTime: 300,          // 300ms
};

/**
 * Default load test configuration
 */
export const defaultLoadTestConfig: LoadTestConfig = {
  targetURL: process.env.LOAD_TEST_URL || 'http://localhost:5173',
  virtualUsers: 100,
  duration: 120,                   // 2 minutes
  rampUpTime: 30,                  // 30 seconds
  requestsPerSecond: 50,
  thresholds: {
    http_req_duration_p50: 200,    // 200ms
    http_req_duration_p95: 1000,   // 1s
    http_req_duration_p99: 2000,   // 2s
    http_req_failed_rate: 0.01,    // 1%
  },
};
