import { configureAxe } from 'jest-axe';

/**
 * Configure axe for accessibility testing
 */
export const axe = configureAxe({
  rules: {
    // Customize rules if needed
    // Example: disable specific rules
    // 'color-contrast': { enabled: false },
  },
  // Set the standard to WCAG 2.1 AA
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  },
});

/**
 * Custom matcher for no violations
 */
export const toHaveNoViolations = {
  toHaveNoViolations(results: any) {
    const violations = results.violations || [];
    const pass = violations.length === 0;

    const message = () => {
      if (pass) {
        return 'Expected to have accessibility violations, but none were found';
      }

      const violationMessages = violations
        .map((violation: any) => {
          const nodes = violation.nodes
            .map((node: any) => {
              const selector = node.target.join(' ');
              return `  - ${selector}: ${node.failureSummary}`;
            })
            .join('\n');

          return `${violation.help} (${violation.id})\n${nodes}`;
        })
        .join('\n\n');

      return `Expected no accessibility violations, but found ${violations.length}:\n\n${violationMessages}`;
    };

    return {
      pass,
      message,
    };
  },
};
