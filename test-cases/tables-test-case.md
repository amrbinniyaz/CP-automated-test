# Tables Test Cases

## Overview

| Property | Value |
|----------|-------|
| Component | Table (WYSIWYG) |
| CMS Location | Body content via CKEditor |
| HTML Structure | `.table-wrapper > table > thead/tbody > tr > th/td` |
| Variants | 1 (single styling) |
| Test URL | https://mvcbasev3.leia.tiarc-live.co.uk/testing/tables |

---

## Design Specifications (from Master Template CSV)

### Behavior Rules
- When table is wider than content container, a fade & scroll bar appear
- Fade uses background color (not gradient) so it matches page background
- Drop shadow support

### Character Styles
- Body copy for td text
- Body copy (bold) for th text

---

## Color Variables (from CSV)

| Element | Design Token | CSS Variable | Expected |
|---------|--------------|--------------|----------|
| Table border | branding 2 | `var(--secondary-color)` | `#7fc9c7` |
| TD background | branding 2 @ 0.1 opacity | `rgba(var(--secondary-color-rgb), 0.1)` | Light teal |
| TD text | branding 1 | `var(--primary-color)` | `#1c2b3c` |
| TH background | branding 2 | `var(--secondary-color)` | `#7fc9c7` |
| TH text | branding 1 | `var(--primary-color)` | `#1c2b3c` |

---

## Font Variables (from CSV)

| Element | Design Token | Expected Style |
|---------|--------------|----------------|
| TD text | body copy a | Regular weight, inherit size |
| TH text | body copy a (bold) | Bold weight, inherit size |

---

## Spacing Variables (from CSV)

| Element | Side | Variable | Status |
|---------|------|----------|--------|
| Heading cell | top | ? | Undefined |
| Heading cell | bottom | ? | Undefined |
| Heading cell | left | ? | Undefined |
| Heading cell | right | ? | Undefined |
| Content cell | top | ? | Undefined |
| Content cell | bottom | ? | Undefined |
| Content cell | left | ? | Undefined |
| Content cell | right | ? | Undefined |
| Table wrapper | margin | `--table-spacing` (= `--margin-c`) | Defined |

---

## Code Implementation

### Files
| File | Purpose |
|------|---------|
| `/Website/Styles/_globals/_theme.scss` (lines 766-828) | `@mixin table` - theme styling |
| `/Website/Styles/Legacy/components/_common/_content-style.scss` (lines 86-147) | Table wrapper and base styles |

### CSS Variables Used
```scss
// Correctly using CSS variables:
var(--primary-color)           // td/th text color
var(--secondary-color)         // th background, td borders
var(--table-spacing)           // wrapper margin
var(--general-bg-zero-gradient-color)  // fade start
var(--general-bg-full-gradient-color)  // fade end

// INCORRECTLY using SCSS variables (BUGS):
rgba($secondaryColor, 0.3)     // table background - BUG
darken($secondaryColor, 10%)   // th border-right - BUG
darken($secondaryColor, 10%)   // th[scope='row'] border-bottom - BUG
```

### Current Implementation (from _theme.scss:766-828)
```scss
@mixin table {
  table {
    background: rgba($secondaryColor, 0.3);  // BUG: Should use CSS var
  }

  &.has-overflow {
    &:after {
      background: linear-gradient(
        to right,
        var(--general-bg-zero-gradient-color) 0%,
        var(--general-bg-full-gradient-color) 100%
      );  // OK: Uses CSS variables
    }
  }

  td, th {
    font-size: 2rem;
    line-height: 1.5;
    color: var(--primary-color);  // OK
    padding: 1.5rem 2rem;
  }

  th {
    background: var(--secondary-color);  // OK
    border-right: 1px solid darken($secondaryColor, 10%);  // BUG

    &[scope='row'] {
      border-bottom: 1px solid darken($secondaryColor, 10%);  // BUG
    }
  }

  td {
    border-right: 1px solid var(--secondary-color);  // OK
    border-bottom: 1px solid var(--secondary-color);  // OK
  }
}
```

---

## Known Bugs

### BUG-TABLE-001: Table background uses SCSS variable
| Property | Value |
|----------|-------|
| Severity | **High** |
| File | `/Website/Styles/_globals/_theme.scss` |
| Line | 768 |
| Code | `background: rgba($secondaryColor, 0.3);` |
| Expected | `background: rgba(var(--secondary-color-rgb), 0.3);` or CSS variable with opacity |
| Impact | Table background won't respond to runtime theme changes |

