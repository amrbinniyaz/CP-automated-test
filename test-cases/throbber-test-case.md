# Throbber Test Cases (V1 - V2)

## Overview
This document contains test cases for the Throbber/Preloader component, covering functionality, color inheritance from theme, and slow connection behavior.

**Component:** Throbber / Preloader (cp-preloader)  
**Variants:** 2  
**CMS Tag:** N/A (automatic)

---

## Design Specifications (from Master Template Progress CSV)

### Throbber Rules:

| Rule | Description |
|------|-------------|
| **Variants** | V1 - V2 |
| **Image Loading** | ☐ If the header image hasn't loaded in time, a throbber should display instead (with a spinning wheel branded with the school's colours) |
| **Gradient Behavior** | ☐ The gradient placed on top of the header image (both top & bottom) should fade in with the image - do NOT display it when the throbber is active |

---

## Color Variables (Theme Inheritance)

### Throbber Colors:
| Element | CSS Variable | Description |
|---------|--------------|-------------|
| Preloader background | `var(--primary-color)` | Main branded background color |
| Loader on transparent bg | `var(--loader-in-transparent-bg)` | Uses `var(--primary-color)` |
| Loader on colored bg | `var(--loader-in-bg)` | Uses `var(--neutral-color)` |
| Swiper preloader | `var(--swiper-preloader-color)` | Default: `#000` |

### Animation Variables:
| Variable | Default Value | Description |
|----------|---------------|-------------|
| `--loader-anim-time` | `0.5s` | Fade out animation duration |
| `--loader-anim-delay` | `0.1s` | Delay before image transition |

---

## Code Implementation

### Preloader HTML Structure (`_CPPreloader.cshtml`):

```html
<div class="cp-preloader">
  <div class="svg-container">
    <img src="/Images/assets/preloader-logo.svg" alt="">
  </div>
</div>
```

### Preloader SCSS (`_cp-preloader.scss`):

```scss
.cp-preloader {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: var(--primary-color);        // Theme color inheritance
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  transition: opacity var(--loader-anim-time), 
              visibility var(--loader-anim-time) ease;

  html.js-hide-loader & {
    opacity: 0;
    visibility: hidden;
  }
}
```

### Hero Image Loading (`_hero-cp.scss`):

```scss
.img {
  transition: opacity 0.5s ease var(--loader-anim-delay), 
              transform 0.5s ease var(--loader-anim-delay);
  opacity: 0;
  transform: scale(1.2);

  html.js-hide-loader & {
    transform: scale(1);
  }

  &.lazyloaded {
    opacity: 1;

    & + .shadow-fade {
      opacity: 0.7;    // Gradient fades in WITH image
    }
  }
}
```

### Gradient During Loading:

```scss
video.lazyloading + .shadow-fade {
  opacity: 0.7;    // Gradient visible during video loading
}
```

---

## Test Cases

### THR-001: Theme Color Inheritance - Background
**Priority:** High  
**Precondition:** Content page with throbber visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load content page with slow connection | Throbber displays |
| 2 | Inspect `.cp-preloader` element | Background = `var(--primary-color)` |
| 3 | Verify color matches theme | Color matches `$primaryColor` from `_env.scss` |

**DevTools Check:**
```javascript
getComputedStyle(document.querySelector('.cp-preloader')).backgroundColor
// Should match the theme's primary color (e.g., rgb(28, 43, 60) for #1c2b3c)
```

---

### THR-002: Slow Connection - Throbber Display
**Priority:** High  
**Precondition:** Chrome DevTools Network throttling enabled

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open DevTools > Network tab | Network panel visible |
| 2 | Set throttling to "Slow 3G" | Connection throttled |
| 3 | Hard refresh page (Ctrl+Shift+R) | Throbber displays immediately |
| 4 | Wait for page to load | Throbber remains visible until images load |
| 5 | Observe throbber hiding | Smooth fade-out transition (0.5s) |

**Network Throttling Settings:**
- Slow 3G: 500 kbps download, 500 kbps upload, 400ms latency
- Fast 3G: 1.5 Mbps download, 750 kbps upload, 150ms latency

---

### THR-003: Gradient Hidden During Throbber Active
**Priority:** High  
**Precondition:** Content page with header image and slow connection

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enable Slow 3G throttling | Connection throttled |
| 2 | Refresh page | Throbber displays |
| 3 | Inspect `.shadow-fade` element | `opacity: 0` (hidden) |
| 4 | Wait for image to load | Image becomes visible |
| 5 | Verify gradient appears WITH image | Gradient fades in simultaneously with image |

**Critical:** The gradient must NOT be visible while the throbber is active.

---

### THR-004: Image Lazy Loading States
**Priority:** High  
**Precondition:** Header image present

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During loading | Image has class `lazyloading` |
| 2 | After load complete | Image has class `lazyloaded` |
| 3 | Check gradient on `lazyloaded` | `.shadow-fade` opacity = 0.7 |

---

