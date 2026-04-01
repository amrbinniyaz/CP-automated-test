# Widget Testing Process Guide

This document outlines the step-by-step process for testing Content Page widgets. Follow this process when testing any new widget to ensure consistency and thoroughness.

---

## Overview

The Content Page acts as a **theme system** where CSS variables control styling across all widgets. When testing:
1. Verify CSS variables are correctly referenced in code
2. Verify changing a variable cascades to all related components
3. Document any hardcoded values that won't respond to theme changes

---

## Source Files

### Design Specifications
| File | Location | Purpose |
|------|----------|---------|
| Master Template Progress | `/CP test/Master Template Progress - PHASE 1_ Content Page.csv` | Widget rules, variants, behavior specs |
| Font Variables | `/CP test/Content page - Checklist - font variables.csv` | Font variable mappings per component |
| Color Variables | `/CP test/Content page - Checklist - colour variables.csv` | Color variable mappings per component |
| Spacing Variables | `/CP test/Content page - Checklist - spacing.csv` | Padding/margin variable mappings |

### Code Implementation
| File | Location | Purpose |
|------|----------|---------|
| Component SCSS | `/Website/Styles/Legacy/components/[widget]/` | Base component styles |
| Theme Mixins | `/Website/Styles/_globals/_theme.scss` | Theme-specific styling |
| CSS Variables | `/Website/Styles/_globals/_theme-cssvars.scss` | CSS variable definitions |
| Environment | `/Website/Styles/_globals/_env.scss` | SCSS variables, colors |

### Test Cases Output
| File | Location | Purpose |
|------|----------|---------|
| Test Case Docs | `/CP test/test-cases/[widget]-test-case.md` | Test case documentation |
| Playwright Tests | `/CP test/tests/components/[widget].spec.ts` | Automated tests |

---

## Testing Workflow

### Step 1: Gather Widget Information

**1.1 Identify Widget Variants**
- Check Master Template CSV for number of variants
- Note: Row format is `Widget Name, No of Variants, Styling variation, Rules & Testing`
- Example: "Story, 3" means 3 card variants

**1.2 Extract Rules from Master Template CSV**
Search for the widget name and note:
- Behavior rules (carousel looping, arrow states, max items, etc.)
- Padding rules (internal spacing)
- Margin rules (external spacing)
- Any special conditions

**1.3 Extract Font Variables**
Search font CSV for widget name. Note mappings like:
```
heading 5a -> profile card (variant 1) - name
body copy a -> profile card (variant 1) - description
```

**1.4 Extract Color Variables**
Search color CSV for widget name. Note mappings like:
```
branding 1 -> story card (variant 1) - text
branding 4 -> story card (variant 1) - content background
```

**1.5 Extract Spacing Variables**
Search spacing CSV for widget name. Note mappings like:
```
Padding E -> card (variant 1) - text box - all sides
Padding G -> card (variant 1) - title - bottom
```

---

### Step 2: Find SCSS Implementation

**2.1 Locate Component Files**
```bash
# Find component SCSS files
find /Website/Styles -name "*[widget]*.scss"

# Common locations:
/Website/Styles/Legacy/components/[widget]/
```

**2.2 Find Theme Mixin**
```bash
# Search for mixin in theme file
grep -n "@mixin [widgetName]" /Website/Styles/_globals/_theme.scss
```

**2.3 Document CSS Variables Used**
Look for patterns like:
- `var(--primary-color)` - Color
- `var(--padding-e-inner)` - Spacing
- `var(--general-cards-radius)` - Border radius

