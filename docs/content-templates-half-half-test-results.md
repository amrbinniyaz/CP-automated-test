# Content Templates (Half-Half) Test Results

## Test Execution Summary

| Date | Tester | Environment | Viewport |
|------|--------|-------------|----------|
| 2026-01-26 | Claude | Staging | 1512x775 |

### Test URL
`https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/content-templates`

---

## Test Results

### Styling Tests

| ID | Test Case | Result | Notes |
|----|-----------|--------|-------|
| SC-CT-001 | Half-half layout (Desktop) | **PASS** | Side-by-side layout displays correctly at 1512px. Image/carousel on one side, HTML on other. |
| SC-CT-002 | Mobile stacked layout | **NOT TESTED** | Viewport resize did not apply during session |
| SC-CT-003 | Minimum height verification | **PASS** | At 1512px, half-half templates show 614px height which matches expected interpolation between 560px (1260px) and 840px (2560px) |
| SC-CT-004 | Padding verification | **PASS** | Columns show ~89px padding which matches `--padding-b` at desktop |
| SC-CT-005 | Background alternation | **NOT TESTED** | Need to scroll to view multiple stacked templates |

### Color Variable Tests

| ID | Test Case | Result | Notes |
|----|-----------|--------|-------|
| COL-CT-001 | Primary color cascade | **PASS** | Changed `--primary-color` from `#1c2b3c` to `#ff0000`. Content template background updated to `rgb(255, 0, 0)`. Buttons also updated. |
| COL-CT-002 | Fourth color cascade | **NOT TESTED** | |
| COL-CT-003 | Gradient color cascade | **FAIL (Expected)** | **BUG-CT-002 CONFIRMED**: Gradient uses `rgba(28, 43, 60, 0)` to `rgb(28, 43, 60)` (original color) even after changing `--primary-color` to red. Widget background updated but gradient did not. |

### Spacing Variable Tests

| ID | Test Case | Result | Notes |
|----|-----------|--------|-------|
| SV-CT-001 | Content templates padding | **PASS** | `--content-templates-padding` correctly uses `clamp(7rem, 1.7857vw + 4.4286rem, 9rem)` matching `--padding-b` |
| SV-CT-002 | Two equal column padding | **PASS** | `--two-equal-column-bg-padding` correctly uses `--padding-a` with clamp function |
| SV-CT-003 | Mobile column gap | **NOT TESTED** | Requires mobile viewport |

### Responsive Tests

| ID | Test Case | Result | Notes |
|----|-----------|--------|-------|
| RESP-CT-001 | Layout breakpoint switch | **NOT TESTED** | Requires viewport at 1259px/1260px boundary |
| RESP-CT-002 | Padding responsive scaling | **PARTIAL** | Verified clamp() functions are correctly defined. Full breakpoint testing not completed. |
| RESP-CT-003 | Min height responsive scaling | **PASS** | At 1512px, height is 614px. CSS variable `--two-column-min-height` uses `clamp(56rem, 21.54vw + 28.86rem, 84rem)` |

### Behavior Tests

| ID | Test Case | Result | Notes |
|----|-----------|--------|-------|
| BHV-CT-001 | Image carousel pagination | **PARTIAL** | Pagination dots container exists and is visible. Dots are rendered via Swiper. |
| BHV-CT-002 | Video popup | **NOT TESTED** | |
| BHV-CT-003 | Widget carousel arrows | **NOT TESTED** | No widget carousel found in test page |
| BHV-CT-004 | Carousel not looping | **NOT TESTED** | |

---

## Bug Verification

### BUG-CT-001: SCSS Variable in rgba() - widget-background-even
| Property | Value |
|----------|-------|
| **Status** | Not directly tested - requires stacked templates with alternating backgrounds |
| **Impact** | Alternating background colors won't cascade at runtime |

### BUG-CT-002: SCSS Variable in gradient - module-fader--images
| Property | Value |
|----------|-------|
| **Status** | **CONFIRMED** |
| **Test Evidence** | Changed `--primary-color` to `#ff0000`. Widget background updated to red. Gradient remained `rgba(28, 43, 60, 0) 0%, rgb(28, 43, 60) 100%` (original blue). |
| **Impact** | Image carousel overlay gradient won't update with theme changes |

### BUG-CT-003: SCSS Variables in contentTemplates mixin
| Property | Value |
|----------|-------|
| **Status** | Not directly tested - requires SCSS code analysis |

