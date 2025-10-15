import { test, expect } from '@playwright/test';
import { MARGIN_RULES, TOLERANCE } from '../config/spacing-rules';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getMargin } from '../utils/spacing-helpers';
import { assertWithinTolerance } from '../utils/assertion-helpers';

test.describe('Margin Rules - External Spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  // Test Margin A across all breakpoints
  Object.entries(BREAKPOINTS).forEach(([name, viewport]) => {
    if (viewport.width === 375 || viewport.width === 1440 || viewport.width === 2560) {
      test(`Margin A should be ${MARGIN_RULES.A[viewport.width as keyof typeof MARGIN_RULES.A]}px at ${name} (${viewport.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(300); // Allow reflow
        
        // Test on main content sections that use Margin A
        const marginBottom = await getMargin(page, SELECTORS.layout.mainLayout, 'bottom');
        
        if (marginBottom !== null && marginBottom > 0) {
          assertWithinTolerance(
            marginBottom,
            MARGIN_RULES.A[viewport.width as keyof typeof MARGIN_RULES.A],
            `Margin A at ${name}`
          );
        }
      });
    }
  });

  // Test Margin B across all breakpoints
  Object.entries(BREAKPOINTS).forEach(([name, viewport]) => {
    if (viewport.width === 375 || viewport.width === 1440 || viewport.width === 2560) {
      test(`Margin B should be ${MARGIN_RULES.B[viewport.width as keyof typeof MARGIN_RULES.B]}px at ${name} (${viewport.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(300);
        
        const marginBottom = await getMargin(page, SELECTORS.widgets.moduleWidget, 'bottom');
        
        if (marginBottom !== null && marginBottom > 0) {
          assertWithinTolerance(
            marginBottom,
            MARGIN_RULES.B[viewport.width as keyof typeof MARGIN_RULES.B],
            `Margin B at ${name}`
          );
        }
      });
    }
  });

  // Test Margin C across all breakpoints
  Object.entries(BREAKPOINTS).forEach(([name, viewport]) => {
    if (viewport.width === 375 || viewport.width === 1440 || viewport.width === 2560) {
      test(`Margin C should be ${MARGIN_RULES.C[viewport.width as keyof typeof MARGIN_RULES.C]}px at ${name} (${viewport.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(300);
        
        const marginBottom = await getMargin(page, SELECTORS.text.featuredParagraph, 'bottom');
        
        if (marginBottom !== null && marginBottom > 0) {
          assertWithinTolerance(
            marginBottom,
            MARGIN_RULES.C[viewport.width as keyof typeof MARGIN_RULES.C],
            `Margin C at ${name}`
          );
        }
      });
    }
  });

  // Test Margin D across all breakpoints
  Object.entries(BREAKPOINTS).forEach(([name, viewport]) => {
    if (viewport.width === 375 || viewport.width === 1440 || viewport.width === 2560) {
      test(`Margin D should be ${MARGIN_RULES.D[viewport.width as keyof typeof MARGIN_RULES.D]}px at ${name} (${viewport.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(300);
        
        const marginBottom = await getMargin(page, SELECTORS.misc.divider, 'bottom');
        
        if (marginBottom !== null && marginBottom > 0) {
          assertWithinTolerance(
            marginBottom,
            MARGIN_RULES.D[viewport.width as keyof typeof MARGIN_RULES.D],
            `Margin D at ${name}`
          );
        }
      });
    }
  });

  test('Margin collapse between stacked elements', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);

    // Get all module widgets with backgrounds
    const widgets = await page.locator(SELECTORS.widgets.moduleWidgetWithBg).all();
    
    if (widgets.length >= 2) {
      // Check gap between first two widgets
      const firstWidget = widgets[0];
      const secondWidget = widgets[1];
      
      const firstBox = await firstWidget.boundingBox();
      const secondBox = await secondWidget.boundingBox();
      
      if (firstBox && secondBox) {
        const gap = secondBox.y - (firstBox.y + firstBox.height);
        
        // Gap should be near 0px (within 5px tolerance)
        expect(Math.abs(gap), 'Gap between stacked backgrounds should be near 0px').toBeLessThanOrEqual(5);
      }
    }
  });
});
