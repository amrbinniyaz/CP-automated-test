# Admissions Calculator Test Cases

## Overview

| Property | Value |
|----------|-------|
| **Widget Name** | Admissions Calculator |
| **CMS Tag** | `{admissions}` |
| **Number of Variants** | 3 (URL param: `?admission=1`, `?admission=2`, `?admission=3`) |
| **Test URL Base** | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/admissions-calculator` |

## Variant Differences

| Variant | File | Class | Background | Description |
|---------|------|-------|------------|-------------|
| 1 | `_CPAdmissionsWidget1.cshtml` | `.v1` | Image + overlay | Full background with image and primary color overlay |
| 2 | `_CPAdmissionsWidget2.cshtml` | `.v1` | None (uses v1 styling) | No background, but uses v1 class |
| 3 | `_CPAdmissionsWidget3.cshtml` | `.v2` | None | No background, different text colors |

---

## Design Specifications (from Master Template CSV)

### Styling Options
**Variant 1:**
- Internal padding
- Character styles: Heading 2, body copy, body copy bold
- Background: solid colour / image with or without an overlay
- SVG added within background container (e.g. logo watermark)
- Date input: shape (fill & border colour, rounded corners, drop shadow), text (colour, font, weight, size, letter spacing)

**Variant 2:**
- Character styles: Heading 2, body copy, body copy bold
- Date input: shape (fill & border colour, rounded corners, drop shadow), text (colour, font, weight, size, letter spacing)

### Functional Rules
- [ ] Enable users to move between inputs without leaving the keyboard
- [ ] Support the behaviour of the Backspace button across the input
- [ ] Highlight the current field with a focus style

---

## Color Variables (from CSV)

### Variant 1 (with background)
| Element | Design Token | Expected CSS Variable |
|---------|--------------|----------------------|
| Title | branding white | hardcoded `#fff` |
| Description | branding white | hardcoded `#fff` |
| Input label | branding white | hardcoded `#fff` |
| Input border | branding 2 | `var(--secondary-color)` |
| Input placeholder | branding 2 | `var(--secondary-color)` |
| Input text | ? | TBD |
| Button background | branding 2 | `var(--secondary-color)` |
| Button text | branding 1 | `var(--primary-color)` |
| Button (hover) background | branding 3 | `var(--tertiary-color)` |
| Error text | branding red | `$statusError` or CSS var |
| Input border (error) | error red | `$statusError` or CSS var |
| Button background (error) | error red | `$statusError` or CSS var |
| Button text (error) | branding white | hardcoded `#fff` |

### Variant 2 (no background)
| Element | Design Token | Expected CSS Variable |
|---------|--------------|----------------------|
| Title | branding 2 | `var(--secondary-color)` |
| Description | branding 1 | `var(--primary-color)` |
| Input label | branding 1 | `var(--primary-color)` |
| Input border | branding 2 | `var(--secondary-color)` |
| Input placeholder | branding 2 | `var(--secondary-color)` |
| Input text | ? | TBD |
| Button background | branding 2 | `var(--secondary-color)` |
| Button text | branding 1 | `var(--primary-color)` |
| Button (hover) background | branding 3 | `var(--tertiary-color)` |
| Error text | branding red | CSS variable |
| Input border (error) | error red | CSS variable |
| Button background (error) | error red | CSS variable |
| Button text (error) | branding white | hardcoded `#fff` |

---

## Font Variables (from CSV)

| Element | Design Token | Variant |
|---------|--------------|---------|
| Title | heading 2a | Variant 1 |
| Title | heading 2b | Variant 2 |
| Description | body copy b | Variant 1 |
| Description | body copy a | Variant 2 |
| Button text | button a | All |
| Error text | ? | TBD |
| Input placeholder | ? | TBD |
| Input text | ? | TBD |
| Input label | ? | TBD (Variant 1 & 2) |

---

## Code Implementation

### SCSS Files
| File | Purpose |
|------|---------|
| `/Website/Styles/Modules/Admission/Admission.scss` | Main component styles |
| `/Website/Styles/Modules/Admission/admission/_steps.scss` | Steps styling (slideout) |
| `/Website/Styles/Modules/Admission/admission/_input-style.scss` | Input styling (slideout) |
| `/Website/Styles/Modules/Admission/admission/_selectric.scss` | Dropdown styling |
| `/Website/Styles/Modules/Admission/admission/_grade-top-bar.scss` | Grade bar styling |
| `/Website/Styles/Modules/Admission/admission/_adm-icons.scss` | Icon definitions |
| `/Website/Styles/_globals/_theme.scss` | Theme mixin (lines 2732-2837) |
| `/Website/Styles/_globals/_theme-cssvars.scss` | CSS variable: `--admission-input-bradius` (line 224) |

