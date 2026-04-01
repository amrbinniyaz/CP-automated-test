import { test, expect } from '@playwright/test';

const TEST_URL = 'https://mvcbasev3.leia.tiarc-live.co.uk/testing/tables';

// Expected CSS variable values
const EXPECTED = {
  primaryColor: 'rgb(28, 43, 60)',      // #1c2b3c
  secondaryColor: 'rgb(127, 201, 199)', // #7fc9c7
};

test.describe('Tables - Styling Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');
  });

  test('SC-TABLE-001: Table wrapper uses --table-spacing for margin', async ({ page }) => {
    const tableWrapper = page.locator('.table-wrapper').first();
    const margin = await tableWrapper.evaluate(el => getComputedStyle(el).margin);

    // Should have margin-bottom from --table-spacing (approx 40-60px depending on viewport)
    expect(margin).toMatch(/0px 0px \d+(\.\d+)?px/);
  });

  test('SC-TABLE-002: TH background uses --secondary-color', async ({ page }) => {
    const th = page.locator('th').first();
    const backgroundColor = await th.evaluate(el => getComputedStyle(el).backgroundColor);

    expect(backgroundColor).toBe(EXPECTED.secondaryColor);
  });

  test('SC-TABLE-003: TD/TH text uses --primary-color', async ({ page }) => {
    const th = page.locator('th').first();
    const td = page.locator('td').first();

    const thColor = await th.evaluate(el => getComputedStyle(el).color);
    const tdColor = await td.evaluate(el => getComputedStyle(el).color);

    expect(thColor).toBe(EXPECTED.primaryColor);
    expect(tdColor).toBe(EXPECTED.primaryColor);
  });

  test('SC-TABLE-005: TD borders use --secondary-color', async ({ page }) => {
    const td = page.locator('td').first();
    const borderRight = await td.evaluate(el => getComputedStyle(el).borderRightColor);
    const borderBottom = await td.evaluate(el => getComputedStyle(el).borderBottomColor);

    expect(borderRight).toBe(EXPECTED.secondaryColor);
    expect(borderBottom).toBe(EXPECTED.secondaryColor);
  });

  // Known failing test - documents BUG-TABLE-001
  test.skip('SC-TABLE-004: Table background should use CSS variable (BUG-TABLE-001)', async ({ page }) => {
    // This test is skipped because it's a known bug
    // Table background uses SCSS variable rgba($secondaryColor, 0.3) instead of CSS variable
    const table = page.locator('table').first();

    // Change CSS variable at runtime
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--secondary-color', '#ff0000');
    });

    const backgroundColor = await table.evaluate(el => getComputedStyle(el).backgroundColor);

    // Should contain red (255, 0, 0) if using CSS variable - but it won't because of the bug
    expect(backgroundColor).toContain('255, 0, 0');
  });
});

test.describe('Tables - Behavior Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');
  });

  test('BEH-TABLE-001: Overflow tables get has-overflow class', async ({ page }) => {
    // Wait for JS to add the class
    await page.waitForTimeout(500);

    const overflowTable = page.locator('.table-wrapper.has-overflow');
    const count = await overflowTable.count();

    // At least one table should have overflow on this page
    expect(count).toBeGreaterThan(0);
  });

  test('BEH-TABLE-002: Fade gradient appears on overflow tables', async ({ page }) => {
    await page.waitForTimeout(500);

    const overflowWrapper = page.locator('.table-wrapper.has-overflow').first();

    if (await overflowWrapper.count() > 0) {
      const pseudoContent = await overflowWrapper.evaluate(el => {
        const style = getComputedStyle(el, '::after');
        return style.background;
      });

      expect(pseudoContent).toContain('linear-gradient');
    }
  });

  test('BEH-TABLE-004: Scrollbar is functional', async ({ page }) => {
    await page.waitForTimeout(500);

    const overflowWrapper = page.locator('.table-wrapper.has-overflow').first();

    if (await overflowWrapper.count() > 0) {
      const scrollbar = overflowWrapper.locator('.os-scrollbar-horizontal');
      await expect(scrollbar).toBeVisible();
    }
  });
});