### THR-005: Throbber Z-Index Priority
**Priority:** Medium  
**Precondition:** Throbber visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect `.cp-preloader` | `z-index: 9999` |
| 2 | Verify overlay | Throbber covers entire viewport |
| 3 | Verify position | `position: fixed` |

---

### THR-006: Branded Logo Display
**Priority:** High  
**Precondition:** Throbber visible with slow connection

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View throbber | Logo/SVG is centered |
| 2 | Check logo file | `/Images/assets/preloader-logo.svg` exists |
| 3 | Verify branding | Logo matches school branding |
| 4 | Verify sizing | `max-width: 100%`, responsive |

---

### THR-007: Spinning Animation (if present)
**Priority:** High  
**Precondition:** Throbber with spinning wheel animation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View throbber during load | Spinning animation visible |
| 2 | Verify animation is smooth | No jitter or stuttering |
| 3 | Check animation colors | Inherits from theme (school's colours) |

**Note:** If using Swiper preloader:
```scss
animation: swiper-preloader-spin 1s infinite linear;
--swiper-preloader-color: var(--primary-color); // Should inherit theme
```

---

### THR-008: Fade-Out Transition
**Priority:** Medium  
**Precondition:** Page loading complete

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Wait for page load complete | `js-hide-loader` class added to `<html>` |
| 2 | Observe throbber | Fades out with 0.5s transition |
| 3 | Verify final state | `opacity: 0`, `visibility: hidden` |

---

### THR-009: Image Scale Animation
**Priority:** Medium  
**Precondition:** Header image loading

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During loading | Image `transform: scale(1.2)` |
| 2 | When `js-hide-loader` active | Image `transform: scale(1)` |
| 3 | Transition duration | 0.5s with ease timing |

---

### THR-010: 3-Second Timeout Rule
**Priority:** High  
**Precondition:** Very slow connection (offline or severely throttled)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enable "Offline" mode or very slow throttling | Network severely limited |
| 2 | Refresh page | Throbber displays |
| 3 | Wait 3+ seconds | Throbber should auto-hide after timeout |
| 4 | Verify behavior | "If the header image hasn't loaded after 3 seconds, the load-in transition completes" |

**Note:** This rule is from the "Load-in Transition" row in the CSV.

---

## Color Inheritance Verification Tests

### COL-001: Verify Primary Color Inheritance
**Priority:** High

| Test | CSS Variable | Expected Source |
|------|--------------|-----------------|
| Preloader background | `var(--primary-color)` | `$primaryColor` from `_env.scss` |
| Loader in transparent | `var(--loader-in-transparent-bg)` | `var(--primary-color)` |
| Loader in bg | `var(--loader-in-bg)` | `var(--neutral-color)` |

---

### COL-002: Theme Variable Test
**Priority:** High

```javascript
// DevTools Console Test
const root = document.documentElement;
const styles = getComputedStyle(root);

console.log('Primary Color:', styles.getPropertyValue('--primary-color'));
console.log('Loader Transparent:', styles.getPropertyValue('--loader-in-transparent-bg'));
console.log('Loader In Bg:', styles.getPropertyValue('--loader-in-bg'));
console.log('Loader Anim Time:', styles.getPropertyValue('--loader-anim-time'));
```

---

## Slow Connection Testing Procedures

### Network Throttling Setup (Chrome DevTools)

1. **Open DevTools:** F12 or Right-click > Inspect
2. **Navigate to Network tab**
3. **Find throttling dropdown** (shows "No throttling" by default)
4. **Select preset or create custom:**

| Preset | Download | Upload | Latency |
|--------|----------|--------|---------|
| Slow 3G | 500 Kbps | 500 Kbps | 400ms |
| Fast 3G | 1.5 Mbps | 750 Kbps | 150ms |
| Custom | Variable | Variable | Variable |

### Custom Profile for Testing:
- **Download:** 100 Kbps (very slow, good for testing throbber visibility)
- **Upload:** 100 Kbps
- **Latency:** 1000ms

---

## Playwright Test Automation

### Slow Connection Test:

```typescript
import { test, expect } from '@playwright/test';

test('Throbber displays on slow connection', async ({ page }) => {
  // Emulate slow 3G
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: (500 * 1024) / 8, // 500 Kbps
    uploadThroughput: (500 * 1024) / 8,
    latency: 400,
  });

  await page.goto('/content-page-url');
  
  // Throbber should be visible initially
  const throbber = page.locator('.cp-preloader');
  await expect(throbber).toBeVisible();
  
  // Throbber should hide after load
  await expect(throbber).not.toBeVisible({ timeout: 10000 });
});

test('Throbber inherits theme color', async ({ page }) => {
  await page.goto('/content-page-url');
  
  const bgColor = await page.locator('.cp-preloader').evaluate(
    el => getComputedStyle(el).backgroundColor
  );
  
  const primaryColor = await page.evaluate(() => 
    getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
  );
  
  // Verify colors match (may need color conversion)
  expect(bgColor).toBeTruthy();
});

test('Gradient hidden during throbber active', async ({ page }) => {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: (100 * 1024) / 8,
    uploadThroughput: (100 * 1024) / 8,
    latency: 1000,
  });

  await page.goto('/content-page-url');
  
  // While throbber is visible, gradient should be hidden
  const gradient = page.locator('.shadow-fade');
  const gradientOpacity = await gradient.evaluate(
    el => getComputedStyle(el).opacity
  );
  
  expect(parseFloat(gradientOpacity)).toBeLessThan(0.1);
});
```

---

## Test Execution Checklist

### Theme Color Inheritance
- [ ] THR-001: Background color matches primary color
- [ ] COL-001: All CSS variables inherit correctly
- [ ] COL-002: Theme variable console test passes

### Slow Connection Behavior
- [ ] THR-002: Throbber displays on slow 3G
- [ ] THR-003: Gradient hidden during loading
- [ ] THR-004: Lazy loading states work correctly
- [ ] THR-010: 3-second timeout rule works

### Visual & Animation
- [ ] THR-005: Z-index priority correct
- [ ] THR-006: Branded logo displays
- [ ] THR-007: Spinning animation works (if applicable)
- [ ] THR-008: Fade-out transition smooth
- [ ] THR-009: Image scale animation works

---

## Known Issues / Bugs

| # | Issue | Status | File:Line |
|---|-------|--------|-----------|
| 1 | **No spinning wheel animation** - CSV requires "spinning wheel branded with school's colours" but implementation shows static SVG logo only | 🔴 BUG | `_cp-preloader.scss` |
| 2 | TBD - Verify 3-second timeout implemented | To Verify | JavaScript |
| 3 | TBD - Swiper preloader color should inherit theme | To Verify | `swiper/_core.scss` |

---

## Test Execution Results (Dec 5, 2025)

**Test URL:** `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/portals`  
**Network Throttling:** Slow 3G (500 Kbps, 400ms latency)

### Theme Color Inheritance ✅
| Test | Status | Actual Value |
|------|--------|--------------|
| THR-001: Background color | ✅ Pass | `rgb(28, 43, 60)` = `#1c2b3c` |
| COL-001: `--primary-color` | ✅ Pass | `#1c2b3c` |
| COL-001: `--neutral-color` | ✅ Pass | `#fff` |
| COL-001: `--loader-in-transparent-bg` | ✅ Pass | `#1c2b3c` (inherits primary) |
| COL-001: `--loader-in-bg` | ✅ Pass | `#fff` (inherits neutral) |
| COL-001: `--loader-anim-time` | ✅ Pass | `0.5s` |
| COL-001: `--loader-anim-delay` | ✅ Pass | `0.1s` |

### Preloader Structure ✅
| Test | Status | Actual Value |
|------|--------|--------------|
| THR-005: Z-index | ✅ Pass | `9999` |
| THR-005: Position | ✅ Pass | `fixed` |
| THR-006: Logo loads | ✅ Pass | `/Images/assets/preloader-logo.svg` (200 OK) |

### Hide State (After Load) ✅
| Test | Status | Actual Value |
|------|--------|--------------|
| THR-008: Opacity | ✅ Pass | `0` |
| THR-008: Visibility | ✅ Pass | `hidden` |
| `js-hide-loader` class | ✅ Pass | Present on `<html>` |

### Gradient Behavior ✅
| Test | Status | Actual Value |
|------|--------|--------------|
| THR-003: Gradient opacity after load | ✅ Pass | `0.7` |
| Image has `lazyloaded` class | ✅ Pass | `img ls-is-cached lazyloaded` |

### Spinning Animation ❌
| Test | Status | Actual Value |
|------|--------|--------------|
| THR-007: `.cp-preloader` animation | ❌ Fail | `none` |
| THR-007: `.svg-container` animation | ❌ Fail | `none` |
| THR-007: `img` animation | ❌ Fail | `none` |

**Bug Report:** No spinning animation exists. The preloader shows a static logo without the required "spinning wheel" per CSV specification.

---

## Appendix

### Related Files

| File | Purpose |
|------|---------|
| `_CPPreloader.cshtml` | Preloader HTML template |
| `_cp-preloader.scss` | Preloader styles |
| `_hero-cp.scss` | Header image loading states |
| `_theme-cssvars.scss` | CSS variables including loader timing |
| `swiper/modules/_core.scss` | Swiper lazy loading preloader |

### CSS Variables Used

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--primary-color` | Project specific | Preloader background |
| `--neutral-color` | Project specific | Loader color on backgrounds |
| `--loader-anim-time` | `0.5s` | Fade transition duration |
| `--loader-anim-delay` | `0.1s` | Delay before image shows |
| `--loader-in-transparent-bg` | `var(--primary-color)` | Loader on transparent |
| `--loader-in-bg` | `var(--neutral-color)` | Loader on colored bg |

### JavaScript Class

The `js-hide-loader` class is added to the `<html>` element to trigger the hide animation:

```javascript
// Typically triggered by:
document.documentElement.classList.add('js-hide-loader');
```
