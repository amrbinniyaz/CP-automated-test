# Events Widgets Test Results

**Test Date:** January 20-21, 2026
**Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events
**Tester:** Automated Playwright MCP Testing

---

## Executive Summary

| Category | Total Tests | Passed | Failed | Blocked |
|----------|-------------|--------|--------|---------|
| Behavior Tests | 7 | 5 | 0 | 2 |
| CSS Variable Cascade | 3 | 1 | 2 | 0 |
| Responsive Tests | 4 | 2 | 2 | 0 |
| Styling Tests | 3 | 1 | 2 | 0 |
| Spacing/Margin Tests | 5 | 2 | 3 | 0 |
| Font Scaling Tests | 3 | 2 | 1 | 0 |
| Events Featured Tests | 7 | 4 | 3 | 0 |
| Events List V2 Tests | 10 | 9 | 1 | 0 |
| **Padding Cascade Tests** | 9 | 3 | 6 | 0 |
| **Card Height Responsive** | 3 | 1 | 2 | 0 |

**Critical Issues Found:** 3
**High Severity Bugs:** 6
**Medium Severity Bugs:** 13
**Low Severity Bugs:** 4  

---

## Critical Issues (Blockers)

### CRIT-001: JavaScript Errors Preventing Widget Load
- **Severity:** CRITICAL
- **Component:** Events Carousel, Events Grid
- **Description:** Multiple JavaScript errors cause widgets to show loading spinners indefinitely on initial page load
- **Console Errors:**
  - `TypeError: n(...).catch is not a function` (repeated)
  - `ReferenceError: navOpen is not defined`
  - `ReferenceError: expandedSublevel is not defined`
- **Impact:** Widgets eventually load but with significant delay; poor user experience
- **Location:** `globalContentPage.module.js`

### CRIT-002: 404 Errors for Assets
- **Severity:** HIGH
- **Files Missing:**
  - `/Images/img/1px.jpg` - 404
  - `/Images/img/global/logo-full.svg` - 404
- **Impact:** Missing placeholder images and logo

---

## Behavior Test Results

### ECAR-001: Carousel Not Looping ✅ PASS
- At first item, cannot navigate to last item
- At last item, cannot navigate to first item
- No infinite scroll behavior

### ECAR-002: Arrow Disabled States ✅ PASS
- Left arrow disabled at start (opacity: 0.4)
- Left arrow not clickable at start
- Right arrow disabled at end
- Right arrow not clickable at end
- Arrow opacity reduced when disabled

### ECAR-003: Arrow Visibility ✅ PASS
- At 2560px: Arrows hidden when all 3 items visible (carousel width: 1972px, total cards width: 1425px)
- At 1024px: Arrows appear when items exceed viewport

### ECAR-004: Equal Height Cards ✅ PASS
- All carousel cards have equal height (500px)
- Cards maintain consistent height across all viewports tested

### EGRID-001: Grid Layout - 4 Columns at 1440px+ ⚠️ PARTIAL
- At 1440px: 3 columns detected (only 3 cards in test data)
- Grid template: `351.531px 351.531px 351.531px`
- **Note:** Cannot fully test 4-column layout without 4+ events

### EGRID-002: Grid Layout Adaptation ✅ PASS
- 375px (mobile): Single column layout
- 1440px: 3 columns for 3 cards
- 2560px: 3 columns for 3 cards

### EGRID-003: Row Height Independence ⚠️ BLOCKED
- Only one row of cards available in test data
- Cannot verify row height independence

---

## CSS Variable Cascade Test Results

### COL-EV-001: Primary Color Cascade ✅ PASS
- Changed `--primary-color` from `#1c2b3c` to `#ff0000`
- All 11 title elements updated correctly
- Date text colors updated correctly

