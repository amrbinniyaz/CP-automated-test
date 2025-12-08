# Content Page Testing Implementation Plan

**Project**: Automated spacing and behavior testing for Content Page widgets  
**Created**: October 22, 2025  
**Status**: Planning Phase

---

## 🎯 Project Goals

1. Validate spacing rules (margins & padding) across all breakpoints (375px, 1440px, 2560px)
2. Test widget behaviors (carousels, grids, responsive layouts)
3. Verify design implementation matches CSV specifications
4. Achieve 90%+ test coverage for content page components

---

## 📋 Phase 1: Setup & Discovery (Current Phase)

### ✅ Completed
- [x] Initial test suite structure created
- [x] Basic margin/padding tests implemented
- [x] Helper utilities created (spacing-helpers, assertion-helpers)
- [x] Report generator implemented
- [x] CSV rules document reviewed and understood

### 🔄 In Progress
- [ ] **Selector identification and verification**
- [ ] **Local codebase setup** (if available)

### 📝 Tasks

#### Task 1.1: Local Codebase Setup (Priority: HIGH)
**Goal**: Get access to actual component code for accurate selector discovery

**Actions**:
1. Clone/download the codebase repository
2. Set up local development environment
3. Document project structure
4. Identify component architecture (React/Vue/vanilla JS)
5. Locate CSS/SCSS files with spacing rules

**Deliverables**:
- Project structure documentation
- Component file locations
- CSS class naming conventions identified

**Time Estimate**: 1-2 hours

---

#### Task 1.2: Selector Discovery & Documentation
**Goal**: Create comprehensive and accurate selector mappings

**Approach A - With Local Codebase** (Preferred):
1. Search codebase for component class names
   ```bash
   grep -r "featuredParagraph" src/
   grep -r "module-widget" src/
   grep -r "content-templates" src/
   ```
2. Review component files to understand variant implementations
3. Check CSS/SCSS for actual class names used
4. Document BEM naming patterns

**Approach B - Without Local Codebase** (Fallback):
1. Use Playwright codegen on live site
   ```bash
   npm run codegen
   ```
2. Navigate to test page: `https://test-1-mvcbasev3.tiarc-staging.co.uk/full-list-of-widgets`
3. Click each widget type to capture selectors
4. Inspect elements in DevTools for verification
5. Document findings in spreadsheet

**Deliverables**:
- Updated `config/selectors.ts` with all required selectors
- Selector verification status document
- Notes on variant implementations

**Time Estimate**: 3-4 hours

---

#### Task 1.3: Selector Mapping Analysis
**Goal**: Map CSV requirements to actual selectors

**Actions**:
1. Create comparison matrix: CSV vs Current vs Actual
2. Categorize selectors by priority:
   - **P0**: Critical spacing rules (Margin A/B/C/D, key padding rules)
   - **P1**: Main widgets (cards, events, profiles, stories)
   - **P2**: Advanced widgets (carousels, grids, calculators)
   - **P3**: Nice-to-have (glossary, embedded content)
3. Identify which variants need separate selectors vs shared selectors
4. Document missing/incorrect selectors

**Deliverables**:
- Selector priority matrix
- Gap analysis document
- Implementation recommendations

**Time Estimate**: 2 hours

---

## 📋 Phase 2: Selector Implementation

### Task 2.1: Update selectors.ts
**Goal**: Implement all required selectors based on discovery phase

