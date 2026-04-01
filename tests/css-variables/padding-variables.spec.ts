import { test, expect } from '@playwright/test';
import { BREAKPOINTS } from '../../config/breakpoints';
import { CSS_VARIABLES, TOLERANCE, TEST_URLS } from '../../config/spacing-rules';
import { verifyCSSVariable, formatTestResult, getAllCSSVariableValues } from '../../utils/css-variable-helpers';

const BASE_URL = process.env.BASE_URL || 'https://localhost:4335';

test.describe('CSS Padding Variables', () => {
  // Test each padding variable
  for (const [variableName, breakpointValues] of Object.entries(CSS_VARIABLES.paddings)) {
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

test.describe('CSS Padding Variables - Divergence Points', () => {
  // Test at specific breakpoints where padding variables diverge
  // This helps identify if components use the wrong variable

  test('padding variables should diverge correctly at 1024px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
    await page.waitForLoadState('networkidle');

    const values = await getAllCSSVariableValues(page);

    console.log('Padding values at 1024px:', {
      '--padding-c-inner': values['--padding-c-inner'],
      '--padding-e-inner': values['--padding-e-inner'],
      '--padding-g-inner': values['--padding-g-inner'],
      '--padding-h-inner': values['--padding-h-inner']
    });

    // At 1024px, these variables should have distinct values
    // --padding-c-inner: ~27px
    // --padding-e-inner: ~17px
    // --padding-g-inner: ~18px
    // --padding-h-inner: ~13px

    if (values['--padding-c-inner'] !== null && values['--padding-e-inner'] !== null) {
      expect(
        values['--padding-c-inner'],
        `--padding-c-inner (${values['--padding-c-inner']}px) should be > --padding-e-inner (${values['--padding-e-inner']}px) at 1024px`
      ).toBeGreaterThan(values['--padding-e-inner']!);
    }
  });

  test('padding variables should diverge correctly at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
    await page.waitForLoadState('networkidle');

    const values = await getAllCSSVariableValues(page);

    console.log('Padding values at 1440px:', {
      '--padding-c-inner': values['--padding-c-inner'],
      '--padding-e-inner': values['--padding-e-inner'],
      '--padding-g-inner': values['--padding-g-inner'],
      '--padding-h-inner': values['--padding-h-inner']
    });

    // At 1440px:
    // --padding-c-inner: 35px
    // --padding-e-inner: 20px
    // --padding-g-inner: 20px
    // --padding-h-inner: 15px

    if (values['--padding-c-inner'] !== null && values['--padding-e-inner'] !== null) {
      expect(
        values['--padding-c-inner'],
        `--padding-c-inner (${values['--padding-c-inner']}px) should be > --padding-e-inner (${values['--padding-e-inner']}px) at 1440px`
      ).toBeGreaterThan(values['--padding-e-inner']!);
    }
  });

  test('padding variables at 1441px should show media query jump', async ({ page }) => {
    // At 1441px, --padding-g-inner and --padding-h-inner should drop
    // This is where the >1440px media query kicks in

    await page.setViewportSize({ width: 1441, height: 900 });
    await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
    await page.waitForLoadState('networkidle');

    const values = await getAllCSSVariableValues(page);

    console.log('Padding values at 1441px (after media query):', {
      '--padding-e-inner': values['--padding-e-inner'], // Should stay at 20px
      '--padding-g-inner': values['--padding-g-inner'], // Should drop to 10px
      '--padding-h-inner': values['--padding-h-inner']  // Should drop to 6px
    });

    // --padding-g-inner should be ~10px at 1441px (dropped from 20px)
    if (values['--padding-g-inner'] !== null) {
      expect(
        values['--padding-g-inner'],
        `--padding-g-inner should be ~10px at 1441px (got ${values['--padding-g-inner']}px)`
      ).toBeLessThanOrEqual(12);
    }

    // --padding-h-inner should be ~6px at 1441px (dropped from 15px)
    if (values['--padding-h-inner'] !== null) {
      expect(
        values['--padding-h-inner'],
        `--padding-h-inner should be ~6px at 1441px (got ${values['--padding-h-inner']}px)`
      ).toBeLessThanOrEqual(8);
    }
  });
});

test.describe('CSS Padding Variables - All breakpoints snapshot', () => {
  test('generate padding variable snapshot across all breakpoints', async ({ page }) => {
    const snapshot: Record<string, Record<string, number | null>> = {};

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.allWidgets}`);
      await page.waitForLoadState('networkidle');

      const values = await getAllCSSVariableValues(page);

      snapshot[bpName] = {};
      for (const varName of Object.keys(CSS_VARIABLES.paddings)) {
        snapshot[bpName][varName] = values[varName];
      }
    }

    console.log('\nPadding Variables Snapshot:');
    console.log('===========================');

    // Create a formatted table
    const headers = ['Variable', ...Object.keys(BREAKPOINTS)];
    console.log(headers.join('\t'));

    for (const varName of Object.keys(CSS_VARIABLES.paddings)) {
      const row = [varName];
      for (const bpName of Object.keys(BREAKPOINTS)) {
        row.push(snapshot[bpName][varName]?.toString() || 'null');
      }
      console.log(row.join('\t'));
    }

    // Just verify we got all values
    const allValues = Object.values(snapshot).flatMap(bp => Object.values(bp));
    const nullCount = allValues.filter(v => v === null).length;

    expect(nullCount, `Found ${nullCount} null values in snapshot`).toBeLessThanOrEqual(0);
  });
});