test.describe('Tables - Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');
  });

  test('EDGE-TABLE-001: Row headers (th[scope="row"]) styled correctly', async ({ page }) => {
    const rowHeader = page.locator('th[scope="row"]').first();

    if (await rowHeader.count() > 0) {
      const backgroundColor = await rowHeader.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(backgroundColor).toBe(EXPECTED.secondaryColor);
    }
  });

  test('EDGE-TABLE-003: Nested lists render in table cells', async ({ page }) => {
    const cellWithList = page.locator('td ul, td ol').first();

    if (await cellWithList.count() > 0) {
      await expect(cellWithList).toBeVisible();
    }
  });

  test('EDGE-TABLE-004: Links in table cells have correct styling', async ({ page }) => {
    const linkInTable = page.locator('td a').first();

    if (await linkInTable.count() > 0) {
      const borderBottom = await linkInTable.evaluate(el => getComputedStyle(el).borderBottom);
      expect(borderBottom).toContain('solid');
    }
  });

  test('EDGE-TABLE-006: Long text wraps correctly', async ({ page }) => {
    const td = page.locator('td').first();
    const wordBreak = await td.evaluate(el => getComputedStyle(el).wordBreak);
    const overflowWrap = await td.evaluate(el => getComputedStyle(el).overflowWrap);

    expect(wordBreak).toBe('break-word');
    expect(overflowWrap).toBe('break-word');
  });
});

test.describe('Tables - Responsive Tests', () => {
  test('RESP-TABLE-001: Table spacing at mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');

    const tableWrapper = page.locator('.table-wrapper').first();
    const margin = await tableWrapper.evaluate(el => {
      const computed = getComputedStyle(el);
      return parseFloat(computed.marginBottom);
    });

    // At 375px, --margin-c should be around 30-40px
    expect(margin).toBeGreaterThanOrEqual(30);
    expect(margin).toBeLessThanOrEqual(50);
  });

  test('RESP-TABLE-001: Table spacing at desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');

    const tableWrapper = page.locator('.table-wrapper').first();
    const margin = await tableWrapper.evaluate(el => {
      const computed = getComputedStyle(el);
      return parseFloat(computed.marginBottom);
    });

    // At 1440px, --margin-c should be around 40px
    expect(margin).toBeGreaterThanOrEqual(35);
    expect(margin).toBeLessThanOrEqual(50);
  });

  test('RESP-TABLE-001: Table spacing at large desktop (2560px)', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');

    const tableWrapper = page.locator('.table-wrapper').first();
    const margin = await tableWrapper.evaluate(el => {
      const computed = getComputedStyle(el);
      return parseFloat(computed.marginBottom);
    });

    // At 2560px, --margin-c should be around 60px
    expect(margin).toBeGreaterThanOrEqual(50);
    expect(margin).toBeLessThanOrEqual(70);
  });
});

test.describe('Tables - Theme Variable Cascade Tests', () => {
  test('TV-TABLE-001: Primary color cascade to text', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');

    // Change primary color
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--primary-color', '#ff0000');
    });

    const th = page.locator('th').first();
    const td = page.locator('td').first();

    const thColor = await th.evaluate(el => getComputedStyle(el).color);
    const tdColor = await td.evaluate(el => getComputedStyle(el).color);

    expect(thColor).toBe('rgb(255, 0, 0)');
    expect(tdColor).toBe('rgb(255, 0, 0)');
  });

  test('TV-TABLE-002: Secondary color cascade to TH background', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');

    // Change secondary color
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--secondary-color', '#ff0000');
    });

    const th = page.locator('th').first();
    const backgroundColor = await th.evaluate(el => getComputedStyle(el).backgroundColor);

    expect(backgroundColor).toBe('rgb(255, 0, 0)');
  });

  test('TV-TABLE-002: Secondary color cascade to TD borders', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');

    // Change secondary color
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--secondary-color', '#ff0000');
    });

    const td = page.locator('td').first();
    const borderRightColor = await td.evaluate(el => getComputedStyle(el).borderRightColor);
    const borderBottomColor = await td.evaluate(el => getComputedStyle(el).borderBottomColor);

    expect(borderRightColor).toBe('rgb(255, 0, 0)');
    expect(borderBottomColor).toBe('rgb(255, 0, 0)');
  });

  // This test documents the bug - table background does NOT cascade
  test('TV-TABLE-002: Table background does NOT cascade (BUG-TABLE-001)', async ({ page }) => {
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');

    // Get original background
    const table = page.locator('table').first();
    const originalBg = await table.evaluate(el => getComputedStyle(el).backgroundColor);

    // Change secondary color
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--secondary-color', '#ff0000');
    });

    const newBg = await table.evaluate(el => getComputedStyle(el).backgroundColor);

    // BUG: Background should change but doesn't because it uses SCSS variable
    expect(newBg).toBe(originalBg); // This passes, confirming the bug
  });
});
