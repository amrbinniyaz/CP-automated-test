# Common Bugs Testing Documentation

## Overview

The `tests/common-bugs.spec.ts` file contains tests for frequently occurring bugs found in production. These tests help catch real-world issues before they reach users.

---

## Bugs Tested

### 1. **Stats Widget Bugs** ⭐ Priority: HIGH

#### Bug: Duplicate Dollar Signs (`$$`)
**Example**: `200$$` instead of `$200` or `200$`

**Selectors**:
- Widget: `.module-widget--stats`
- Card: `.stat-card`
- Figure: `.stat-card__head`
- Title: `.stat-card__subhead`

**Test**:
```typescript
test('should NOT have duplicate dollar signs ($$) in stat figures')
```

**What it checks**:
- Scans all stat cards on the page
- Looks for `$$` in the figure text
- Reports which cards have the bug

**Expected Result**: ✅ PASS (no duplicate dollar signs found)

**Current Status**: ❌ FAIL (found 4 instances of `200$$`)

---

#### Bug: Duplicate Percent Signs (`%%`)
**Example**: `100%%` instead of `100%`

**Test**:
```typescript
test('should NOT have duplicate percent signs (%%) in stat figures')
```

---

#### Bug: Duplicate Currency Symbols
**Examples**: `££`, `€€`, `¥¥`, `##`

**Test**:
```typescript
test('should NOT have duplicate currency symbols (££, €€, ¥¥)')
```

---

#### Bug: Empty Stat Figures
**Example**: Stat card shows title but no number/figure

**Test**:
```typescript
test('should NOT have empty stat figures')
```

---

### 2. **Button Bugs**

#### Bug: Buttons with Only Whitespace
**Example**: Button exists but has no visible text

**Test**:
```typescript
test('should NOT have buttons with only whitespace text')
```

---

#### Bug: Duplicate Button Text
**Example**: `"Click HereClick Here"` instead of `"Click Here"`

**Test**:
```typescript
test('should NOT have duplicate button text')
```

**Detection Logic**:
- Splits button text into words
- Checks if first half equals second half
- Reports if duplication found

---

### 3. **Link Bugs**

#### Bug: Placeholder Links (`href="#"`)
**Example**: Links that go nowhere in main content

**Test**:
```typescript
test('should NOT have links with href="#" that are not intentional placeholders')
```

**Note**: This is informational - some `#` links are intentional (navigation, modals)

---

#### Bug: Broken Mailto Links
**Example**: `mailto:` with no email address

**Test**:
```typescript
test('should NOT have broken mailto links (missing email address)')
```

---

### 4. **Image Bugs**

#### Bug: Missing Alt Text
**Example**: `<img src="..." alt="">` or `<img src="...">`

**Test**:
```typescript
test('should NOT have images with missing alt text (accessibility)')
```

**Accessibility Impact**: Screen readers can't describe the image

---

#### Bug: Placeholder Images
**Example**: Images with URLs containing `placeholder`, `dummy`, `test-image`

**Test**:
```typescript
test('should NOT have images with src pointing to placeholder/dummy URLs')
```

---

### 5. **Text Content Bugs**

#### Bug: Lorem Ipsum in Headings
**Example**: `<h2>Lorem Ipsum Dolor Sit Amet</h2>`

**Test**:
```typescript
test('should NOT have "Lorem Ipsum" placeholder text in headings')
```

**Note**: May be intentional on test pages

---

#### Bug: Double Spaces
**Example**: `"This is  a  test"` (multiple consecutive spaces)

**Test**:
```typescript
test('should NOT have duplicate consecutive spaces in visible text')
```

---

### 6. **Widget Duplication Bugs**

#### Bug: Duplicate Widget IDs
**Example**: Two widgets with `id="widget-123"`

**Test**:
```typescript
test('should NOT have duplicate widget IDs')
```

**Impact**: JavaScript targeting may fail, accessibility issues

---

#### Bug: Stats Appearing Multiple Times
**Example**: Same stat card repeated excessively

**Test**:
```typescript
test('should NOT have stats appearing multiple times with same content')
```

**Threshold**: Allows up to 4 duplicates (for carousels/grids), fails if more

---

### 7. **Carousel Bugs**

