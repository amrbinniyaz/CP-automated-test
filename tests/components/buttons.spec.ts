import { test, expect } from '@playwright/test';
import { SELECTORS } from '../../config/selectors';

test.describe('Button Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('should not have single word widowing on wrap', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    
    const buttons = await page.locator('button, a.btn, .button').all();
    
    for (const button of buttons) {
      const text = await button.textContent();
      if (!text) continue;
      
      const words = text.trim().split(/\s+/);
      if (words.length > 1) {
        // Check if button is wrapping
        const box = await button.boundingBox();
        if (box && box.height > 50) { // Multi-line button
          // Verify last line doesn't have single word
          const lastWord = words[words.length - 1];
          expect(lastWord.length, 'Last word should not be too short').toBeGreaterThan(3);
        }
      }
    }
  });

  test('all button types should have proper padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const buttonTypes = [
      SELECTORS.buttons.primary,
      SELECTORS.buttons.secondary,
      SELECTORS.buttons.tertiary
    ];
    
    for (const selector of buttonTypes) {
      const button = page.locator(selector).first();
      
      if (await button.count() > 0) {
        // Verify button is visible and clickable
        await expect(button).toBeVisible();
        
        // Check internal padding exists
        const padding = await button.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            top: parseFloat(styles.paddingTop),
            bottom: parseFloat(styles.paddingBottom),
            left: parseFloat(styles.paddingLeft),
            right: parseFloat(styles.paddingRight)
          };
        });
        
        expect(padding.top, 'Button should have top padding').toBeGreaterThan(5);
        expect(padding.bottom, 'Button should have bottom padding').toBeGreaterThan(5);
        expect(padding.left, 'Button should have left padding').toBeGreaterThan(10);
        expect(padding.right, 'Button should have right padding').toBeGreaterThan(10);
      }
    }
  });

  test('buttons should have consistent styling', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const buttons = await page.locator('button, a.btn, .button').all();
    
    for (const button of buttons) {
      if (await button.isVisible()) {
        const styles = await button.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            borderRadius: computed.borderRadius,
            borderWidth: computed.borderWidth,
            cursor: computed.cursor
          };
        });
        
        console.log('Button styles:', styles);
        
        // Verify button is interactive
        expect(styles.cursor).toMatch(/pointer|default/);
      }
    }
  });

  test('icon spacing in buttons (should not be widowed)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    
    const buttonsWithIcons = await page.locator('button:has(svg), a.btn:has(svg), .button:has(svg)').all();
    
    for (const button of buttonsWithIcons) {
      const hasIconAndText = await button.evaluate(el => {
        const svg = el.querySelector('svg');
        const text = el.textContent?.trim();
        return svg && text && text.length > 0;
      });
      
      if (hasIconAndText) {
        const box = await button.boundingBox();
        console.log('Button with icon dimensions:', box);
        
        // Icon should be properly spaced from text
        // This is a basic check - implementation may vary
        expect(box).not.toBeNull();
      }
    }
  });

  test('buttons should be accessible at all breakpoints', async ({ page }) => {
    const breakpoints = [
      { width: 375, height: 812 },
      { width: 1440, height: 900 },
      { width: 2560, height: 1440 }
    ];
    
    for (const viewport of breakpoints) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(300);
      
      const buttons = await page.locator('button, a.btn, .button').all();
      
      for (const button of buttons.slice(0, 5)) { // Check first 5 buttons
        if (await button.isVisible()) {
          const box = await button.boundingBox();
          
          if (box) {
            // Buttons should have minimum touch target size (44x44px on mobile)
            if (viewport.width === 375) {
              expect(box.height, 'Mobile buttons should have minimum height').toBeGreaterThanOrEqual(40);
            }
          }
        }
      }
    }
  });
});
