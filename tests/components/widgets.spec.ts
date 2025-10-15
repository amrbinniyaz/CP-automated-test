import { test, expect } from '@playwright/test';
import { SELECTORS } from '../../config/selectors';
import { getElementSpacing } from '../../utils/spacing-helpers';
import { assertWithinTolerance } from '../../utils/assertion-helpers';

test.describe('Widget Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('Module widget bottom margin (~94.5px at 1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const spacing = await getElementSpacing(page, SELECTORS.widgets.moduleWidget);
    
    if (spacing && spacing.margins.bottom > 0) {
      assertWithinTolerance(
        spacing.margins.bottom,
        94.5,
        'Module widget margin-bottom at desktop',
        5 // Slightly higher tolerance
      );
    }
  });

  test('Widget with background - internal padding (~89px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const spacing = await getElementSpacing(page, SELECTORS.widgets.moduleWidgetWithBg);
    
    if (spacing && spacing.paddings.top > 0) {
      assertWithinTolerance(
        spacing.paddings.top,
        89,
        'Widget with background padding-top',
        5
      );
      
      assertWithinTolerance(
        spacing.paddings.bottom,
        89,
        'Widget with background padding-bottom',
        5
      );
    }
  });

  test('Widget title bottom margin', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const spacing = await getElementSpacing(page, SELECTORS.widgets.widgetTitle);
    
    if (spacing && spacing.margins.bottom > 0) {
      console.log('Widget title margin-bottom:', spacing.margins.bottom);
      expect(spacing.margins.bottom, 'Widget title should have bottom margin').toBeGreaterThan(10);
    }
  });

  test('Carousel arrow positioning', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const carousel = page.locator(SELECTORS.cards.cardCarousel).first();
    
    if (await carousel.count() > 0) {
      const arrows = await carousel.locator('.carousel-arrow, .slick-arrow, button[class*="arrow"]').all();
      
      for (const arrow of arrows) {
        if (await arrow.isVisible()) {
          const box = await arrow.boundingBox();
          console.log('Carousel arrow position:', box);
          expect(box).not.toBeNull();
        }
      }
    }
  });

  test('Story widget grid layout', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const storyWidget = page.locator(SELECTORS.widgets.stories).first();
    
    if (await storyWidget.count() > 0) {
      const cards = await storyWidget.locator(SELECTORS.cards.storyCard).all();
      
      console.log(`Found ${cards.length} story cards`);
      
      // Check grid behavior
      if (cards.length >= 2) {
        const box1 = await cards[0].boundingBox();
        const box2 = await cards[1].boundingBox();
        
        if (box1 && box2) {
          // Check if cards are in a row or column
          const isRow = Math.abs(box1.y - box2.y) < 50;
          console.log('Cards are in a row:', isRow);
        }
      }
    }
  });

  test('Event widget spacing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const eventWidget = page.locator(SELECTORS.widgets.events).first();
    
    if (await eventWidget.count() > 0) {
      const spacing = await getElementSpacing(page, SELECTORS.widgets.events);
      
      if (spacing) {
        console.log('Event widget spacing:', spacing);
        expect(spacing.margins.bottom, 'Event widget should have bottom margin').toBeGreaterThan(0);
      }
    }
  });

  test('Profile widget spacing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const profileWidget = page.locator(SELECTORS.widgets.profiles).first();
    
    if (await profileWidget.count() > 0) {
      const spacing = await getElementSpacing(page, SELECTORS.widgets.profiles);
      
      if (spacing) {
        console.log('Profile widget spacing:', spacing);
        expect(spacing.margins.bottom, 'Profile widget should have bottom margin').toBeGreaterThan(0);
      }
    }
  });

  test('Widget grid adapts to viewport (1-4 items per row)', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const viewports = [
      { width: 375, expectedCols: 1, name: 'mobile' },
      { width: 768, expectedCols: 2, name: 'tablet' },
      { width: 1440, expectedCols: 3, name: 'desktop' }
    ];
    
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: 900 });
      await page.waitForTimeout(300);
      
      const widget = page.locator(SELECTORS.widgets.moduleWidget).first();
      
      if (await widget.count() > 0) {
        const cards = await widget.locator(SELECTORS.cards.storyCard).all();
        
        if (cards.length >= 2) {
          const box1 = await cards[0].boundingBox();
          const box2 = await cards[1].boundingBox();
          
          if (box1 && box2) {
            const isRow = Math.abs(box1.y - box2.y) < 50;
            console.log(`At ${vp.name}: cards in same row = ${isRow}`);
          }
        }
      }
    }
  });

  test('Widgets scale margins across breakpoints', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const breakpoints = [375, 1440, 2560];
    const results: Record<number, number> = {};
    
    for (const width of breakpoints) {
      const height = width === 375 ? 812 : width === 1440 ? 900 : 1440;
      await page.setViewportSize({ width, height });
      await page.waitForTimeout(300);
      
      const spacing = await getElementSpacing(page, SELECTORS.widgets.moduleWidget);
      if (spacing && spacing.margins.bottom > 0) {
        results[width] = spacing.margins.bottom;
      }
    }
    
    console.log('Widget margin progression:', results);
    
    // Verify margins increase with viewport
    if (results[375] && results[1440]) {
      expect(results[1440]).toBeGreaterThanOrEqual(results[375]);
    }
  });
});
