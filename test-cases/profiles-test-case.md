# Profiles Test Cases

## Overview
This document contains test cases for the Profiles component, covering Profile Cards (3 variants), Profiles Carousel, Profiles Grid, and Profile Directory.

**Components:**
- Profile Card (3 variants)
- Profiles Carousel (4 arrow variants)
- Profiles Grid
- Profile Directory

**CMS Tags:** `{profiles}`, `{profiles-grid}`, `{profiles-filtered}`

---

## Design Specifications (from Master Template Progress CSV)

### Profile Card (3 Variants)

#### Variant 1:
| Element | Customizable Properties |
|---------|------------------------|
| Character styles | Heading 5, body copy |
| Card | colour, rounded corners (individually), opacity |
| Image | rounded corners (individually), padding |

#### Variant 2:
| Element | Customizable Properties |
|---------|------------------------|
| Character styles | Heading 5, body copy |
| Card | colour, rounded corners (individually), opacity |
| Image | rounded corners (individually), aspect ratio |
| Image fallback | icon (if no image) |

#### Variant 3:
| Element | Customizable Properties |
|---------|------------------------|
| Character styles | Heading 5, body copy |
| Image | rounded corners (individually) |
| Gradient | colour, opacity, direction |

### Profile Card Behavior Rules:
- ☐ Only when a link/slide-out has been added, the arrow appears and hover works
- ☐ The image is centred and fills the space

---

### Profiles Carousel Rules:
| Rule | Description |
|------|-------------|
| Looping | ☐ Carousel isn't looping |
| Arrow disabled | ☐ Arrow is "greyed out" and no longer clickable at ends |
| Arrow visibility | ☐ Arrows don't appear when all elements are fully visible |
| Height | ☐ Profile with most content determines height of every profile |

---

### Profiles Grid Rules:
| Rule | Description |
|------|-------------|
| Layout | ☐ Layout adapts to 1, 2, 3, 4, 5+ elements per design |
| Desktop (>1440px) | ☐ Display 4 profiles in one row |
| Row height | ☐ Profile with most text determines row height (rows can differ) |

---

## Color Variables (from CSV)

### Profile Card Variant 1 (Light Background):
| Element | Color Variable | Hex Value |
|---------|----------------|-----------|
| Name | `branding 1` | `#1c2b3c` (--primary-color) |
| Description | `branding 1` | `#1c2b3c` (--primary-color) |
| Read more icon | `branding 1` | `#1c2b3c` (--primary-color) |
| Text background | `branding 4` | `#e4e7e9` (--fourth-color) |

### Profile Card Variant 2 (Dark/Gradient Background):
| Element | Color Variable | Hex Value |
|---------|----------------|-----------|
| Name | `branding white` | `#ffffff` |
| Description | `branding white` | `#ffffff` |
| Read more icon | `branding white` | `#ffffff` |
| Text gradient | `branding black` | `#000000` |

### Profile Card Variant 3 (Mixed):
| Element | Color Variable | Hex Value |
|---------|----------------|-----------|
| Name | `branding 1` | `#1c2b3c` (--primary-color) |
| Description | `branding 1` | `#1c2b3c` (--primary-color) |
| Read more icon | `branding 1` | `#1c2b3c` (--primary-color) |
| Text background | `branding 4` | `#e4e7e9` (--fourth-color) |
| Text gradient | `branding black` | `#000000` |

---

## Font Variables (from CSV)

### Profile Card Font Styles:
| Variant | Element | Font Variable |
|---------|---------|---------------|
| V1 | Name | `heading 5a` |
| V1 | Description | `body copy a` |
| V2 | Name | `heading 5b` |
| V2 | Description | `body copy b` |
| V3 | Name | `heading 5a` |
| V3 | Description | `body copy a` |

---

## Code Implementation (from _theme.scss & _profile-card.scss)

### CSS Variables Used:
```scss
// Padding variables
--padding-c-inner     // Description padding
--padding-g-inner     // Role margin-top
--padding-h-inner     // Title margin-bottom
--padding-a-inner     // Single card content padding
--padding-b-inner     // Single card content padding
--padding-e-inner     // V3 title padding

// Color variables
--primary-color       // Text color (V1, V3)
--fourth-color        // Background (V1, V3)

// Other
--general-cards-radius  // Border radius
```

### Variant Styles (from _theme.scss:1272-1357):
```scss
// V1
.profile-card__description {
  background: var(--fourth-color);
}

// V2
.profile-card__description { color: #fff; }
.profile-card__title { color: #fff; }

// V3
.profile-card__description {
  background: var(--fourth-color);
  color: var(--primary-color);
}
.profile-card__title { color: #fff; }
```