**Structure**:
```typescript
export const SELECTORS = {
  // Layout
  layout: { ... },
  
  // Text Elements
  text: {
    heading1: 'h1',
    heading2: 'h2',
    // ... all text elements
    featuredParagraph: '.featuredParagraph',
    featuredParagraphV1: '.featuredParagraph--v1', // if variants exist
    featuredParagraphV2: '.featuredParagraph--v2',
    featuredText: 'p.featuredText',
    quote: 'blockquote',
    bodyText: 'p',
  },
  
  // Content Templates
  contentTemplates: {
    halfHalf: '.content-templates--equal-column',
    halfHalfWidget: '.content-templates--widget-column',
    fullWidthImage: '.content-templates--full-width-image',
    fullWidthBg: '.content-templates--full-width-bg',
  },
  
  // Widgets - Individual
  widgets: {
    admissions: '.admissions-calculator',
    card: '.card',
    donations: '.donations-calculator',
    event: '.event-card',
    faq: '.faq',
    notice: '.notice-card',
    portal: '.portal-icon',
    profile: '.profile-card',
    promo: '.promo-card',
    stat: '.stat-card',
    story: '.story-card',
    tickertape: '.tickertape',
  },
  
  // Widgets - Collections
  carousels: {
    cards: '.card-carousel',
    events: '.events-carousel',
    profiles: '.profiles-carousel',
    promos: '.promos-carousel',
    stories: '.stories-carousel',
    stats: '.stats-carousel',
    quotes: '.quote-carousel',
    images: '.image-carousel',
    videos: '.video-carousel',
  },
  
  grids: {
    cards: '.card-grid',
    events: '.events-grid',
    profiles: '.profiles-grid',
    promos: '.promos-grid',
    stories: '.stories-grid',
    stats: '.stats-grid',
    videos: '.video-grid',
  },
  
  lists: {
    events: '.events-list',
    notices: '.notices-list',
    bulletList: 'ul',
    numberedList: 'ol',
  },
  
  // Buttons
  buttons: {
    primary: '.downloadBtn',
    secondary: '.secondaryDownloadBtn',
    tertiary: '.thirdDownloadBtn',
  },
  
  // Headers
  headers: {
    normal: '.header--normal',
    noHeader: '.header--minimal',
    video: '.header--video',
    imageCarousel: '.header--carousel',
  },
  
  // Other Elements
  misc: {
    divider: 'hr',
    table: 'table',
    glossary: '.glossary-term',
    embeddedImage: 'img',
    embeddedVideo: 'iframe',
    breadcrumbs: '.breadcrumbs',
  },
}
```

**Deliverables**:
- Complete `config/selectors.ts` file
- All selectors verified on live page
- Comments documenting verification status

**Time Estimate**: 2-3 hours

---

### Task 2.2: Verify Selectors on Live Page
**Goal**: Ensure all selectors work correctly

**Actions**:
1. Create verification script
2. Run against test page
3. Document which selectors find elements
4. Document which selectors fail (element not found)
5. Update selectors as needed

**Deliverables**:
- Selector verification report
- List of working selectors
- List of missing elements (not on page)

**Time Estimate**: 1-2 hours

---

## 📋 Phase 3: Spacing Rules Configuration

### Task 3.1: Update spacing-rules.ts
**Goal**: Ensure all spacing rules from CSV are captured

**Current Rules** (from CSV):
```typescript
// Margin Rules (External)
MARGIN_RULES = {
  A: { 375: 60, 1440: 90, 2560: 140 },
  B: { 375: 40, 1440: 50, 2560: 70 },
  C: { 375: 30, 1440: 40, 2560: 60 },
  D: { 375: 20, 1440: 30, 2560: 30 }
}

// Padding Rules (Internal)
PADDING_RULES = {
  featuredParagraphV1: {
    375: { top: 40, bottom: 40 },
    1440: { top: 85, bottom: 85 },
    2560: { top: 160, bottom: 160 }
  },
  contentTemplateHalfHalf: {
    375: { top: 50, bottom: 50 },
    1259: { top: 85, bottom: 85 },
    1260: { top: 85, bottom: 85 },
    2560: { top: 200, bottom: 200 }
  },
  fullWidthImage: {
    375: { top: 90, bottom: 90 },
    1440: { top: 150, bottom: 150 },
    2560: { top: 270, bottom: 270 }
  },
  divider: {
    375: { top: 60, bottom: 60 },
    1440: { top: 90, bottom: 90 },
    2560: { top: 165, bottom: 165 }
  },
  moduleWidgetWithBg: {
    // Internal padding: 89px (from existing tests)
    1440: { top: 89, bottom: 89 }
  },
  storyCard: {
    // Fixed 20px padding
    all: { top: 20, bottom: 20 }
  }
}
```

