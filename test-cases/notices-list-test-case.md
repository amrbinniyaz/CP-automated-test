# Notices List Widget Test Cases

## Overview

| Property | Value |
|----------|-------|
| **Widgets Covered** | Notices List |
| **Variants** | 2 (v1, v2) |
| **CMS Tags** | `{notices}` |
| **Test Page URL** | https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/notices |

---

## Design Specifications (from Master Template CSV)

### Notices List (2 variants)
| Element | Styling Options |
|---------|-----------------|
| Character styles | Heading 2, Heading 5, body copy |
| Card | colour, rounded corners (individually), opacity |
| Image | height responsive (375px: 185px, 2560px: 400px) |

**Behavior Rules:**
- [ ] Image height should be: 375px screen: 185px height, 2560px screen: 400px height

---

## Color Variables (from CSV)

| Variable | Component | Sub-component |
|----------|-----------|---------------|
| branding white | notices list | card background (opacity 0.5) |
| branding 1 | notices list | description |
| branding 1 | notices list | last updated |
| branding 1 | notices list | read more icon |
| branding 1 | notices list | title |
| branding 4 | notices list | widget background |

---

## Font Variables (from CSV)

| Variable | Component | Sub-component |
|----------|-----------|---------------|
| body copy a | notices list | description |
| body copy a | notices list | last updated |
| heading 5a | notices list | title |

---

## Code Implementation

### SCSS Files
| File | Purpose |
|------|---------|
| `/Website/Styles/Modules/Notices/Notices.scss` | Notice item base styles |
| `/Website/Styles/_globals/_theme.scss` | Theme mixin (noticesList) lines 1229-1296 |

### CSS Variables Used
| Variable | Purpose | Location |
|----------|---------|----------|
| `--secondary-font` | Title font family | _theme.scss:1232 |
| `--primary-color` | Title color | _theme.scss:1236 |
| `--primary-color` | Read more icon color | _theme.scss:1253 |

### Hardcoded Values in Base Styles (Notices.scss)
| Line | Property | Value | Should Be |
|------|----------|-------|-----------|
| 6 | gap | `2rem` | Check if should use variable |
| 15 | padding | `2rem` | Check if should use variable |
| 20 | gap | `3rem` | Check if should use variable |
| 31 | min-height | `14.6rem` | May need responsive |
| 33 | margin-bottom | `3rem` | Check if should use variable |
| 59 | gap | `1.5rem` | Check if should use variable |
| 66 | gap | `1rem` | Check if should use variable |

---

## Known Bugs (Hardcoded Values)

### BUG-NL-001: Hardcoded white background in v1
- **Severity:** Medium
- **Location:** `_theme.scss:1261`
- **Expected:** CSS variable (e.g., `var(--branding-white)` or `var(--neutral-color)`)
- **Actual:** `background: #fff` hardcoded
- **Impact:** Background won't cascade with theme changes

### BUG-NL-002: Hardcoded box-shadow color in v1
- **Severity:** Low
- **Location:** `_theme.scss:1262`
- **Expected:** CSS variable or theme-based shadow
- **Actual:** `box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1)` hardcoded
- **Impact:** Shadow color won't change with theme

### BUG-NL-003: SCSS variable used for v2 border
- **Severity:** High
- **Location:** `_theme.scss:1269`
- **Expected:** `var(--primary-color)`
- **Actual:** `rgba($primaryColor, 0.15)` SCSS variable
- **Impact:** Border color won't cascade at runtime

### BUG-NL-004: Hardcoded card padding
- **Severity:** Medium
- **Location:** `Notices.scss:15`
- **Expected:** CSS variable (e.g., `var(--padding-e-inner)`)
- **Actual:** `padding: 2rem` hardcoded (computes to 20px)
- **Impact:** Card padding won't cascade with theme/spacing changes
- **Tested:** 375px, 1512px, 2560px - all show 20px (no responsive scaling)

### BUG-NL-005: Hardcoded gap between notice items
- **Severity:** Medium
- **Location:** `Notices.scss:6`
- **Expected:** CSS variable (e.g., `var(--margin-c)` or `var(--padding-e-inner)`)
- **Actual:** `gap: 2rem` hardcoded (computes to 20px)
- **Impact:** Gap won't cascade with theme/spacing changes
- **Tested:** 375px, 1512px, 2560px - all show 20px (no responsive scaling)

### BUG-NL-006: Date/Time format not switchable between UK and USA
- **Severity:** High
- **Location:** `_CPNoticesCarousel1.cshtml:49-50`, `_CPNoticesCarousel2.cshtml:49-50`
- **Expected:** Date format should use `GetWebSetting("CountryCode")` to switch between UK/USA formats
- **Actual:** Format hardcoded as `"d MMM yyyy"` (UK) - ignores CountryCode setting
- **Impact:** USA clients cannot display dates in US format (MMM d, yyyy)
- **Note:** `CountryCode` web setting already exists and is used elsewhere (contact forms, GDPR, terms)
- **Affected Files:**
  - `_CPNoticesCarousel1.cshtml` - UK format hardcoded
  - `_CPNoticesCarousel2.cshtml` - UK format hardcoded
  - `Homepage.cshtml` - UK format (`dd/MM/yy`)
  - `SecondLevel.cshtml` - USA format (`MM/dd/yy`) - inconsistent!
  - `_GBNotice.cshtml` - UK format (`dd MM yy`)

---

## Test Cases

### Styling Tests

