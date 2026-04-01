# Bug Report: Padding CSS Variables - Incorrect Values

**Date:** January 16, 2026  
**Severity:** High  
**Component:** Global CSS Variables (`_theme-cssvars.scss`)  
**Affected Components:** Stories, Profiles, Cards, and all components using padding variables

---

## Short Description

**Padding values are wrong on mobile and large screens.** The media query overrides in `_theme-cssvars.scss` (lines 130-132, 140) set fixed values that don't match the design spec. For example, on a MacBook (~1512px), Padding E shows 20px instead of 30px. On mobile (375px), Padding E shows 10px instead of 20px.

---

## Summary

The padding CSS variables (`--padding-e-inner`, `--padding-g-inner`, `--padding-h-inner`) have incorrect values at mobile (375px) and large desktop (>1441px) viewports due to media query overrides that contradict the design specifications.

---

## Expected vs Actual Values

### Padding E Inner (Content Padding)

| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px (Mobile) | 20px | 10px (1rem) | ❌ BUG |
| 1440px (Desktop) | 30px | 30px | ✅ OK |
| >1441px (Large Desktop) | 30-40px (scaling) | 20px (2rem) | ❌ BUG |
| 2560px | 40px | 20px (2rem) | ❌ BUG |

### Padding G Inner (Gap Between Elements)

| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px (Mobile) | 10px | 15px | ❌ BUG |
| 1440px (Desktop) | 15px | 15px | ✅ OK |
| >1441px (Large Desktop) | 15-20px (scaling) | 10px (1rem) | ❌ BUG |
| 2560px | 20px | 10px (1rem) | ❌ BUG |

### Padding H Inner

| Viewport | Expected | Actual | Status |
|----------|----------|--------|--------|
| 375px (Mobile) | 6px | 10px | ❌ BUG |
| 1440px (Desktop) | 10px | 10px | ✅ OK |
| >1441px (Large Desktop) | 10-15px (scaling) | 6px (0.6rem) | ❌ BUG |
| 2560px | 15px | 6px (0.6rem) | ❌ BUG |

---

## Root Cause

### File: `Website/Styles/_globals/_theme-cssvars.scss`

#### Problem 1: Mobile Override (Line 140)
```scss
@media (max-width: $mobileBreakpoint) {
  --padding-e-inner: 1rem;  // Sets 10px, should be 20px
  // Missing: --padding-g-inner override (should be 10px)
  // Missing: --padding-h-inner override (should be 6px)
}
```

#### Problem 2: Large Desktop Override (Lines 130-132)
```scss
@media (min-width: 1441px) {
  --padding-g-inner: 1rem;   // Sets 10px, should scale 15-20px
  --padding-e-inner: 2rem;   // Sets 20px, should scale 30-40px
  --padding-h-inner: .6rem;  // Sets ~6px, should scale 10-15px
}
```

These overrides **replace** the default clamp values with fixed values that don't match the design spec.

#### Default Values (Lines 111, 115, 118)
```scss
--padding-e-inner: #{clmp(30px, 40px, 1440px, 2560px)};
--padding-g-inner: #{clmp(15px, 20px, 1440px, 2560px)};
--padding-h-inner: #{clmp(10px, 15px, 1440px, 2560px)};
```

The default clamps only scale between 1440-2560px. There's no scaling for 375-1440px range.

---

## Affected Components

Any component using these CSS variables:
- **Stories Cards** (`.story-card__content` uses `--padding-e-inner` and `--padding-g-inner`)
- **Profile Cards**
- **Event Cards**
- **Promo Cards**
- All card-based components

---

## Visual Evidence

### Stories Card at ~1470px (MacBook screen)
- **Expected Padding E:** 30px
- **Actual Padding E:** 20px (due to >1441px override)

### Stories Card at 375px (Mobile)
- **Expected Padding E:** 20px
- **Actual Padding E:** 10px
- **Expected Padding G:** 10px
- **Actual Padding G:** 15px

---

## Recommended Fix

Update the CSS variables to use proper clamp ranges that cover all viewports:

### Option 1: Two-stage clamp (375→1440→2560)

```scss
// Default (375px → 1440px)
--padding-e-inner: #{clmp(20px, 30px, 375px, 1440px)};
--padding-g-inner: #{clmp(10px, 15px, 375px, 1440px)};
--padding-h-inner: #{clmp(6px, 10px, 375px, 1440px)};

// Large desktop (1440px → 2560px)
@media (min-width: 1441px) {
  --padding-e-inner: #{clmp(30px, 40px, 1440px, 2560px)};
  --padding-g-inner: #{clmp(15px, 20px, 1440px, 2560px)};
  --padding-h-inner: #{clmp(10px, 15px, 1440px, 2560px)};
}

// Remove mobile override or update to correct values
@media (max-width: $mobileBreakpoint) {
  // Remove --padding-e-inner: 1rem; (clamp handles it)
}
```

---

## Test URLs

- Stories V1: https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/stories?storyCard=1
- Stories V2: https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/stories?storyCard=2
- Stories V3: https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/stories?storyCard=3
- Full Widget List: https://test-1-mvcbasev3.tiarc-staging.co.uk/full-list-of-widgets

---

## Test Viewports

| Viewport | Width |
|----------|-------|
| Mobile | 375px |
| Tablet | 768px |
| Desktop | 1440px |
| MacBook Pro 14" | ~1512px |
| Large Desktop | 2560px |

---

## Related Files

| File | Lines | Description |
|------|-------|-------------|
| `Website/Styles/_globals/_theme-cssvars.scss` | 111, 115, 118, 130-132, 140 | CSS variable definitions |
| `Website/Styles/Legacy/components/stories/_story-card.scss` | 41, 44 | Story card padding usage |

---

## Priority

**High** - This affects the visual consistency of all card-based components across all viewport sizes.
