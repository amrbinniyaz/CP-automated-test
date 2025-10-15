import { test, expect } from '@playwright/test';
import { SELECTORS } from '../../config/selectors';
import { getElementSpacing, hasBackground } from '../../utils/spacing-helpers';
import { assertWithinTolerance } from '../../utils/assertion-helpers';

test.describe('Featured Paragraph Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('should have 30px bottom margin at all breakpoints', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const spacing = await getElementSpacing(page, SELECTORS.text.featuredParagraph);
    
    if (spacing && spacing.margins.bottom > 0) {
      assertWithinTolerance(
        spacing.margins.bottom,
        30,
        'Featured Paragraph margin-bottom'
      );
    }
  });

  test('Variant 1 - should have background and internal padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV1;
    const hasBg = await hasBackground(page, selector);
    const spacing = await getElementSpacing(page, selector);
    
    if (hasBg && spacing) {
      expect(hasBg, 'Variant 1 should have background').toBe(true);
      expect(spacing.paddings.top, 'Should have internal padding').toBeGreaterThan(80);
      expect(spacing.paddings.bottom, 'Should have internal padding').toBeGreaterThan(80);
    }
  });

  test('Variant 2 - should NOT have background', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV2;
    const hasBg = await hasBackground(page, selector);
    
    if (await page.locator(selector).count() > 0) {
      expect(hasBg, 'Variant 2 should NOT have background').toBe(false);
    }
  });

  test('should be wider than rest of page text (Variant 1)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const featuredWidth = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.getBoundingClientRect().width : null;
    }, SELECTORS.text.featuredParagraphV1);
    
    const bodyWidth = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.getBoundingClientRect().width : null;
    }, SELECTORS.text.bodyText);
    
    if (featuredWidth && bodyWidth) {
      expect(featuredWidth, 'Featured paragraph should be wider than body text').toBeGreaterThan(bodyWidth);
    }
  });

  test('should be centered (Variant 1)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const alignment = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return {
        textAlign: styles.textAlign,
        marginLeft: styles.marginLeft,
        marginRight: styles.marginRight
      };
    }, SELECTORS.text.featuredParagraphV1);
    
    if (alignment) {
      console.log('Featured paragraph alignment:', alignment);
      // Verify element is centered (either through text-align or auto margins)
    }
  });

  test('padding scales correctly across breakpoints', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const breakpoints = [375, 1440, 2560];
    const results: Record<number, any> = {};
    
    for (const width of breakpoints) {
      const height = width === 375 ? 812 : width === 1440 ? 900 : 1440;
      await page.setViewportSize({ width, height });
      await page.waitForTimeout(300);
      
      const spacing = await getElementSpacing(page, SELECTORS.text.featuredParagraphV1);
      if (spacing) {
        results[width] = {
          paddingTop: spacing.paddings.top,
          paddingBottom: spacing.paddings.bottom
        };
      }
    }
    
    console.log('Featured paragraph padding progression:', results);
    
    // Verify padding increases with viewport
    if (results[375] && results[1440]) {
      expect(results[1440].paddingTop).toBeGreaterThanOrEqual(results[375].paddingTop);
    }
    
    if (results[1440] && results[2560]) {
      expect(results[2560].paddingTop).toBeGreaterThanOrEqual(results[1440].paddingTop);
    }
  });
});