### BUG-TABLE-002: TH border-right uses SCSS darken function
| Property | Value |
|----------|-------|
| Severity | **High** |
| File | `/Website/Styles/_globals/_theme.scss` |
| Line | 809 |
| Code | `border-right: 1px solid darken($secondaryColor, 10%);` |
| Expected | Use CSS variable or pre-calculated color variable |
| Impact | TH border won't respond to runtime theme changes |

### BUG-TABLE-003: TH[scope='row'] border-bottom uses SCSS darken function
| Property | Value |
|----------|-------|
| Severity | **High** |
| File | `/Website/Styles/_globals/_theme.scss` |
| Line | 813 |
| Code | `border-bottom: 1px solid darken($secondaryColor, 10%);` |
| Expected | Use CSS variable or pre-calculated color variable |
| Impact | Row header border won't respond to runtime theme changes |

### BUG-TABLE-004: Hardcoded cell padding
| Property | Value |
|----------|-------|
| Severity | **Medium** |
| File | `/Website/Styles/_globals/_theme.scss` |
| Line | 804 |
| Code | `padding: 1.5rem 2rem;` |
| Expected | Should use CSS padding variables from spec |
| Impact | Cell padding not configurable via theme system |
| Note | Spacing CSV has "?" for padding variables - spec incomplete |

---

## Test Cases

### Styling Tests

#### SC-TABLE-001: Table wrapper margin
| Property | Value |
|----------|-------|
| Test | Verify table wrapper uses `--table-spacing` for margin |
| Expected | `clamp(4rem, 1.7857142857vw + 1.4285714286rem, 6rem) 0` at 1440px |
| Actual | `0px 0px 41.29px` (approximately 4.1rem) |
| Status | **PASS** |

