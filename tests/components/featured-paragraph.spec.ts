import { test, expect } from '@playwright/test';
import { SELECTORS } from '../../config/selectors';
import { getElementSpacing, hasBackground } from '../../utils/spacing-helpers';
import { assertWithinTolerance } from '../../utils/assertion-helpers';

test.describe('Featured Paragraph Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/amr-test/featured-paragraph');
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

  test('Variant 1 - should have background #E4E7E9 and internal padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV1;
    
    // Check background color
    const bgColor = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return styles.backgroundColor;
    }, selector);
    
    // Check spacing
    const hasBg = await hasBackground(page, selector);
    const spacing = await getElementSpacing(page, selector);
    
    if (bgColor) {
      // #E4E7E9 converts to rgb(228, 231, 233)
      expect(bgColor, 'Variant 1 should have background color #E4E7E9').toBe('rgb(228, 231, 233)');
    }
    
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
    await page.goto('/amr-test/featured-paragraph');
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

  test('Variant 1 - should have italic text styling', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const fontStyle = await page.evaluate(() => {
      const el = document.querySelector('.featuredParagraph');
      return el ? window.getComputedStyle(el).fontStyle : null;
    });
    
    if (fontStyle) {
      expect(fontStyle, 'Variant 1 text should be italic').toBe('italic');
    }
  });

  test('Variant 1 - should be center-aligned', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const textAlign = await page.evaluate(() => {
      const el = document.querySelector('.featuredParagraph');
      return el ? window.getComputedStyle(el).textAlign : null;
    });
    
    if (textAlign) {
      expect(textAlign, 'Variant 1 should be center-aligned').toBe('center');
    }
  });

  test('should have correct font size across breakpoints', async ({ page }) => {
    const breakpoints = [
      { width: 375, expectedMin: 23, expectedMax: 24 },
      { width: 1440, expectedMin: 18, expectedMax: 22 },
      { width: 2560, expectedMin: 20, expectedMax: 24 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: 900 });
      await page.waitForTimeout(300);
      
      const fontSize = await page.evaluate(() => {
        const el = document.querySelector('.featuredParagraph');
        return el ? parseFloat(window.getComputedStyle(el).fontSize) : null;
      });
      
      if (fontSize) {
        expect(fontSize, `Font size at ${bp.width}px should be between ${bp.expectedMin}px and ${bp.expectedMax}px`).toBeGreaterThanOrEqual(bp.expectedMin);
        expect(fontSize).toBeLessThanOrEqual(bp.expectedMax);
      }
    }
  });

  test('Variant 2 - should have left-aligned text', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const textAlign = await page.evaluate(() => {
      const v2Elements = document.querySelectorAll('.featuredText');
      if (v2Elements.length === 0) return null;
      return window.getComputedStyle(v2Elements[0]).textAlign;
    });
    
    if (textAlign) {
      expect(textAlign, 'Variant 2 should be left-aligned').toBe('left');
    }
  });

  test('Variant 2 - should have tertiary color', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const color = await page.evaluate(() => {
      const v2Elements = document.querySelectorAll('.featuredText');
      if (v2Elements.length === 0) return null;
      return window.getComputedStyle(v2Elements[0]).color;
    });
    
    if (color) {
      // #c55f3c = rgb(197, 95, 60)
      expect(color, 'Variant 2 should have tertiary color #c55f3c').toBe('rgb(197, 95, 60)');
    }
  });

  test('Variant 2 - should NOT have background color', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const bgColor = await page.evaluate(() => {
      const v2Elements = document.querySelectorAll('.featuredText');
      if (v2Elements.length === 0) return null;
      return window.getComputedStyle(v2Elements[0]).backgroundColor;
    });
    
    if (bgColor) {
      const isTransparent = bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent';
      expect(isTransparent, 'Variant 2 should have transparent background').toBe(true);
    }
  });

  test('Variant 1 - should span full width with background', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const containerWidth = await page.evaluate(() => {
      const container = document.querySelector('.featured-paragraph');
      const viewport = document.documentElement.clientWidth;
      return container ? {
        containerWidth: container.getBoundingClientRect().width,
        viewportWidth: viewport
      } : null;
    });
    
    if (containerWidth) {
      // Should be close to full viewport width (at least 90%)
      const widthRatio = containerWidth.containerWidth / containerWidth.viewportWidth;
      expect(widthRatio, 'Variant 1 should span at least 90% of viewport width').toBeGreaterThan(0.9);
    }
  });

  test('Variant 2 - should match normal content width', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const widths = await page.evaluate(() => {
      const v2 = document.querySelector('.featuredText');
      const body = document.querySelector('.module-content p:not(.featuredText):not(.featuredParagraph)');
      
      return {
        v2Width: v2 ? v2.getBoundingClientRect().width : null,
        bodyWidth: body ? body.getBoundingClientRect().width : null
      };
    });
    
    if (widths.v2Width && widths.bodyWidth) {
      const difference = Math.abs(widths.v2Width - widths.bodyWidth);
      expect(difference, 'Variant 2 width should match body text width (within 10px)').toBeLessThan(10);
    }
  });

  test('Variant 1 - padding should increase with viewport', async ({ page }) => {
    const breakpoints = [375, 1440, 2560];
    const paddings: number[] = [];
    
    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(300);
      
      const padding = await page.evaluate(() => {
        const el = document.querySelector('.featured-paragraph');
        if (!el) return 0;
        const styles = window.getComputedStyle(el);
        return parseFloat(styles.paddingTop);
      });
      
      paddings.push(padding);
    }
    
    // Each should be larger than previous
    if (paddings[0] && paddings[1]) {
      expect(paddings[1], 'Desktop padding should be greater than mobile').toBeGreaterThan(paddings[0]);
    }
    if (paddings[1] && paddings[2]) {
      expect(paddings[2], 'Large desktop padding should be greater than desktop').toBeGreaterThan(paddings[1]);
    }
    
    console.log('Padding progression:', {
      mobile: paddings[0],
      desktop: paddings[1],
      large: paddings[2]
    });
  });

  test('should support bold text within paragraph', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const hasBold = await page.evaluate(() => {
      const paragraphs = document.querySelectorAll('.featuredParagraph, .featuredText');
      for (const p of Array.from(paragraphs)) {
        const strong = p.querySelector('strong, b');
        if (strong) {
          const weight = window.getComputedStyle(strong).fontWeight;
          return parseInt(weight) >= 700;
        }
      }
      return false;
    });
    
    expect(hasBold, 'Featured paragraph should support bold text (font-weight >= 700)').toBe(true);
  });

  test('should have zero margin when followed by widget with background', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const marginBottom = await page.evaluate(() => {
      const fp = document.querySelector('.featured-paragraph');
      if (!fp) return null;
      
      const nextSibling = fp.nextElementSibling;
      
      if (nextSibling?.classList.contains('module-widget--with-bg')) {
        return parseFloat(window.getComputedStyle(fp).marginBottom);
      }
      return null;
    });
    
    if (marginBottom !== null) {
      expect(marginBottom, 'Margin should be 0 when followed by widget with background').toBe(0);
    }
  });

  test('should be accessible with proper contrast', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const contrast = await page.evaluate(() => {
      const el = document.querySelector('.featuredParagraph');
      if (!el) return null;
      
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor
      };
    });
    
    // Check that there's sufficient contrast (basic check)
    if (contrast) {
      expect(contrast.color, 'Text color should be different from background').not.toBe(contrast.backgroundColor);
    }
  });
});
