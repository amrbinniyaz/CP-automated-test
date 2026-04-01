# Stories Test Cases

## Overview
This document contains test cases for the Stories component, covering Story Cards (3 variants), Stories Carousel (2 variants), Stories Grid, and Stories Carousel end-of-page.

**Components:**
- Story Card (3 variants)
- Stories Carousel (2 variants)
- Stories Grid
- Stories Carousel end-of-page
- Stories slide-out (in progress - not tested)

**CMS Tags:** `{stories}`, `{stories-grid}`

---

## Design Specifications (from Master Template Progress CSV)

### Story Card (3 Variants)

#### Variant 1:
| Element | Customizable Properties |
|---------|------------------------|
| Character styles | Inline link, body copy |
| Card | colour, rounded corners (individually), opacity |
| Image | rounded corners (individually), padding |
| Button (plus) | replaceable SVG |

#### Variant 2:
| Element | Customizable Properties |
|---------|------------------------|
| Character styles | Inline link, body copy |
| Card | colour, rounded corners (individually), opacity |
| Image | rounded corners (individually) |

#### Variant 3:
| Element | Customizable Properties |
|---------|------------------------|
| Character styles | Inline link, body copy |
| Card | colour, rounded corners (individually), opacity |
| Image | rounded corners (individually) |
| Icon container | Social platform color badge (positioned top-left) |

### Story Card Behavior Rules:
- [ ] Date should be relative (e.g. "2 days ago")
- [ ] The text truncates after 4 lines of copy

---

### Stories Carousel Rules:
| Rule | Description |
|------|-------------|
| Max items | Pull max 12 stories |
| Looping | Carousel isn't looping |
| Arrow disabled | Arrow is "greyed out" and no longer clickable at ends |
| Arrow visibility | Arrows don't appear when all elements are fully visible |

---

### Stories Grid Rules:
| Rule | Description |
|------|-------------|
| Desktop (>1440px) | Display 4 stories in one row |
| Desktop max | Max 8 stories appear on desktop |
| Mobile max | Max 4 stories on mobile |

---

## Color Variables (from CSV)

### Story Card Variant 1 (Light Background):
| Element | Color Variable | CSS Variable | Hex Value |
|---------|----------------|--------------|-----------|
| Social handle | `branding 1` | `--primary-color` | `#1c2b3c` |
| Description text | `branding 1` | `--primary-color` | `#1c2b3c` |
| Date | `branding 1` | `--primary-color` | `#1c2b3c` |
| Read more icon | `branding 1` | `--primary-color` | `#1c2b3c` |
| Content background | `branding 4` | `--fourth-color` | `#e4e7e9` |

### Story Card Variant 2 (Light Background):
| Element | Color Variable | CSS Variable | Hex Value |
|---------|----------------|--------------|-----------|
| Social handle | `branding 1` | `--primary-color` | `#1c2b3c` |
| Description text | `branding 1` | `--primary-color` | `#1c2b3c` |
| Date | `branding 1` | `--primary-color` | `#1c2b3c` |
| Read more icon | `branding 1` | `--primary-color` | `#1c2b3c` |
| Content background | `branding 4` | `--fourth-color` | `#e4e7e9` |

### Story Card Variant 3 (With Icon Badge):
| Element | Color Variable | CSS Variable | Hex Value |
|---------|----------------|--------------|-----------|
| Social handle | `branding white` | hardcoded | `#ffffff` |
| Description text | `branding 1` | `--primary-color` | `#1c2b3c` |
| Date | `branding 1` | `--primary-color` | `#1c2b3c` |
| Read more icon | `branding 1` | `--primary-color` | `#1c2b3c` |
| Content background | `branding 4` | `--fourth-color` | `#e4e7e9` |