### Partial Views
| File | Variant |
|------|---------|
| `_CPAdmissionsWidget1.cshtml` | Variant 1 (with bg image) |
| `_CPAdmissionsWidget2.cshtml` | Variant 2 (v1 class, no bg) |
| `_CPAdmissionsWidget3.cshtml` | Variant 3 (v2 class) |

### CSS Variables Used
| Variable | Purpose | Location |
|----------|---------|----------|
| `--secondary-color` | Input border, placeholder | _theme.scss:2781-2782 |
| `--primary-color` | Label color (v2) | _theme.scss:2798 |
| `--admission-input-bradius` | Input border radius | _theme.scss:2785 |
| `--tertiary-color` | Step number bg (slideout) | _theme.scss:2842 |
| `--cp-row-spacing` | Bottom margin | Admission.scss:200 |

---

## Known Bugs

### High Severity (SCSS variable instead of CSS variable)

| Bug ID | File:Line | Issue | Expected | Actual |
|--------|-----------|-------|----------|--------|
| BUG-ADM-001 | _theme.scss:2762 | Background overlay uses SCSS var | `rgba(var(--primary-color-rgb), 0.85)` | `rgba($primaryColor, 0.85)` |
| BUG-ADM-002 | _theme.scss:2789 | Focus box-shadow uses SCSS var | `rgba(var(--secondary-color-rgb), 0.7)` | `rgba($secondaryColor, 0.7)` |
| BUG-ADM-003 | _theme.scss:2810 | Error label color uses SCSS var | `var(--status-error)` | `$statusError` |
| BUG-ADM-004 | _theme.scss:2814 | Error border color uses SCSS var | `var(--status-error)` | `$statusError` |
| BUG-ADM-005 | _theme.scss:2850 | Step line uses SCSS var | CSS variable | `rgba($primaryColor, 0.2)` |
| BUG-ADM-006 | _theme.scss:890 | Button focus shadow uses SCSS var | CSS variable | `rgba($secondaryColor, 0.7)` |

### Medium Severity (Hardcoded colors)

| Bug ID | File:Line | Issue | Expected | Actual |
|--------|-----------|-------|----------|--------|
| BUG-ADM-007 | Admission.scss:37 | Panel background hardcoded | CSS variable | `$adm_panel` |
| BUG-ADM-008 | Admission.scss:52 | Overlay background hardcoded | CSS variable | `rgba($adm_bg, 0.8)` |
| BUG-ADM-009 | Admission.scss:82 | Heading background hardcoded | CSS variable | `#f7f9fa` |
| BUG-ADM-010 | Admission.scss:89 | Title color hardcoded | CSS variable | `#243f86` |
| BUG-ADM-011 | Admission.scss:133 | Box shadow hardcoded | CSS variable | `rgba(0, 0, 0, 0.16)` |
| BUG-ADM-012 | Admission.scss:166 | Close button bg hardcoded | CSS variable | `#fff` |
| BUG-ADM-013 | Admission.scss:170 | Close icon color hardcoded | CSS variable | `#243f86` |
| BUG-ADM-014 | Admission.scss:182 | Share button bg hardcoded | CSS variable | `#788fbf` |
| BUG-ADM-015 | Admission.scss:190 | Share button hover hardcoded | CSS variable | `#6b7faa` |
| BUG-ADM-016 | Admission.scss:211 | Error message color hardcoded | CSS variable | `#cb1d23` |
| BUG-ADM-017 | Admission.scss:248 | Input text color hardcoded | CSS variable | `#fff` |
| BUG-ADM-018 | _input-style.scss:9-10 | Error colors hardcoded | CSS variable | `#cb1d23` |
| BUG-ADM-019 | _input-style.scss:14 | Error button bg hardcoded | CSS variable | `#cb1d23` |
| BUG-ADM-020 | _input-style.scss:23-24 | Success colors hardcoded | CSS variable | `#1dad22` |
| BUG-ADM-021 | _input-style.scss:28 | Success button bg hardcoded | CSS variable | `#1dad22` |
| BUG-ADM-022 | _input-style.scss:45 | Input border hardcoded | CSS variable | `#2f3f55` |
| BUG-ADM-023 | _input-style.scss:60-61 | Send button colors hardcoded | CSS variable | `#ffcc00`, `#2f3f55` |
| BUG-ADM-024 | _input-style.scss:75-76 | Send button hover hardcoded | CSS variable | `#f2c200`, `#2f3f55` |
| BUG-ADM-025 | _steps.scss:10 | Step head color hardcoded | CSS variable | `#2f3f55` |
| BUG-ADM-026 | _steps.scss:45 | Step border hardcoded | CSS variable | `#788fbf` |

