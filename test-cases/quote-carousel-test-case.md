# Quote Carousel Test Cases

## Overview
This document contains test cases for the Quote Carousel widget, covering functionality, styling, and CSS variable inheritance.

**Component:** Quote Carousel (blockquote-fader)  
**Variants:** 2  
**CMS Tag:** `{quotes}`

---

## Design Specifications (from Master Template Progress CSV)

### Quote Carousel Rules:

| Rule | Description |
|------|-------------|
| **Variants** | 2 variants available |
| **Autorotate** | ☐ Carousel doesn't autorotate |
| **Looping** | ☐ Carousel is looping |

### Variant 1 Styling:
| Element | Customizable Properties |
|---------|------------------------|
| Quote mark | SVG replaceable |
| Character styles | Quote, Quote source |
| Background | none / solid colour / image with/without overlay |
| SVG | Can be added within background container (e.g. logo watermark) |

### Variant 2 Styling:
| Element | Customizable Properties |
|---------|------------------------|
| Quote mark | SVG replaceable |
| Text | alignment, colour, font, weight, size, line spacing, letter spacing, text container width |

---

## Color Variables (from CSV)

### Quote Text & Marks:
| Element | Color Variable | Hex Value |
|---------|----------------|-----------|
| Quote text | `branding 1` | `#1c2b3c` (--primary-color) |
| Quote marks | `branding 3` | `#c55f3c` (--tertiary-color) |

---

## Font Variables (from CSV)

### Quote Styling:
| Element | Font Variable |
|---------|---------------|
| Quote text | `quote a` |

---

## Code Implementation (from _theme.scss)

### Blockquote Base Styles (lines 642-695):

```scss
blockquote {
  font-family: var(--secondary-font);
  font-size: clmp(2.4rem, 3.4rem);     // 24px → 34px
  font-style: italic;
  font-weight: 400;
  line-height: 1.14;
  color: var(--primary-color);
  margin: var(--blockquote-spacing);
  padding: 1rem clmp(3rem, 6rem) 1rem clmp(3rem, 6rem);  // 10px 30px→60px

  // Quote marks (before/after pseudo-elements)
  &:before, &:after {
    position: absolute;
    color: var(--tertiary-color);     // branding 3
    font-size: clmp(1.9rem, 2.3rem);  // 19px → 23px
  }
}
```

### Blockquote Fader Mixin (lines 1592-1601):

```scss
@mixin blockquoteFader {
  &.module-widget--with-bg {
    background: var(--fourth-color);
  }

  .cp-dots {
    gap: 0.5rem;
    margin-top: 3.6rem;
  }
}
```

### Mobile Quote Marks (line 673+):
On mobile, quote marks are positioned **above & below** the text (relative positioning).

---

## Test Cases

### QC-001: Carousel Behavior - No Autorotate
**Priority:** High  
**Precondition:** Quote carousel with multiple quotes visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load page with quote carousel | Carousel displays first quote |
| 2 | Wait 10+ seconds without interaction | Carousel does NOT auto-advance |
| 3 | Verify no automatic rotation | Only manual navigation changes slides |

---

### QC-002: Carousel Behavior - Looping
**Priority:** High  
**Precondition:** Quote carousel with multiple quotes visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to last quote | Last quote visible |
| 2 | Click next arrow / dot | Carousel loops back to first quote |
| 3 | On first quote, click previous | Carousel loops to last quote |

---

### QC-003: Quote Text Styling
**Priority:** High  
**Precondition:** Quote carousel variant 1 or 2 visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Font family | font-family | `var(--secondary-font)` |
| Font size | font-size | `clmp(2.4rem, 3.4rem)` = 24px → 34px |
| Font style | font-style | `italic` |
| Font weight | font-weight | `400` |
| Line height | line-height | `1.14` |
| Text color | color | `var(--primary-color)` = `#1c2b3c` |

---

### QC-004: Quote Marks Styling
**Priority:** High  
**Precondition:** Quote carousel visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Color | color | `var(--tertiary-color)` = `#c55f3c` |
| Font size | font-size | `clmp(1.9rem, 2.3rem)` = 19px → 23px |
| Opening mark | position | `left: 0; top: 0` |
| Closing mark | position | `bottom: 0; right: 0` |

---

### QC-005: Mobile Quote Marks Position
**Priority:** Medium  
**Precondition:** Quote carousel visible on mobile (≤768px)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View on mobile viewport | Quote marks repositioned |
| 2 | Check opening mark | Above the quote text |
| 3 | Check closing mark | Below the quote text |
| 4 | Verify alignment | Opening = left-aligned, Closing = right-aligned |

**Rule:** "On mobile, the quote marks are above & below the text to allow it as much space as possible"

---

### QC-006: Quote Source Styling
**Priority:** Medium  
**Precondition:** Quote with source attribution visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Margin | margin-top | `2rem` (20px) |
| Alignment | text-align | `center` |