**2.4 Identify Hardcoded Values**
Look for values that should be variables but aren't:
- `color: #fff` instead of `var(--some-color)`
- `$primaryColor` (SCSS variable - won't cascade)

---

### Step 3: Create Test Case Document

**3.1 Create File**
Location: `/CP test/test-cases/[widget]-test-case.md`

**3.2 Document Structure**
```markdown
# [Widget Name] Test Cases

## Overview
- Components list
- CMS tags
- Number of variants

## Design Specifications (from Master Template CSV)
- Variant descriptions
- Behavior rules

## Color Variables (from CSV)
- Table mapping elements to color variables

## Font Variables (from CSV)
- Table mapping elements to font variables

## Code Implementation (from SCSS)
- Files used
- CSS variables used
- Key styles

## Test Cases
- Styling tests (SC-001, SC-002, etc.)
- Behavior tests (carousel, grid, etc.)
- Responsive tests

## Color Variable Tests (COL-001, etc.)
## Font Variable Tests (FV-001, etc.)
## Spacing Variable Tests (SV-001, etc.)
## Theme Variable Cascade Tests (TV-001, etc.)

## Known Bugs
## Test Execution Checklist
## Test URLs
```

---

### Step 4: Verify CSS Variable Implementation

**4.1 Manual Verification (Local)**
1. Open browser DevTools
2. Inspect element
3. Check computed styles match expected variables
4. Verify variable references (not hardcoded values)

**4.2 Theme Cascade Testing (Local)**
1. Open `/Website/Styles/_globals/_theme-cssvars.scss`
2. Change a CSS variable value (e.g., `--primary-color: #ff0000`)
3. Rebuild CSS locally
4. Verify ALL components using that variable change color
5. Document any that don't change (hardcoded or wrong variable)

**4.3 Playwright MCP Testing (Automated)**
Use Playwright to verify computed styles match expected values at different breakpoints.

---

### Step 5: Document Findings

**5.1 Update Test Case Document**
- Mark tests as passed/failed
- Document bugs found with:
  - Severity
  - Location (file:line)
  - Expected vs Actual
  - Screenshot if applicable

**5.2 Update CSV Checklists**
Mark tested items in the source CSVs:
- "Pass" / "Fail" with breakpoint
- BugHerd ID if applicable

---

## CSS Variable Reference

### Color Variables
| Design Token | CSS Variable | Default Value |
|--------------|--------------|---------------|
| branding 1 | `--primary-color` | `#1c2b3c` |
| branding 2 | `--secondary-color` | TBD |
| branding 3 | `--third-color` | TBD |
| branding 4 | `--fourth-color` | `#e4e7e9` |
| branding white | hardcoded | `#ffffff` |
| branding black | hardcoded | `#000000` |

### Spacing Variables
| Design Token | CSS Variable | Default Value (1440px) | Responsive |
|--------------|--------------|------------------------|------------|
| Padding A | `--padding-a-inner` | TBD | clmp() |
| Padding B | `--padding-b-inner` | TBD | clmp() |
| Padding C | `--padding-c-inner` | ~35px | clmp(20px, 35px) |
| Padding E | `--padding-e-inner` | ~30px | clmp(30px, 40px) |
| Padding G | `--padding-g-inner` | ~15px | clmp(15px, 20px) |

### Margin Variables (External)
| Breakpoint | Margin A | Margin B | Margin C | Margin D |
|------------|----------|----------|----------|----------|
| 375px | 60px | 40px | 30px | 20px |
| 1440px | 90px | 50px | 40px | 30px |
| 2560px | 140px | 70px | 60px | 30px |

### Border Radius Variables
| CSS Variable | Default Value |
|--------------|---------------|
| `--general-bradius` | `0.8rem` |
| `--general-cards-radius` | varies |
| `--general-story-radius` | `var(--general-bradius)` |

---

## Breakpoints to Test

| Name | Width | Priority |
|------|-------|----------|
| Mobile S | 320px | Medium |
| Mobile M | 375px | High |
| Mobile L | 425px | Low |
| Tablet | 768px | Medium |
| Desktop S | 1024px | Low |
| Desktop M | 1440px | High |
| Desktop L | 2560px | High |

---

## Test Case Naming Convention

| Prefix | Meaning | Example |
|--------|---------|---------|
| SC | Story Card | SC-001 |
| PC | Profile Card | PC-001 |
| SCAR | Stories Carousel | SCAR-001 |
| PCAR | Profiles Carousel | PCAR-001 |
| SGRID | Stories Grid | SGRID-001 |
| PGRID | Profiles Grid | PGRID-001 |
| COL | Color Variable Test | COL-001 |
| FV | Font Variable Test | FV-001 |
| SV | Spacing Variable Test | SV-001 |
| TV | Theme Variable (cascade) Test | TV-001 |
| RESP | Responsive Test | RESP-001 |
| A11Y | Accessibility Test | A11Y-001 |
| BUG | Bug Found | BUG-WIDGET-001 |

---

## Common Issues to Check

### 1. Hardcoded Colors
Look for:
- `color: #fff` instead of `var(--some-color)`
- `background: #000` instead of CSS variable
- SCSS `$primaryColor` instead of CSS `var(--primary-color)`

### 2. Wrong Variable Used
Look for:
- `--padding-c-inner` used where `--padding-e-inner` expected
- Variables not matching design spec

### 3. Missing Variable Reference
Look for:
- Elements that should use a variable but have hardcoded values
- Theme changes not cascading to component

### 4. Responsive Issues
Look for:
- Values not scaling at different breakpoints
- clmp() not working correctly
- Media query overrides breaking theme

---

## LLM Prompt Template

When starting a new widget test session, use this prompt:

```
I want to test the [WIDGET NAME] widget. Please:

1. Read the rules from:
   - /CP test/Master Template Progress - PHASE 1_ Content Page.csv
   - /CP test/Content page - Checklist - font variables.csv
   - /CP test/Content page - Checklist - colour variables.csv
   - /CP test/Content page - Checklist - spacing.csv

2. Find the SCSS implementation in:
   - /Website/Styles/Legacy/components/
   - /Website/Styles/_globals/_theme.scss

3. Create a test case document at:
   - /CP test/test-cases/[widget]-test-case.md

4. Verify CSS variables are correctly referenced

5. Document any hardcoded values that won't respond to theme changes

Follow the process in /CP test/docs/widget-testing-process.md
```

---

## Testing Environments

### Local Development
- URL: `localhost:[port]`
- Changes visible immediately after CSS rebuild
- Best for theme cascade testing

### Staging
- URL: `https://test-1-mvcbasev3.tiarc-staging.co.uk/`
- Requires upload and bundle to see changes
- Best for final verification

---

## Tools

### Browser DevTools
- Inspect element for computed styles
- Check CSS variable values
- Verify responsive behavior

### Playwright MCP
- Automated style verification
- Cross-browser testing
- Screenshot comparison

### BugHerd
- Bug tracking and reporting
- Task IDs referenced in CSVs

---

## Quick Reference Commands

```bash
# Find widget SCSS files
find /Website/Styles -name "*profile*.scss"

# Search for CSS variable usage
grep -rn "var(--primary-color)" /Website/Styles/

# Search for theme mixin
grep -n "@mixin profileCard" /Website/Styles/_globals/_theme.scss

# Search widget in font CSV
grep -i "profile" "/CP test/Content page - Checklist - font variables.csv"

# Search widget in color CSV
grep -i "profile" "/CP test/Content page - Checklist - colour variables.csv"

# Search widget in spacing CSV
grep -i "profile" "/CP test/Content page - Checklist - spacing.csv"
```

---

## Checklist for Each Widget Test

- [ ] Read Master Template CSV for widget rules
- [ ] Extract font variable mappings
- [ ] Extract color variable mappings
- [ ] Extract spacing variable mappings
- [ ] Find component SCSS files
- [ ] Find theme mixin
- [ ] Document CSS variables used
- [ ] Create test case document
- [ ] Verify styling at all breakpoints
- [ ] Test theme variable cascade
- [ ] Document bugs found
- [ ] Update test execution checklist
- [ ] Mark items in source CSVs


 Ready-to-use prompt for future testing sessions:
  I want to test the [WIDGET NAME] widget. Please:
  1. Read the rules from CSV files...
  2. Find the SCSS implementation...
  3. Create a test case document...
  Follow the process in /CP test/docs/widget-testing-process.md