### Stories Carousel:
| Element | Color Variable | CSS Variable | Hex Value |
|---------|----------------|--------------|-----------|
| Title | `branding white` | hardcoded | `#ffffff` |
| Background | `branding 1` | `--primary-color` | `#1c2b3c` |
| More stories button bg | `branding 2` | `--secondary-color` | TBD |
| More stories button text | `branding 1` | `--primary-color` | `#1c2b3c` |
| More stories button (hover) bg | `branding 3` | `--third-color` | TBD |
| More stories button (hover) text | `branding white` | hardcoded | `#ffffff` |
| Next/prev arrow | `branding 1` | `--primary-color` | `#1c2b3c` |
| Next/prev background | `branding 2` | `--secondary-color` | TBD |
| Next/prev (hover) bg | `branding 3` | `--third-color` | TBD |

---

## Font Variables (from CSV)

### Story Card Font Styles:
| Element | Font Variable |
|---------|---------------|
| Social handle | `body copy a (bold)` |
| Description text | `body copy a` |
| Date | `body copy a` |

### Stories Carousel Font Styles:
| Element | Font Variable |
|---------|---------------|
| Heading | `heading 2a` |
| Button text | `button a` |

### Stories End-of-Page Font Styles:
| Element | Font Variable |
|---------|---------------|
| Heading | `heading 2b` |
| Button text | `button a` |

---

## Code Implementation (from SCSS & JS files)

### Source Files:
| File | Purpose |
|------|---------|
| `_story-card.scss` | Base component styles |
| `_stories.scss` | Container styles |
| `_theme.scss:1905-2040` | storyCard mixin (theme styles) |
| `story-card.template.v1.js` | V1 HTML template |
| `story-card.template.v2.js` | V2 HTML template |
| `story-card.template.v3.js` | V3 HTML template |

### HTML Structure by Variant:

**Variant 1** (`story-card--v1`):
```html
<article class="story-card story-card--v1 {SOCIAL_TYPE}">
  <div class="story-card__inner">
    <div class="story-card__image">
      {MEDIA_IMAGE}
      {SOCIAL_FONT_ICON}  <!-- Icon ON image (top-left) -->
    </div>
    <div class="story-card__content">
      <p class="school-handle v1">@Handle</p>  <!-- Handle in content -->
      <div class="description">Text...</div>
      <p class="story-card__time">2 days ago <span class="story-card__icon-link"></span></p>
    </div>
  </div>
</article>
```

**Variant 2** (`story-card--v2`):
```html
<article class="story-card story-card--v2 {SOCIAL_TYPE}">
  <div class="story-card__inner">
    <div class="story-card__image">
      {MEDIA_IMAGE}
      <!-- NO icon on image -->
    </div>
    <div class="story-card__content">
      <p class="school-handle v2">
        {SOCIAL_IMG_ICON}  <!-- Icon INLINE with handle -->
        @Handle
      </p>
      <div class="description">Text...</div>
      <p class="story-card__time">2 days ago <span class="story-card__icon-link"></span></p>
    </div>
  </div>
</article>
```

**Variant 3** (`story-card--v3`):
```html
<article class="story-card story-card--v3 {SOCIAL_TYPE}">
  <div class="story-card__inner">
    {SOCIAL_FONT_ICON}  <!-- Icon OUTSIDE, offset top-left -->
    <div class="story-card__image">
      {MEDIA_IMAGE}
      <p class="school-handle v3">@Handle</p>  <!-- Handle ON image (top-right, white) -->
    </div>
    <div class="story-card__content">
      <div class="description">Text...</div>
      <p class="story-card__time">2 days ago</p>  <!-- No icon-link in V3 -->
    </div>
  </div>
</article>
```

### Query String for Variants:
- `?storyCard=1` - Variant 1
- `?storyCard=2` - Variant 2
- `?storyCard=3` - Variant 3

### CSS Variables Used:
```scss
// Padding variables
--padding-e-inner     // Content padding (all sides): clmp(30px, 40px, 1440px, 2560px)
--padding-g-inner     // Gap between elements: clmp(15px, 20px, 1440px, 2560px)

// Color variables
--primary-color       // Text color (V1, V2, V3): #1c2b3c
--fourth-color        // Content background: #e4e7e9

// Border radius
--general-story-radius  // Border radius: var(--general-bradius) = 0.8rem
```