### High Severity (Input Validation Bugs)

| Bug ID | Issue | Steps to Reproduce | Expected | Actual |
|--------|-------|-------------------|----------|--------|
| BUG-ADM-027 | Day > 31 accepted | Enter Day=32, Month=06, Year=2020, click Go | Validation error | Form accepts and opens slideout |
| BUG-ADM-028 | Feb 30 accepted | Enter Day=30, Month=02, Year=2020, click Go | Validation error for invalid date | Form accepts Feb 30 as valid |
| BUG-ADM-029 | Invalid dates not validated | Any impossible date combination | Server or client-side validation | No date logic validation |

### Slideout Colors (All Hardcoded SCSS Variables)

**File:** `/Website/Styles/Modules/Admission/admission/_colors.scss`

| Variable | Value | Used For |
|----------|-------|----------|
| `$adm_bg` | `#000` | Overlay background (rgba with 0.8 opacity) |
| `$adm_panel` | `#fff` | Panel background |
| `$adm_top-bar_title` | `#2f3f55` | Top bar title |
| `$adm-top-bar_close-bg` | `#ffffff` | Close button background |
| `$adm-top-bar_close-color` | `#2f3f55` | Close icon color |
| `$adm-heading_bg` | `#eff2f7` | Heading background |
| `$adm-heading_title-color` | `#2f3f55` | Heading title color |
| `$adm-heading_paragraph-color` | `#2f3f55` | Heading paragraph color |
| `$adm-results_heading-color` | `#2f3f55` | Results heading color |

**Impact:** None of these will respond to theme changes - all require SCSS recompilation.

