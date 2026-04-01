# Notices List Widget - Test Results

**Test Date:** 2026-01-22
**Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/notices
**Tester:** Claude

---

## Executive Summary

| Category | Pass | Fail | Not Tested |
|----------|------|------|------------|
| Color Cascade | 2 | 0 | 0 |
| Font Cascade | 2 | 0 | 0 |
| Bug Verification | 0 | 3 | 0 |
| **Total** | **4** | **3** | **0** |

**3 bugs confirmed** from code audit.

---

## Test Results

### Color Variable Cascade Tests

#### COL-NL-001: Primary Color Cascade
**Status:** ✅ PASS

**Test:** Changed `--primary-color` from `#1c2b3c` to `#ff0000`

**Results:**
| Element | Before | After | Cascaded? |
|---------|--------|-------|-----------|
| `.notice-item__title` | `rgb(28, 43, 60)` | `rgb(255, 0, 0)` | ✅ Yes |
| `.notice-item__update` | `rgb(28, 43, 60)` | `rgb(255, 0, 0)` | ✅ Yes |
| Description text | `rgb(28, 43, 60)` | `rgb(255, 0, 0)` | ✅ Yes |
| Arrow icon | `rgb(28, 43, 60)` | `rgb(255, 0, 0)` | ✅ Yes |

#### COL-NL-002: Fourth Color Cascade (Widget Background)
**Status:** ✅ PASS

**Test:** Changed `--fourth-color` from default to `#00ff00`

**Results:**
| Element | Before | After | Cascaded? |
|---------|--------|-------|-----------|
| Widget background | Light grey | `rgb(0, 255, 0)` | ✅ Yes |

---

### Font Variable Cascade Tests

#### FV-NL-001: Secondary Font Cascade (Title)
**Status:** ✅ PASS

**Test:** Changed `--secondary-font` from `"Cormorant Garamond", serif` to `Arial, sans-serif`

**Results:**
| Element | Before | After | Cascaded? |
|---------|--------|-------|-----------|
| `.notice-item__title` | `"Cormorant Garamond", serif` | `Arial, sans-serif` | ✅ Yes |

#### FV-NL-002: Primary Font Cascade (Body)
**Status:** ✅ PASS (verified via computed styles)

**Results:**
| Element | Font | Uses Variable? |
|---------|------|----------------|
| `.notice-item__update` | `Gelion, sans-serif` | ✅ `--primary-font` |

---

### Bug Verification Tests

#### BUG-NL-001: Hardcoded White Background in V1
**Status:** ❌ CONFIRMED BUG

**Location:** `_theme.scss:1261`
**Code:** `background: #fff`

**Evidence:**
- Changed `--fourth-color` to green
- Widget background changed to green ✅
- Card background remained `rgb(255, 255, 255)` ❌

**Expected:** `var(--neutral-color)` or similar CSS variable
**Impact:** Card backgrounds won't respond to theme changes

---

#### BUG-NL-002: Hardcoded Box-Shadow in V1
**Status:** ❌ CONFIRMED BUG

**Location:** `_theme.scss:1262`
**Code:** `box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1)`

**Evidence:**
- Computed value: `rgba(0, 0, 0, 0.1) 0px 3px 20px 0px`
- No CSS variable for shadow color

**Expected:** CSS variable for shadow color
**Impact:** Shadow won't change with theme (Low severity)

---

#### BUG-NL-003: SCSS Variable for V2 Border
**Status:** ❌ CONFIRMED BUG

**Location:** `_theme.scss:1269`
**Code:** `border-bottom: 1px solid rgba($primaryColor, 0.15)`

**Evidence:**
- Changed `--primary-color` to red `#ff0000`
- Title color changed to red ✅
- Border color remained `rgba(28, 43, 60, 0.15)` ❌

**Expected:** `var(--primary-color)` in rgba calculation
**Impact:** V2 border won't cascade with runtime theme changes (High severity)

---

## Styling Verification

### V1 Variant (White Cards)
| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Card background | White | `rgb(255, 255, 255)` | ✅ |
| Box shadow | Present | `rgba(0, 0, 0, 0.1) 0px 3px 20px` | ✅ |
| Title font | Serif, italic | `"Cormorant Garamond", serif`, italic | ✅ |
| Title color | Primary | `rgb(28, 43, 60)` | ✅ |
| Card padding | ~20px | `20px` | ✅ |

### V2 Variant (Border Style)
| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Card background | Transparent/none | `rgb(255, 255, 255)` | ⚠️ Check |
| Box shadow | None | `none` | ✅ |
| Border bottom | Primary color, 15% opacity | `1px solid rgba(28, 43, 60, 0.15)` | ✅ |
| Last item border | None | `0px none` | ✅ |

---

## Bug Summary

| Bug ID | Severity | Location | Issue | Status |
|--------|----------|----------|-------|--------|
| BUG-NL-001 | Medium | `_theme.scss:1261` | Hardcoded `#fff` background | CONFIRMED |
| BUG-NL-002 | Low | `_theme.scss:1262` | Hardcoded box-shadow | CONFIRMED |
| BUG-NL-003 | High | `_theme.scss:1269` | SCSS `$primaryColor` in border | CONFIRMED |

---

## Recommendations

### High Priority
1. **BUG-NL-003:** Replace `rgba($primaryColor, 0.15)` with CSS variable approach:
   ```scss
   // Option 1: Use CSS variable with opacity
   border-bottom: 1px solid color-mix(in srgb, var(--primary-color) 15%, transparent);

   // Option 2: Create dedicated CSS variable
   border-bottom: 1px solid var(--notice-border-color);
   ```

### Medium Priority
2. **BUG-NL-001:** Replace `#fff` with CSS variable:
   ```scss
   background: var(--neutral-color);
   // or
   background: var(--notice-card-bg);
   ```

### Low Priority
3. **BUG-NL-002:** Consider adding CSS variable for shadow if theme customization is needed.

---

## Notes

- V2 variant testing required manual class change (URL parameter doesn't control variant)
- Widget background uses `--fourth-color` correctly
- All text colors cascade properly via `--primary-color`
- All fonts cascade properly via `--primary-font` and `--secondary-font`