### Story Card Structure (from _story-card.scss):
```scss
.story-card {
  .story-card__inner {
    display: grid;
    grid-template-rows: max-content 1fr;
  }

  .story-card__image {
    padding-top: 99%; // ~1:1 aspect ratio
    img {
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  .story-card__content {
    padding: var(--padding-e-inner);  // Line 41
    gap: var(--padding-g-inner);      // Line 44
  }
}
```

### Theme Styles (from _theme.scss:1905+):
```scss
@mixin storyCard {
  .story-card__content {
    background: var(--fourth-color);  // Line 1914, 1950
  }

  .story-card__icon-link {
    color: var(--primary-color);      // Line 1943
  }

  .school-handle {
    &.v2 {
      color: var(--primary-color);    // Line 1964
    }
    &.v3 {
      color: #fff;                    // Line 1975 (hardcoded)
    }
  }
}
```

### V3 Icon Container Colors (from _story-card.scss:144-198):
```scss
.icon-container {
  background: #000;  // Default

  &.color-news { background: env.$newsColor; }
  &.color-facebook { background: env.$facebookColor; }
  &.color-twitter { background: env.$twitterColor; }
  &.color-instagram { background: env.$instagramColor; }
  &.color-flickr { background: env.$flickrColor; }
  &.color-youtube { background: env.$youtubeColor; }
  &.color-vimeo { background: env.$vimeoColor; }
  // ... etc
}
```

---

## Test Cases

### SC-001: Story Card Variant 1 Styling
**Priority:** High
**Precondition:** Story card variant 1 visible

| Element | Property | Expected Value | CSS Variable |
|---------|----------|----------------|--------------|
| Content background | background | `#e4e7e9` | `var(--fourth-color)` |
| Social handle color | color | `#1c2b3c` | `var(--primary-color)` |
| Description color | color | `#1c2b3c` | `var(--primary-color)` |
| Date color | color | `#1c2b3c` | `var(--primary-color)` |
| Read more icon | color | `#1c2b3c` | `var(--primary-color)` |
| Content padding | padding | `30-40px` | `var(--padding-e-inner)` |
| Element gap | gap | `15-20px` | `var(--padding-g-inner)` |
| Border radius | border-radius | `0.8rem` | `var(--general-story-radius)` |

---

### SC-002: Story Card Variant 2 Styling
**Priority:** High
**Precondition:** Story card variant 2 visible

| Element | Property | Expected Value | CSS Variable |
|---------|----------|----------------|--------------|
| Content background | background | `#e4e7e9` | `var(--fourth-color)` |
| Social handle color | color | `#1c2b3c` | `var(--primary-color)` |
| Description color | color | `#1c2b3c` | `var(--primary-color)` |
| Date color | color | `#1c2b3c` | `var(--primary-color)` |
| Border radius | border-radius | `0.8rem` | `var(--general-story-radius)` |

---

### SC-003: Story Card Variant 3 Styling
**Priority:** High
**Precondition:** Story card variant 3 visible

| Element | Property | Expected Value | CSS Variable |
|---------|----------|----------------|--------------|
| Content background | background | `#e4e7e9` | `var(--fourth-color)` |
| Social handle color | color | `#ffffff` | hardcoded |
| Description color | color | `#1c2b3c` | `var(--primary-color)` |
| Date color | color | `#1c2b3c` | `var(--primary-color)` |
| Icon container | width/height | `7.7rem` | hardcoded |
| Icon container | border-radius | `50%` | hardcoded |
| Social handle position | position | absolute, top-right | CSS |

---

### SC-004: Story Card Text Truncation
**Priority:** High
**Precondition:** Story card with long description text

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View card with >4 lines text | Text truncates after 4 lines |
| 2 | Check ellipsis | Ellipsis shown at truncation point |

---

### SC-005: Story Card Date Format
**Priority:** Medium
**Precondition:** Story cards with various dates

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View card with today's date | Shows "Today" or similar |
| 2 | View card from 2 days ago | Shows "2 days ago" |
| 3 | View card from 1 week ago | Shows relative date format |