#### SC-TABLE-002: TH background color
| Property | Value |
|----------|-------|
| Test | Verify TH uses `--secondary-color` for background |
| Expected | `rgb(127, 201, 199)` (#7fc9c7) |
| Actual | `rgb(127, 201, 199)` |
| Status | **PASS** |

#### SC-TABLE-003: TD/TH text color
| Property | Value |
|----------|-------|
| Test | Verify text uses `--primary-color` |
| Expected | `rgb(28, 43, 60)` (#1c2b3c) |
| Actual | `rgb(28, 43, 60)` |
| Status | **PASS** |

#### SC-TABLE-004: Table background color
| Property | Value |
|----------|-------|
| Test | Verify table background uses secondary color with opacity |
| Expected | CSS variable with 0.3 opacity |
| Actual | `rgba(127, 201, 199, 0.3)` - hardcoded SCSS |
| Status | **FAIL** (BUG-TABLE-001) |

#### SC-TABLE-005: TD border colors
| Property | Value |
|----------|-------|
| Test | Verify TD borders use `--secondary-color` |
| Expected | `rgb(127, 201, 199)` |
| Actual | `rgb(127, 201, 199)` |
| Status | **PASS** |

#### SC-TABLE-006: TH border-right color
| Property | Value |
|----------|-------|
| Test | Verify TH border-right uses CSS variable |
| Expected | CSS variable (darker secondary) |
| Actual | `rgb(91, 186, 183)` - hardcoded via SCSS darken() |
| Status | **FAIL** (BUG-TABLE-002) |

---

### Behavior Tests

#### BEH-TABLE-001: Overflow detection
| Property | Value |
|----------|-------|
| Test | Table wider than container gets `.has-overflow` class |
| Status | **PASS** - JavaScript adds class correctly |

#### BEH-TABLE-002: Fade gradient on overflow
| Property | Value |
|----------|-------|
| Test | Fade gradient appears when table overflows |
| Expected | Gradient from transparent to page background |
| Actual | `linear-gradient(to right, rgba(255,255,255,0) 0%, rgb(255,255,255) 100%)` |
| Status | **PASS** |

#### BEH-TABLE-003: Fade disappears at scroll end
| Property | Value |
|----------|-------|
| Test | Fade opacity becomes 0 when scrolled to end |
| Expected | `.at-end` class sets opacity to 0 |
| Status | **PASS** |

#### BEH-TABLE-004: Scrollbar functionality
| Property | Value |
|----------|-------|
| Test | Horizontal scrollbar appears for overflow tables |
| Status | **PASS** - OverlayScrollbars plugin handles scrolling |

---

### Edge Case Tests

#### EDGE-TABLE-001: Tables with row headers (th[scope='row'])
| Property | Value |
|----------|-------|
| Test | Row headers styled correctly |
| Expected | th styling with bottom border |
| Status | **PASS** (styling works, but border uses SCSS variable) |

#### EDGE-TABLE-002: Tables with colspan headers
| Property | Value |
|----------|-------|
| Test | Headers spanning multiple columns |
| Example | "Michaelmas Term" spanning 2 columns |
| Status | **PASS** |

#### EDGE-TABLE-003: Tables with nested lists
| Property | Value |
|----------|-------|
| Test | Bullet lists inside table cells |
| Example | Division Heads, Senior Leadership Team tables |
| Status | **PASS** - Lists render correctly inside cells |

#### EDGE-TABLE-004: Tables with links
| Property | Value |
|----------|-------|
| Test | Links inside table cells with icons |
| Example | Primary School contact table |
| Status | **PASS** - Links show underline and external icon |

#### EDGE-TABLE-005: Tables without headers
| Property | Value |
|----------|-------|
| Test | Tables with only td elements (no th) |
| Example | Lorem ipsum tables at bottom |
| Status | **PASS** |

#### EDGE-TABLE-006: Tables with long text content
| Property | Value |
|----------|-------|
| Test | Text wrapping in cells |
| Status | **PASS** - Word break and overflow-wrap working |

#### EDGE-TABLE-007: Tables with minimal content
| Property | Value |
|----------|-------|
| Test | Cells with single character ("1") |
| Expected | Consistent cell sizing |
| Status | **PASS** |

#### EDGE-TABLE-008: Multi-column tables (4+ columns)
| Property | Value |
|----------|-------|
| Test | Tables with many columns trigger overflow |
| Example | Fees table with 4 columns |
| Status | **PASS** |

#### EDGE-TABLE-009: Bold text in cells
| Property | Value |
|----------|-------|
| Test | Bold text styling preserved |
| Example | Event dates table |
| Status | **PASS** |

---

### Responsive Tests

#### RESP-TABLE-001: Table spacing at breakpoints
| Breakpoint | Expected | Status |
|------------|----------|--------|
| 375px | ~40px (4rem) | Needs verification |
| 1440px | ~41.3px | **PASS** |
| 2560px | ~60px (6rem) | Needs verification |

#### RESP-TABLE-002: Font size scaling
| Property | Value |
|----------|-------|
| Test | Font size scales with viewport |
| Current | Fixed at 2rem (20px) |
| Status | **REVIEW** - May need responsive sizing |

---

## Theme Variable Cascade Tests

#### TV-TABLE-001: Primary color cascade
| Property | Value |
|----------|-------|
| Test | Change `--primary-color`, verify text updates |
| Elements | td text, th text |
| Expected | All text updates |
| Status | **PASS** |

#### TV-TABLE-002: Secondary color cascade
| Property | Value |
|----------|-------|
| Test | Change `--secondary-color`, verify updates |
| Elements | th background, td borders |
| Expected | All should update |
| Actual | th background & td borders update; table background & th borders do NOT |
| Status | **PARTIAL FAIL** (BUG-TABLE-001, BUG-TABLE-002, BUG-TABLE-003) |

---

## Test Execution Checklist

### Desktop (1440px)
- [x] Table wrapper margin correct
- [x] TH background color correct
- [x] TD/TH text color correct
- [x] TD border colors correct
- [ ] Table background uses CSS variable (FAIL)
- [ ] TH border uses CSS variable (FAIL)
- [x] Overflow fade working
- [x] Scrollbar working

### Edge Cases
- [x] Row headers (th[scope='row'])
- [x] Colspan headers
- [x] Nested lists in cells
- [x] Links with icons in cells
- [x] Tables without headers
- [x] Long text wrapping
- [x] Minimal content cells
- [x] Multi-column tables
- [x] Bold text in cells

### Responsive
- [ ] Mobile (375px) - Needs testing
- [x] Desktop (1440px)
- [ ] Large Desktop (2560px) - Needs testing

---

## Summary

### Passed Tests: 18
### Failed Tests: 3 (all due to SCSS variable bugs)
### Pending Tests: 3 (responsive breakpoints)

### Critical Issues
1. **BUG-TABLE-001**: Table background won't cascade with theme changes
2. **BUG-TABLE-002**: TH border-right won't cascade with theme changes
3. **BUG-TABLE-003**: TH row header border won't cascade with theme changes

### Recommendations
1. Create `--secondary-color-rgb` CSS variable for rgba() usage
2. Create `--secondary-color-dark` CSS variable for border colors
3. Consider adding CSS variables for cell padding per spec
4. Add responsive font sizing for better mobile experience