**Actions**:
1. Review CSV for all padding rules
2. Add missing padding rules to config
3. Document special cases (e.g., margin collapse rules)
4. Add tolerance values per component if needed

**Deliverables**:
- Updated `config/spacing-rules.ts`
- Documentation of special spacing rules
- Notes on margin collapse scenarios

**Time Estimate**: 2 hours

---

## 📋 Phase 4: Test Implementation

### Task 4.1: Core Spacing Tests
**Goal**: Test margin and padding rules for all components

**Test Categories**:

#### A. Margin Tests (External Spacing)
- Margin A: Large sections
- Margin B: Medium sections
- Margin C: Small sections
- Margin D: Minimal sections
- Margin collapse between stacked backgrounds

#### B. Padding Tests (Internal Spacing)
- Featured Paragraph V1 (3 breakpoints)
- Content Templates (half-half, full-width)
- Module widgets with backgrounds
- Story cards (fixed 20px)
- Dividers (3 breakpoints)

#### C. Responsive Tests
- Proportional scaling across breakpoints
- Breakpoint-specific behavior (1259px vs 1260px)
- No sudden spacing jumps
- Layout adaptations

**Deliverables**:
- Updated test files in `tests/` directory
- All tests passing or documented failures
- Test coverage report

**Time Estimate**: 4-6 hours

---

### Task 4.2: Widget Behavior Tests
**Goal**: Test widget-specific behaviors from CSV

**Test Categories**:

#### A. Carousel Behaviors
- Not looping (except where specified)
- Arrow disabled at start/end
- Arrows hidden when all visible
- Proper card height handling

#### B. Grid Behaviors
- Correct number of items per row
- Layout adaptation for different counts
- Row height determined by tallest item

#### C. Text Behaviors
- No single-word widowing (buttons, links)
- Proper text truncation (where specified)
- Hyphenation on mobile (headings)

#### D. Responsive Behaviors
- Mobile layout changes (media above HTML)
- Desktop layout changes (media beside HTML)
- Minimum height requirements

**Deliverables**:
- Widget behavior test files
- Component-specific test suites
- Behavior verification report

**Time Estimate**: 6-8 hours

---

### Task 4.3: Special Rules Tests
**Goal**: Test complex rules from CSV

**Special Cases**:
1. **Margin Collapse Rules**: 0px margin when stacked with backgrounds
2. **Minimum Heights**: Content templates at different breakpoints
3. **Carousel Controls**: Arrow positioning, pagination behavior
4. **Video Behaviors**: Autoplay, muting, preview loops
5. **Form Behaviors**: Keyboard navigation, focus styles
6. **Accessibility**: Touch targets, ARIA labels

**Deliverables**:
- Special rules test suite
- Edge case documentation
- Known limitations list

**Time Estimate**: 4-5 hours

---

## 📋 Phase 5: Refinement & Optimization

### Task 5.1: Replace Fixed Timeouts
**Goal**: Improve test reliability

**Actions**:
1. Replace `waitForTimeout(300)` with smart waits
2. Use `waitFor({ state: 'visible' })` for elements
3. Add proper wait conditions for dynamic content
4. Implement retry logic where needed

**Deliverables**:
- Updated test files with smart waits
- Improved test reliability
- Reduced flakiness

**Time Estimate**: 2-3 hours

---

### Task 5.2: Add Explicit Assertions
**Goal**: Fail tests explicitly when elements missing

**Actions**:
1. Remove conditional assertions (`if (element) { ... }`)
2. Add explicit element existence checks
3. Improve error messages
4. Add screenshots for failures

**Deliverables**:
- More robust test assertions
- Better failure diagnostics
- Clear error messages

**Time Estimate**: 2 hours

---

### Task 5.3: Cross-Browser Testing
**Goal**: Ensure tests work across browsers