---

### SC-006: Story Card Image Behavior
**Priority:** Medium
**Precondition:** Story card with image

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check image aspect ratio | Approximately 1:1 (99% padding-top) |
| 2 | Check image sizing | object-fit: cover |
| 3 | Hover on card | Image scales to 1.1 |
| 4 | Check transition | 0.3s ease transition |

---

### SCAR-001: Stories Carousel - No Looping
**Priority:** High
**Precondition:** Stories carousel with multiple stories

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to last story | Last story visible |
| 2 | Click next arrow | Carousel does NOT loop to first |
| 3 | Verify arrow state | Next arrow is disabled/greyed out |

---

### SCAR-002: Stories Carousel - Arrow States
**Priority:** High
**Precondition:** Stories carousel visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | At first position | Previous arrow greyed out |
| 2 | At last position | Next arrow greyed out |
| 3 | All visible | Both arrows hidden |

---

### SCAR-003: Stories Carousel - Max Items
**Priority:** Medium
**Precondition:** Stories carousel with >12 stories in CMS

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Count displayed stories | Maximum 12 stories shown |

---

### SGRID-001: Stories Grid - Desktop Layout
**Priority:** High
**Precondition:** Stories grid at viewport >1440px

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set viewport to 1600px | 4 stories per row |
| 2 | Set viewport to 2560px | 4 stories per row |

---

### SGRID-002: Stories Grid - Max Items
**Priority:** Medium
**Precondition:** Stories grid with >8 stories

| Viewport | Expected Max |
|----------|--------------|
| Desktop (>1440px) | Max 8 stories |
| Mobile (<768px) | Max 4 stories |

---

### RESP-001: Responsive Padding
**Priority:** High

| Viewport | Padding E (Content) | Padding G (Gap) | Padding H |
|----------|---------------------|-----------------|-----------|
| 375px | 20px | 10px | 6px |
| 1440px | 30px | 15px | 10px |
| 2560px | 40px | 20px | 15px |

---

### RESP-002: Story Card Responsive Behavior
**Priority:** Medium

| Viewport | Expected Behavior |
|----------|-------------------|
| Mobile (<768px) | Full width cards |
| Tablet (768-1259px) | 2 cards per row |
| Desktop (>1260px) | 4 cards per row |

---

## Color Variable Tests