#### Bug: Arrow Buttons Not Disabled at Start/End
**Example**: "Previous" button clickable when at first slide

**Test**:
```typescript
test('carousel arrows should be disabled at start/end positions')
```

**Expected Behavior**:
- At start: Previous button disabled ✅
- At end: Next button disabled ✅

---

## How to Run

### Run All Common Bug Tests
```bash
npx playwright test common-bugs.spec.ts
```

### Run Specific Bug Category
```bash
# Stats widget bugs only
npx playwright test common-bugs.spec.ts -g "Stats Widget Bugs"

# Button bugs only
npx playwright test common-bugs.spec.ts -g "Button Bugs"

# Link bugs only
npx playwright test common-bugs.spec.ts -g "Link Bugs"
```

### Run Single Test
```bash
npx playwright test common-bugs.spec.ts -g "duplicate dollar signs"
```

### Run with UI Mode (Interactive)
```bash
npx playwright test common-bugs.spec.ts --ui
```

---

## Test Results Example

### ✅ Passing Test
```
✓ should NOT have duplicate percent signs (%%) in stat figures (1.2s)
```

### ❌ Failing Test
```
✗ should NOT have duplicate dollar signs ($$) in stat figures (1.5s)

  Error: Found duplicate dollar signs in stat figures:
  Card 2: "200$$" (This is a stat with external URL)
  Card 8: "200$$" (This is a stat with external URL)
  Card 14: "200$$" (This is a stat with external URL)
  Card 20: "200$$" (This is a stat with external URL)
```

---

## Adding New Bug Tests

### Step 1: Identify the Bug
1. Navigate to the page with the bug
2. Inspect the element
3. Note the selector and bug pattern

### Step 2: Add Test to `common-bugs.spec.ts`

```typescript
test('should NOT have [bug description]', async ({ page }) => {
  // 1. Find affected elements
  const elements = await page.locator('[selector]').all();
  
  // 2. Check each element
  const bugsFound: string[] = [];
  
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const content = await element.textContent();
    
    // 3. Detect bug pattern
    if (content && [bug condition]) {
      bugsFound.push(`Element ${i + 1}: "${content}"`);
    }
  }
  
  // 4. Assert no bugs found
  expect(bugsFound, `Found [bug name]:\n${bugsFound.join('\n')}`).toHaveLength(0);
});
```

### Step 3: Run and Verify
```bash
npx playwright test common-bugs.spec.ts -g "[your test name]"
```

---

## Questions to Ask When Adding Bug Tests

1. **Is this a real bug or intentional?**
   - Example: Lorem Ipsum on test pages is intentional

2. **How common is this bug?**
   - Only add tests for bugs that occur frequently

3. **Can it be detected automatically?**
   - Some bugs require human judgment

4. **What's the impact?**
   - Prioritize bugs that affect users or accessibility

5. **Should it fail or warn?**
   - Critical bugs: Fail the test ❌
   - Minor issues: Log warning ⚠️

---

## Maintenance

### When to Update Tests

1. **New bugs discovered in production**
   - Add test to prevent regression

2. **Design changes**
   - Update expected patterns if intentional

3. **False positives**
   - Refine detection logic
   - Add exceptions for valid cases

### Review Schedule

- **Weekly**: Check test results
- **Monthly**: Review and update bug patterns
- **After incidents**: Add tests for new bugs found

---

## Integration with CI/CD

Add to `.github/workflows/spacing-tests.yml`:

```yaml
- name: Run Common Bug Tests
  run: npx playwright test common-bugs.spec.ts
  
- name: Upload Bug Report
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: bug-test-report
    path: reports/
```

---

## Current Known Issues

### Stats Widget - Duplicate Dollar Signs
**Status**: ❌ FAILING  
**Found**: 4 instances of `200$$`  
**Location**: Stats carousel and grid  
**Fix Needed**: Update CMS or template to prevent duplicate symbols  

---

## Contact

For questions about common bug tests:
- Review test file: `tests/common-bugs.spec.ts`
- Check selectors: `config/selectors.ts`
- See plan: `plan.md`

---

**Last Updated**: October 22, 2025  
**Test File**: `tests/common-bugs.spec.ts`  
**Total Bug Tests**: 15+