**Actions**:
1. Add Firefox and WebKit to playwright.config.ts
2. Run tests on all browsers
3. Document browser-specific issues
4. Fix compatibility problems

**Deliverables**:
- Multi-browser test configuration
- Browser compatibility report
- Fixed cross-browser issues

**Time Estimate**: 2-3 hours

---

## 📋 Phase 6: CI/CD & Documentation

### Task 6.1: GitHub Actions Setup
**Goal**: Automate test execution

**Actions**:
1. Create `.github/workflows/spacing-tests.yml`
2. Configure test execution on push/PR
3. Set up artifact uploads (reports, screenshots)
4. Add status badges to README

**Deliverables**:
- Working CI/CD pipeline
- Automated test reports
- PR status checks

**Time Estimate**: 2 hours

---

### Task 6.2: Documentation Updates
**Goal**: Complete project documentation

**Actions**:
1. Update README.md with final instructions
2. Document all selectors with verification status
3. Create maintenance guide
4. Add troubleshooting section
5. Document known issues/limitations

**Deliverables**:
- Complete documentation
- Maintenance guide
- Troubleshooting guide
- Known issues list

**Time Estimate**: 2-3 hours

---

### Task 6.3: Team Onboarding
**Goal**: Enable team to use and maintain tests

**Actions**:
1. Create quick start guide
2. Record demo video (optional)
3. Conduct walkthrough session
4. Share best practices
5. Set up monitoring/alerts

**Deliverables**:
- Team training materials
- Quick reference guide
- Support documentation

**Time Estimate**: 2-3 hours

---

## 📊 Success Metrics

### Test Quality
- [ ] 90%+ test coverage for spacing rules
- [ ] 95%+ test reliability (no flaky tests)
- [ ] Test execution time < 5 minutes
- [ ] All critical widgets tested

### Implementation Quality
- [ ] All selectors verified and documented
- [ ] All spacing rules from CSV implemented
- [ ] Smart waits instead of fixed timeouts
- [ ] Explicit assertions (no silent passes)

### Documentation Quality
- [ ] Complete README with examples
- [ ] All selectors documented with status
- [ ] Troubleshooting guide available
- [ ] Team trained on usage

### CI/CD Quality
- [ ] Automated tests on every PR
- [ ] Test reports generated automatically
- [ ] Failures captured with screenshots
- [ ] Status checks prevent bad merges

---

## 🚀 Next Steps (Immediate)

### Priority 1: This Week
1. ✅ **Set up local codebase** (if available)
2. ✅ **Run codegen to discover selectors**
3. ✅ **Update selectors.ts with verified selectors**
4. ✅ **Run initial test suite to see current state**

### Priority 2: Next Week
1. ⏳ **Implement missing widget tests**
2. ⏳ **Add behavior tests for carousels/grids**
3. ⏳ **Replace fixed timeouts with smart waits**
4. ⏳ **Set up CI/CD pipeline**

### Priority 3: Following Week
1. ⏳ **Cross-browser testing**
2. ⏳ **Documentation completion**
3. ⏳ **Team onboarding**
4. ⏳ **Production deployment**

---

## 📝 Notes & Decisions

### Decision Log
- **2025-10-22**: Decided to prioritize local codebase setup for accurate selector discovery
- **2025-10-22**: Will use Approach 1 (minimal selectors) initially, expand as needed
- **2025-10-22**: Focus on spacing rules first, then widget behaviors

### Open Questions
- [ ] Do we have access to local codebase?
- [ ] Are widget variants implemented with different CSS classes?
- [ ] What's the priority order for widget testing?
- [ ] Should we test visual appearance or just spacing/behavior?

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Selectors not found on page | High | Use codegen + DevTools inspection |
| Variants not implemented yet | Medium | Document as "not found", test when available |
| Tests too slow | Medium | Optimize with parallel execution, smart waits |
| Flaky tests | High | Replace timeouts, add retry logic |
| Missing spacing rules in CSS | High | Document gaps, work with design team |

---


