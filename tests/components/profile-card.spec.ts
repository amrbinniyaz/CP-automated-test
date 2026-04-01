import { test, expect } from '@playwright/test';
import { BREAKPOINTS } from '../../config/breakpoints';
import { COMPONENT_CSS_VAR_MAPPING, TOLERANCE, TEST_URLS } from '../../config/spacing-rules';
import { verifyCSSVariableUsage, formatTestResult } from '../../utils/css-variable-helpers';
import { elementExists, skipIfNotFound } from '../../utils/element-helpers';

const BASE_URL = process.env.BASE_URL || 'https://localhost:4335';
const PROFILE_CONFIG = COMPONENT_CSS_VAR_MAPPING.profileCard;

test.describe('Profile Card Spacing', () => {
  test.describe('.profile-card__description padding', () => {
    const config = PROFILE_CONFIG.description;

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      test(`should use ${config.padding} at ${bpName} (${bp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(`${BASE_URL}${TEST_URLS.profiles}`);
        await page.waitForLoadState('networkidle');

        // Check if element exists
        const exists = await elementExists(page, config.selector);
        skipIfNotFound(exists, 'Profile card description');

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

  test.describe('.profile-card__role margin-top', () => {
    const config = PROFILE_CONFIG.role;

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      test(`should use ${config.marginTop} at ${bpName} (${bp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(`${BASE_URL}${TEST_URLS.profiles}`);
        await page.waitForLoadState('networkidle');

        // Check if element exists
        const exists = await elementExists(page, config.selector);
        skipIfNotFound(exists, 'Profile card role');

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

test.describe('Profile Card - Variable Binding Validation', () => {
  // Test at breakpoints where --padding-c-inner and --padding-e-inner diverge
  // to ensure profile card uses the correct variable

  test('description padding should match --padding-c-inner (not --padding-e-inner) at 1024px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(`${BASE_URL}${TEST_URLS.profiles}`);
    await page.waitForLoadState('networkidle');

    const exists = await elementExists(page, PROFILE_CONFIG.description.selector);
    skipIfNotFound(exists, 'Profile card description');

    // At 1024px:
    // --padding-c-inner: ~27px
    // --padding-e-inner: ~17px
    // If we see ~27px, it's using the correct variable

    const result = await verifyCSSVariableUsage(
      page,
      PROFILE_CONFIG.description.selector,
      'padding-top',
      '--padding-c-inner' as any,
      1024,
      TOLERANCE
    );

    console.log('Profile card description at 1024px:');
    console.log(`  Computed padding: ${result.computedValue}px`);
    console.log(`  Expected (--padding-c-inner): ${result.expectedValue}px`);
    console.log(`  If ~17px, it wrongly uses --padding-e-inner`);
    console.log(`  If ~27px, it correctly uses --padding-c-inner`);

    expect(result.passed, result.message).toBe(true);
  });

  test('description padding should match --padding-c-inner at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}${TEST_URLS.profiles}`);
    await page.waitForLoadState('networkidle');

    const exists = await elementExists(page, PROFILE_CONFIG.description.selector);
    skipIfNotFound(exists, 'Profile card description');

    // At 1440px:
    // --padding-c-inner: 35px
    // --padding-e-inner: 20px

    const result = await verifyCSSVariableUsage(
      page,
      PROFILE_CONFIG.description.selector,
      'padding-top',
      '--padding-c-inner' as any,
      1440,
      TOLERANCE
    );

    console.log('Profile card description at 1440px:');
    console.log(`  Computed padding: ${result.computedValue}px`);
    console.log(`  Expected (--padding-c-inner): ${result.expectedValue}px`);
    console.log(`  If ~20px, it wrongly uses --padding-e-inner`);
    console.log(`  If ~35px, it correctly uses --padding-c-inner`);

    expect(result.passed, result.message).toBe(true);
  });
});

test.describe('Profile Card - All Breakpoints Summary', () => {
  test('generate spacing summary for profile card', async ({ page }) => {
    const summary: Array<{
      breakpoint: string;
      width: number;
      descriptionPadding: number | null;
      expectedPadding: number | null;
      roleMarginTop: number | null;
      expectedMarginTop: number | null;
    }> = [];

    for (const [bpName, bp] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}${TEST_URLS.profiles}`);
      await page.waitForLoadState('networkidle');

      const descExists = await elementExists(page, PROFILE_CONFIG.description.selector);
      const roleExists = await elementExists(page, PROFILE_CONFIG.role.selector);

      let descResult = null;
      let roleResult = null;

      if (descExists) {
        descResult = await verifyCSSVariableUsage(
          page,
          PROFILE_CONFIG.description.selector,
          'padding-top',
          PROFILE_CONFIG.description.padding as any,
          bp.width,
          TOLERANCE
        );
      }

      if (roleExists) {
        roleResult = await verifyCSSVariableUsage(
          page,
          PROFILE_CONFIG.role.selector,
          'margin-top',
          PROFILE_CONFIG.role.marginTop as any,
          bp.width,
          TOLERANCE
        );
      }

      summary.push({
        breakpoint: bpName,
        width: bp.width,
        descriptionPadding: descResult?.computedValue ?? null,
        expectedPadding: descResult?.expectedValue ?? null,
        roleMarginTop: roleResult?.computedValue ?? null,
        expectedMarginTop: roleResult?.expectedValue ?? null
      });
    }

    console.log('\nProfile Card Spacing Summary:');
    console.log('=============================');
    console.table(summary);

    // Verify at least some values were found
    const hasValues = summary.some(s => s.descriptionPadding !== null || s.roleMarginTop !== null);
    expect(hasValues, 'No profile card elements found on page').toBe(true);
  });
});