---

### QC-007: Variant 1 - Background Options
**Priority:** High  
**Precondition:** Quote carousel variant 1 visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Without background class | No background applied |
| 2 | With `.module-widget--with-bg` | Background = `var(--fourth-color)` = `#e4e7e9` |

---

### QC-008: Variant 2 - Text Alignment (CT)
**Priority:** Medium  
**Precondition:** Quote carousel variant 2 (content template) visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Quote text | text-align | `left` |
| Quote padding | padding | `4rem 0 4rem 2rem` (40px 0 40px 20px) |
| Source padding | padding-left | `2rem` (20px) |

---

### QC-009: Carousel Dots Styling
**Priority:** Medium  
**Precondition:** Quote carousel with multiple slides and dots visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Gap | gap | `0.5rem` (5px) |
| Margin top | margin-top | `3.6rem` (36px) |

---

### QC-010: Responsive Font Sizes
**Priority:** Medium

| Viewport | Quote Font Size | Quote Mark Size |
|----------|-----------------|-----------------|
| 375px | ~24px | ~19px |
| 1440px | ~34px | ~23px |
| 2560px | ~34px | ~23px |

---

## Color Variable Tests

### COL-001: Quote Colors (from CSV)

| Element | On Light Bg | CSS Variable |
|---------|-------------|--------------|
| Quote text | `branding 1` (#1c2b3c) | `var(--primary-color)` |
| Quote marks | `branding 3` (#c55f3c) | `var(--tertiary-color)` |

---

## Known Bugs

| # | Issue | Current | Expected | File:Line |
|---|-------|---------|----------|-----------|
| 1 | Arrow background color wrong | `branding 2` (#7fc9c7) | `branding white` (#fff) per CSV style e | `_theme.scss` |
| 2 | Arrow opacity wrong | 100% | 50% per CSV style e | `_theme.scss` |
| 3 | Quote marks color wrong | Pure red (#ff0000) | `branding 3` (#c55f3c) | `_theme.scss:656` |
| 4 | Dots margin-top wrong | 10px | 36px (3.6rem) | `_theme.scss:1599` |
| 5 | Quote marks not SVG replaceable | Icon font (CSS content) | SVG replaceable per spec | `_theme.scss:661-671`, `_env.scss:25,27` |

### Bug Details

#### Bug #5: Quote Marks Not SVG Replaceable
**Spec Requirement:** "Quote mark | SVG replaceable"

**Current Implementation:**
- Uses icon font characters via CSS `content` property
- `$g-opening-quote-i` and `$g-closing-quote-i` in `_env.scss`
- Applied via `::before` and `::after` pseudo-elements

**Problem:**
- CSS `content` property cannot render SVG
- Pseudo-elements cannot contain HTML/SVG elements
- Requires code refactor to support actual SVG replacement

**Recommendation:**
- Option A: Use `background-image: url('quote.svg')` instead of content
- Option B: Add inline `<svg>` elements to HTML template
- Option C: Add CMS field for custom quote SVG upload

---

## Test Execution Checklist

### Carousel Behavior
- [ ] QC-001: No autorotate
- [ ] QC-002: Looping enabled

### Quote Styling
- [ ] QC-003: Quote text styling
- [ ] QC-004: Quote marks styling
- [ ] QC-005: Mobile quote marks position
- [ ] QC-006: Quote source styling

### Variants
- [ ] QC-007: Variant 1 background
- [ ] QC-008: Variant 2 text alignment

### Known Bugs
- [ ] Bug 1: Arrow background color wrong
- [ ] Bug 2: Arrow opacity wrong
- [ ] Bug 3: Quote marks color wrong
- [ ] Bug 4: Dots margin-top wrong
- [ ] Bug 5: Quote marks not SVG replaceable

### Other
- [ ] QC-009: Carousel dots styling
- [ ] QC-010: Responsive font sizes

### Color Variable Tests
- [ ] COL-001: Quote text color
- [ ] COL-001: Quote marks color

---

## Appendix

### How to Access Quote Carousel

**Test URL:** `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/quotes` (if available)

**Variant Control:**
- Variant 1: Standard quote carousel
- Variant 2: Content template version (`.module-widget--blockquote-fader-ct`)

### Related Files

| File | Purpose |
|------|---------|
| `_blockquote-fader.scss` | Base component styles |
| `_theme.scss:642-695` | Blockquote base styling |
| `_theme.scss:1592-1635` | Blockquote fader mixins |

### CSS Variables Used

| Variable | Default Value | Usage |
|----------|---------------|-------|
| `--primary-color` | `#1c2b3c` | Quote text color |
| `--tertiary-color` | `#c55f3c` | Quote marks color |
| `--fourth-color` | `#e4e7e9` | V1 background (with-bg) |
| `--secondary-font` | (project font) | Quote font family |
| `--blockquote-spacing` | (varies) | Quote margin |
