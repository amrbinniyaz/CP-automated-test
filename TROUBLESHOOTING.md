# Troubleshooting Guide

Common issues and solutions for the Content Page Spacing Test Suite.

## Installation Issues

### Problem: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: Playwright browsers won't install

**Solution:**
```bash
# Install with dependencies
npx playwright install --with-deps

# Or install specific browser
npx playwright install chromium
```

## Test Execution Issues

### Problem: Tests timing out

**Symptoms:** Tests hang or timeout after 30 seconds

**Solutions:**

1. **Increase timeout in playwright.config.ts:**
   ```typescript
   use: {
     timeout: 60000, // 60 seconds
   }
   ```

2. **Increase wait times in tests:**
   ```typescript
   await page.waitForTimeout(500); // Increase from 300ms
   ```

3. **Check network connectivity:**
   ```bash
   curl https://mvcbasev3.leia.tiarc-live.co.uk
   ```

### Problem: Element not found errors

**Symptoms:** `Element not found or spacing not measurable`

**Solutions:**

1. **Verify selector exists:**
   ```bash
   npm run codegen
   # Navigate to the page and identify correct selector
   ```

2. **Update selector in config/selectors.ts:**
   ```typescript
   featuredParagraphV1: '.actual-class-name',
   ```

3. **Add conditional checks in tests:**
   ```typescript
   if (await page.locator(selector).count() > 0) {
     // Test code
   }
   ```

### Problem: Flaky tests (sometimes pass, sometimes fail)

**Solutions:**

1. **Add proper wait conditions:**
   ```typescript
   await page.waitForLoadState('networkidle');
   await page.waitForTimeout(300);
   ```

2. **Wait for specific element:**
   ```typescript
   await page.waitForSelector(selector, { state: 'visible' });
   ```

3. **Increase tolerance:**
   ```typescript
   export const TOLERANCE = 3; // in spacing-rules.ts
   ```

## Spacing Assertion Failures

### Problem: Spacing values are consistently off by a few pixels

**Solution:**

1. **Adjust tolerance:**
   ```typescript
   // In config/spacing-rules.ts
   export const TOLERANCE = 5; // Increase from 2
   ```

2. **Update expected values:**
   ```typescript
   export const MARGIN_RULES = {
     A: { 375: 62, 1440: 92, 2560: 142 }, // Updated values
   };
   ```

### Problem: Different values across browsers

**Symptoms:** Tests pass in Chromium but fail in Firefox/WebKit

**Solutions:**

1. **Use CSS normalization**
2. **Round values in helpers:**
   ```typescript
   return Math.round(parseFloat(styles.marginTop));
   ```

3. **Increase tolerance for cross-browser tests**

## Report Generation Issues

### Problem: Reports folder not created

**Solution:**
```bash
# Create directories manually
mkdir -p reports/html reports/json reports/screenshots
```

### Problem: HTML report won't open

**Solution:**
```bash
# Generate report explicitly
npx playwright show-report

# Or open manually
open reports/html/index.html  # macOS
xdg-open reports/html/index.html  # Linux
```

## CI/CD Issues

### Problem: Tests fail only in CI

**Solutions:**

1. **Check CI environment variables:**
   ```yaml
   env:
     BASE_URL: ${{ secrets.TEST_URL }}
   ```

2. **Use consistent viewport:**
   ```typescript
   // CI environments may have different defaults
   await page.setViewportSize({ width: 1440, height: 900 });
   ```

3. **Increase retries in playwright.config.ts:**
   ```typescript
   retries: process.env.CI ? 2 : 0,
   ```

### Problem: Screenshots not uploading

**Solution:**
```yaml
- name: Upload screenshots on failure
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: screenshots-${{ matrix.browser }}
    path: reports/screenshots/**/*
    if-no-files-found: ignore
```

## Performance Issues

### Problem: Tests take too long

**Solutions:**

1. **Use parallel execution:**
   ```typescript
   // In playwright.config.ts
   fullyParallel: true,
   workers: 4,
   ```

2. **Reduce viewport changes:**
   ```typescript
   // Test once per viewport instead of multiple times
   ```

3. **Skip non-critical tests in development:**
   ```typescript
   test.skip('expensive test', async ({ page }) => {
     // ...
   });
   ```

## Selector Identification Issues

### Problem: Can't find correct CSS selector

**Solutions:**

1. **Use Playwright Codegen:**
   ```bash
   npm run codegen
   ```

2. **Use browser DevTools:**
   - Right-click → Inspect
   - Copy selector from Elements panel

3. **Test selector in console:**
   ```javascript
   document.querySelector('.your-selector')
   ```

4. **Use more specific selectors:**
   ```typescript
   // Instead of
   '.button'
   
   // Use
   '.module-widget .button.primary'
   ```

## Browser-Specific Issues

### Problem: WebKit tests fail

**Solution:**
```typescript
// Skip WebKit if problematic
test.skip(({ browserName }) => browserName === 'webkit', 'WebKit issues');
```

### Problem: Firefox rendering differently

**Solution:**
```typescript
// Browser-specific assertions
if (browserName === 'firefox') {
  assertWithinTolerance(margin, 60, 'margin', 5); // Higher tolerance
} else {
  assertWithinTolerance(margin, 60, 'margin', 2);
}
```

## Common Error Messages

### `Error: Element not found or spacing not measurable`

**Fix:** Update selector or add conditional check

### `Error: expect(received).toBeLessThanOrEqual(expected)`

**Fix:** Adjust tolerance or update expected values

### `Error: page.goto: Timeout 30000ms exceeded`

**Fix:** Check URL or increase timeout

### `Error: Target closed`

**Fix:** Reduce parallel workers or add delays

## Debug Strategies

### 1. Use Debug Mode

```bash
npm run test:debug
```

### 2. Add Console Logs

```typescript
console.log('Spacing:', spacing);
console.log('Expected:', expectedValue);
```

### 3. Take Screenshots

```typescript
await page.screenshot({ path: 'debug.png' });
```

### 4. Use Headed Mode

```bash
npm run test:headed
```

### 5. Slow Down Execution

```typescript
// In playwright.config.ts
use: {
  launchOptions: {
    slowMo: 1000 // 1 second between actions
  }
}
```

## Getting Help

1. **Check Playwright documentation:** https://playwright.dev
2. **Review test logs:** Check console output for details
3. **Open an issue:** Include error messages and test output
4. **Ask the team:** Contact maintainers

## Useful Commands

```bash
# Run single test with debug
npx playwright test margin-rules.spec.ts --debug

# Run with trace
npx playwright test --trace on

# Show trace viewer
npx playwright show-trace trace.zip

# List all tests
npx playwright test --list

# Update snapshots
npx playwright test --update-snapshots
```

## Still Stuck?

If none of these solutions work:

1. Run tests with `--trace on`
2. Capture the trace file
3. Open an issue with:
   - Error message
   - Test file
   - Trace file
   - Environment details (OS, Node version)
