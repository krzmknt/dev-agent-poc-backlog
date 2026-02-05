import { describe, it, expect } from 'vitest';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { defaultPerformanceThresholds } from '../config/test-config';

describe('Lighthouse Performance Tests', () => {
  const baseURL = process.env.PERFORMANCE_TEST_URL || 'http://localhost:5173';

  async function runLighthouse(url: string) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info' as const,
      output: 'json' as const,
      onlyCategories: ['performance'],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);
    await chrome.kill();

    return runnerResult?.lhr;
  }

  it('homepage meets performance thresholds', async () => {
    const result = await runLighthouse(baseURL);

    if (!result) {
      throw new Error('Failed to run Lighthouse audit');
    }

    const metrics = result.audits;
    const performanceScore = result.categories.performance.score! * 100;

    // Assert Performance score >= 90
    expect(performanceScore).toBeGreaterThanOrEqual(90);

    // Assert FCP < 1.5s
    const fcp = metrics['first-contentful-paint'].numericValue || 0;
    expect(fcp).toBeLessThan(defaultPerformanceThresholds.firstContentfulPaint);

    // Assert LCP < 2.5s
    const lcp = metrics['largest-contentful-paint'].numericValue || 0;
    expect(lcp).toBeLessThan(defaultPerformanceThresholds.largestContentfulPaint);

    // Assert CLS < 0.1
    const cls = metrics['cumulative-layout-shift'].numericValue || 0;
    expect(cls).toBeLessThan(defaultPerformanceThresholds.cumulativeLayoutShift);

    // Assert TTI < 3.5s
    const tti = metrics['interactive'].numericValue || 0;
    expect(tti).toBeLessThan(defaultPerformanceThresholds.timeToInteractive);
  }, 60000);

  it('product listing page meets performance thresholds', async () => {
    const result = await runLighthouse(`${baseURL}/products`);

    if (!result) {
      throw new Error('Failed to run Lighthouse audit');
    }

    const performanceScore = result.categories.performance.score! * 100;
    expect(performanceScore).toBeGreaterThanOrEqual(85);

    const metrics = result.audits;
    const lcp = metrics['largest-contentful-paint'].numericValue || 0;
    expect(lcp).toBeLessThan(defaultPerformanceThresholds.largestContentfulPaint);
  }, 60000);

  it('product detail page meets performance thresholds', async () => {
    const result = await runLighthouse(`${baseURL}/products/1`);

    if (!result) {
      throw new Error('Failed to run Lighthouse audit');
    }

    const performanceScore = result.categories.performance.score! * 100;
    expect(performanceScore).toBeGreaterThanOrEqual(85);

    const metrics = result.audits;
    const fcp = metrics['first-contentful-paint'].numericValue || 0;
    expect(fcp).toBeLessThan(defaultPerformanceThresholds.firstContentfulPaint);
  }, 60000);

  it('checkout page meets performance thresholds', async () => {
    const result = await runLighthouse(`${baseURL}/checkout`);

    if (!result) {
      throw new Error('Failed to run Lighthouse audit');
    }

    const performanceScore = result.categories.performance.score! * 100;
    expect(performanceScore).toBeGreaterThanOrEqual(85);

    const metrics = result.audits;
    const tti = metrics['interactive'].numericValue || 0;
    expect(tti).toBeLessThan(defaultPerformanceThresholds.timeToInteractive);
  }, 60000);
});
