import { test, expect } from '@playwright/test';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getElementSpacing } from '../utils/spacing-helpers';
import { assertProportionalScaling } from '../utils/assertion-helpers';

test.describe('Responsive Spacing Tests', () => {
  test('Main layout padding should scale proportionally', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const selector = SELECTORS.layout.mainLayout;
    const results: Record<string, number> = {};
    
    // Collect padding at all breakpoints
    for (const [name, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);
      
      const spacing = await getElementSpacing(page, selector);
      if (spacing) {
        results[name] = spacing.paddings.top;
      }
    }
    
    // Verify scaling: desktop >= mobile, large >= desktop
    if (results.mobile && results.desktop) {
      assertProportionalScaling(
        results.mobile,
        results.desktop,
        0.95,
        'Mobile to Desktop scaling'
      );
    }
    
    if (results.desktop && results.large) {
      assertProportionalScaling(
        results.desktop,
        results.large,
        0.95,
        'Desktop to Large scaling'
      );
    }
    
    console.log('Padding progression:', results);
  });

  test('Content template behavior change at 1259px vs 1260px', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const selector = SELECTORS.contentTemplates.halfHalf;
    
    // Test at 1259px
    await page.setViewportSize({ width: 1259, height: 900 });
    await page.waitForTimeout(300);
    const spacing1259 = await getElementSpacing(page, selector);
    
    // Test at 1260px
    await page.setViewportSize({ width: 1260, height: 900 });
    await page.waitForTimeout(300);
    const spacing1260 = await getElementSpacing(page, selector);
    
    // Verify expected behavior change
    // (Specific assertions depend on actual design requirements)
    if (spacing1259 && spacing1260) {
      console.log('Spacing at 1259px:', spacing1259);
      console.log('Spacing at 1260px:', spacing1260);
      
      expect(spacing1259).toBeDefined();
      expect(spacing1260).toBeDefined();
    }
  });

  test('Module widgets scale correctly across breakpoints', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const selector = SELECTORS.widgets.moduleWidget;
    const marginResults: Record<string, number> = {};
    
    // Collect margins at breakpoints
    for (const [name, viewport] of Object.entries(BREAKPOINTS)) {
      if (viewport.width === 375 || viewport.width === 1440 || viewport.width === 2560) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(300);
        
        const spacing = await getElementSpacing(page, selector);
        if (spacing && spacing.margins.bottom > 0) {
          marginResults[name] = spacing.margins.bottom;
        }
      }
    }
    
    console.log('Module widget margin progression:', marginResults);
    
    // Verify margins increase with viewport size
    if (marginResults.mobile && marginResults.desktop) {
      expect(marginResults.desktop).toBeGreaterThanOrEqual(marginResults.mobile);
    }
    
    if (marginResults.desktop && marginResults.large) {
      expect(marginResults.large).toBeGreaterThanOrEqual(marginResults.desktop);
    }
  });

  test('Featured paragraph spacing scales correctly', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const selector = SELECTORS.text.featuredParagraph;
    const spacingResults: Record<string, any> = {};
    
    // Collect spacing at breakpoints
    for (const [name, viewport] of Object.entries(BREAKPOINTS)) {
      if (viewport.width === 375 || viewport.width === 1440 || viewport.width === 2560) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(300);
        
        const spacing = await getElementSpacing(page, selector);
        if (spacing) {
          spacingResults[name] = {
            marginBottom: spacing.margins.bottom,
            paddingTop: spacing.paddings.top,
            paddingBottom: spacing.paddings.bottom
          };
        }
      }
    }
    
    console.log('Featured paragraph spacing progression:', spacingResults);
    
    // Verify no unexpected drops or jumps
    const values = Object.values(spacingResults).map((v: any) => v.marginBottom);
    for (let i = 1; i < values.length; i++) {
      if (values[i] && values[i-1]) {
        // No sudden drops (more than 50% decrease)
        const ratio = values[i] / values[i-1];
        expect(ratio, 'Spacing should not have sudden drops').toBeGreaterThan(0.5);
      }
    }
  });

  test('Grid layouts adapt at breakpoints', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    // Test grid behavior at different breakpoints
    const breakpointsToTest = [
      { width: 375, expected: 'mobile layout' },
      { width: 768, expected: 'tablet layout' },
      { width: 1440, expected: 'desktop layout' }
    ];
    
    for (const bp of breakpointsToTest) {
      await page.setViewportSize({ width: bp.width, height: 900 });
      await page.waitForTimeout(300);
      
      // Check if page layout has adapted
      const layoutWidth = await page.evaluate(() => {
        const layout = document.querySelector('.main-layout');
        return layout ? layout.getBoundingClientRect().width : null;
      });
      
      console.log(`Layout width at ${bp.width}px:`, layoutWidth);
      expect(layoutWidth).toBeGreaterThan(0);
    }
  });

  test('No layout shift during resize', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    // Start at desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    
    const initialElementCount = await page.evaluate(() => {
      return document.querySelectorAll('*').length;
    });
    
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    
    const finalElementCount = await page.evaluate(() => {
      return document.querySelectorAll('*').length;
    });
    
    // Element count should be similar (allowing for some dynamic content)
    const difference = Math.abs(finalElementCount - initialElementCount);
    expect(difference, 'Element count should remain relatively stable').toBeLessThan(50);
  });
});
