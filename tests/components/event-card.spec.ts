import { test, expect } from '@playwright/test';
import { BREAKPOINTS } from '../../config/breakpoints';
import { COMPONENT_CSS_VAR_MAPPING, TOLERANCE, TEST_URLS } from '../../config/spacing-rules';
import { verifyCSSVariableUsage, formatTestResult } from '../../utils/css-variable-helpers';
import { elementExists, skipIfNotFound } from '../../utils/element-helpers';

const BASE_URL = process.env.BASE_URL || 'https://localhost:4335';
const EVENT_CONFIG = COMPONENT_CSS_VAR_MAPPING.eventCard;

test.describe('Event Card Spacing', () => {
  test.describe('.event-card__content padding', () => {
    const config = EVENT_CONFIG.content;

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      test(`should use ${config.padding} at ${bpName} (${bp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(`${BASE_URL}${TEST_URLS.events}`);
        await page.waitForLoadState('networkidle');

        // Check if element exists
        const exists = await elementExists(page, config.selector);
        skipIfNotFound(exists, 'Event card content');

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

  test.describe('.event-card__meta margin-top', () => {
    const config = EVENT_CONFIG.meta;

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      test(`should use ${config.marginTop} at ${bpName} (${bp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(`${BASE_URL}${TEST_URLS.events}`);
        await page.waitForLoadState('networkidle');

        // Check if element exists
        const exists = await elementExists(page, config.selector);
        skipIfNotFound(exists, 'Event card meta');

        const result = await verifyCSSVariableUsage(
          page,
          config.selector,
          'margin-top',
          config.marginTop as any,
          bp.width,
          TOLERANCE
        );

        console.log(formatTestResult(result));
        expect(result.passed, result.message).toBe(true);
      });
    }
  });
});

test.describe('Event Card - Variable Binding Validation', () => {
  test('content padding should match --padding-e-inner at 1024px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(`${BASE_URL}${TEST_URLS.events}`);
    await page.waitForLoadState('networkidle');

    const exists = await elementExists(page, EVENT_CONFIG.content.selector);
    skipIfNotFound(exists, 'Event card content');

    const result = await verifyCSSVariableUsage(
      page,
      EVENT_CONFIG.content.selector,
      'padding-top',
      '--padding-e-inner' as any,
      1024,
      TOLERANCE
    );

    console.log('Event card content at 1024px:');
    console.log(`  Computed padding: ${result.computedValue}px`);
    console.log(`  Expected (--padding-e-inner): ${result.expectedValue}px`);

    expect(result.passed, result.message).toBe(true);
  });

  test('meta margin-top should match --padding-h-inner at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}${TEST_URLS.events}`);
    await page.waitForLoadState('networkidle');

    const exists = await elementExists(page, EVENT_CONFIG.meta.selector);
    skipIfNotFound(exists, 'Event card meta');

    // At 1440px: --padding-h-inner: 15px
    const result = await verifyCSSVariableUsage(
      page,
      EVENT_CONFIG.meta.selector,
      'margin-top',
      '--padding-h-inner' as any,
      1440,
      TOLERANCE
    );

    console.log('Event card meta at 1440px:');
    console.log(`  Computed margin-top: ${result.computedValue}px`);
    console.log(`  Expected (--padding-h-inner): ${result.expectedValue}px`);

    expect(result.passed, result.message).toBe(true);
  });

  test('meta margin-top should drop at 1441px (media query)', async ({ page }) => {
    await page.setViewportSize({ width: 1441, height: 900 });
    await page.goto(`${BASE_URL}${TEST_URLS.events}`);
    await page.waitForLoadState('networkidle');

    const exists = await elementExists(page, EVENT_CONFIG.meta.selector);
    skipIfNotFound(exists, 'Event card meta');

    // At 1441px: --padding-h-inner should be ~6px (dropped from 15px)
    const result = await verifyCSSVariableUsage(
      page,
      EVENT_CONFIG.meta.selector,
      'margin-top',
      '--padding-h-inner' as any,
      1441,
      TOLERANCE
    );

    console.log('Event card meta at 1441px (after media query):');
    console.log(`  Computed margin-top: ${result.computedValue}px`);
    console.log(`  Expected (--padding-h-inner at >1440px): ${result.expectedValue}px`);
    console.log(`  Should be ~6px (dropped from ~15px at 1440px)`);

    expect(result.passed, result.message).toBe(true);
  });
});

test.describe('Event Card - All Breakpoints Summary', () => {
  test('generate spacing summary for event card', async ({ page }) => {
    const summary: Array<{
      breakpoint: string;
      width: number;
      contentPadding: number | null;
      expectedContentPadding: number | null;
      metaMarginTop: number | null;
      expectedMetaMarginTop: number | null;
    }> = [];

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.events}`);
      await page.waitForLoadState('networkidle');

      const contentExists = await elementExists(page, EVENT_CONFIG.content.selector);
      const metaExists = await elementExists(page, EVENT_CONFIG.meta.selector);

      let contentResult = null;
      let metaResult = null;

      if (contentExists) {
        contentResult = await verifyCSSVariableUsage(
          page,
          EVENT_CONFIG.content.selector,
          'padding-top',
          EVENT_CONFIG.content.padding as any,
          bp.width,
          TOLERANCE
        );
      }

      if (metaExists) {
        metaResult = await verifyCSSVariableUsage(
          page,
          EVENT_CONFIG.meta.selector,
          'margin-top',
          EVENT_CONFIG.meta.marginTop as any,
          bp.width,
          TOLERANCE
        );
      }

      summary.push({
        breakpoint: bpName,
        width: bp.width,
        contentPadding: contentResult?.computedValue ?? null,
        expectedContentPadding: contentResult?.expectedValue ?? null,
        metaMarginTop: metaResult?.computedValue ?? null,
        expectedMetaMarginTop: metaResult?.expectedValue ?? null
      });
    }

    console.log('\nEvent Card Spacing Summary:');
    console.log('===========================');
    console.table(summary);

    // Verify at least some values were found
    const hasValues = summary.some(s => s.contentPadding !== null || s.metaMarginTop !== null);
    expect(hasValues, 'No event card elements found on page').toBe(true);
  });
});