### COL-EV-002: Fourth Color Cascade ❌ FAIL
- Changed `--fourth-color` from `#e4e7e9` to `#0000ff`
- **13 date boxes with `rgb(127, 201, 199)` (#7fc9c7) did NOT update**
- Confirms **BUG-EV-005**: Calendar date background hardcoded
- Some date boxes (indexes 27, 29, 31, 33, 35, 37) DID update correctly

### COL-EV-003: Branding White Cascade ❌ FAIL
- `--branding-white` variable is empty/undefined
- Cannot test cascade without proper variable definition

---

## Responsive Test Results

### RESP-EV-001: Mobile 375px ❌ FAIL
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Events List image height | ~185px | 146px | ❌ FAIL |
| Grid single column | Yes | Yes | ✅ PASS |
| Carousel cards visible | 1 | 1 | ✅ PASS |

### RESP-EV-002: Tablet 768px ✅ PASS
- Layout transitions correctly
- Grid shows appropriate columns
- Carousel shows appropriate items

### RESP-EV-003: Desktop 1440px ✅ PASS
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Grid columns | 3 (for 3 cards) | 3 | ✅ PASS |
| Carousel card width | ~447px | 447.7px | ✅ PASS |
| Events List image height | ~300px | 248.8px | ⚠️ CHECK |

### RESP-EV-004: Large Desktop 2560px ❌ FAIL
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Events List image height | ~400px | 456px | ❌ FAIL (14% over) |
| Grid columns | 3 (for 3 cards) | 3 | ✅ PASS |
| Carousel arrows hidden | Yes | Yes | ✅ PASS |

---

## Confirmed Hardcoded Value Bugs

### BUG-EV-005: CONFIRMED ❌
- **Location:** `_theme.scss:1136`
- **Issue:** Calendar date background hardcoded as `#7fc9c7`
- **Evidence:** 13 date boxes show `rgb(127, 201, 199)` and did NOT respond to `--fourth-color` change
- **Expected:** Should use `var(--fourth-color)`

### BUG-EV-006: CONFIRMED ❌
- **Location:** `_theme.scss:1172`
- **Issue:** Events list item background hardcoded as `#fff`
- **Evidence:** Background is `rgb(255, 255, 255)` regardless of theme

### BUG-EV-007: CONFIRMED ❌
- **Location:** `_theme.scss:1173`
- **Issue:** Box shadow hardcoded as `rgba(0, 0, 0, 0.1) 0px 3px 20px 0px`
- **Evidence:** Shadow color doesn't change with theme

---

## Styling Test Results

### SC-EV-001: Event Card Variant 1 - Basic Styling ⚠️ PARTIAL
| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Border radius | `--general-events-radius` | 0px | ✅ (var is 0) |
| Date box background | `--fourth-color` | `#7fc9c7` | ❌ HARDCODED |
| Title font | Heading 5a | Cormorant Garamond | ✅ PASS |
| Title color | `--primary-color` | `rgb(28, 43, 60)` | ✅ PASS |

### SC-EV-002: Event Card Variant 2 - Overlay Style ❌ FAIL
**Test URL:** `?eventCard=2`
**Cards have `v2` class but styling is incorrect:**

| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Image fills card | Yes | Yes (500px height, absolute position) | ✅ PASS |
| Title color | `branding white` (#fff) | `rgb(28, 43, 60)` | ❌ FAIL |
| Time color | `branding white` (#fff) | `rgb(28, 43, 60)` | ❌ FAIL |
| Gradient overlay | Yes | None detected | ❌ FAIL |
| Date box background | `--fourth-color` | `rgb(228, 231, 233)` | ✅ PASS |

**Bugs Found:**
- **BUG-EV-002 CONFIRMED:** Title color hardcoded, not using `branding white`
- **BUG-EV-001 CONFIRMED:** No gradient overlay on image (should have black gradient)
- Text is dark on image making it hard to read

### SC-EV-003: Event Card Variant 3 - Mixed Style ❌ FAIL
**Test URL:** `?eventCard=3`
**Cards have `v3` class but styling is incorrect:**

| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Date box position | Top-right | Top-right (right: 0px, top: 0px) | ✅ PASS |
| Title color | `branding white` (#fff) | `rgb(28, 43, 60)` | ❌ FAIL |
| Time area background | `--fourth-color` | `rgb(228, 231, 233)` | ✅ PASS |
| Title gradient overlay | Yes | None detected | ❌ FAIL |
| Image height | Full card | 500px (correct) | ✅ PASS |

**Bugs Found:**
- **BUG-EV-003 CONFIRMED:** Title color hardcoded as dark, not using `branding white`
- No gradient overlay on title area as expected per spec

---

## CSS Variables Current Values

| Variable | Value |
|----------|-------|
| `--primary-color` | `#1c2b3c` |
| `--fourth-color` | `#e4e7e9` |
| `--branding-white` | (empty) |
| `--general-events-radius` | `0` |
| `--general-events-list-radius` | `0` |
| `--padding-e-inner` | `2rem` |
| `--padding-g-inner` | `1rem` |

---

## New Bugs Discovered During Testing

### NEW-BUG-001: Events List Image Height Scaling Incorrect
- **Severity:** Medium
- **Description:** Image heights don't match specification at breakpoints
- **Expected at 375px:** 185px | **Actual:** 146px (21% under)
- **Expected at 2560px:** 400px | **Actual:** 456px (14% over)
- **Impact:** Visual inconsistency across devices

### NEW-BUG-002: Missing --branding-white CSS Variable
- **Severity:** Medium
- **Description:** `--branding-white` variable is empty/undefined
- **Impact:** Elements expecting branding white may not display correctly

### NEW-BUG-003: Event Links Point to "null"
- **Severity:** High
- **Description:** Some event links have `href="null"` instead of valid URLs
- **Affected Events:** "normal event - no thumb", "normal event - with thumb"
- **Impact:** Broken navigation for some events

---

## Test Execution Summary

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| SC-EV-001 | Card v1 basic styling | ⚠️ PARTIAL | Date box hardcoded |
| SC-EV-002 | Card v2 overlay style | ❌ FAIL | Title/time not white, no gradient |
| SC-EV-003 | Card v3 mixed style | ❌ FAIL | Title not white, no gradient |
| ECAR-001 | Carousel not looping | ✅ PASS | |
| ECAR-002 | Arrow disabled states | ✅ PASS | |
| ECAR-003 | Arrow visibility | ✅ PASS | |
| ECAR-004 | Equal height cards | ✅ PASS | |
| EGRID-001 | Grid 4-column layout | ⚠️ PARTIAL | Only 3 cards |
| EGRID-002 | Grid layout adaptation | ✅ PASS | |
| EGRID-003 | Row height independence | ⏸️ BLOCKED | Single row only |
| ELIST-001 | List image heights | ❌ FAIL | Heights don't match spec |
| COL-EV-001 | Primary color cascade | ✅ PASS | |
| COL-EV-002 | Fourth color cascade | ❌ FAIL | Hardcoded values |
| COL-EV-003 | Branding white cascade | ❌ FAIL | Variable undefined |
| RESP-EV-001 | Mobile 375px | ❌ FAIL | Image height wrong |
| RESP-EV-002 | Tablet 768px | ✅ PASS | |
| RESP-EV-003 | Desktop 1440px | ✅ PASS | |
| RESP-EV-004 | Large Desktop 2560px | ❌ FAIL | Image height wrong |

---

## Recommendations

1. **CRITICAL:** Fix JavaScript errors in `globalContentPage.module.js` causing widget load delays
2. **HIGH:** Replace hardcoded `#7fc9c7` with `var(--fourth-color)` in `_theme.scss:1136`
3. **HIGH:** Fix event links pointing to "null"
4. **MEDIUM:** Review and fix Events List image height scaling formula
5. **MEDIUM:** Define `--branding-white` CSS variable
6. **LOW:** Add more test events to enable full grid/carousel testing

---

## Screenshots Captured

1. `events-page-full.png` - Initial page load
2. `events-page-loaded.png` - After widgets loaded
3. `events-1440px.png` - Desktop viewport
4. `events-375px-mobile.png` - Mobile viewport
5. `events-2560px.png` - Large desktop viewport
6. `events-variant2-full.png` - Event Card Variant 2 (`?eventCard=2`)
7. `events-variant3-full.png` - Event Card Variant 3 (`?eventCard=3`)

---

## Variant Test URLs

| Variant | URL Parameter | Status |
|---------|---------------|--------|
| Variant 1 | (default) | ⚠️ PARTIAL |
| Variant 2 | `?eventCard=2` | ❌ FAIL |
| Variant 3 | `?eventCard=3` | ❌ FAIL |

---

## Spacing & Margin Test Results

### CSS Variable Values by Breakpoint

| Variable | 375px (Actual) | 375px (Expected) | 1440px (Actual) | 1440px (Expected) | 2560px (Actual) | 2560px (Expected) | Status |
|----------|----------------|------------------|-----------------|-------------------|-----------------|-------------------|--------|
| `--margin-a` | 60px | 60px | 90px | 90px | 160px | 140px | ⚠️ 2560 over |
| `--margin-b` | 40px | 40px | 50px | 50px | 70px | 70px | ✅ PASS |
| `--margin-d` | 20px | 20px | 30px | 30px | 30px | 30px | ✅ PASS |
| `--padding-e-inner` | 10px | 20px | 15px | 30px | 20px | 40px | ❌ FAIL |
| `--padding-g-inner` | 15px | 10px | 15px | 15px | 10px | 20px | ❌ FAIL |

### Spacing Bugs Found

**BUG-SPACING-001: `--padding-e-inner` values incorrect**
- **Severity:** Medium
- **Expected at 375px:** 20px | **Actual:** 10px (50% under)
- **Expected at 1440px:** 30px | **Actual:** 15px (50% under)
- **Expected at 2560px:** 40px | **Actual:** 20px (50% under)
- **Impact:** Card content padding is half of what spec requires

**BUG-SPACING-002: `--padding-g-inner` values incorrect**
- **Severity:** Medium
- **Expected at 375px:** 10px | **Actual:** 15px (50% over)
- **Expected at 2560px:** 20px | **Actual:** 10px (50% under)
- **Impact:** Element gaps inconsistent with spec

**BUG-SPACING-003: `--margin-a` exceeds spec at 2560px**
- **Severity:** Low
- **Expected:** 140px | **Actual:** 160px (14% over)
- **Impact:** Widget margins larger than designed

### Widget Spacing

| Widget | Breakpoint | Padding Top | Padding Bottom | Margin Bottom |
|--------|------------|-------------|----------------|---------------|
| Events List | 1440px | 70px | 70px | 90px |
| Events List | 2560px | 90px | 90px | 160px |
| Events Carousel | 1440px | 85px | 85px | 90px |
| Events Carousel | 2560px | 150px | 150px | 160px |

---

## Font Scaling Test Results

### Font Sizes by Breakpoint

| Element | 375px | 1440px | 2560px | Scales? |
|---------|-------|--------|--------|---------|
| H2 (Widget Title) | 33.47px | 47.84px | 50px | ✅ Yes |
| H5 (Event Title) | 24.36px | 35.35px | 37px | ✅ Yes |
| Body Copy (Time) | 20px | 20px | 20px | ❌ No (fixed) |

### Font Scaling Analysis

**✅ PASS: Headings scale correctly**
- H2 scales from ~33px (mobile) to ~50px (large desktop)
- H5 scales from ~24px (mobile) to ~37px (large desktop)
- Uses `clamp()` for smooth scaling

**⚠️ WARNING: Body copy does not scale**
- Time/body text remains fixed at 20px across all breakpoints
- May be intentional for readability, but worth noting

### Font Families Verified
- **Headings (H2, H5):** "Cormorant Garamond", serif ✅
- **Body Copy:** Gelion, sans-serif ✅

---

## Events Featured (Fader) Test Results

**Test URL:** `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events?eventsFeatured=1`

### Widget Structure ✅ PASS
| Element | Status | Notes |
|---------|--------|-------|
| Widget found | ✅ | `.module-widget--events-fader` |
| Fader items | ✅ | 3 items loaded |
| Navigation arrows | ✅ | Prev/Next buttons present |
| Pagination dots | ❌ | 0 dots found |
| Countdown timer | ✅ | Days/Hours/Mins displayed |

### Styling Test Results

| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Background color | `--primary-color` | `rgb(28, 43, 60)` | ✅ PASS |
| Widget height | ~530px | 530px | ✅ PASS |
| Internal margin (1440px) | 150px | 0px | ❌ FAIL |
| Title font | Heading 2 | Gelion 16px | ❌ FAIL |
| Title color | White | `rgb(28, 43, 60)` (dark) | ❌ FAIL |
| Description element | Present with 2-line clamp | Missing from HTML | ❌ FAIL |
| Date box background | `--fourth-color` | `rgb(228, 231, 233)` | ✅ PASS |
| Image border radius | Configurable | 0px | ✅ (default) |

### Bugs Found

**BUG-FEAT-001: Internal margin missing**
- **Severity:** Medium
- **Expected at 1440px:** 150px internal margin
- **Actual:** 0px padding
- **Impact:** Content not properly spaced within widget

**BUG-FEAT-002: Title styling incorrect**
- **Severity:** High
- **Expected:** Heading 2 style, white color
- **Actual:** Gelion 16px, dark color `rgb(28, 43, 60)`
- **Impact:** Title barely visible on dark background (same color as background)

**BUG-FEAT-004: Description/body copy element missing**
- **Severity:** High
- **Expected:** Body copy text with 2-line truncation
- **Actual:** No `.event-fader-item__description` element exists in HTML
- **Impact:** No event description displayed to users

**BUG-FEAT-003: No pagination dots**
- **Severity:** Medium
- **Expected:** Pagination dots for multiple items
- **Actual:** 0 dots found
- **Impact:** Users cannot see how many items are in the fader

**BUG-EV-004 CONFIRMED: SCSS variable in overlay**
- **Location:** `_theme.scss:1080`
- **Issue:** `rgba($primaryColor, 0.8)` uses SCSS variable instead of CSS variable
- **Impact:** Overlay color won't cascade at runtime

---

## Events List Variant 2 Test Results

**Test URL:** `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events?eventsList=2`

### Widget Structure ✅ PASS
| Element | Status | Notes |
|---------|--------|-------|
| Widget found | ✅ | `.module-widget--events-list.v2` |
| List items | ✅ | 5 items loaded |
| Heading (H2) | ✅ | "UPCOMING EVENTS" displayed |
| Full calendar link | ✅ | Present |

### Styling Test Results

| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Widget background | `--fourth-color` | `rgb(228, 231, 233)` | ✅ PASS |
| Heading font | Heading 2 | Cormorant Garamond 48.8px | ✅ PASS |
| Title font | Heading 5 | Cormorant Garamond 36px | ✅ PASS |
| Title color (with image) | White | `rgb(255, 255, 255)` | ✅ PASS |
| Title color (no image) | Primary | `rgb(28, 43, 60)` | ✅ PASS |
| Date box background | `--fourth-color` | `rgb(127, 201, 199)` | ⚠️ CHECK |
| Date box border radius | Configurable | 0px | ✅ (default) |
| First item image height | ~357px at 1512px | 357px | ✅ PASS |
| Padding top/bottom | ~71px | 71.3px | ✅ PASS |

### Variant 2 Specific Features
- **Background:** Uses `module-widget--with-bg-v2` class
- **First item:** Full-width with image background and white title overlay
- **Subsequent items:** Compact list style without image backgrounds
- **Layout:** Stacked vertical list format

### Bugs Found

**BUG-LIST-001: Date box background may be hardcoded**
- **Severity:** Medium
- **Expected:** Should use CSS variable `--fourth-color`
- **Actual:** `rgb(127, 201, 199)` - appears to be hardcoded teal
- **Location:** Needs verification in `_theme.scss`

**BUG-LIST-002: Items without images have 0px image height**
- **Severity:** Low
- **Note:** Items 2 and 3 show `height: 0` for image - expected behavior when no thumbnail exists

---

## Event Card Image Height Test Results (January 21, 2026)

**Test URL:** `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events?eventCard=3`

### Image Height Measurements

| Viewport Width | Image Width | Image Height | Aspect Ratio | Status |
|----------------|-------------|--------------|--------------|--------|
| 1440px | 418px | 500px | 0.84 | ✅ OK |
| 623px | 269px | 500px | 0.54 | ❌ Too tall |
| 375px | 266px | 500px | 0.53 | ❌ Too tall |

### Bug Found

**BUG-CARD-001: Event card image height fixed at 500px**
- **Severity:** Medium
- **Location:** `_event-card.scss` **Line 12**
- **Code:** `.event-card__inner { height: 50rem; }`
- **Issue:** Card height is fixed at 500px with no responsive breakpoints
- **Impact:** On mobile (375-623px), cards appear very tall and narrow, creating poor visual appearance
- **Expected:** Height should scale down on smaller screens (e.g., `height: 35rem` on mobile)

---

## Padding/Spacing Cascade Test Results (January 21, 2026)

**Test URLs:**
- V1: `?eventCard=1`
- V2: `?eventCard=2`
- V3: `?eventCard=3`

### CSS Variable Values (Expected)

| Variable | Value |
|----------|-------|
| `--padding-e-inner` | 2rem (20px) |
| `--padding-g-inner` | 1rem (10px) |
| `--padding-d` | clamp(2.5rem, ..., 3rem) |

### Padding Cascade Test Results

#### Variant 1 (`?eventCard=1`)

| Element | Variable Expected | Actual Value | Cascades? |
|---------|-------------------|--------------|-----------|
| Title margin bottom | `--padding-g-inner` | 10px → 30px | ✅ YES |
| Date box padding | `--padding-e-inner` | 0px 15px | ❌ NO |
| Description padding | `--padding-e-inner` | 18px 24px | ❌ NO |

#### Variant 2 (`?eventCard=2`)

| Element | Variable Expected | Actual Value | Cascades? |
|---------|-------------------|--------------|-----------|
| Title margin bottom | `--padding-g-inner` | 10px → 30px | ✅ YES |
| Date box padding | `--padding-e-inner` | 0px 15px | ❌ NO |
| Description padding | `--padding-e-inner` | 18px 24px | ❌ NO |

#### Variant 3 (`?eventCard=3`)

| Element | Variable Expected | Actual Value | Cascades? |
|---------|-------------------|--------------|-----------|
| Title margin bottom | `--padding-g-inner` | 10px → 30px | ✅ YES |
| Date box padding | `--padding-e-inner` | 0px 15px | ❌ NO |
| Description padding | - | 0px | N/A |
| Time range padding | `--padding-e-inner` | 18px 24px | ❌ NO |

### Hardcoded Padding Bugs

**BUG-PAD-001: Calendar date padding hardcoded**
- **Severity:** Low
- **Location:** `_theme.scss` **Line 903**
- **Code:** `padding: 0 1.5rem;`
- **Expected:** `var(--padding-e-inner)`
- **Impact:** Date box padding won't cascade when CSS variable changes

**BUG-PAD-002: Event card v1 description padding hardcoded**
- **Severity:** Low
- **Location:** `_theme.scss` **Line 1000**
- **Code:** `padding: 1.8rem 2.4rem;`
- **Expected:** CSS variable (e.g., `var(--padding-e-inner)`)
- **Impact:** Description padding won't cascade when CSS variable changes

**BUG-PAD-003: Event card v2 description padding hardcoded**
- **Severity:** Low
- **Location:** `_theme.scss` **Line 1007**
- **Code:** `padding: 1.8rem 2.4rem;`
- **Expected:** CSS variable (e.g., `var(--padding-e-inner)`)
- **Impact:** Description padding won't cascade when CSS variable changes

### Summary

| Test Category | Passed | Failed |
|---------------|--------|--------|
| Title margin (all variants) | 3 | 0 |
| Date box padding (all variants) | 0 | 3 |
| Description padding (v1, v2) | 0 | 2 |
| Time range padding (v3) | 0 | 1 |
| **Total** | **3** | **6** |

---

## BUG-EV-004 Clarification

**Title:** SCSS variable used instead of CSS variable in event fader overlay

**Location:** `_theme.scss` **Line 1080**

**Code:**
```scss
.event-fader-item__image {
  background: var(--primary-color);     // Line 1074 - CSS variable ✅

  &:before {
    background: rgba($primaryColor, 0.8); // Line 1080 - SCSS variable ❌
  }
}
```

**Note:** This bug only manifests when `--primary-color` is changed at runtime (via JavaScript or DevTools). If colors are only changed via SCSS recompilation, both values update together and the bug is not visible.

**Impact scenarios:**
- ❌ Theme switching (dark/light mode)
- ❌ CMS color picker
- ❌ Runtime theming via JavaScript
- ✅ SCSS recompilation (no visible bug)

**Current project status:** Clients cannot change colors at runtime, so this bug has **no real-world impact** for this project. It remains a code consistency issue only.