### Notes
- `#fff` (white) is intentionally hardcoded per design spec ("branding white")
- `#000` (black) is intentionally hardcoded per design spec ("branding black")
- Slideout-specific styling (Admission.scss:14-195) has many hardcoded values - likely separate from Content Page theming
- **Critical**: Date validation only checks for empty fields, not valid date combinations
- **Critical**: Slideout overlay uses `$adm_bg` (#000) - hardcoded, won't theme

---

## Test Cases

### Styling Tests (ADM-SC)

| ID | Test | Steps | Expected | Priority |
|----|------|-------|----------|----------|
| ADM-SC-001 | V1 background overlay displays | Load variant 1 | Primary color overlay (85% opacity) visible over image | High |
| ADM-SC-002 | V1 text is white | Load variant 1 | Title, description, labels are white | High |
| ADM-SC-003 | V2/V3 no background | Load variant 3 | No background image or overlay | High |
| ADM-SC-004 | V2 label color is primary | Load variant 3 | Labels use `--primary-color` | High |
| ADM-SC-005 | Input border uses secondary color | Inspect input border | Border is `--secondary-color` | High |
| ADM-SC-006 | Input border radius | Inspect input | Uses `--admission-input-bradius` | Medium |
| ADM-SC-007 | Button uses secondary color | Inspect button | Background is `--secondary-color` | High |

### Functional Tests (ADM-FN)

| ID | Test | Steps | Expected | Priority |
|----|------|-------|----------|----------|
| ADM-FN-001 | Keyboard navigation | Tab through inputs | Focus moves Day -> Month -> Year -> Button | High |
| ADM-FN-002 | Backspace support | Type in Day, press Backspace | Characters delete normally | High |
| ADM-FN-003 | Focus highlight | Click on input | Box-shadow appears on focused input | High |
| ADM-FN-004 | Auto-advance to next field | Type "31" in Day field | Focus auto-advances to Month | Medium |
| ADM-FN-005 | Error state display | Submit invalid date | Error styling appears | Medium |
| ADM-FN-006 | Shift+Tab navigation | Press Shift+Tab from Month | Focus moves back to Day | Medium |
| ADM-FN-007 | Enter to submit | Press Enter in Year field | Form submits | Medium |
| ADM-FN-008 | Slideout opens on submit | Submit valid date | Slideout panel appears from right | High |
| ADM-FN-009 | Slideout close button | Click X on slideout | Slideout closes | High |
| ADM-FN-010 | Form retains values | Close slideout | Form still shows entered values | Low |

### Input Validation Tests (ADM-VAL)

| ID | Test | Steps | Expected | Actual | Status |
|----|------|-------|----------|--------|--------|
| ADM-VAL-001 | Empty fields rejected | Click Go with all empty | Error message displayed | Error shown: "Oh, dear, please check your date of birth!" | ✅ PASS |
| ADM-VAL-002 | Letters filtered | Type "abc" in Day | Letters not accepted | Letters filtered out, field empty | ✅ PASS |
| ADM-VAL-003 | Day > 31 rejected | Enter Day=32, Month=01, Year=2020 | Error or rejection | **Form accepted invalid day** | ❌ FAIL |
| ADM-VAL-004 | Month > 12 rejected | Enter Day=15, Month=13, Year=2020 | Error or rejection | TBD | ⏳ TODO |
| ADM-VAL-005 | Feb 30 rejected | Enter Day=30, Month=02, Year=2020 | Error: Invalid date | **Form accepted Feb 30** | ❌ FAIL |
| ADM-VAL-006 | Feb 31 rejected | Enter Day=31, Month=02, Year=2020 | Error: Invalid date | TBD | ⏳ TODO |
| ADM-VAL-007 | Apr 31 rejected | Enter Day=31, Month=04, Year=2020 | Error: Invalid date | TBD | ⏳ TODO |
| ADM-VAL-008 | Leap year Feb 29 valid | Enter Day=29, Month=02, Year=2020 | Accepted (2020 is leap year) | TBD | ⏳ TODO |
| ADM-VAL-009 | Non-leap year Feb 29 | Enter Day=29, Month=02, Year=2021 | Error: Invalid date | TBD | ⏳ TODO |
| ADM-VAL-010 | Future year rejected | Enter Day=15, Month=06, Year=2030 | Error: Child not born yet | TBD | ⏳ TODO |
| ADM-VAL-011 | Very old year | Enter Day=15, Month=06, Year=1900 | Error or handled gracefully | TBD | ⏳ TODO |
| ADM-VAL-012 | Special chars filtered | Type "!@#" in Day | Special chars not accepted | TBD | ⏳ TODO |
| ADM-VAL-013 | Spaces filtered | Type " 1 " in Day | Spaces not accepted | TBD | ⏳ TODO |
| ADM-VAL-014 | Partial empty (Day only) | Enter Day=15 only, submit | Error message for Month/Year | TBD | ⏳ TODO |
| ADM-VAL-015 | Leading zeros preserved | Enter Day=01, Month=06 | Display shows "01" and "06" | TBD | ⏳ TODO |
| ADM-VAL-016 | Day=0 rejected | Enter Day=0, Month=06, Year=2020 | Error: Invalid day | TBD | ⏳ TODO |
| ADM-VAL-017 | Month=0 rejected | Enter Day=15, Month=0, Year=2020 | Error: Invalid month | TBD | ⏳ TODO |
| ADM-VAL-018 | Negative values | Enter Day=-1 | Rejected or filtered | TBD | ⏳ TODO |
| ADM-VAL-019 | Maxlength enforced | Type "123" in Day (max 2) | Only "12" accepted | TBD | ⏳ TODO |
| ADM-VAL-020 | Year maxlength | Type "20201" in Year (max 4) | Only "2020" accepted | TBD | ⏳ TODO |

### Color Variable Cascade Tests (ADM-COL)

| ID | Test | Steps | Expected | Priority |
|----|------|-------|----------|----------|
| ADM-COL-001 | Primary color cascade (V1 overlay) | Change `--primary-color` | **WILL FAIL** - uses `$primaryColor` | High |
| ADM-COL-002 | Secondary color cascade (input border) | Change `--secondary-color` | Input border updates | High |
| ADM-COL-003 | Secondary color cascade (button) | Change `--secondary-color` | Button background updates | High |
| ADM-COL-004 | Tertiary color cascade (step number) | Change `--tertiary-color` | Step number bg updates (slideout) | Medium |

### Responsive Tests (ADM-RESP)

| ID | Test | Breakpoint | Expected | Priority |
|----|------|------------|----------|----------|
| ADM-RESP-001 | Widget displays correctly | 375px | Form fits mobile viewport | High |
| ADM-RESP-002 | Widget displays correctly | 1440px | Form centered, proper spacing | High |
| ADM-RESP-003 | Widget displays correctly | 2560px | Scales appropriately | Medium |

### Font Variable Cascade Tests (ADM-FONT)

| ID | Test | Steps | Expected | Actual | Status |
|----|------|-------|----------|--------|--------|
| ADM-FONT-001 | Title uses secondary font | Inspect `.adm-title` | Uses `--secondary-font` (Cormorant Garamond) | Font: "Cormorant Garamond" | ✅ PASS |
| ADM-FONT-002 | Secondary font cascade | Change `--secondary-font` to Arial | Title font changes to Arial | Title changed to Arial | ✅ PASS |
| ADM-FONT-003 | Description font | Inspect description text | Uses appropriate font variable | Uses default font stack | ✅ PASS |
| ADM-FONT-004 | Button font | Inspect button | Uses appropriate font variable | Font: "Gelion" (primary font) | ✅ PASS |
| ADM-FONT-005 | Label font | Inspect `.adm-label` | Uses appropriate font variable | Font: "Gelion" (primary font) | ✅ PASS |

### Responsive Scaling Tests (ADM-SCALE)

| ID | Element | 375px | 1440px | 2560px | Uses clmp() |
|----|---------|-------|--------|--------|-------------|
| ADM-SCALE-001 | Title font-size | ⏳ (browser limit) | 47.84px | ⏳ (screen limit) | ✅ Yes |
| ADM-SCALE-002 | Description font-size | ⏳ (browser limit) | 19.49px | ⏳ (screen limit) | ✅ Yes |
| ADM-SCALE-003 | Button font-size | - | 21px | - | ❌ Fixed |
| ADM-SCALE-004 | Label font-size | - | 14px | - | ❌ Fixed |
| ADM-SCALE-005 | Input font-size | - | 21px | - | ✅ Yes (clmp) |

**Scaling Implementation Notes:**
- The `clmp()` SCSS function provides fluid scaling between 340px - 1600px breakpoints
- Title uses responsive scaling via `clmp()` function
- Description uses responsive scaling via `clmp()` function
- Button and label font sizes appear to be fixed values
- Source: `/Website/Styles/_globals/_mixins.scss` defines `clmp()` function

---

## Test Execution Checklist

### Phase 1: Code Audit (Completed)
- [x] Read Master Template CSV for widget rules
- [x] Extract font variable mappings
- [x] Extract color variable mappings
- [x] Extract spacing variable mappings
- [x] Find component SCSS files
- [x] Find theme mixin
- [x] Document CSS variables used
- [x] Create test case document
- [x] Identify hardcoded values (bugs)

### Phase 2: Visual Testing
- [ ] Test Variant 1 at 375px
- [ ] Test Variant 1 at 1440px
- [ ] Test Variant 1 at 2560px
- [ ] Test Variant 2 at 375px
- [ ] Test Variant 2 at 1440px
- [ ] Test Variant 2 at 2560px
- [ ] Test Variant 3 at 375px
- [ ] Test Variant 3 at 1440px
- [ ] Test Variant 3 at 2560px

### Phase 3: Functional Testing ✅ COMPLETE
- [x] Keyboard navigation (Tab, Shift+Tab) - ✅ PASS
- [x] Backspace support - ✅ PASS
- [x] Focus highlight - ✅ PASS (box-shadow on .dob-input wrapper)
- [x] Auto-advance between fields - ✅ PASS
- [x] Error state display - ✅ PASS (red message, labels, borders, button)
- [x] Form submission - ✅ PASS
- [x] Slideout open/close - ✅ PASS
- [x] Enter key to submit - ✅ PASS
- [x] Form value retention - ✅ PASS

### Phase 4: Input Validation Testing
- [x] Empty fields validation - ✅ PASS
- [x] Letters filtered - ✅ PASS
- [x] Day > 31 - ❌ FAIL (BUG-ADM-027)
- [x] Feb 30 invalid - ❌ FAIL (BUG-ADM-028)
- [ ] Month > 12
- [ ] Apr/Jun/Sep/Nov 31
- [ ] Leap year Feb 29
- [ ] Non-leap year Feb 29
- [ ] Future dates
- [ ] Day/Month = 0
- [ ] Special characters
- [ ] Maxlength enforcement

### Phase 5: Theme Cascade Testing ✅ COMPLETE
- [x] Test `--primary-color` cascade - ❌ FAIL (V1 overlay uses `$primaryColor` SCSS var, confirmed BUG-ADM-001)
- [x] Test `--secondary-color` cascade - ✅ PASS (input border & button change correctly)
- [x] Test `--tertiary-color` cascade - ✅ PASS (step number in slideout changes correctly)

### Phase 6: Font Variable & Scaling Testing ✅ COMPLETE
- [x] Test `--secondary-font` cascade on title - ✅ PASS (title font changed from Cormorant Garamond to Arial)
- [x] Test `--primary-font` cascade on button/labels - ✅ PASS (using Gelion)
- [x] Responsive scaling at 1440px - ✅ Measured (title: 47.84px, description: 19.49px)
- [x] Verify `clmp()` usage - ✅ Confirmed for title and description
- [ ] Responsive scaling at 375px - ⏳ BLOCKED (browser minimum width 1095px)
- [ ] Responsive scaling at 2560px - ⏳ BLOCKED (screen size limit)

**Scaling Measurements at 1440px:**
| Element | Font Size | Scaling Method |
|---------|-----------|----------------|
| Title (`.adm-title`) | 47.84px | `clmp()` responsive |
| Description | 19.49px | `clmp()` responsive |
| Button | 21px | Fixed |
| Label | 14px | Fixed |
| Input text | 21px | `clmp()` responsive |

---

## Test URLs

**Base URL:** `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/admissions-calculator`

```
# Variant 1 (with background)
https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/admissions-calculator?admission=1

# Variant 2 (v1 styling, no background)
https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/admissions-calculator?admission=2

# Variant 3 (v2 styling)
https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/admissions-calculator?admission=3
```

---

## Summary

**Total Bugs Found:** 29
- High Severity (CSS): 6 (SCSS variables instead of CSS variables)
- High Severity (Validation): 3 (Date validation missing)
- Medium Severity: 20 (Hardcoded colors)

**Critical Issues:**
1. Background overlay won't respond to theme changes (uses `$primaryColor`)
2. Focus box-shadow won't respond to theme changes (uses `$secondaryColor`)
3. Error states use SCSS variables, won't cascade
4. Slideout panel has many hardcoded values
5. **Date validation missing** - Invalid dates like Feb 30, Day 32 are accepted

**Testing Completion Summary:**
| Phase | Status | Key Results |
|-------|--------|-------------|
| Phase 1: Code Audit | ✅ Complete | 29 bugs identified |
| Phase 2: Visual Testing | ⏳ Partial | Limited by browser constraints |
| Phase 3: Functional Testing | ✅ Complete | All keyboard/focus tests pass |
| Phase 4: Input Validation | ⏳ Partial | 2 critical fails (Day>31, Feb 30) |
| Phase 5: Theme Cascade | ✅ Complete | primary ❌, secondary ✅, tertiary ✅ |
| Phase 6: Font & Scaling | ✅ Complete | Font cascade works, scaling uses clmp() |

**Font Variable Testing Results:**
| Variable | Element | Cascade Works |
|----------|---------|---------------|
| `--secondary-font` | Title | ✅ Yes |
| `--primary-font` | Button, Labels | ✅ Yes |

**Responsive Scaling:**
- Title and description use `clmp()` function for fluid scaling (340px-1600px)
- Button and label font sizes are fixed (21px and 14px respectively)
- Measured at 1440px: Title=47.84px, Description=19.49px

**Validation Behavior Summary:**
| Check | Status |
|-------|--------|
| Empty fields | ✅ Validated |
| Letters filtered | ✅ Working |
| Day range (1-31) | ❌ Not validated |
| Month range (1-12) | ⏳ Needs testing |
| Valid date logic (Feb 30, etc.) | ❌ Not validated |
| Future dates | ⏳ Needs testing |
| Maxlength enforced | ⏳ Needs testing |

**Recommendations:**
1. Create CSS variables for error/success states and panel colors to enable proper theme cascade
2. **Add date validation logic** to reject:
   - Days > 31 or < 1
   - Months > 12 or < 1
   - Invalid day/month combinations (Feb 30, Apr 31, etc.)
   - Leap year validation for Feb 29
   - Future birth dates
   - Unreasonably old dates (e.g., before 1900)
