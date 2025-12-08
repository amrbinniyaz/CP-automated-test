# Promos Component Test Case

**Component:** Promos (Card, Carousel, Grid, End-of-Page)  

**Last Updated:** 2025-12-01  
**Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/content-page-promos

---

## Table of Contents
1. [Overview](#overview)
2. [Test Environment](#test-environment)
3. [Promo Card Tests](#promo-card-tests)
4. [Promos Carousel Tests](#promos-carousel-tests)
5. [Promos Grid Tests](#promos-grid-tests)
6. [Promos End-of-Page Tests](#promos-end-of-page-tests)
7. [Typography & Spacing Tests](#typography--spacing-tests)
8. [CSS Variable Inheritance Tests](#css-variable-inheritance-tests)
9. [Font Variable Tests](#font-variable-tests)
10. [Known Bugs](#known-bugs)
11. [Test Execution Checklist](#test-execution-checklist)

---

## Overview

The Promos component displays promotional content in four layouts:
- **Promo Card**: Individual promo display with image, title, and subtitle
- **Promos Carousel**: Horizontal scrollable promos with navigation arrows
- **Promos Grid**: Responsive grid layout
- **Promos End-of-Page**: Special bottom page promos with enlarged styling

### Variants
| Component | Variants | Description |
|-----------|----------|-------------|
| Promo Card | 3 | Different styling options |
| Promos Carousel | 4 | Arrow positions (right, left, center, center-edge) |
| Promos Grid | 1 | Standard grid |

### Key Styling
- Image with gradient overlay (black, 78% opacity)
- White text on image
- Image zoom effect on hover (scale 1.04)

---

## Test Environment

| Requirement | Details |
|-------------|---------|
| Browsers | Chrome, Firefox, Safari, Edge |
| Breakpoints | 375px (mobile), 768px (tablet), 1024px, 1440px, 2560px (desktop) |
| Devices | Desktop, Tablet, Mobile |

---

## Promo Card Tests

### PC-001: Link Arrow Visibility
**Priority:** High  
**Precondition:** Promos with and without links

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View promo WITHOUT a link | Arrow icon is NOT visible |
| 2 | View promo WITH a link | Arrow icon IS visible |
| 3 | Add link to existing promo | Arrow appears |
| 4 | Remove link from promo | Arrow disappears |

**Rule:** Only when a link has been added, the arrow appears and hover works

---

### PC-002: Link Hover State
**Priority:** High  
**Precondition:** Promo card with a link added

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Hover over linked promo | Hover effect activates |
| 2 | Check image behavior | Image scales up (1.04x zoom) |
| 3 | Hover over promo without link | No hover effect |
| 4 | Move mouse away | Promo returns to default state |

---

### PC-003: Fixed Dimensions (Text Independence)
**Priority:** High  
**Precondition:** Promos with varying text lengths

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add promo with short title | Note promo dimensions |
| 2 | Add promo with long title | Compare dimensions |
| 3 | Add promo with long subtitle | Compare dimensions |
| 4 | Verify all promos | All have SAME width and height |

**Rule:** The amount of text doesn't affect the promo's width or height

---

### PC-004: Image Gradient Overlay
**Priority:** Medium  
**Precondition:** Promo with image

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View promo with image | Gradient overlay visible at bottom |
| 2 | Check gradient direction | Gradient goes from transparent (top) to black (bottom) |
| 3 | Verify text readability | White text is readable over gradient |

**Technical:** Gradient is 80% height, black at 78% opacity

---

### PC-005: Text Styling
**Priority:** Medium  
**Precondition:** Promo with title and subtitle

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check title color | Title text is white |
| 2 | Check subtitle color | Subtitle text is white |
| 3 | Check icon color | Arrow icon is white |

---

### PC-006: Image Rounded Corners
**Priority:** Medium  
**Precondition:** Promo with image

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect promo image | Rounded corners applied per design |
| 2 | Verify consistency | All promos have same corner radius |

---

## Promos Carousel Tests

### PCR-001: Carousel Arrow Variants
**Priority:** High  
**Precondition:** Access to change variant in `SecondLevel.cshtml` line 86

| Variant | Class | Arrow Position |
|---------|-------|----------------|
| 1 | `--right` | Stacked on right side |
| 2 | `--left` | Stacked on left side |
| 3 | `--center` | Split on opposite edges |
| 4 | `--center` + `close-to-edge` | Split, closer to carousel |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set variant to 1 | Arrows appear on right |
| 2 | Set variant to 2 | Arrows appear on left |
| 3 | Set variant to 3 | Arrows on opposite edges |
| 4 | Set variant to 4 | Arrows on edges, closer to content |

---

### PCR-002: Non-Looping Behavior
**Priority:** High  
**Precondition:** Carousel with multiple promos

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to first promo | Previous button is disabled/greyed out |
| 2 | Click Previous button | Nothing happens (carousel doesn't loop) |
| 3 | Navigate to last promo | Next button is disabled/greyed out |
| 4 | Click Next button | Nothing happens (carousel doesn't loop) |

**Rule:** Carousel isn't looping

---

### PCR-003: Arrow Disabled States
**Priority:** High  
**Precondition:** Carousel with multiple promos

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load carousel at start | Previous button greyed out, not clickable |
| 2 | Click Next to advance | Previous button becomes active |
| 3 | Navigate to end | Next button greyed out, not clickable |
| 4 | Verify visual state | Disabled arrows have reduced opacity |

**Rule:** The appropriate arrow is "greyed out" and no longer clickable when you get to either end of the carousel

---

### PCR-004: Arrow Visibility (All Items Visible)
**Priority:** High  
**Precondition:** Carousel with few items that all fit in viewport

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add only 2-3 promos to carousel | View on wide screen |
| 2 | Check if all promos are visible | All promos visible without scrolling |
| 3 | Verify arrow visibility | Arrows are HIDDEN when all elements visible |

**Rule:** The carousel arrows don't appear when all elements are fully visible

---

### PCR-005: Equal Height/Width Promos
**Priority:** Medium  
**Precondition:** Carousel with promos of varying content

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add promos with different text lengths | All visible |
| 2 | Measure dimensions of each promo | All promos have EQUAL dimensions |

---

## Promos Grid Tests

### PG-001: Large Screen Layout (>1440px)
**Priority:** High  
**Precondition:** Screen width > 1440px

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View grid on screen > 1440px | 4 promos display per row |
| 2 | Add 8 promos | 2 rows of 4 promos each |
| 3 | Verify alignment | Promos aligned in clean grid |

**Rule:** On screens bigger than 1440px, display 4 promos in one row

---

### PG-002: Responsive Layout (Element Count)
**Priority:** High  
**Precondition:** Ability to add/remove promos from grid

| Element Count | Expected Layout |
|---------------|-----------------|
| 1 | Single promo, full width or centered |
| 2 | 2 columns |
| 3 | 3 columns |
| 4 | 4 columns |
| 5+ | Wraps to multiple rows |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add 1 promo | Layout adapts per design |
| 2 | Add 2 promos | 2-column layout |
| 3 | Add 3 promos | 3-column layout |
| 4 | Add 4 promos | 4-column layout |
| 5 | Add 5+ promos | Multi-row layout |

**Rule:** Depending on the number of elements in the grid, it shifts the layout accordingly

---

### PG-003: Uniform Dimensions
**Priority:** Medium  
**Precondition:** Grid with promos of varying content

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add promos with different text lengths | Grid displays |
| 2 | Check promo dimensions | All promos have same width and height |
| 3 | Text overflow behavior | Long text truncates or clips |

---

## Promos End-of-Page Tests

### PEP-001: Enlarged Typography
**Priority:** Medium  
**Precondition:** End-of-page promos visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Compare end-of-page promo title | Larger than standard promo (enlarged Heading 5) |
| 2 | Compare end-of-page promo subtitle | Larger than standard promo (enlarged body copy) |

---

### PEP-002: Text Alignment
**Priority:** Medium  
**Precondition:** End-of-page promos visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check text alignment | Text is bottom-aligned OR centered |
| 2 | Verify consistency | Alignment matches design spec |

---

### PEP-003: Image Styling
**Priority:** Medium  
**Precondition:** End-of-page promos with images

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check image corners | Rounded corners applied |
| 2 | Check image padding | Padding around image per design |
| 3 | Check gradient | Gradient overlay present |

---

## Typography & Spacing Tests

### TS-001: Title Typography
**Priority:** High  
**Design Spec:** Heading 5

| Property | Expected Value |
|----------|----------------|
| Font Family | Inherited / per theme |
| Color | White (#fff) |
| Margin | 0 |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect promo title | Matches Heading 5 styling |
| 2 | Check color | White text |

---

### TS-002: Subtitle Typography
**Priority:** High  
**Design Spec:** Body Copy

| Property | Expected Value |
|----------|----------------|
| Font Family | `--primary-font` |
| Color | White (#fff) |
| Margin Top | `var(--padding-h-inner)` |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect promo subtitle | Matches Body Copy styling |
| 2 | Check color | White text |

---

### TS-003: Icon Styling
**Priority:** Medium  
**Precondition:** Promo with link (arrow visible)

| Property | Expected Value |
|----------|----------------|
| Color | White (#fff) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check arrow icon color | White |

---

## CSS Variable Inheritance Tests

### CV-001: Padding H Inner Variable
**Priority:** Medium  
**Precondition:** Access to `_theme-cssvars.scss`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--padding-h-inner` value | Document current value |
| 2 | Change to a larger value | Save and rebuild |
| 3 | View subtitle margin | Margin top increases |
| 4 | Revert to original | Spacing returns to original |

---

### CV-002: Secondary Color Variable (Carousel Buttons)
**Priority:** Medium  
**Precondition:** Promos carousel visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--secondary-color` value | Document current color |
| 2 | Change to a test value | Save and rebuild |
| 3 | View carousel arrow buttons | Button color changes |
| 4 | Revert to original | Color returns to original |

---

### CV-003: General Cards Radius Variable
**Priority:** Medium  
**Precondition:** Access to CSS variables

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--general-cards-radius` value | Document current value |
| 2 | Change to a larger value (e.g., `20px`) | Save and rebuild |
| 3 | View promo corners | Corners are more rounded |
| 4 | Revert to original | Corners return to original |

---

### CSS Variables Reference Table

| Variable | Location | Affects |
|----------|----------|---------|
| `--padding-h-inner` | `_theme-cssvars.scss` | Subtitle margin top |
| `--padding-e` | `_theme-cssvars.scss` | Card content padding (15-20px) |
| `--padding-e-inner` | `_theme-cssvars.scss` | Card content padding inner (30-40px) |
| `--secondary-color` | `_theme-cssvars.scss` | Carousel buttons |
| `--secondary-font` | `_theme-cssvars.scss` | Title font (Heading 5) |
| `--primary-font` | `_theme-cssvars.scss` | Subtitle font (Body Copy) |
| `--general-cards-radius` | `_theme-cssvars.scss` | Promo rounded corners |

---

## Font Variable Tests

### FV-001: Promo Title Font (Variant 1/2)
**Priority:** High  
**Font Variable:** `heading 5b`  
**Precondition:** Promo variant 1 or 2 visible

| Property | Expected Value |
|----------|----------------|
| Font Family | `--secondary-font` (Cormorant Garamond) |
| Font Size | `clmp(2.4rem, 3.7rem)` = 24px → 37px |
| Font Weight | 500 |
| Color | White (#fff) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect promo v1/v2 title | Font matches Heading 5b |
| 2 | Change `--secondary-font` to test font | Title font changes |
| 3 | Revert to original | Font returns to original |

---

### FV-002: Promo Title Font (Variant 3)
**Priority:** High  
**Font Variable:** `heading 5a`  
**Precondition:** Promo variant 3 visible

| Property | Expected Value |
|----------|----------------|
| Font Family | `--secondary-font` (Cormorant Garamond) |
| Font Size | `clmp(2.4rem, 3.7rem)` = 24px → 37px |
| Font Weight | 500 |
| Color | Primary color (dark) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect promo v3 title | Font matches Heading 5a |
| 2 | Change `--secondary-font` to test font | Title font changes |
| 3 | Revert to original | Font returns to original |

---

### FV-003: Promo Subtitle Font (Variant 1/2)
**Priority:** High  
**Font Variable:** `body copy b`  
**Precondition:** Promo variant 1 or 2 visible

| Property | Expected Value |
|----------|----------------|
| Font Family | `--primary-font` (Gelion) |
| Font Size | Body copy size |
| Color | White (#fff) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect promo v1/v2 subtitle | Font matches Body Copy B |
| 2 | Change `--primary-font` to test font | Subtitle font changes |
| 3 | Revert to original | Font returns to original |

---

### FV-004: Promo Subtitle Font (Variant 3)
**Priority:** High  
**Font Variable:** `body copy a`  
**Precondition:** Promo variant 3 visible

| Property | Expected Value |
|----------|----------------|
| Font Family | `--primary-font` (Gelion) |
| Font Size | Body copy size |
| Color | Primary color (dark) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect promo v3 subtitle | Font matches Body Copy A |
| 2 | Change `--primary-font` to test font | Subtitle font changes |
| 3 | Revert to original | Font returns to original |

---

### Font Variables by Component

| Component | Promo Variant | Title | Subtitle |
|-----------|---------------|-------|----------|
| Carousel (v1-4) | v1, v2 | heading 5b | body copy b |
| Carousel (v1-4) | v3 | heading 5a | body copy a |
| CT Promos + Text | v1, v2 | heading 5b | body copy b |
| CT Promos + Text | v3 | heading 5a | body copy a |
| Promos Grid | v1, v2 | heading 5b | body copy b |
| Promos Grid | v3 | heading 5a | body copy a |
| End-of-Page | v2 | heading 5b | body copy b |

---

## Known Bugs

| # | Issue | Current | Expected | File:Line |
|---|-------|---------|----------|-----------|
| 1 | Container padding uses wrong variable | `--padding-e-inner` (30-40px) | `--padding-e` (15-20px) | `_promo-card.scss:44` |
| 2 | Gradient uses hardcoded black | `rgba(0, 0, 0, ...)` | Should use `$primaryColor` | `_theme.scss:1573` |
| 3 | Subtitle margin-top smaller than spec | 6px (computed) | 10-15px (Padding H) | Viewport dependent |
| 4 | Carousel arrow hover uses wrong color | `darken($secondaryColor, 15%)` | `branding 3` (`--tertiary-color`) | `_theme.scss:245` |
| 5 | End-of-page text alignment wrong | `text-align: left` | `text-align: center` | End-of-page promo styles |

---

## Test Execution Checklist

### Promo Card
- [ ] PC-001: Link Arrow Visibility
- [ ] PC-002: Link Hover State
- [ ] PC-003: Fixed Dimensions (Text Independence)
- [ ] PC-004: Image Gradient Overlay
- [ ] PC-005: Text Styling
- [ ] PC-006: Image Rounded Corners

### Promos Carousel
- [ ] PCR-001: Carousel Arrow Variants
- [ ] PCR-002: Non-Looping Behavior
- [ ] PCR-003: Arrow Disabled States
- [ ] PCR-004: Arrow Visibility (All Items Visible)
- [ ] PCR-005: Equal Height/Width Promos

### Promos Grid
- [ ] PG-001: Large Screen Layout (>1440px)
- [ ] PG-002: Responsive Layout (Element Count)
- [ ] PG-003: Uniform Dimensions

### Promos End-of-Page
- [ ] PEP-001: Enlarged Typography
- [ ] PEP-002: Text Alignment
- [ ] PEP-003: Image Styling

### Typography & Spacing
- [ ] TS-001: Title Typography
- [ ] TS-002: Subtitle Typography
- [ ] TS-003: Icon Styling

### CSS Variable Inheritance
- [ ] CV-001: Padding H Inner Variable
- [ ] CV-002: Secondary Color Variable
- [ ] CV-003: General Cards Radius Variable

### Font Variable Tests
- [ ] FV-001: Promo Title Font (Variant 1/2)
- [ ] FV-002: Promo Title Font (Variant 3)
- [ ] FV-003: Promo Subtitle Font (Variant 1/2)
- [ ] FV-004: Promo Subtitle Font (Variant 3)

### Known Bugs
- [ ] Bug 1: Container padding wrong variable
- [ ] Bug 2: Gradient hardcoded black
- [ ] Bug 3: Subtitle margin-top smaller than spec
- [ ] Bug 4: Carousel arrow hover wrong color
- [ ] Bug 5: End-of-page text alignment wrong

---

## Appendix

### How to Change Carousel Variant

**File:** `/Website/Pages/Templates/SecondLevel.cshtml`  
**Line:** 86

```csharp
// Change first parameter (1-4) to switch variant
promosCarouselVariant = GeneralHelpers.QueryStringVariants(1, 4, "promosCarousel"),
```

Or use URL query string: `?promosCarousel=2`

### Related Files
- **Theme:** `/Website/Styles/_globals/_theme.scss` (promosCard mixin, lines 1538-1586)
- **Base Styles:** `/Website/Styles/Legacy/components/promos/_promo-card.scss`
- **Carousel Styles:** `/Website/Styles/Legacy/components/_cp-layout/_module-carousel.scss`
- **Grid Styles:** `/Website/Styles/Legacy/components/_cp-layout/_module-grid.scss`

### Promo Styling Mixin Location

**File:** `/Website/Styles/_globals/_theme.scss`

```scss
@mixin promosCard($variant) {
  // Line 1538+
  // Image gradient overlay
  // White text styling
  // Hover zoom effect (scale 1.04)
}
```

### Key Styling Details

| Element | Style |
|---------|-------|
| Image gradient | Linear, transparent to black, 78% opacity |
| Hover effect | Image zoom 1.04x scale |
| Text color | All white (#fff) |
| Subtitle margin | `var(--padding-h-inner)` from top |