### COL-001: Story Card V1 Colors
| Element | Expected | CSS Variable | Verified |
|---------|----------|--------------|----------|
| Social handle | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Description | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Date | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Background | `branding 4` (#e4e7e9) | `--fourth-color` | [ ] |

### COL-002: Story Card V2 Colors
| Element | Expected | CSS Variable | Verified |
|---------|----------|--------------|----------|
| Social handle | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Description | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Date | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Background | `branding 4` (#e4e7e9) | `--fourth-color` | [ ] |

### COL-003: Story Card V3 Colors
| Element | Expected | CSS Variable | Verified |
|---------|----------|--------------|----------|
| Social handle | `branding white` (#fff) | hardcoded | [ ] |
| Description | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Date | `branding 1` (#1c2b3c) | `--primary-color` | [ ] |
| Background | `branding 4` (#e4e7e9) | `--fourth-color` | [ ] |

---

## Font Variable Tests

### FV-001: Body Copy a (Description, Date)
| Property | Expected |
|----------|----------|
| Font family | Primary font (Gelion) |
| Font weight | 300 (from theme.scss:1989) |
| Line height | 1.5 (from theme.scss:1990) |

### FV-002: Body Copy a Bold (Social Handle)
| Property | Expected |
|----------|----------|
| Font family | Primary font (Gelion) |
| Font weight | 500 (from theme.scss:1961) |

---

## Spacing Variable Tests

### SV-001: Padding E (Content Padding)
| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px | 30px | | [ ] |
| 768px | ~32px | | [ ] |
| 1440px | 30px | | [ ] |
| 2560px | 40px | | [ ] |

### SV-002: Padding G (Element Gap)
| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px | 15px | | [ ] |
| 768px | ~16px | | [ ] |
| 1440px | 15px | | [ ] |
| 2560px | 20px | | [ ] |

---

## Theme Variable Cascade Tests

These tests verify that changing a CSS variable affects all story components.

### TV-001: Change --primary-color
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--primary-color` to `#ff0000` | All V1/V2 text turns red |
| 2 | Check social handle (V1, V2) | Red |
| 3 | Check description | Red |
| 4 | Check date | Red |
| 5 | Check read more icon | Red |
| 6 | V3 social handle | Remains white (hardcoded) |

### TV-002: Change --fourth-color
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--fourth-color` to `#ffcccc` | All content backgrounds change |
| 2 | Check V1 background | Pink |
| 3 | Check V2 background | Pink |
| 4 | Check V3 background | Pink |

### TV-003: Change --padding-e-inner
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--padding-e-inner` to `50px` | All content padding increases |
| 2 | Check V1 padding | 50px all sides |
| 3 | Check V2 padding | 50px all sides |
| 4 | Check V3 padding | 50px all sides |

### TV-004: Change --padding-g-inner
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--padding-g-inner` to `30px` | Gap between elements increases |
| 2 | Check element spacing | 30px |

### TV-005: Change --general-story-radius
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Change `--general-bradius` to `2rem` | All border radii increase |
| 2 | Check V1 card radius | 2rem |
| 3 | Check V2 card radius | 2rem |
| 4 | Check V3 image radius | 2rem |
| 5 | Check V3 content radius | 2rem |

---

## Known Bugs

| # | Issue | Current | Expected | File:Line |
|---|-------|---------|----------|-----------|
| - | - | - | - | - |

---

## Test Execution Checklist

### Story Card Variants
- [ ] SC-001: Variant 1 styling
- [ ] SC-002: Variant 2 styling
- [ ] SC-003: Variant 3 styling
- [ ] SC-004: Text truncation
- [ ] SC-005: Date format
- [ ] SC-006: Image behavior

### Stories Carousel
- [ ] SCAR-001: No looping
- [ ] SCAR-002: Arrow states
- [ ] SCAR-003: Max items

### Stories Grid
- [ ] SGRID-001: Desktop layout (4 per row)
- [ ] SGRID-002: Max items (desktop/mobile)

### Responsive Tests
- [ ] RESP-001: Padding at breakpoints
- [ ] RESP-002: Card layout at breakpoints

### Color Variable Tests
- [ ] COL-001: V1 colors
- [ ] COL-002: V2 colors
- [ ] COL-003: V3 colors

### Font Variable Tests
- [ ] FV-001: Body copy a
- [ ] FV-002: Body copy a bold

### Spacing Variable Tests
- [ ] SV-001: Padding E
- [ ] SV-002: Padding G

### Theme Variable Cascade Tests
- [ ] TV-001: --primary-color change
- [ ] TV-002: --fourth-color change
- [ ] TV-003: --padding-e-inner change
- [ ] TV-004: --padding-g-inner change
- [ ] TV-005: --general-story-radius change

---

## Tests Passed

(To be filled during testing)

---

## Test URLs

### Staging URLs:
| Component | URL |
|-----------|-----|
| Stories Carousel V1 | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/stories?storyCard=1` |
| Stories Carousel V2 | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/stories?storyCard=2` |
| Stories Carousel V3 | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/stories?storyCard=3` |
| Stories Grid | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/stories-grid` (add from CMS) |

**Query String Parameters:**
- `?storyCard=1` - Story card variant 1 (icon on image, handle in content)
- `?storyCard=2` - Story card variant 2 (icon inline with handle)
- `?storyCard=3` - Story card variant 3 (icon offset, handle on image)

---

## Related Files

| File | Path | Purpose |
|------|------|---------|
| `_story-card.scss` | `/Website/Styles/Legacy/components/stories/` | Base component styles |
| `_stories.scss` | `/Website/Styles/Legacy/components/stories/` | Container styles |
| `_theme.scss:1891-2040` | `/Website/Styles/_globals/` | storiesContainer + storyCard mixins |
| `_theme-cssvars.scss` | `/Website/Styles/_globals/` | CSS variable definitions |
| `story-card.template.v1.js` | `/Website/Scripts/Legacy/cards/story/` | V1 HTML template |
| `story-card.template.v2.js` | `/Website/Scripts/Legacy/cards/story/` | V2 HTML template |
| `story-card.template.v3.js` | `/Website/Scripts/Legacy/cards/story/` | V3 HTML template |
| `_CPStoriesCarousel1.cshtml` | `/Website/Pages/.../Stories/Carousels/` | Stories carousel view |
| `_CPStoriesGrid1.cshtml` | `/Website/Pages/.../Stories/Grids/` | Stories grid view |

### CSS Variables Reference

| Variable | Default | Usage |
|----------|---------|-------|
| `--primary-color` | `#1c2b3c` | Text color |
| `--fourth-color` | `#e4e7e9` | Content background |
| `--padding-e-inner` | `clmp(30px, 40px)` | Content padding |
| `--padding-g-inner` | `clmp(15px, 20px)` | Element gap |
| `--general-story-radius` | `var(--general-bradius)` = `0.8rem` | Border radius |

---

## Global Padding Rules (Design Spec)

> **Note:** These are global padding rules that apply across all components. Stories must also follow these rules.

### Expected Padding Values by Viewport

#### 375px (Mobile)
| Variable | Expected Value |
|----------|----------------|
| Padding E | 20px |
| Padding G | 10px |
| Padding H | 6px |

#### 1440px (Desktop)
| Variable | Expected Value |
|----------|----------------|
| Padding A | 150px |
| Padding B | 90px |
| Padding C | 70px |
| Padding D | 50px |
| Padding E | 30px |
| Padding F | 20px |
| Padding G | 15px |
| Padding H | 10px |

#### 2560px (Large Desktop)
| Variable | Expected Value |
|----------|----------------|
| Padding B | 120px |
| Padding C | 90px |
| Padding E | 40px |
| Padding G | 20px |
| Padding H | 15px |

### Stories Component Padding Usage

Stories cards use the following global padding variables:

| Element | Padding Variable | Description |
|---------|------------------|-------------|
| `.story-card__content` | `--padding-e-inner` | Content box padding (all sides) |
| `.story-card__content` | `--padding-g-inner` | Gap between elements (handle, description, date) |

### Stories Padding Test Matrix

| Viewport | Padding E (Content) | Padding G (Gap) |
|----------|---------------------|-----------------|
| 375px | 20px | 10px |
| 1440px | 30px | 15px |
| 2560px | 40px | 20px |

---

### Breakpoints to Test

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile S | 320px | Small mobile |
| Mobile M | 375px | Standard mobile |
| Mobile L | 425px | Large mobile |
| Tablet | 768px | Tablet |
| Desktop S | 1024px | Small desktop |
| Desktop M | 1440px | Standard desktop |
| Desktop L | 2560px | Large desktop |

---

## Accessibility Tests (Optional)

### A11Y-001: Images Alt Text
| Test | Expected |
|------|----------|
| Story card images | Descriptive alt text |
| Social icons | Icon has aria-label or sr-only text |

### A11Y-002: Keyboard Navigation
| Test | Expected |
|------|----------|
| Tab through carousel | All interactive elements focusable |
| Arrow key navigation | Carousel navigable via keyboard |

### A11Y-003: Screen Reader
| Test | Expected |
|------|----------|
| Card announces | Title, description, date |
| Carousel announces | Position in carousel |

---

## Notes

- V3 icon container colors are social-platform specific (Facebook blue, Twitter blue, etc.) - defined in `_story-card.scss:144-198`
- V3 social handle is positioned absolutely at top-right with hardcoded white color
- Image has a gradient overlay using `$primaryColor` - this uses SCSS variable, not CSS variable, so won't change dynamically
