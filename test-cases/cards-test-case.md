# Cards Component Test Case

**Component:** Cards (Card, Carousel, Grid)  
**Last Updated:** 2026-01-28  
**Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/cards

---

## Table of Contents
1. [Overview](#overview)
2. [Design Specifications](#design-specifications)
3. [Color Variables](#color-variables)
4. [Font Variables](#font-variables)
5. [Spacing Variables](#spacing-variables)
6. [Code Implementation](#code-implementation)
7. [Card Tests](#card-tests)
8. [Card Carousel Tests](#card-carousel-tests)
9. [Card Grid Tests](#card-grid-tests)
10. [Color Variable Tests](#color-variable-tests)
11. [Font Variable Tests](#font-variable-tests)
12. [Spacing Variable Tests](#spacing-variable-tests)
13. [Theme Variable Cascade Tests](#theme-variable-cascade-tests)
14. [Known Bugs](#known-bugs)
15. [Test Execution Checklist](#test-execution-checklist)

---

## Overview

The Cards component displays content cards in three layouts:
- **Card**: Individual card with image, title, and description
- **Card Carousel**: Horizontal scrollable cards with navigation arrows  
- **Card Grid**: Responsive grid layout

### Variants Summary
| Component | Variants | Description |
|-----------|----------|-------------|
| Card | 3 | V1 (solid bg), V2 (gradient overlay), V3 (mixed) |
| Card Carousel | 4 | Arrow positions (right, left, center, center-edge) |
| Card Grid | 1 | Standard responsive grid |

### Card Variant Breakdown
| Variant | Image | Background | Gradient | Text Position |
|---------|-------|------------|----------|---------------|
| V1 | Yes | Fourth color (below image) | No | Below image |
| V2 | Yes | None | Yes (over image) | Over image |
| V3 | Yes | Fourth color (text box) | Yes (title overlay) | Mixed (title over, desc below) |

### CMS Tags
`{cards}`, `{cards-carousel}`, `{cards-grid}`

---

## Design Specifications (from Master Template Progress CSV)

### Card (3 Variants)

#### Variant 1:
| Element | Customizable Properties |
|---------|------------------------|
| Card | colour, rounded corners (individually), opacity |
| Image | rounded corners (individually), ratio ~3:2 |

#### Variant 2:
| Element | Customizable Properties |
|---------|------------------------|
| Card | colour, rounded corners (individually), opacity |
| Gradient | Primary color gradient overlay |

#### Variant 3:
| Element | Customizable Properties |
|---------|------------------------|
| Card | colour, rounded corners (individually), opacity |
| Title gradient | Black gradient over image |
| Text box | Fourth color background |

### Card Behavior Rules:
- [ ] Arrow appears and hover works ONLY when a link/slide-out is added
- [ ] Body copy from summary field - do NOT truncate
- [ ] Image ratio is roughly 3:2, adding more text doesn't affect it
- [ ] Text extends card downward (not image)

---

### Card Carousel Rules:
| Rule | Description |
|------|-------------|
| No looping | Carousel isn't looping |
| Arrow disabled | Arrow is "greyed out" and not clickable at ends |
| Arrow visibility | Arrows don't appear when all elements are fully visible |
| Equal height | Card with most content determines height of all cards |
| Fade animation | Animate away disappearing cards (fade effect) |

### Carousel Arrow Variants:
| Variant | Class | Arrow Position |
|---------|-------|----------------|
| 1 | `--right` | Stacked on right side |
| 2 | `--left` | Stacked on left side |
| 3 | `--center` | Split on opposite edges |
| 4 | `--center` + `close-to-edge` | Split, closer to carousel |

---

### Card Grid Rules:
| Rule | Description |
|------|-------------|
| Desktop (>1440px) | Display 4 cards in one row |
| Layout shift | Layout shifts based on number of elements |
| Row height | Card with most text in a specific row determines that row's height |
| Unequal rows | Rows don't have to have equal height |

---

## Color Variables (from CSV)

### Card Variant 1 (Light Background):
| Element | Color Variable | CSS Variable | Expected Hex |
|---------|----------------|--------------|--------------|
| Description text | `branding 1` | `--primary-color` | `#1c2b3c` |
| Title text | `branding 1` | `--primary-color` | `#1c2b3c` |
| Read more icon | `branding 1` | `--primary-color` | `#1c2b3c` |
| Content background | `branding 4` | `--fourth-color` | `#e4e7e9` |

### Card Variant 2 (Gradient Overlay):
| Element | Color Variable | CSS Variable | Expected Hex |
|---------|----------------|--------------|--------------|
| Description text | `branding white` | hardcoded `#fff` | `#ffffff` |
| Title text | `branding white` | hardcoded `#fff` | `#ffffff` |
| Read more icon | `branding white` | hardcoded `#fff` | `#ffffff` |
| Text gradient | `branding 1` | `$primaryColor` (SCSS) ⚠️ | `#1c2b3c` |

### Card Variant 3 (Mixed):
| Element | Color Variable | CSS Variable | Expected Hex |
|---------|----------------|--------------|--------------|
| Description text (over image) | `branding white` | hardcoded `#fff` | `#ffffff` |
| Title text | `branding white` | hardcoded `#fff` | `#ffffff` |
| Description text (in box) | `branding 1` | `--primary-color` | `#1c2b3c` |
| Read more icon | `branding white` | hardcoded `#fff` | `#ffffff` |
| Text box background | `branding 4` | `--fourth-color` | `#e4e7e9` |
| Title gradient | `branding black` | hardcoded | `#000000` |

### Carousel Navigation (all variants):
| Element | Color Variable | CSS Variable | Expected Hex |
|---------|----------------|--------------|--------------|
| Arrow icon | `branding 1` | `--primary-color` | `#1c2b3c` |
| Arrow background | `branding 2` | `--secondary-color` | TBD |
| Arrow background (hover) | `branding 3` | `--third-color` | TBD |
| Arrow (disabled) | `branding 1` | `--primary-color` | `#1c2b3c` |

---

## Font Variables (from CSV)

### Card Font Styles:
| Element | Variant | Font Variable |
|---------|---------|---------------|
| Title | V1 | `heading 5a` |
| Description | V1 | `body copy a` |
| Title | V2 | `heading 5b` |
| Description | V2 | `body copy b` |
| Title | V3 | `heading 5b` |
| Description | V3 | `body copy a` |

### Font Properties:
| Style | Property | Expected Value |
|-------|----------|----------------|
| Heading 5 | Line height | ~1.2 |
| Heading 5 | Max lines | 8 (with ellipsis) |
| Body Copy | Line height | ~1.45 |
| Body Copy | Max lines | 20 (with ellipsis) |

---

## Spacing Variables (from CSV)

### Card Spacing:
| Element | Location | Padding Variable | Expected Value |
|---------|----------|------------------|----------------|
| Text box | Top | `Padding E` | `var(--padding-e-inner)` |
| Text box | Bottom | `Padding E` | `var(--padding-e-inner)` |
| Text box | Left | `Padding E` | `var(--padding-e-inner)` |
| Text box | Right | `Padding E` | `var(--padding-e-inner)` |
| Title | Bottom (gap) | `Padding G` | `var(--padding-g-inner)` |

### Variant-Specific Spacing (V3):
| Element | Location | Padding Variable |
|---------|----------|------------------|
| Title | Bottom | `Padding E` |
| Title | Left | `Padding E` |
| Title | Right | `Padding E` |
| Description box | All sides | `Padding E` |

### Expected Padding Values by Viewport:
| Viewport | Padding C | Padding E | Padding G |
|----------|-----------|-----------|-----------|
| 375px | 50px | 30px | 15px |
| 1440px | 70px | 30px | 15px |
| 2560px | 90px | 40px | 20px |

---

## Code Implementation (from SCSS & Theme files)

### Source Files:
| File | Purpose |
|------|---------|
| `_cards-card.scss` | Base component styles |
| `_theme.scss:1393-1483` | cardsCard mixin (theme styles) |
| `_module-carousel.scss` | Carousel container styles |
| `_module-grid.scss` | Grid layout styles |

### CSS Variables Used (from _cards-card.scss):
```scss
// Border radius
var(--general-cards-radius)     // Line 14 - card/image corners

// Padding variables  
var(--padding-c-inner)          // Line 64 - description padding
var(--padding-e-inner)          // Line 83 - margin-top gap
var(--padding-a-inner)          // Line 211 - single card layout
var(--padding-b-inner)          // Line 211 - single card layout
```

### Theme Styles (from _theme.scss:1393-1483):
```scss
@mixin cardsCard {
  .cards-card__description {
    color: var(--primary-color);        // Line 1395 ✓
  }

  .cards-card__image {
    &:before {
      background: linear-gradient(to bottom, 
        rgba($primaryColor, 0) 0%,       // Line 1429 ⚠️ BUG: SCSS variable
        rgba($primaryColor, 1) 100%);
    }
  }

  &.v1 {
    .cards-card__description {
      background: var(--fourth-color);   // Line 1436 ✓
    }
  }

  &.v2 {
    .cards-card__title {
      color: #fff;                       // Line 1444 - hardcoded (by design)
    }
    .cards-card__description {
      color: #fff;                       // Line 1448 - hardcoded (by design)
    }
  }

  &.v3 {
    .cards-card__description {
      color: #fff;                       // Line 1455 - hardcoded (by design)
    }
    .cards-card__title {
      color: #fff;                       // Line 1459 - hardcoded (by design)
    }
    .cards-card__text {
      background: var(--fourth-color);   // Line 1463 ✓
      color: var(--primary-color);       // Line 1464 ✓
    }
  }

  &.grid-card--single-card {
    background: var(--fourth-color);     // Line 1469 ✓
  }
}
```

### Query String for Variants:
- `?cardsCard=1` - Card variant 1 (default)
- `?cardsCard=2` - Card variant 2 ⚠️ **BUG: Breaks page - no cards display**
- `?cardsCard=3` - Card variant 3 ⚠️ **BUG: Likely same issue**
- **Note:** The `?card=X` shorthand does NOT work - use `?cardsCard=X`
- `?cardsCarousel=1` - Carousel variant 1 (arrows right)
- `?cardsCarousel=2` - Carousel variant 2 (arrows left)
- `?cardsCarousel=3` - Carousel variant 3 (arrows center)
- `?cardsCarousel=4` - Carousel variant 4 (arrows center-edge)

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

**Note:** Current implementation has 20 lines for description and 8 lines for title limit with ellipsis in SCSS

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
**Priority:** High  
**Precondition:** Card set to variant 1 (`?card=1`)

| Element | Property | Expected Value | CSS Variable |
|---------|----------|----------------|--------------|
| Description text | color | `#1c2b3c` | `var(--primary-color)` |
| Title text | color | `#1c2b3c` | inherited |
| Description area | background | `#e4e7e9` | `var(--fourth-color)` |
| Card corners | border-radius | themed | `var(--general-cards-radius)` |
| Image corners | border-radius | themed | `var(--general-cards-radius)` |
| Content padding | padding | 30-40px | `var(--padding-c-inner)` |

---

### CC-006: Card Variant 2 Styling
**Priority:** High  
**Precondition:** Card set to variant 2 (`?card=2`)

| Element | Property | Expected Value | CSS Variable |
|---------|----------|----------------|--------------|
| Title text | color | `#ffffff` | hardcoded `#fff` |
| Title | text-align | left | CSS |
| Description text | color | `#ffffff` | hardcoded `#fff` |
| Description | text-align | left | CSS |
| Gradient overlay | background | primary→transparent | `rgba($primaryColor, ...)` ⚠️ |

**Known Issue:** Gradient uses SCSS `$primaryColor` variable instead of CSS `var(--primary-color)` - won't cascade dynamically

---

### CC-007: Card Variant 3 Styling
**Priority:** High  
**Precondition:** Card set to variant 3 (`?card=3`)

| Element | Property | Expected Value | CSS Variable |
|---------|----------|----------------|--------------|
| Title text (over image) | color | `#ffffff` | hardcoded `#fff` |
| Description text (over image) | color | `#ffffff` | hardcoded `#fff` |
| Text box background | background | `#e4e7e9` | `var(--fourth-color)` |
| Text in text box | color | `#1c2b3c` | `var(--primary-color)` |

---

### CC-008: Title Text Ellipsis
**Priority:** Medium  
**Precondition:** Cards with long titles

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add card with very long title | Title truncates with ellipsis |
| 2 | Verify line limit | Title shows max ~8 lines before truncation |
| 3 | Inspect CSS | `@include ellipsis(1.2, 8, 2.4rem, 3.7rem)` applied |

---

### CC-009: Single Card Layout
**Priority:** Medium  
**Precondition:** Only one card in a widget

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add single card | Card displays with `grid-card--single-card` class |
| 2 | Check background | Fourth color background applied |
| 3 | Check layout | Special centered layout applies |
| 4 | Check padding | Uses `var(--padding-a-inner)` and `var(--padding-b-inner)` |

---

## Card Carousel Tests

### CCR-001: Carousel Arrow Variants
**Priority:** High  
**Precondition:** Access to change variant via URL param

| Variant | URL Param | Expected Arrow Position |
|---------|-----------|-------------------------|
| 1 | `?cardsCarousel=1` | Stacked on right side |
| 2 | `?cardsCarousel=2` | Stacked on left side |
| 3 | `?cardsCarousel=3` | Split on opposite edges |
| 4 | `?cardsCarousel=4` | Split, closer to content |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set variant to 1 | Arrows appear stacked on right |
| 2 | Set variant to 2 | Arrows appear stacked on left |
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
| 1 | Single card, centered or full width |
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

## Color Variable Tests

### COL-001: Card V1 Colors
| Element | Expected | CSS Variable | Verified |
|---------|----------|--------------|----------|
| Description text | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Title text | `branding 1` (#1c2b3c) | inherited | [ ] |
| Read more icon | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Content background | `branding 4` (#e4e7e9) | `--fourth-color` | [ ] |

### COL-002: Card V2 Colors
| Element | Expected | CSS Variable | Verified |
|---------|----------|--------------|----------|
| Title text | `branding white` (#fff) | hardcoded | [ ] |
| Description text | `branding white` (#fff) | hardcoded | [ ] |
| Read more icon | `branding white` (#fff) | hardcoded | [ ] |
| Gradient overlay | `branding 1` gradient | `$primaryColor` ⚠️ | [ ] |

### COL-003: Card V3 Colors
| Element | Expected | CSS Variable | Verified |
|---------|----------|--------------|----------|
| Title text | `branding white` (#fff) | hardcoded | [ ] |
| Description (over image) | `branding white` (#fff) | hardcoded | [ ] |
| Description (in box) | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Text box background | `branding 4` (#e4e7e9) | `--fourth-color` | [ ] |

---

## Font Variable Tests

### FV-001: Heading 5a (Title V1)
| Property | Expected |
|----------|----------|
| Font family | Primary font |
| Line height | 1.2 |
| Max lines | 8 (with ellipsis) |

### FV-002: Body Copy a (Description V1, V3)
| Property | Expected |
|----------|----------|
| Font family | `--primary-font` |
| Line height | 1.45 |
| Max lines | 20 (with ellipsis) |

### FV-003: Heading 5b (Title V2, V3)
| Property | Expected |
|----------|----------|
| Font family | Primary font |
| Color | `#ffffff` |

### FV-004: Body Copy b (Description V2)
| Property | Expected |
|----------|----------|
| Font family | `--primary-font` |
| Color | `#ffffff` |

---

## Spacing Variable Tests

### SV-001: Padding C (Description Padding)
| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px | 50px | | [ ] |
| 768px | ~60px | | [ ] |
| 1440px | 70px | | [ ] |
| 2560px | 90px | | [ ] |

### SV-002: Padding E (Text Box/Margin)
| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px | 30px | | [ ] |
| 768px | ~32px | | [ ] |
| 1440px | 30px | | [ ] |
| 2560px | 40px | | [ ] |

### SV-003: Padding G (Title Gap)
| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px | 15px | | [ ] |
| 768px | ~16px | | [ ] |
| 1440px | 15px | | [ ] |
| 2560px | 20px | | [ ] |

---

## Theme Variable Cascade Tests

These tests verify that changing a CSS variable affects all card components.

### TV-001: Change --primary-color
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--primary-color` to `#ff0000` | V1 description text turns red |
| 2 | Check V1 title | Red |
| 3 | Check V1 read more icon | Red |
| 4 | Check V3 text-box text | Red |
| 5 | Check V2/V3 title & description | Remains white (hardcoded by design) |

### TV-002: Change --fourth-color
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--fourth-color` to `#ffcccc` | V1 content background changes |
| 2 | Check V1 background | Pink |
| 3 | Check V3 text-box background | Pink |
| 4 | Check single-card background | Pink |

### TV-003: Change --padding-c-inner
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--padding-c-inner` to `50px` | Description padding increases |
| 2 | Check V1 padding | 50px |
| 3 | Check V3 padding | 50px |

### TV-004: Change --padding-e-inner
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--padding-e-inner` to `50px` | Margin-top gap increases |
| 2 | Check element spacing | 50px |

### TV-005: Change --general-cards-radius
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--general-cards-radius` to `2rem` | All card corners more rounded |
| 2 | Check V1 card radius | 2rem |
| 3 | Check V2 card radius | 2rem |
| 4 | Check V3 card radius | 2rem |
| 5 | Check image radius | 2rem |

### TV-006: Verify Gradient Bug (--primary-color)
| Step | Action | Expected Result | Bug Status |
|------|--------|-----------------|------------|
| 1 | Change `--primary-color` to `#ff0000` | Gradient should turn red | ⚠️ |
| 2 | Check V2 gradient overlay | Gradient does NOT change | BUG |
| 3 | Reason | Uses `$primaryColor` (SCSS), not CSS variable | Confirmed |

---

## Known Bugs

| # | Severity | Issue | Current | Expected | File:Line |
|---|----------|-------|---------|----------|-----------|
| 1 | Medium | V2 gradient uses SCSS variable | `rgba($primaryColor, ...)` | `rgba(var(--primary-color-rgb), ...)` | `_theme.scss:1429` |

### Bug Details:

**BUG-001: V2 Gradient Doesn't Use CSS Variable**
- **Location:** `/Website/Styles/_globals/_theme.scss:1429`
- **Current Code:** 
  ```scss
  background: linear-gradient(to bottom, rgba($primaryColor, 0) 0%, rgba($primaryColor, 1) 100%);
  ```
- **Expected Code:**
  ```scss
  background: linear-gradient(to bottom, rgba(var(--primary-color-rgb), 0) 0%, rgba(var(--primary-color-rgb), 1) 100%);
  ```
- **Impact:** Gradient overlay color won't change when theme `--primary-color` is modified. Requires SCSS recompilation to change gradient color.
- **Severity:** Medium - Affects theme customization for V2 cards

---

## Test Execution Checklist

### Card Behavior
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

### Color Variable Tests
- [ ] COL-001: V1 colors
- [ ] COL-002: V2 colors
- [ ] COL-003: V3 colors

### Font Variable Tests
- [ ] FV-001: Heading 5a
- [ ] FV-002: Body copy a
- [ ] FV-003: Heading 5b
- [ ] FV-004: Body copy b

### Spacing Variable Tests
- [ ] SV-001: Padding C
- [ ] SV-002: Padding E
- [ ] SV-003: Padding G

### Theme Variable Cascade Tests
- [ ] TV-001: --primary-color change
- [ ] TV-002: --fourth-color change
- [ ] TV-003: --padding-c-inner change
- [ ] TV-004: --padding-e-inner change
- [ ] TV-005: --general-cards-radius change
- [ ] TV-006: Verify gradient bug

---

## Responsive Tests

### Breakpoints to Test
| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile M | 375px | Standard mobile |
| Tablet | 768px | Tablet |
| Desktop M | 1440px | Standard desktop |
| Desktop L | 2560px | Large desktop |

### RESP-001: Card Responsive Behavior
| Viewport | Expected Behavior |
|----------|-------------------|
| Mobile (<768px) | Full width cards, stacked |
| Tablet (768-1439px) | 2-3 cards per row |
| Desktop (>1440px) | 4 cards per row (grid) |

---

## Test URLs

### Staging URLs:
| Component | URL |
|-----------|-----|
| Cards Page | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/cards` |
| Card V1 | `...cards?card=1` |
| Card V2 | `...cards?card=2` |
| Card V3 | `...cards?card=3` |
| Carousel V1 | `...cards?cardsCarousel=1` |
| Carousel V2 | `...cards?cardsCarousel=2` |
| Carousel V3 | `...cards?cardsCarousel=3` |
| Carousel V4 | `...cards?cardsCarousel=4` |

---

## Related Files

| File | Path | Purpose |
|------|------|---------|
| `_cards-card.scss` | `/Website/Styles/Legacy/components/cards/` | Base component styles |
| `_theme.scss:1393-1483` | `/Website/Styles/_globals/` | cardsCard mixin |
| `_theme-cssvars.scss` | `/Website/Styles/_globals/` | CSS variable definitions |
| `_module-carousel.scss` | `/Website/Styles/Legacy/components/_cp-layout/` | Carousel styles |
| `_module-grid.scss` | `/Website/Styles/Legacy/components/_cp-layout/` | Grid styles |
| `SecondLevel.cshtml` | `/Website/Pages/Templates/` | Variant control (line 73) |

### CSS Variables Reference

| Variable | Default | Usage |
|----------|---------|-------|
| `--primary-color` | `#1c2b3c` | V1/V3 text color |
| `--fourth-color` | `#e4e7e9` | V1/V3 content background |
| `--primary-font` | Gelion | Font family |
| `--general-cards-radius` | `var(--general-bradius)` | Border radius |
| `--padding-c-inner` | `clmp(70px, 90px)` | Description padding |
| `--padding-e-inner` | `clmp(30px, 40px)` | Margin/spacing |

---

## Notes

- V2 and V3 use hardcoded `#fff` for text colors - this is intentional design (white text on dark gradient)
- The gradient overlay in V2 uses SCSS `$primaryColor` - this is a **bug** that prevents dynamic theme changes
- Single card layout has special styling with centered content and larger padding
- Card content extends vertically to accommodate text while maintaining image ratio
