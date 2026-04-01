import { test, expect } from '@playwright/test';
import { BREAKPOINTS, BreakpointName } from '../../config/breakpoints';
import { CSS_VARIABLES, TOLERANCE, TEST_URLS } from '../../config/spacing-rules';
import { verifyCSSVariable, formatTestResult } from '../../utils/css-variable-helpers';

const BASE_URL = process.env.BASE_URL || 'https://localhost:4335';

test.describe('CSS Margin Variables', () => {
  // Test each margin variable
  for (const [variableName, breakpointValues] of Object.entries(CSS_VARIABLES.margins)) {
    test.describe(variableName, () => {
      // Test at each breakpoint
      for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
        test(`should have correct value at ${bpName} (${bp.width}px)`, async ({ page }) => {
          // Set viewport
          await page.setViewportSize({ width: bp.width, height: bp.height });

          // Navigate to test page
          await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
          await page.waitForLoadState('networkidle');

          // Verify CSS variable value
          const result = await verifyCSSVariable(
            page,
            variableName as any,
            bp.width,
            TOLERANCE
          );

          console.log(formatTestResult(result));

          expect(result.passed, result.message).toBe(true);
        });
      }
    });
  }
});

test.describe('CSS Margin Variables - Cross-breakpoint consistency', () => {
  test('margin variables should scale proportionally', async ({ page }) => {
    const results: Array<{ breakpoint: string; variable: string; value: number | null }> = [];

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
      await page.waitForLoadState('networkidle');

      for (const variableName of Object.keys(CSS_VARIABLES.margins)) {
        const result = await verifyCSSVariable(
          page,
          variableName as any,
          bp.width,
          TOLERANCE
        );

        results.push({
          breakpoint: bpName,
          variable: variableName,
          value: result.computedValue
        });
      }
    }

    // Log all results for debugging
    console.table(results);

    // Verify all values were retrieved
    const nullValues = results.filter(r => r.value === null);
    expect(nullValues.length, `Missing values: ${JSON.stringify(nullValues)}`).toBe(0);
  });

  test('--margin-a should be larger than --margin-b at all breakpoints', async ({ page }) => {
    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
      await page.waitForLoadState('networkidle');

      const marginA = await verifyCSSVariable(page, '--margin-a' as any, bp.width, TOLERANCE);
      const marginB = await verifyCSSVariable(page, '--margin-b' as any, bp.width, TOLERANCE);

      if (marginA.computedValue !== null && marginB.computedValue !== null) {
        expect(
          marginA.computedValue,
          `At ${bpName}: --margin-a (${marginA.computedValue}px) should be > --margin-b (${marginB.computedValue}px)`
        ).toBeGreaterThan(marginB.computedValue);
      }
    }
  });

  test('--margin-b should be larger than --margin-c at all breakpoints', async ({ page }) => {
    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
      await page.waitForLoadState('networkidle');

      const marginB = await verifyCSSVariable(page, '--margin-b' as any, bp.width, TOLERANCE);
      const marginC = await verifyCSSVariable(page, '--margin-c' as any, bp.width, TOLERANCE);

      if (marginB.computedValue !== null && marginC.computedValue !== null) {
        expect(
          marginB.computedValue,
          `At ${bpName}: --margin-b (${marginB.computedValue}px) should be > --margin-c (${marginC.computedValue}px)`
        ).toBeGreaterThan(marginC.computedValue);
      }
    }
  });

  test('--margin-c should be larger than --margin-d at all breakpoints', async ({ page }) => {
    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
      await page.waitForLoadState('networkidle');

      const marginC = await verifyCSSVariable(page, '--margin-c' as any, bp.width, TOLERANCE);
      const marginD = await verifyCSSVariable(page, '--margin-d' as any, bp.width, TOLERANCE);

      if (marginC.computedValue !== null && marginD.computedValue !== null) {
        expect(
          marginC.computedValue,
          `At ${bpName}: --margin-c (${marginC.computedValue}px) should be > --margin-d (${marginD.computedValue}px)`
        ).toBeGreaterThan(marginD.computedValue);
      }
    }
  });
});