### Image Gradient Overlay (V2/V3):
```scss
.profile-card__image:before {
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  opacity: 0.6;
}
```

---

## Test Cases

### PC-001: Profile Card Variant 1 Styling
**Priority:** High  
**Precondition:** Profile card variant 1 visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Description bg | background | `var(--fourth-color)` = `#e4e7e9` |
| Name color | color | `var(--primary-color)` = `#1c2b3c` |
| Description color | color | `var(--primary-color)` = `#1c2b3c` |
| Description padding | padding | `var(--padding-c-inner)` |
| Border radius | border-radius | `var(--general-cards-radius)` |

---

### PC-002: Profile Card Variant 2 Styling
**Priority:** High  
**Precondition:** Profile card variant 2 visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Min height | min-height | `43.3rem` (433px) |
| Name color | color | `#ffffff` (white) |
| Description color | color | `#ffffff` (white) |
| Image position | position | absolute, full coverage |
| Text alignment | text-align | center |
| Gradient overlay | background | linear-gradient to black |
| Gradient opacity | opacity | 0.6 |

---

### PC-003: Profile Card Variant 3 Styling
**Priority:** High  
**Precondition:** Profile card variant 3 visible

| Element | Property | Expected Value |
|---------|----------|----------------|
| Min height | min-height | `43.3rem` (433px) |
| Title color | color | `#ffffff` (white) |
| Description bg | background | `var(--fourth-color)` = `#e4e7e9` |
| Description color | color | `var(--primary-color)` = `#1c2b3c` |
| Title padding | padding | `0 var(--padding-c-inner) var(--padding-e-inner)` |

---

### PC-004: Profile Card Link/Arrow Behavior
**Priority:** High  
**Precondition:** Profile card with and without link

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View profile without link | Arrow icon NOT visible |
| 2 | View profile with link | Arrow icon visible |
| 3 | Hover on linked profile | Hover effect works, image scales |

---

### PC-005: Profile Card Image Behavior
**Priority:** Medium  
**Precondition:** Profile card with image

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check image position | Image is centred |
| 2 | Check image sizing | Image fills the space (object-fit: cover) |
| 3 | Hover on card | Image scales to 1.1 |

---

### PCAR-001: Profiles Carousel - No Looping
**Priority:** High  
**Precondition:** Profiles carousel with multiple profiles

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to last profile | Last profile visible |
| 2 | Click next arrow | Carousel does NOT loop to first |
| 3 | Verify arrow state | Next arrow is disabled/greyed out |

---

### PCAR-002: Profiles Carousel - Arrow States
**Priority:** High  
**Precondition:** Profiles carousel visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | At first position | Previous arrow greyed out |
| 2 | At last position | Next arrow greyed out |
| 3 | All visible | Both arrows hidden |

---

### PCAR-003: Profiles Carousel - Height Uniformity
**Priority:** High  
**Precondition:** Profiles carousel with varying content lengths

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check all profile heights | All profiles same height |
| 2 | Verify height source | Height = tallest profile content |

---

### PGRID-001: Profiles Grid - Layout Adaptation
**Priority:** High  
**Precondition:** Profiles grid with different counts (1-5+)

| Count | Expected Layout |
|-------|-----------------|
| 1 | Single profile, full width or centered |
| 2 | 2 columns |
| 3 | 3 columns |
| 4 | 4 columns |
| 5+ | 4 per row, extras in next row |

---

### PGRID-002: Profiles Grid - Desktop (>1440px)
**Priority:** High  
**Precondition:** Viewport > 1440px

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set viewport to 1600px | 4 profiles per row |
| 2 | Set viewport to 2560px | 4 profiles per row |

---

### PGRID-003: Profiles Grid - Row Height
**Priority:** Medium  
**Precondition:** Profiles grid with varying content

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check row 1 profiles | All same height (tallest determines) |
| 2 | Check row 2 profiles | Can have different height than row 1 |

---

### RESP-001: Responsive Font Sizes
**Priority:** High

| Viewport | Heading 5 Size | Body Copy Size |
|----------|----------------|----------------|
| 375px | Check | Check |
| 768px | Check | Check |
| 1440px | Check | Check |
| 2560px | Check | Check |

---

### RESP-002: Responsive Padding/Spacing
**Priority:** Medium

| Viewport | Description Padding | Role Margin |
|----------|---------------------|-------------|
| 375px | `var(--padding-c-inner)` | `var(--padding-g-inner)` |
| 1440px | `var(--padding-c-inner)` | `var(--padding-g-inner)` |
| 2560px | `var(--padding-c-inner)` | `var(--padding-g-inner)` |

