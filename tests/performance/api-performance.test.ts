import { describe, it, expect } from 'vitest';

describe('API Performance Tests', () => {
  const baseURL = process.env.API_TEST_URL || 'http://localhost:3000/api';

  async function measureResponseTime(url: string): Promise<number> {
    const start = performance.now();
    await fetch(url);
    const end = performance.now();
    return end - start;
  }

  it('GET /api/products responds in < 200ms (p50)', async () => {
    const iterations = 10;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const time = await measureResponseTime(`${baseURL}/products`);
      times.push(time);
    }

    times.sort((a, b) => a - b);
    const p50 = times[Math.floor(iterations * 0.5)];

    expect(p50).toBeLessThan(200);
  });

  it('GET /api/products/:id responds in < 100ms (p50)', async () => {
    const iterations = 10;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const time = await measureResponseTime(`${baseURL}/products/1`);
      times.push(time);
    }

    times.sort((a, b) => a - b);
    const p50 = times[Math.floor(iterations * 0.5)];

    expect(p50).toBeLessThan(100);
  });

  it('POST /api/auth/login responds in < 300ms (p50)', async () => {
    const iterations = 5;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });
      const end = performance.now();
      times.push(end - start);
    }

    times.sort((a, b) => a - b);
    const p50 = times[Math.floor(iterations * 0.5)];

    expect(p50).toBeLessThan(300);
  });

  it('GET /api/orders responds in < 500ms (p95)', async () => {
    const iterations = 20;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const time = await measureResponseTime(`${baseURL}/orders`);
      times.push(time);
    }

    times.sort((a, b) => a - b);
    const p95 = times[Math.floor(iterations * 0.95)];

    expect(p95).toBeLessThan(500);
  });

  it('API handles concurrent requests efficiently', async () => {
    const concurrentRequests = 20;
    const start = performance.now();

    await Promise.all(
      Array.from({ length: concurrentRequests }, () =>
        fetch(`${baseURL}/products`)
      )
    );

    const end = performance.now();
    const totalTime = end - start;
    const averageTime = totalTime / concurrentRequests;

    // Average time should be less than 500ms even under concurrent load
    expect(averageTime).toBeLessThan(500);
  });
});
