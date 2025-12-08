# Cards Component Test Case

**Component:** Cards (Card, Carousel, Grid)  

**Last Updated:** 2025-12-01  
**Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/content-page-cards

---

## Table of Contents
1. [Overview](#overview)
2. [Test Environment](#test-environment)
3. [Card Tests](#card-tests)
4. [Card Carousel Tests](#card-carousel-tests)
5. [Card Grid Tests](#card-grid-tests)
6. [Typography & Spacing Tests](#typography--spacing-tests)
7. [CSS Variable Inheritance Tests](#css-variable-inheritance-tests)
8. [Test Execution Checklist](#test-execution-checklist)

---

## Overview

The Cards component displays content cards in three layouts:
- **Card**: Individual card display with image, title, and description
- **Card Carousel**: Horizontal scrollable cards with navigation arrows
- **Card Grid**: Responsive grid layout

### Variants
| Component | Variants | Description |
|-----------|----------|-------------|
| Card | 3 | Different styling (background/gradient combinations) |
| Card Carousel | 4 | Arrow positions (right, left, center, center-edge) |
| Card Grid | 1 | Standard grid |

### Card Variant Breakdown
| Variant | Image | Background | Gradient | Text Position |
|---------|-------|------------|----------|---------------|
| V1 | Yes | Fourth color | No | Below image |
| V2 | Yes | None | Yes (over image) | Over image |
| V3 | Yes | Fourth color | Yes (over image) | Mixed |

---

## Test Environment

| Requirement | Details |
|-------------|---------|
| Browsers | Chrome, Firefox, Safari, Edge |
| Breakpoints | 375px (mobile), 768px (tablet), 1024px, 1440px, 2560px (desktop) |
| Devices | Desktop, Tablet, Mobile |

---

## Card Tests

### CC-001: Link Arrow Visibility
**Priority:** High  
**Precondition:** Cards with and without links/slide-outs

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View card WITHOUT a link | Arrow icon is NOT visible |
| 2 | View card WITH a link | Arrow icon IS visible |
| 3 | View card with slide-out enabled | Arrow icon IS visible |
| 4 | Add link to existing card | Arrow appears |
| 5 | Remove link from card | Arrow disappears |

**Rule:** Only when a link/slide-out has been added, the arrow appears and the hover works

---

### CC-002: Link Hover State
**Priority:** High  
**Precondition:** Card with a link added

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Hover over linked card | Hover effect activates |
| 2 | Hover over card without link | No hover effect |
| 3 | Move mouse away from linked card | Card returns to default state |

---

### CC-003: Body Copy Display (No Truncation)
**Priority:** High  
**Precondition:** Cards with varying description lengths

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add card with short summary | Full text displays |
| 2 | Add card with long summary (multiple paragraphs) | Full text displays, NO truncation |
| 3 | Verify card extends downward | Card height increases to accommodate text |

**Rule:** The card displays body copy from the summary field. Do not truncate.

**Note:** Current implementation has 20 lines for description and 8 lines for title limit in CMS

---

### CC-004: Image Ratio Preservation
**Priority:** High  
**Precondition:** Cards with images and varying text lengths

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add card with image and short text | Image displays at ~3:2 ratio |
| 2 | Add card with image and long text | Image ratio remains ~3:2 |
| 3 | Compare both cards | Adding text extends card downward, NOT affecting image |

**Rule:** Image's ratio is roughly 3:2, and adding more text doesn't affect it

---

### CC-005: Card Variant 1 Styling
**Priority:** Medium  
**Precondition:** Card set to variant 1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View card variant 1 | Description area has fourth-color background |
| 2 | Check image corners | Image has rounded corners per design |
| 3 | Check card corners | Card has rounded corners per design |

---

### CC-006: Card Variant 2 Styling
**Priority:** Medium  
**Precondition:** Card set to variant 2

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View card variant 2 | Gradient overlay on image |
| 2 | Check title alignment | Title is left-aligned |
| 3 | Check title color | Title is white |
| 4 | Check description color | Description is white |
| 5 | Check description alignment | Description is left-aligned |

---

### CC-007: Card Variant 3 Styling
**Priority:** Medium  
**Precondition:** Card set to variant 3

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View card variant 3 | Description has white color |
| 2 | Check title color | Title is white |
| 3 | Check text background | Text area has fourth-color background |
| 4 | Check text color in text area | Text is primary color |

---

### CC-008: Title Text Ellipsis
**Priority:** Medium  
**Precondition:** Cards with long titles

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add card with very long title | Title truncates with ellipsis |
| 2 | Verify line limit | Title shows max ~8 lines before truncation |

---

### CC-009: Single Card Layout
**Priority:** Medium  
**Precondition:** Only one card in a widget

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add single card | Card displays with fourth-color background |
| 2 | Check layout | Special single-card layout applies |

---

## Card Carousel Tests

### CCR-001: Carousel Arrow Variants
**Priority:** High  
**Precondition:** Access to change variant in `SecondLevel.cshtml` line 73

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

### CCR-002: Equal Height Cards
**Priority:** High  
**Precondition:** Carousel with cards of varying content lengths

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add cards with different content amounts | All visible |
| 2 | Measure height of each card | All cards have EQUAL height |
| 3 | Verify tallest card determines height | Shorter cards stretch to match |

**Rule:** The card with the most content determines the height of every card in the carousel

---

### CCR-003: Non-Looping Behavior
**Priority:** High  
**Precondition:** Carousel with multiple cards

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to first card | Previous button is disabled/greyed out |
| 2 | Click Previous button | Nothing happens (carousel doesn't loop) |
| 3 | Navigate to last card | Next button is disabled/greyed out |
| 4 | Click Next button | Nothing happens (carousel doesn't loop) |

**Rule:** Carousel isn't looping

---

### CCR-004: Arrow Disabled States
**Priority:** High  
**Precondition:** Carousel with multiple cards

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load carousel at start | Previous button greyed out, not clickable |
| 2 | Click Next to advance | Previous button becomes active |
| 3 | Navigate to end | Next button greyed out, not clickable |
| 4 | Verify visual state | Disabled arrows have reduced opacity |

**Rule:** The appropriate arrow is "greyed out" and no longer clickable when you get to either end of the carousel

---

### CCR-005: Arrow Visibility (All Items Visible)
**Priority:** High  
**Precondition:** Carousel with few items that all fit in viewport

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add only 2-3 cards to carousel | View on wide screen |
| 2 | Check if all cards are visible | All cards visible without scrolling |
| 3 | Verify arrow visibility | Arrows are HIDDEN when all elements visible |

**Rule:** The carousel arrows don't appear when all elements are fully visible

---

### CCR-006: Fade Animation
**Priority:** Low  
**Precondition:** Carousel with multiple cards

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click Next arrow | Disappearing card fades away |
| 2 | Click Previous arrow | Appearing card fades in |
| 3 | Verify smooth transition | Animation is smooth and not jarring |

**Rule:** Animate away the disappearing card (fade away effect)

---

## Card Grid Tests

### CG-001: Large Screen Layout (>1440px)
**Priority:** High  
**Precondition:** Screen width > 1440px

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View grid on screen > 1440px | 4 cards display per row |
| 2 | Add 8 cards | 2 rows of 4 cards each |
| 3 | Verify alignment | Cards aligned in clean grid |

**Rule:** On screens bigger than 1440px, display 4 cards in one row

---

### CG-002: Responsive Layout (Element Count)
**Priority:** High  
**Precondition:** Ability to add/remove cards from grid

| Element Count | Expected Layout |
|---------------|-----------------|
| 1 | Single card, full width or centered |
| 2 | 2 columns |
| 3 | 3 columns |
| 4 | 4 columns |
| 5+ | Wraps to multiple rows |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add 1 card | Layout adapts per design |
| 2 | Add 2 cards | 2-column layout |
| 3 | Add 3 cards | 3-column layout |
| 4 | Add 4 cards | 4-column layout |
| 5 | Add 5+ cards | Multi-row layout |

**Rule:** Depending on the number of elements in the grid, it shifts the layout accordingly

---

### CG-003: Row Height Behavior
**Priority:** High  
**Precondition:** Grid with cards of varying content

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add cards with different text lengths | Grid displays |
| 2 | Check row heights | Tallest card in each ROW sets that row's height |
| 3 | Compare different rows | Rows can have DIFFERENT heights |

**Rule:** A card in a specific row with the most text determines the height of that row. Rows don't have to have an equal height.

---

## Typography & Spacing Tests

### TS-001: Title Typography
**Priority:** High  
**Design Spec:** Heading 5

| Property | Expected Value |
|----------|----------------|
| Font Family | Inherited / per theme |
| Font Size | Responsive (clamp-based) |
| Line Height | ~1.2 |
| Max Lines | 8 (with ellipsis) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect card title | Matches Heading 5 styling |
| 2 | Check overflow behavior | Ellipsis after ~8 lines |

---

### TS-002: Description Typography
**Priority:** High  
**Design Spec:** Body Copy

| Property | Expected Value |
|----------|----------------|
| Font Family | `--primary-font` |
| Font Size | Responsive |
| Line Height | ~1.45 |
| Max Lines | 20 (with ellipsis) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect card description | Matches Body Copy styling |
| 2 | Check color | Uses `--primary-color` |

---

### TS-003: Image Styling
**Priority:** Medium  
**Design Spec:** Per variant

| Property | Expected Value |
|----------|----------------|
| Aspect Ratio | ~3:2 |
| Rounded Corners | `var(--general-cards-radius)` |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect card image | Rounded corners applied |
| 2 | Check aspect ratio | Maintains ~3:2 ratio |

---

## CSS Variable Inheritance Tests

### CV-001: Primary Color Variable
**Priority:** High  
**Precondition:** Access to `_theme-cssvars.scss`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--primary-color` value | Document current color |
| 2 | Change `--primary-color` to a test value | Save and rebuild |
| 3 | View card description | Description color changes |
| 4 | Revert to original | Colors return to original |

---

### CV-002: Fourth Color Variable (Card Background)
**Priority:** High  
**Precondition:** Card variant 1 or 3

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--fourth-color` value | Document current color |
| 2 | Change `--fourth-color` to a test value | Save and rebuild |
| 3 | View card description area (V1) | Background color changes |
| 4 | Revert to original | Background returns to original |

---

### CV-003: General Cards Radius Variable
**Priority:** Medium  
**Precondition:** Access to CSS variables

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--general-cards-radius` value | Document current value |
| 2 | Change to a larger value (e.g., `20px`) | Save and rebuild |
| 3 | View card corners | Corners are more rounded |
| 4 | Revert to original | Corners return to original |

---

### CV-004: Primary Font Variable
**Priority:** Medium  
**Precondition:** Access to `_theme-cssvars.scss`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--primary-font` value | Document current font |
| 2 | Change to a different font | Save and rebuild |
| 3 | View card description | Font family changes |
| 4 | Revert to original | Font returns to original |

---

### CSS Variables Reference Table

| Variable | Location | Affects |
|----------|----------|---------|
| `--primary-color` | `_theme-cssvars.scss` | Description text color |
| `--fourth-color` | `_theme-cssvars.scss` | Card background (V1, V3) |
| `--primary-font` | `_theme-cssvars.scss` | Description font family |
| `--general-cards-radius` | `_theme-cssvars.scss` | Card & image rounded corners |
| `--secondary-color` | `_theme-cssvars.scss` | Carousel buttons |

---

## Test Execution Checklist

### Card
- [ ] CC-001: Link Arrow Visibility
- [ ] CC-002: Link Hover State
- [ ] CC-003: Body Copy Display (No Truncation)
- [ ] CC-004: Image Ratio Preservation
- [ ] CC-005: Card Variant 1 Styling
- [ ] CC-006: Card Variant 2 Styling
- [ ] CC-007: Card Variant 3 Styling
- [ ] CC-008: Title Text Ellipsis
- [ ] CC-009: Single Card Layout

### Card Carousel
- [ ] CCR-001: Carousel Arrow Variants
- [ ] CCR-002: Equal Height Cards
- [ ] CCR-003: Non-Looping Behavior
- [ ] CCR-004: Arrow Disabled States
- [ ] CCR-005: Arrow Visibility (All Items Visible)
- [ ] CCR-006: Fade Animation

### Card Grid
- [ ] CG-001: Large Screen Layout (>1440px)
- [ ] CG-002: Responsive Layout (Element Count)
- [ ] CG-003: Row Height Behavior

### Typography & Spacing
- [ ] TS-001: Title Typography
- [ ] TS-002: Description Typography
- [ ] TS-003: Image Styling

### CSS Variable Inheritance
- [ ] CV-001: Primary Color Variable
- [ ] CV-002: Fourth Color Variable
- [ ] CV-003: General Cards Radius Variable
- [ ] CV-004: Primary Font Variable

---

## Appendix

### How to Change Carousel Variant

**File:** `/Website/Pages/Templates/SecondLevel.cshtml`  
**Line:** 73

```csharp
// Change first parameter (1-4) to switch variant
cardsCarouselVariant = GeneralHelpers.QueryStringVariants(1, 4, "cardsCarousel"),
```

Or use URL query string: `?cardsCarousel=2`

### Related Files
- **Theme:** `/Website/Styles/_globals/_theme.scss` (cardsCard mixin, lines 1361-1500+)
- **Base Styles:** `/Website/Styles/Legacy/components/cards/_cards-card.scss`
- **Carousel Styles:** `/Website/Styles/Legacy/components/_cp-layout/_module-carousel.scss`
- **Grid Styles:** `/Website/Styles/Legacy/components/_cp-layout/_module-grid.scss`

### Card Styling Mixin Location

**File:** `/Website/Styles/_globals/_theme.scss`

```scss
@mixin cardsCard {
  // Line 1363+
  // Variant-specific styles: &.v1, &.v2, &.v3
}
```