---

## Color Variable Tests

### COL-001: Profile Card V1 Colors
| Element | Expected | CSS Variable |
|---------|----------|--------------|
| Name | `branding 1` (#1c2b3c) | `--primary-color` |
| Description | `branding 1` (#1c2b3c) | `--primary-color` |
| Background | `branding 4` (#e4e7e9) | `--fourth-color` |

### COL-002: Profile Card V2 Colors
| Element | Expected | CSS Variable |
|---------|----------|--------------|
| Name | `branding white` (#fff) | hardcoded |
| Description | `branding white` (#fff) | hardcoded |
| Gradient | `branding black` (#000) | hardcoded |

### COL-003: Profile Card V3 Colors
| Element | Expected | CSS Variable |
|---------|----------|--------------|
| Title | `branding white` (#fff) | hardcoded |
| Description | `branding 1` (#1c2b3c) | `--primary-color` |
| Description bg | `branding 4` (#e4e7e9) | `--fourth-color` |

---

## Font Variable Tests

### FV-001: Heading 5a (V1, V3 Name)
| Property | Expected |
|----------|----------|
| Font family | Primary font |
| Font weight | Check design spec |
| Font size | Responsive (clmp) |

### FV-002: Heading 5b (V2 Name)
| Property | Expected |
|----------|----------|
| Font family | Primary font |
| Font weight | Check design spec |
| Color | White |

### FV-003: Body Copy a (V1, V3 Description)
| Property | Expected |
|----------|----------|
| Font family | Primary font |
| Font size | Responsive |
| Color | `--primary-color` |

### FV-004: Body Copy b (V2 Description)
| Property | Expected |
|----------|----------|
| Font family | Primary font |
| Font size | Responsive |
| Color | White |

---

## Known Bugs

| # | Issue | Current | Expected | File:Line |
|---|-------|---------|----------|-----------|
| - | - | - | - | - |

---

## Test Execution Checklist

### Profile Card Variants
- [ ] PC-001: Variant 1 styling
- [ ] PC-002: Variant 2 styling
- [ ] PC-003: Variant 3 styling
- [ ] PC-004: Link/arrow behavior
- [ ] PC-005: Image behavior

### Profiles Carousel
- [ ] PCAR-001: No looping
- [ ] PCAR-002: Arrow states
- [ ] PCAR-003: Height uniformity

### Profiles Grid
- [ ] PGRID-001: Layout adaptation (1-5+)
- [ ] PGRID-002: Desktop 4 per row
- [ ] PGRID-003: Row height

### Responsive Tests
- [ ] RESP-001: Font sizes at breakpoints
- [ ] RESP-002: Padding/spacing at breakpoints

### Color Variable Tests
- [ ] COL-001: V1 colors
- [ ] COL-002: V2 colors
- [ ] COL-003: V3 colors

### Font Variable Tests
- [ ] FV-001: Heading 5a
- [ ] FV-002: Heading 5b
- [ ] FV-003: Body copy a
- [ ] FV-004: Body copy b

### Known Bugs
- (None documented yet)

---





**Test URLs:**
- Carousel: `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/profiles`
- Grid: `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/profiles-grid`
- Directory: `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/profiles-filtered`

**Variant Control (SecondLevel.cshtml):**
```csharp
profilesCarouselVariant = GeneralHelpers.QueryStringVariants(1, 3, "profilesCarousel"),
profilesGridVariant = GeneralHelpers.QueryStringVariants(1, 1, "profilesGrid"),
```

**Query String Examples:**
- `?profileCard=1` - Profile card variant 1
- `?profileCard=2` - Profile card variant 2
- `?profileCard=3` - Profile card variant 3

### Related Files

| File | Purpose |
|------|---------|
| `_profile-card.scss` | Base component styles |
| `_theme.scss:1272-1357` | Profile card mixin (profilesCard) |
| `SecondLevel.cshtml` | Variant configuration |

### CSS Variables Reference

| Variable | Default | Usage |
|----------|---------|-------|
| `--primary-color` | `#1c2b3c` | Text color |
| `--fourth-color` | `#e4e7e9` | Background |
| `--padding-c-inner` | `clmp(20px, 35px)` | Description padding |
| `--padding-g-inner` | `clmp(15px, 20px)` | Role margin |
| `--padding-e-inner` | `clmp(15px, 20px)` | Title padding (V3) |
| `--general-cards-radius` | varies | Border radius |

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

## 🐛 BUGS FOUND

### BUG-PROF-001: Wrong Padding Variable Used for Description
| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Component** | Profile Card (All Variants) |
| **Location** | `/Website/Styles/Legacy/components/profiles/_profile-card.scss` line 51 |
| **Description** | Description padding uses `--padding-c-inner` (35px) instead of `--padding-e-inner` (30px) as per design spec |
| **Expected** | `padding: var(--padding-e-inner)` (30px at 1440px) |
| **Actual** | `padding: var(--padding-c-inner)` (35px at 1440px) |
| **Design Reference** | Card/Profile/Event Grid (2) - shows Padding E for all sides |

### BUG-PROF-002: V3 Title Horizontal Padding Incorrect
| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Component** | Profile Card V3 |
| **Location** | `/Website/Styles/Legacy/components/profiles/_profile-card.scss` line 135 |
| **Description** | V3 title left/right padding uses `--padding-c-inner` instead of `--padding-e-inner` |
| **Expected** | `padding: 0 var(--padding-e-inner) var(--padding-e-inner)` |
| **Actual** | `padding: 0 var(--padding-c-inner) var(--padding-e-inner)` |

### ~~BUG-PROF-003~~: REMOVED - Not a Bug
**Reason:** Role `margin-top: 15px` correctly implements **Padding G** (gap between title and body copy) as per design spec.

### BUG-PROF-003: SCSS Variable in Gradient (Theme Won't Cascade)
| Field | Value |
|-------|-------|
| **Severity** | High |
| **Component** | Profile Card V2/V3 |
| **Location** | `/Website/Styles/_globals/_theme.scss` line 1331 |
| **Description** | Gradient uses SCSS `$primaryColor` variable instead of CSS variable. This means the gradient color will NOT update when themes change at runtime. |
| **Expected** | `background: linear-gradient(to bottom, rgba(var(--primary-color-rgb), 0) 0%, rgba(var(--primary-color-rgb), 1) 100%)` or similar CSS variable approach |
| **Actual** | `background: linear-gradient(to bottom, rgba($primaryColor, 0) 0%, rgba($primaryColor, 1) 100%)` |
| **Impact** | Theme cascade broken for gradient overlays |

---

## 🐛 ACCESSIBILITY BUGS

### BUG-A11Y-001: Images Have Empty Alt Text
| Field | Value |
|-------|-------|
| **Severity** | High |
| **Component** | Profile Card (All Variants) |
| **Description** | All profile card images have `alt=""` (empty alt text) instead of descriptive alt text |
| **Expected** | `alt="Photo of [Person Name]"` or similar descriptive text |
| **Actual** | `alt=""` on all 3 tested images |
| **WCAG** | 1.1.1 Non-text Content (Level A) |

### BUG-A11Y-002: Buttons Missing Accessible Names
| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Component** | Profile Card |
| **Description** | Profile card buttons have no accessible text content, aria-label, or sr-only text |
| **Expected** | Button should have accessible name like "View profile for [Name]" |
| **Actual** | 0 of 3 buttons have accessible names |
| **WCAG** | 4.1.2 Name, Role, Value (Level A) |

### BUG-A11Y-003: Some Carousel Buttons Missing SR-Only Text
| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Component** | Profiles Carousel |
| **Description** | 4 of 6 carousel buttons have no screen reader text |
| **Expected** | All carousel buttons should have sr-only or aria-label |
| **Actual** | Only 2 buttons have sr-only text ("Next profile card", "Previous profile card") |

---

## 🐛 RESPONSIVE/JAVASCRIPT BUGS

### BUG-RESP-002: Card Width Not Full Width at 320px
| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Component** | Profile Grid |
| **Description** | At 320px, card width is 260px but viewport is 320px - card doesn't fill available space |
| **Expected** | Card should take ~100% of available width on mobile |
| **Actual** | Card takes ~81% of viewport width |

---

## ✅ TESTS PASSED

### Profile Card Styling
| Test | V1 | V2 | V3 |
|------|----|----|----| 
| Font family (title) | ✅ Cormorant Garamond | ✅ Cormorant Garamond | ✅ Cormorant Garamond |
| Font family (desc) | ✅ Gelion | ✅ Gelion | ✅ Gelion |
| Font weight (title) | ✅ 500 | ✅ 500 | ✅ 500 |
| Font style (title) | ✅ italic | ✅ italic | ✅ italic |
| Text color (V1) | ✅ primary-color | N/A | N/A |
| Text color (V2) | N/A | ✅ white | N/A |
| Text color (V3 title) | N/A | N/A | ✅ white |
| Text color (V3 desc) | N/A | N/A | ✅ primary-color |
| Background (V1) | ✅ fourth-color | N/A | N/A |
| Background (V3 desc) | N/A | N/A | ✅ fourth-color |
| Min-height | ✅ 433px | ✅ 433px | ✅ 433px |
| Image hover | ✅ scale(1.1) | ✅ scale(1.1) | ✅ scale(1.1) |
| Gradient overlay | N/A | ✅ 0.6 opacity | ✅ 0.6 opacity |

### Profiles Carousel
| Test | Status |
|------|--------|
| No looping | ✅ PASS - arrows disabled at ends |
| Previous disabled at start | ✅ PASS |
| Next disabled at end | ✅ PASS |

### Profiles Grid
| Test | Status |
|------|--------|
| 4 cards per row at 1600px | ✅ PASS |
| 3 cards per row at 1200px | ✅ PASS |
| Row height uniformity | ✅ PASS |
| Layout adaptation | ✅ PASS |

### Responsive Padding (clamp behavior)
| Viewport | Description Padding | Status |
|----------|---------------------|--------|
| 320px | 20px | ✅ (min value) |
| 768px | 25.5px | ✅ (scaling) |
| 1024px | 29px | ✅ (scaling) |
| 1440px | 35px | ✅ (max value) |
| 2560px | 35px | ✅ (max capped) |

### Profile Directory
| Test | Status |
|------|--------|
| Search input present | ✅ PASS |
| Search creates tag | ✅ PASS |
| Department filter present | ✅ PASS |
| Roles filter present | ✅ PASS |
| A-Z sort button | ✅ PASS |
| Clear filters button | ✅ PASS |
| Pagination controls | ✅ PASS |

### Edge Cases
| Test | Status |
|------|--------|
| Long name wrapping | ✅ PASS - uses `word-wrap: break-word` |
| Images loading | ✅ PASS - 0 broken images |
| Focus styles present | ✅ PASS |

### Touch Targets (Mobile)
| Test | Status |
|------|--------|
| Touch target min size (44x44px) | ✅ PASS at 320px |
| Title font readable at mobile | ✅ PASS (24px) |

---

## 📊 TEST SUMMARY

| Category | Bugs Found | Severity |
|----------|------------|----------|
| **Styling/Padding** | 2 | Medium |
| **Theme Cascade** | 1 | High (BUG-PROF-003: SCSS variable in gradient) |
| **Accessibility** | 3 | 1 High, 2 Medium |
| **Responsive/JS** | 1 | Low |
| **TOTAL** | **7 bugs** | |

### Test Coverage
- ✅ Font variables
- ✅ Color variables
- ✅ Padding variables
- ✅ Responsive breakpoints
- ✅ Accessibility (basic)
- ✅ Edge cases
- ✅ Profile Directory functionality
- ✅ Carousel behavior

---

## ⏳ NOT YET TESTED

### Profile Slideout/Modal Testing

| Feature | Description | Priority |
|---------|-------------|----------|
| **Slideout Opens** | Click card → popup opens correctly | High |
| **Slideout Close** | X button, Escape key, click outside to close | Medium |
| **Slideout Accessibility** | Focus trap, screen reader announcements | High |

#### Slideout Font Inheritance
| Element | Expected Font | Variable |
|---------|---------------|----------|
| Name/Title | `heading 5a` - Cormorant Garamond, italic, 500 | `--secondary-font` |
| Role | Body font - Gelion | `--primary-font` |
| Bio/Description | `body copy a` - Gelion | `--primary-font` |
| Contact Details | Body font - Gelion | `--primary-font` |

#### Slideout Color Inheritance
| Element | Expected Color | Variable |
|---------|----------------|----------|
| Title text | `#1c2b3c` | `--primary-color` |
| Body text | `#1c2b3c` | `--primary-color` |
| Background | `#e4e7e9` or white | `--fourth-color` |
| Links | Theme link color | - |

#### Slideout Spacing/Padding
| Element | Expected Padding | Variable |
|---------|------------------|----------|
| Content area | Padding E | `--padding-e-inner` |
| Between sections | Padding G | `--padding-g-inner` |
| Image container | - | - |

#### Slideout Styling
| Element | Test |
|---------|------|
| Border radius | Uses `--general-bradius` |
| Image aspect ratio | Maintained correctly |
| Responsive behavior | Adapts at breakpoints |
| Overlay/backdrop | Correct opacity |

### Other Pending Tests

| Feature | Description | Priority |
|---------|-------------|----------|
| **Keyboard Navigation** | Full Tab/Enter/Escape flow | Medium |
| **Hover States** | Image zoom animation, overlay transitions | Low |
| **Lazy Loading** | Images load on scroll | Low |