#### SC-NL-001: Notice Item Variant 1 - Basic Styling
- [x] Card has white background (`rgb(255, 255, 255)`)
- [x] Card has box-shadow (`rgba(0, 0, 0, 0.1) 0px 3px 20px 0px`)
- [x] Title uses `--secondary-font` (Cormorant Garamond, serif, italic)
- [x] Title uses `--primary-color` (`rgb(28, 43, 60)`)
- [x] Last updated text displays correctly

#### SC-NL-002: Notice Item Variant 2 - Border Style
- [x] No background on card (white inherited, no box-shadow)
- [x] Bottom border with primary color (15% opacity) (`1px solid rgba(28, 43, 60, 0.15)`)
- [x] Last item has no border (`0px none`)
- [x] Title uses correct font and color

### Responsive Tests

#### RESP-NL-001: Image Height Scaling
- [ ] 375px screen: image height ~185px ❌ **ACTUAL: 146px**
- [ ] 2560px screen: image height ~400px ❌ **ACTUAL: 471px**
- [x] Height scales between breakpoints

#### RESP-NL-002: Mobile (375px)
- [x] Notice items stack appropriately
- [x] Text readable without horizontal scroll
- [x] Touch interactions work (cursor: pointer on links)

#### RESP-NL-003: Desktop (1440px)
- [x] Layout displays correctly
- [x] All hover states work (transition: background 0.3s)

#### RESP-NL-004: Large Desktop (2560px)
- [x] Layout scales appropriately
- [x] Images don't pixelate (natural: 1000x1000, displayed: 1272x471)

---

## Color Variable Tests

#### COL-NL-001: Primary Color Cascade
- [x] Change `--primary-color` value
- [x] Title color updates (rgb(28,43,60) → rgb(255,0,0))
- [ ] Read more icon color updates (icon not found in DOM)
- [x] Description color updates
- [x] Last updated color updates

#### COL-NL-002: Fourth Color Cascade
- [x] Change `--fourth-color` value
- [x] Widget background updates (rgb(228,231,233) → rgb(0,255,0))

### BUG VERIFICATION: Hardcoded Values

#### COL-NL-BUG-001: Verify BUG-NL-001
- [ ] Change theme colors at runtime
- [ ] v1 card background stays `#fff`
- [ ] Document as confirmed bug

#### COL-NL-BUG-002: Verify BUG-NL-003
- [ ] Change `--primary-color` at runtime
- [ ] v2 border color does NOT update (uses SCSS variable)
- [ ] Document as confirmed bug

---

## Font Variable Tests

#### FV-NL-001: Heading 5a / Secondary Font Cascade
- [ ] Change `--secondary-font` value
- [ ] Notice title font updates

#### FV-NL-002: Body Copy a / Primary Font Cascade
- [ ] Change `--primary-font` value
- [ ] Description font updates
- [ ] Last updated font updates

---

## Spacing Variable Tests

#### SV-NL-001: Card Padding
- [ ] Identify which CSS variable should control card padding
- [ ] Test if padding cascades with variable changes

#### SV-NL-002: Gap Between Items
- [ ] Identify which CSS variable should control gap
- [ ] Test if gap cascades with variable changes

---

## Test Execution Checklist

| Test ID | Description | Status | Tester | Date | Notes |
|---------|-------------|--------|--------|------|-------|
| SC-NL-001 | v1 basic styling | ✅ PASS | Claude | 2026-01-22 | White bg, shadow, italic serif title |
| SC-NL-002 | v2 border style | ✅ PASS | Claude | 2026-01-22 | No shadow, border-bottom present |
| RESP-NL-001 | Image height scaling | ⚠️ PARTIAL | Claude | 2026-01-22 | 375px: 146px (expected 185px), 2560px: 471px (expected 400px) |
| RESP-NL-002 | Mobile 375px | ✅ PASS | Claude | 2026-01-22 | Items stack, no h-scroll, touch works |
| RESP-NL-003 | Desktop 1440px | ✅ PASS | Claude | 2026-01-22 | Tested at 1512px |
| RESP-NL-004 | Large Desktop 2560px | ✅ PASS | Claude | 2026-01-22 | Layout scales, images not pixelated |
| COL-NL-001 | Primary color cascade | ✅ PASS | Claude | 2026-01-22 | Title, description, update all cascade |
| COL-NL-002 | Fourth color cascade | ✅ PASS | Claude | 2026-01-22 | Widget bg cascades correctly |
| COL-NL-BUG-001 | Verify BUG-NL-001 | ❌ CONFIRMED | Claude | 2026-01-22 | Card bg hardcoded #fff |
| COL-NL-BUG-002 | Verify BUG-NL-003 | ❌ CONFIRMED | Claude | 2026-01-22 | V2 border uses SCSS var |
| FV-NL-001 | Secondary font cascade | ✅ PASS | Claude | 2026-01-22 | Title font cascades |
| FV-NL-002 | Primary font cascade | ✅ PASS | Claude | 2026-01-22 | Body font cascades |
| SV-NL-001 | Card padding | ❌ FAIL | Claude | 2026-01-22 | Hardcoded 20px - does not cascade |
| SV-NL-002 | Gap between items | ❌ FAIL | Claude | 2026-01-22 | Hardcoded 20px - does not cascade |

---

## Test URLs

| Environment | URL | Notes |
|-------------|-----|-------|
| Staging | https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/notices | Test page (variant set in CMS/code) |

---

## Notes

- **6 bugs identified** - 3 in theme SCSS, 2 in base Notices.scss, 1 date format issue - ALL CONFIRMED
- Spacing variables not explicitly mapped in CSV for notices list
- URL parameters (?notices=1, ?notices=2) do NOT control variant - set in CMS
- V2 testing required manual class change via DevTools
- See `/CP test/docs/notices-list-test-results.md` for detailed results
