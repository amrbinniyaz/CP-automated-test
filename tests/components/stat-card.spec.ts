import { test, expect } from '@playwright/test';
import { BREAKPOINTS } from '../../config/breakpoints';
import { COMPONENT_CSS_VAR_MAPPING, TOLERANCE, TEST_URLS } from '../../config/spacing-rules';
import { verifyCSSVariableUsage, formatTestResult } from '../../utils/css-variable-helpers';
import { elementExists, skipIfNotFound } from '../../utils/element-helpers';

const BASE_URL = process.env.BASE_URL || 'https://localhost:4335';
const STAT_CONFIG = COMPONENT_CSS_VAR_MAPPING.statCard;

test.describe('Stat Card Spacing', () => {
  test.describe('.stat-card__content padding', () => {
    const config = STAT_CONFIG.content;

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      test(`should use ${config.padding} at ${bpName} (${bp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(`${BASE_URL}${TEST_URLS.stats}`);
        await page.waitForLoadState('networkidle');

        // Check if element exists
        const exists = await elementExists(page, config.selector);
        skipIfNotFound(exists, 'Stat card content');

        // Test each side of padding
        for (const side of config.paddingSides) {
          const result = await verifyCSSVariableUsage(
            page,
            config.selector,
            `padding-${side}`,
            config.padding as any,
            bp.width,
            TOLERANCE
          );

          console.log(formatTestResult(result));
          expect(result.passed, result.message).toBe(true);
        }
      });
    }
  });
});

test.describe('Stat Card - Variable Binding Validation', () => {
  test('content padding should match --padding-e-inner at 1024px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(`${BASE_URL}${TEST_URLS.stats}`);
    await page.waitForLoadState('networkidle');

    const exists = await elementExists(page, STAT_CONFIG.content.selector);
    skipIfNotFound(exists, 'Stat card content');

    // At 1024px:
    // --padding-e-inner: ~17px
    // --padding-c-inner: ~27px

    const result = await verifyCSSVariableUsage(
      page,
      STAT_CONFIG.content.selector,
      'padding-top',
      '--padding-e-inner' as any,
      1024,
      TOLERANCE
    );

    console.log('Stat card content at 1024px:');
    console.log(`  Computed padding: ${result.computedValue}px`);
    console.log(`  Expected (--padding-e-inner): ${result.expectedValue}px`);
    console.log(`  If ~27px, it wrongly uses --padding-c-inner`);
    console.log(`  If ~17px, it correctly uses --padding-e-inner`);

    expect(result.passed, result.message).toBe(true);
  });

  test('content padding should match --padding-e-inner at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}${TEST_URLS.stats}`);
    await page.waitForLoadState('networkidle');

    const exists = await elementExists(page, STAT_CONFIG.content.selector);
    skipIfNotFound(exists, 'Stat card content');

    // At 1440px:
    // --padding-e-inner: 20px
    // --padding-c-inner: 35px

    const result = await verifyCSSVariableUsage(
      page,
      STAT_CONFIG.content.selector,
      'padding-top',
      '--padding-e-inner' as any,
      1440,
      TOLERANCE
    );

    console.log('Stat card content at 1440px:');
    console.log(`  Computed padding: ${result.computedValue}px`);
    console.log(`  Expected (--padding-e-inner): ${result.expectedValue}px`);
    console.log(`  If ~35px, it wrongly uses --padding-c-inner`);
    console.log(`  If ~20px, it correctly uses --padding-e-inner`);

    expect(result.passed, result.message).toBe(true);
  });
});

test.describe('Stat Card - All Breakpoints Summary', () => {
  test('generate spacing summary for stat card', async ({ page }) => {
    const summary: Array<{
      breakpoint: string;
      width: number;
      contentPadding: number | null;
      expectedPadding: number | null;
      passed: boolean;
    }> = [];

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.stats}`);
      await page.waitForLoadState('networkidle');

      const exists = await elementExists(page, STAT_CONFIG.content.selector);

      let result = null;
      if (exists) {
        result = await verifyCSSVariableUsage(
          page,
          STAT_CONFIG.content.selector,
          'padding-top',
          STAT_CONFIG.content.padding as any,
          bp.width,
          TOLERANCE
        );
      }

      summary.push({
        breakpoint: bpName,
        width: bp.width,
        contentPadding: result?.computedValue ?? null,
        expectedPadding: result?.expectedValue ?? null,
        passed: result?.passed ?? false
      });
    }

    console.log('\nStat Card Spacing Summary:');
    console.log('==========================');
    console.table(summary);

    // Verify at least some values were found
    const hasValues = summary.some(s => s.contentPadding !== null);
    expect(hasValues, 'No stat card elements found on page').toBe(true);
  });
});
