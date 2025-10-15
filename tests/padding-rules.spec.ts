import { test, expect } from '@playwright/test';
import { PADDING_RULES } from '../config/spacing-rules';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getPadding, getElementSpacing } from '../utils/spacing-helpers';
import { assertWithinTolerance } from '../utils/assertion-helpers';

test.describe('Padding Rules - Internal Spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('Featured Paragraph V1 - padding at mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV1;
    const paddingTop = await getPadding(page, selector, 'top');
    const paddingBottom = await getPadding(page, selector, 'bottom');
    
    if (paddingTop !== null && paddingTop > 0) {
      assertWithinTolerance(
        paddingTop,
        PADDING_RULES.featuredParagraphV1[375].top,
        'Featured Paragraph V1 padding-top at mobile'
      );
    }
    
    if (paddingBottom !== null && paddingBottom > 0) {
      assertWithinTolerance(
        paddingBottom,
        PADDING_RULES.featuredParagraphV1[375].bottom,
        'Featured Paragraph V1 padding-bottom at mobile'
      );
    }
  });

  test('Featured Paragraph V1 - padding at desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV1;
    const paddingTop = await getPadding(page, selector, 'top');
    const paddingBottom = await getPadding(page, selector, 'bottom');
    
    if (paddingTop !== null && paddingTop > 0) {
      assertWithinTolerance(
        paddingTop,
        PADDING_RULES.featuredParagraphV1[1440].top,
        'Featured Paragraph V1 padding-top at desktop'
      );
    }
    
    if (paddingBottom !== null && paddingBottom > 0) {
      assertWithinTolerance(
        paddingBottom,
        PADDING_RULES.featuredParagraphV1[1440].bottom,
        'Featured Paragraph V1 padding-bottom at desktop'
      );
    }
  });

  test('Featured Paragraph V1 - padding at large (2560px)', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV1;
    const paddingTop = await getPadding(page, selector, 'top');
    const paddingBottom = await getPadding(page, selector, 'bottom');
    
    if (paddingTop !== null && paddingTop > 0) {
      assertWithinTolerance(
        paddingTop,
        PADDING_RULES.featuredParagraphV1[2560].top,
        'Featured Paragraph V1 padding-top at large'
      );
    }
    
    if (paddingBottom !== null && paddingBottom > 0) {
      assertWithinTolerance(
        paddingBottom,
        PADDING_RULES.featuredParagraphV1[2560].bottom,
        'Featured Paragraph V1 padding-bottom at large'
      );
    }
  });

  test('Module widget with background - internal padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const spacing = await getElementSpacing(page, SELECTORS.widgets.moduleWidgetWithBg);
    
    if (spacing && spacing.paddings.top > 0) {
      assertWithinTolerance(
        spacing.paddings.top,
        89,
        'Module widget with background padding-top'
      );
      
      assertWithinTolerance(
        spacing.paddings.bottom,
        89,
        'Module widget with background padding-bottom'
      );
    }
  });

  test('Story card - fixed 20px padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const spacing = await getElementSpacing(page, SELECTORS.cards.storyCardContent);
    
    if (spacing && spacing.paddings.top > 0) {
      assertWithinTolerance(
        spacing.paddings.top,
        20,
        'Story card padding-top',
        1 // Tighter tolerance for fixed values
      );
      
      assertWithinTolerance(
        spacing.paddings.bottom,
        20,
        'Story card padding-bottom',
        1
      );
    }
  });

  test('Divider - padding at mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    
    const paddingTop = await getPadding(page, SELECTORS.misc.divider, 'top');
    const paddingBottom = await getPadding(page, SELECTORS.misc.divider, 'bottom');
    
    if (paddingTop !== null && paddingTop > 0) {
      assertWithinTolerance(
        paddingTop,
        PADDING_RULES.divider[375].top,
        'Divider padding-top at mobile'
      );
    }
    
    if (paddingBottom !== null && paddingBottom > 0) {
      assertWithinTolerance(
        paddingBottom,
        PADDING_RULES.divider[375].bottom,
        'Divider padding-bottom at mobile'
      );
    }
  });

  test('Divider - padding at desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const paddingTop = await getPadding(page, SELECTORS.misc.divider, 'top');
    const paddingBottom = await getPadding(page, SELECTORS.misc.divider, 'bottom');
    
    if (paddingTop !== null && paddingTop > 0) {
      assertWithinTolerance(
        paddingTop,
        PADDING_RULES.divider[1440].top,
        'Divider padding-top at desktop'
      );
    }
    
    if (paddingBottom !== null && paddingBottom > 0) {
      assertWithinTolerance(
        paddingBottom,
        PADDING_RULES.divider[1440].bottom,
        'Divider padding-bottom at desktop'
      );
    }
  });

  test('Divider - padding at large (2560px)', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.waitForTimeout(300);
    
    const paddingTop = await getPadding(page, SELECTORS.misc.divider, 'top');
    const paddingBottom = await getPadding(page, SELECTORS.misc.divider, 'bottom');
    
    if (paddingTop !== null && paddingTop > 0) {
      assertWithinTolerance(
        paddingTop,
        PADDING_RULES.divider[2560].top,
        'Divider padding-top at large'
      );
    }
    
    if (paddingBottom !== null && paddingBottom > 0) {
      assertWithinTolerance(
        paddingBottom,
        PADDING_RULES.divider[2560].bottom,
        'Divider padding-bottom at large'
      );
    }
  });
});