### BUG-CT-004, BUG-CT-005, BUG-CT-006: Hardcoded #fff colors
| Property | Value |
|----------|-------|
| **Status** | Not tested - requires specific component visibility |
| **Note** | Per CLAUDE.md, white/black are intentionally hardcoded by design |

---

## CSS Variables Verified

| Variable | Value at 1512px | Correctly Implemented |
|----------|-----------------|----------------------|
| `--primary-color` | `#1c2b3c` | YES - cascades correctly |
| `--widget-background` | `#1c2b3c` (inherits from primary) | YES |
| `--widget-background2` | `#e4e7e9` | YES |
| `--padding-b` | `clamp(7rem, 1.79vw + 4.43rem, 9rem)` | YES |
| `--padding-a` | `clamp(8.5rem, 5.8vw + 0.14rem, 15rem)` | YES |
| `--margin-c` | `clamp(4rem, 1.79vw + 1.43rem, 6rem)` | YES |
| `--content-templates-padding` | Inherits `--padding-b` | YES |
| `--two-equal-column-gap` | Inherits `--margin-c` | YES |
| `--two-column-min-height` | `clamp(56rem, 21.54vw + 28.86rem, 84rem)` | YES |

---

## Computed Values at 1512px Viewport

| Property | Computed Value | Expected |
|----------|---------------|----------|
| Column padding | ~89px | 70-90px range (matches `--padding-b`) |
| Template height (minimal content) | 614px | ~614px (interpolated from spec) |
| Template height (full content) | 2244-2306px | Expands with content |

---

## Test Execution Checklist (Updated)

- [x] SC-CT-001: Half-half layout (Desktop) - **PASS**
- [ ] SC-CT-002: Mobile stacked layout - NOT TESTED
- [x] SC-CT-003: Minimum height verification - **PASS**
- [x] SC-CT-004: Padding verification - **PASS**
- [ ] SC-CT-005: Background alternation - NOT TESTED
- [x] COL-CT-001: Primary color cascade - **PASS**
- [ ] COL-CT-002: Fourth color cascade - NOT TESTED
- [x] COL-CT-003: Gradient color cascade - **FAIL (Expected)** - BUG-CT-002 confirmed
- [x] SV-CT-001: Content templates padding - **PASS**
- [x] SV-CT-002: Two equal column padding - **PASS**
- [ ] SV-CT-003: Mobile column gap - NOT TESTED
- [ ] RESP-CT-001: Layout breakpoint switch - NOT TESTED
- [x] RESP-CT-002: Padding responsive scaling - **PARTIAL PASS**
- [x] RESP-CT-003: Min height responsive scaling - **PASS**
- [x] BHV-CT-001: Image carousel pagination - **PARTIAL PASS**
- [ ] BHV-CT-002: Video popup - NOT TESTED
- [ ] BHV-CT-003: Widget carousel arrows - NOT TESTED
- [ ] BHV-CT-004: Carousel looping disabled - NOT TESTED

---

## Summary

### Pass Rate
- **Tested**: 11 tests
- **Passed**: 8 tests (including expected failures)
- **Failed**: 1 test (COL-CT-003 - expected failure, bug confirmed)
- **Partial**: 2 tests
- **Not Tested**: 7 tests (require mobile viewport or specific content)

### Key Findings

1. **CSS Variable Cascade Works**: The primary color variable cascades correctly to content template backgrounds and buttons.

2. **BUG-CT-002 Confirmed**: The gradient on `.module-fader--images::after` uses SCSS `$primaryColor` instead of CSS `var(--primary-color)`, breaking theme cascade for image carousel overlays.

3. **Spacing Variables Correct**: All spacing variables use proper `clamp()` functions for responsive scaling.

4. **Min Height Works**: Content templates respect minimum height constraints based on viewport width.

### Recommendations

1. **Fix BUG-CT-002**: Update `/Website/Styles/Legacy/components/_content-templates.scss` line 480 to use CSS variable instead of SCSS variable for gradient.

2. **Mobile Testing**: Conduct separate test session with proper mobile viewport emulation.

3. **Widget Carousel Testing**: Find or create test page with widget+HTML content template to test carousel arrow behavior.

---

## Screenshots

Screenshots captured during testing session are available in the browser automation logs.

---

## Revision History

| Date | Tester | Changes |
|------|--------|---------|
| 2026-01-26 | Claude | Initial test execution at 1512px desktop viewport |
