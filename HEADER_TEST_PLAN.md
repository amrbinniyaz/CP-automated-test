# Content Page Header - Comprehensive Test Plan

## Test Coverage Overview
- **10 Header Variants** (Normal V1-V4, No Header V1-V2, Video V1-V2, Image Carousel V1-V2)
- **3 Breakpoints** (375px, 1440px, 2560px)
- **Common Elements** (Breadcrumbs, Notice Buttons, CTA Buttons, Gradients)
- **Interactive Elements** (Video Controls, Carousel Navigation, Hover States)

---

## 1. COMMON TESTS - All Header Types

### BREADCRUMBS

**BC-01: Breadcrumb visibility on mobile**
- Element: Breadcrumbs
- Breakpoint: 375px
- Expected: Hidden (not visible)
- Validation: `display: none` or not in DOM

**BC-02: Breadcrumb visibility on tablet**
- Element: Breadcrumbs
- Breakpoint: 400px+
- Expected: Visible
- Validation: Element exists and visible

**BC-03: Breadcrumb visibility on desktop**
- Element: Breadcrumbs
- Breakpoint: 1440px, 2560px
- Expected: Visible
- Validation: Element exists and visible

**BC-04: Breadcrumb content**
- Element: Breadcrumbs
- Breakpoint: All
- Expected: Shows "HOME | LEVEL 1" only
- Validation: Text content match

**BC-05: Breadcrumb links functionality**
- Element: Breadcrumb links
- Breakpoint: All
- Expected: Links are clickable and navigate correctly
- Validation: Click event, URL change

**BC-06: Breadcrumb text color (over image)**
- Element: Breadcrumbs
- Breakpoint: All
- Expected: White text on dark background
- Validation: `color: rgb(255, 255, 255)` or similar

**BC-07: Breadcrumb text color (on white)**
- Element: Breadcrumbs
- Breakpoint: All
- Expected: Dark text on white background
- Validation: `color: rgb(...)` dark value

---

### NOTICE BUTTONS

**NB-01: Notice buttons desktop layout**
- Element: Notice buttons container
- Breakpoint: 1440px, 2560px
- Expected: Vertical stack on right side
- Validation: Flex direction column, positioned right

**NB-02: Notice buttons mobile layout**
- Element: Notice buttons container
- Breakpoint: 375px
- Expected: Horizontal bar at bottom
- Validation: Flex direction row, positioned bottom

**NB-03: Notice button count**
- Element: Notice buttons
- Breakpoint: All
- Expected: 3 buttons visible (Notices, Events, Alert)
- Validation: Count = 3

**NB-04: Notice button badges**
- Element: Badge elements
- Breakpoint: All
- Expected: Badges show correct numbers
- Validation: Badge text content

**NB-05: Notice button positioning (1 button)**
- Element: Notice buttons
- Breakpoint: All
- Expected: Centered to right side of header
- Validation: Position correct regardless of count

**NB-06: Notice button positioning (2 buttons)**
- Element: Notice buttons
- Breakpoint: All
- Expected: Centered to right side of header
- Validation: Position correct regardless of count

**NB-07: Notice button positioning (3 buttons)**
- Element: Notice buttons
- Breakpoint: All
- Expected: Centered to right side of header
- Validation: Position correct regardless of count

**NB-08: Notice button hover - Notices**
- Element: Notices button
- Breakpoint: Desktop
- Expected: Hover effect visible
- Validation: Background/color change on hover

**NB-09: Notice button hover - Events**
- Element: Events button
- Breakpoint: Desktop
- Expected: Hover effect visible
- Validation: Background/color change on hover

**NB-10: Notice button hover - Alert**
- Element: Alert button
- Breakpoint: Desktop
- Expected: Hover effect visible
- Validation: Background/color change on hover

**NB-11: Notice button click**
- Element: All notice buttons
- Breakpoint: All
- Expected: Clickable and functional
- Validation: Click event fires

---

### CTA BUTTONS

**CTA-01: CTA buttons desktop position**
- Element: CTA buttons
- Breakpoint: 1440px, 2560px
- Expected: Top-right of header
- Validation: Position top-right

**CTA-02: CTA buttons mobile position**
- Element: CTA buttons
- Breakpoint: 375px
- Expected: In teal bar at top
- Validation: Inside top bar

**CTA-03: CTA button count**
- Element: CTA buttons
- Breakpoint: All
- Expected: 2 buttons visible
- Validation: Count = 2

**CTA-04: CTA button text**
- Element: CTA buttons
- Breakpoint: All
- Expected: "This is a CTA" text
- Validation: Text content match

**CTA-05: CTA button hover**
- Element: CTA buttons
- Breakpoint: Desktop
- Expected: Hover effect visible
- Validation: Background/color change on hover

**CTA-06: CTA button click**
- Element: CTA buttons
- Breakpoint: All
- Expected: Clickable and functional
- Validation: Click event fires

---

### GRADIENT

**GR-01: Gradient appears with image**
- Element: Gradient overlay
- Breakpoint: All
- Expected: Gradient visible only when image loaded
- Validation: Gradient present after image load

**GR-02: Gradient before image loads**
- Element: Gradient overlay
- Breakpoint: All
- Expected: Loader displays, no gradient
- Validation: Loader visible, gradient hidden

**GR-03: Gradient under H1 (single line)**
- Element: Gradient under H1
- Breakpoint: All
- Expected: Gradient matches H1 width
- Validation: Gradient width ≈ H1 width

**GR-04: Gradient under H1 (multi-line)**
- Element: Gradient under H1
- Breakpoint: All
- Expected: Gradient grows with H1 wrapping
- Validation: Gradient height increases with H1

**GR-05: Gradient color/opacity**
- Element: Gradient overlay
- Breakpoint: All
- Expected: Correct gradient styling
- Validation: CSS gradient values

---

### H1 HEADING

**H1-01: H1 text container width (over image)**
- Element: H1 element
- Breakpoint: All
- Expected: Wider than body text
- Validation: H1 width > body text width

**H1-02: H1 hyphenation on mobile**
- Element: H1 element
- Breakpoint: 375px
- Expected: Uses hyphenation, no word breaking
- Validation: `hyphens: auto` or similar

**H1-03: H1 text alignment (centered)**
- Element: H1 element
- Breakpoint: All
- Expected: Centered alignment
- Validation: `text-align: center`

**H1-04: H1 text alignment (left)**
- Element: H1 element
- Breakpoint: All
- Expected: Left alignment
- Validation: `text-align: left`

**H1-05: H1 font size scaling**
- Element: H1 element
- Breakpoint: 375px, 1440px, 2560px
- Expected: Font size increases with viewport
- Validation: Font size progression

**H1-06: H1 color (over image)**
- Element: H1 element
- Breakpoint: All
- Expected: White text
- Validation: `color: rgb(255, 255, 255)`

**H1-07: H1 color (on white background)**
- Element: H1 element
- Breakpoint: All
- Expected: Dark text
- Validation: `color: rgb(...)` dark value

---

### LOGO

**LG-01: Logo visibility**
- Element: Logo element
- Breakpoint: All
- Expected: Logo visible
- Validation: Element exists and visible

**LG-02: Logo position desktop**
- Element: Logo element
- Breakpoint: 1440px, 2560px
- Expected: Top-left corner
- Validation: Position top-left

**LG-03: Logo position mobile (centered)**
- Element: Logo element
- Breakpoint: 375px
- Expected: Centered in header section
- Validation: Centered horizontally

**LG-04: Logo position mobile (left-aligned)**
- Element: Logo element
- Breakpoint: 375px
- Expected: Left-aligned in header
- Validation: Positioned left

**LG-05: Logo clickable**
- Element: Logo link
- Breakpoint: All
- Expected: Navigates to home
- Validation: Click event, URL change

---

### HAMBURGER MENU

**HM-01: Hamburger menu visibility**
- Element: Menu icon
- Breakpoint: All
- Expected: Visible on all breakpoints
- Validation: Element visible

**HM-02: Hamburger menu position**
- Element: Menu icon
- Breakpoint: All
- Expected: Top-right corner
- Validation: Position top-right

**HM-03: Hamburger menu hover**
- Element: Menu icon
- Breakpoint: Desktop
- Expected: Hover effect visible
- Validation: Color/opacity change

**HM-04: Hamburger menu click**
- Element: Menu icon
- Breakpoint: All
- Expected: Opens navigation menu
- Validation: Menu opens on click

---

## 2. NORMAL HEADER VARIANTS (V1, V2, V3, V4)

### NORMAL V1 - Full-width Image Overlay

**NV1-01: Background image full-width**
- Variant: V1
- Breakpoint: All
- Expected: Image spans full viewport width
- Validation: Image width = 100vw

**NV1-02: H1 position over image**
- Variant: V1
- Breakpoint: All
- Expected: H1 overlaid on image with white text
- Validation: H1 z-index > image, white color

**NV1-03: Breadcrumbs position over image**
- Variant: V1
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs overlaid on image
- Validation: Breadcrumbs z-index > image

**NV1-04: Gradient overlay present**
- Variant: V1
- Breakpoint: All
- Expected: Dark gradient over image
- Validation: Gradient visible

**NV1-05: Notice buttons visible**
- Variant: V1
- Breakpoint: All
- Expected: All 3 notice buttons visible
- Validation: Count = 3, visible

**NV1-06: Header height consistency**
- Variant: V1
- Breakpoint: All
- Expected: Consistent header height
- Validation: Height within expected range

**NV1-07: Mobile responsive layout**
- Variant: V1
- Breakpoint: 375px
- Expected: CTA bar top, logo centered, H1 over image
- Validation: Layout matches design

---

### NORMAL V2 - Stacked (Image Top, Content Bottom)

**NV2-01: Image section at top**
- Variant: V2
- Breakpoint: All
- Expected: Image section positioned above content
- Validation: Image before H1 in DOM

**NV2-02: H1 position below image**
- Variant: V2
- Breakpoint: All
- Expected: H1 on white background below image
- Validation: H1 after image, white bg

**NV2-03: Breadcrumbs position below image**
- Variant: V2
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs on white background
- Validation: Breadcrumbs after image

**NV2-04: H1 text color dark**
- Variant: V2
- Breakpoint: All
- Expected: Dark text on white background
- Validation: Dark color value

**NV2-05: No gradient under H1**
- Variant: V2
- Breakpoint: All
- Expected: No gradient (H1 on white)
- Validation: No gradient element

**NV2-06: Content section background**
- Variant: V2
- Breakpoint: All
- Expected: White background for content section
- Validation: Background white

**NV2-07: Image section height**
- Variant: V2
- Breakpoint: All
- Expected: Image section has appropriate height
- Validation: Height within range

---

### NORMAL V3 - Split Layout (Content Left, Image Right)

**NV3-01: Split layout desktop**
- Variant: V3
- Breakpoint: 1440px, 2560px
- Expected: Left solid color, right image
- Validation: Two-column layout

**NV3-02: H1 on solid background left**
- Variant: V3
- Breakpoint: 1440px, 2560px
- Expected: H1 on dark solid background (left)
- Validation: H1 in left column, dark bg

**NV3-03: Breadcrumbs on solid background**
- Variant: V3
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs on dark solid (left)
- Validation: Breadcrumbs in left column

**NV3-04: Image on right side only**
- Variant: V3
- Breakpoint: 1440px, 2560px
- Expected: Image fills right column
- Validation: Image in right column

**NV3-05: No gradient over image**
- Variant: V3
- Breakpoint: All
- Expected: Image is decorative, no gradient
- Validation: No gradient on image

**NV3-06: Multi-line H1 visible**
- Variant: V3
- Breakpoint: All
- Expected: H1 can wrap multiple lines
- Validation: Text wrapping works

**NV3-07: Mobile stacked layout**
- Variant: V3
- Breakpoint: 375px
- Expected: Content stacks vertically
- Validation: Single column layout

**NV3-08: Solid background color**
- Variant: V3
- Breakpoint: All
- Expected: Dark blue/navy background
- Validation: Background color correct

---

### NORMAL V4 - Framed/Boxed Layout

**NV4-01: Framed layout desktop**
- Variant: V4
- Breakpoint: 1440px, 2560px
- Expected: Image inset with frame/margins
- Validation: Image has margins

**NV4-02: Solid background frame**
- Variant: V4
- Breakpoint: All
- Expected: Dark solid background around image
- Validation: Frame background visible

**NV4-03: H1 over inset image**
- Variant: V4
- Breakpoint: All
- Expected: H1 overlaid on framed image
- Validation: H1 over image, white text

**NV4-04: Breadcrumbs over inset image**
- Variant: V4
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs over framed image
- Validation: Breadcrumbs over image

**NV4-05: Logo outside image frame**
- Variant: V4
- Breakpoint: All
- Expected: Logo on solid background
- Validation: Logo not over image

**NV4-06: CTA buttons outside frame**
- Variant: V4
- Breakpoint: 1440px, 2560px
- Expected: CTAs on solid background
- Validation: CTAs not over image

**NV4-07: Image inset margins**
- Variant: V4
- Breakpoint: All
- Expected: Visible margins around image
- Validation: Margins present

**NV4-08: Gradient over framed image**
- Variant: V4
- Breakpoint: All
- Expected: Gradient overlay on image
- Validation: Gradient visible

---

## 3. NO HEADER VARIANTS (V1, V2)

### NO HEADER V1 - Centered Logo Mobile

**NH1-01: Reduced header height**
- Variant: V1
- Breakpoint: All
- Expected: Significantly shorter than Normal headers
- Validation: Height < Normal header height

**NH1-02: Solid background only**
- Variant: V1
- Breakpoint: All
- Expected: Dark solid background, no image
- Validation: No background image

**NH1-03: Logo position desktop**
- Variant: V1
- Breakpoint: 1440px, 2560px
- Expected: Logo top-left
- Validation: Position top-left

**NH1-04: Logo position mobile centered**
- Variant: V1
- Breakpoint: 375px
- Expected: Logo centered in header
- Validation: Centered horizontally

**NH1-05: H1 on solid background**
- Variant: V1
- Breakpoint: All
- Expected: H1 white text on dark background
- Validation: White text, dark bg

**NH1-06: Breadcrumbs visibility desktop**
- Variant: V1
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs visible, centered
- Validation: Visible and centered

**NH1-07: Breadcrumbs hidden mobile**
- Variant: V1
- Breakpoint: 375px
- Expected: Breadcrumbs hidden
- Validation: Not visible

**NH1-08: Minimal visual elements**
- Variant: V1
- Breakpoint: All
- Expected: Only essential navigation
- Validation: Clean, minimal design

**NH1-09: Content starts immediately**
- Variant: V1
- Breakpoint: All
- Expected: Content directly below header
- Validation: No gap

---

### NO HEADER V2 - Left-aligned Logo Mobile

**NH2-01: Reduced header height**
- Variant: V2
- Breakpoint: All
- Expected: Significantly shorter than Normal headers
- Validation: Height < Normal header height

**NH2-02: Logo position mobile left**
- Variant: V2
- Breakpoint: 375px
- Expected: Logo left-aligned (not centered)
- Validation: Positioned left

**NH2-03: Logo horizontal layout**
- Variant: V2
- Breakpoint: 375px
- Expected: Icon + text horizontal
- Validation: Flex row layout

**NH2-04: All other elements same as V1**
- Variant: V2
- Breakpoint: All
- Expected: Same as V1 except logo position
- Validation: Match V1 behavior

---

## 4. VIDEO HEADER VARIANTS (V1, V2)

### VIDEO V1 - Video Overlay

**VH1-01: Video fills header space**
- Variant: V1
- Breakpoint: All
- Expected: Video element fills entire header
- Validation: Video width/height = 100%

**VH1-02: Vimeo framework hidden**
- Variant: V1
- Breakpoint: All
- Expected: Default Vimeo controls not visible
- Validation: Vimeo UI hidden

**VH1-03: Video auto-play enabled**
- Variant: V1
- Breakpoint: All
- Expected: Video plays automatically on load
- Validation: Video playing state = true

**VH1-04: Video looping enabled**
- Variant: V1
- Breakpoint: All
- Expected: Video loops continuously
- Validation: Loop attribute = true

**VH1-05: Pause button shows pause icon**
- Variant: V1
- Breakpoint: All
- Expected: Pause icon (||) visible when playing
- Validation: Icon = pause symbol

**VH1-06: Video muted by default**
- Variant: V1
- Breakpoint: All
- Expected: Video starts muted
- Validation: Muted attribute = true

**VH1-07: Unmute button shows muted icon**
- Variant: V1
- Breakpoint: All
- Expected: Crossed speaker icon when muted
- Validation: Icon = muted symbol

**VH1-08: Play/pause button click**
- Variant: V1
- Breakpoint: All
- Expected: Toggles video play/pause
- Validation: Video state changes

**VH1-09: Play/pause icon toggle**
- Variant: V1
- Breakpoint: All
- Expected: Icon changes between play/pause
- Validation: Icon updates on click

**VH1-10: Mute/unmute button click**
- Variant: V1
- Breakpoint: All
- Expected: Toggles video sound
- Validation: Muted state changes

**VH1-11: Mute/unmute icon toggle**
- Variant: V1
- Breakpoint: All
- Expected: Icon changes between muted/unmuted
- Validation: Icon updates on click

**VH1-12: Video controls position desktop**
- Variant: V1
- Breakpoint: 1440px, 2560px
- Expected: Controls on left side
- Validation: Positioned left

**VH1-13: Video controls position mobile**
- Variant: V1
- Breakpoint: 375px
- Expected: Controls on left, teal background
- Validation: Positioned left with bg

**VH1-14: H1 over video**
- Variant: V1
- Breakpoint: All
- Expected: H1 overlaid on video, white text
- Validation: H1 z-index > video

**VH1-15: Breadcrumbs over video**
- Variant: V1
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs over video
- Validation: Breadcrumbs visible over video

**VH1-16: Video controls hover - Pause**
- Variant: V1
- Breakpoint: Desktop
- Expected: Hover effect on pause button
- Validation: Background/opacity change

**VH1-17: Video controls hover - Mute**
- Variant: V1
- Breakpoint: Desktop
- Expected: Hover effect on mute button
- Validation: Background/opacity change

---

### VIDEO V2 - Video Stacked

**VH2-01: Video section at top**
- Variant: V2
- Breakpoint: All
- Expected: Video positioned above content
- Validation: Video before H1 in DOM

**VH2-02: H1 below video**
- Variant: V2
- Breakpoint: All
- Expected: H1 on white background below video
- Validation: H1 after video, white bg

**VH2-03: Breadcrumbs below video**
- Variant: V2
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs on white background
- Validation: Breadcrumbs after video

**VH2-04: H1 text color dark**
- Variant: V2
- Breakpoint: All
- Expected: Dark text on white background
- Validation: Dark color value

**VH2-05: All video controls same as V1**
- Variant: V2
- Breakpoint: All
- Expected: Same video behavior as V1
- Validation: Match V1 video tests

---

## 5. IMAGE CAROUSEL (FADER) HEADER VARIANTS (V1, V2)

### CAROUSEL V1 - Carousel Overlay

**CH1-01: Carousel images load**
- Variant: V1
- Breakpoint: All
- Expected: All carousel images load properly
- Validation: Images loaded

**CH1-02: Pagination dots visible desktop**
- Variant: V1
- Breakpoint: 1440px, 2560px
- Expected: Dots visible at bottom center
- Validation: Dots visible

**CH1-03: Pagination dot count**
- Variant: V1
- Breakpoint: All
- Expected: Number of dots = number of images
- Validation: Count matches

**CH1-04: Active pagination dot**
- Variant: V1
- Breakpoint: All
- Expected: First dot active (white/highlighted)
- Validation: Active state visible

**CH1-05: Pagination dots clickable**
- Variant: V1
- Breakpoint: All
- Expected: Clicking dot changes carousel image
- Validation: Image changes on click

**CH1-06: Pagination dot hover**
- Variant: V1
- Breakpoint: Desktop
- Expected: Hover effect on dots
- Validation: Opacity/scale change

**CH1-07: Navigation arrows mobile**
- Variant: V1
- Breakpoint: 375px
- Expected: Left and right arrows visible
- Validation: Arrows present

**CH1-08: Left arrow click**
- Variant: V1
- Breakpoint: 375px
- Expected: Previous image displays
- Validation: Image changes

**CH1-09: Right arrow click**
- Variant: V1
- Breakpoint: 375px
- Expected: Next image displays
- Validation: Image changes

**CH1-10: Arrow hover mobile**
- Variant: V1
- Breakpoint: 375px
- Expected: Hover effect on arrows
- Validation: Background change

**CH1-11: Fading transition**
- Variant: V1
- Breakpoint: All
- Expected: Images fade in/out (not slide)
- Validation: Fade animation

**CH1-12: H1 over carousel**
- Variant: V1
- Breakpoint: All
- Expected: H1 overlaid on carousel, white text
- Validation: H1 z-index > carousel

**CH1-13: Breadcrumbs over carousel**
- Variant: V1
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs over carousel
- Validation: Breadcrumbs visible

**CH1-14: Gradient over carousel images**
- Variant: V1
- Breakpoint: All
- Expected: Gradient overlay on images
- Validation: Gradient visible

**CH1-15: Carousel auto-rotate disabled**
- Variant: V1
- Breakpoint: All
- Expected: Carousel doesn't auto-advance
- Validation: Manual control only

**CH1-16: First image displays on load**
- Variant: V1
- Breakpoint: All
- Expected: First carousel image shows initially
- Validation: First image active

---

### CAROUSEL V2 - Carousel Stacked

**CH2-01: Carousel section at top**
- Variant: V2
- Breakpoint: All
- Expected: Carousel positioned above content
- Validation: Carousel before H1

**CH2-02: H1 below carousel**
- Variant: V2
- Breakpoint: All
- Expected: H1 on white background below carousel
- Validation: H1 after carousel, white bg

**CH2-03: Breadcrumbs below carousel**
- Variant: V2
- Breakpoint: 1440px, 2560px
- Expected: Breadcrumbs on white background
- Validation: Breadcrumbs after carousel

**CH2-04: Pagination dots position**
- Variant: V2
- Breakpoint: 1440px, 2560px
- Expected: Dots at bottom-left of carousel
- Validation: Positioned bottom-left

**CH2-05: H1 text color dark**
- Variant: V2
- Breakpoint: All
- Expected: Dark text on white background
- Validation: Dark color value

**CH2-06: All carousel controls same as V1**
- Variant: V2
- Breakpoint: All
- Expected: Same carousel behavior as V1
- Validation: Match V1 carousel tests

---

## 6. RESPONSIVE BEHAVIOR TESTS

**RB-01: Mobile to tablet transition**
- Element: All elements
- Breakpoints: 375px → 768px
- Expected: Layout adapts smoothly
- Validation: No broken layouts

**RB-02: Tablet to desktop transition**
- Element: All elements
- Breakpoints: 768px → 1440px
- Expected: Layout adapts smoothly
- Validation: No broken layouts

**RB-03: Desktop to large desktop**
- Element: All elements
- Breakpoints: 1440px → 2560px
- Expected: Layout scales appropriately
- Validation: Proper scaling

**RB-04: Breadcrumb breakpoint**
- Element: Breadcrumbs
- Breakpoints: 399px → 400px
- Expected: Breadcrumbs appear at 400px
- Validation: Visibility toggles

**RB-05: Notice buttons reposition**
- Element: Notice buttons
- Breakpoints: 375px ↔ 1440px
- Expected: Vertical ↔ horizontal layout
- Validation: Layout changes

**RB-06: CTA buttons reposition**
- Element: CTA buttons
- Breakpoints: 375px ↔ 1440px
- Expected: Top bar ↔ top-right
- Validation: Position changes

**RB-07: Logo reposition**
- Element: Logo
- Breakpoints: 375px ↔ 1440px
- Expected: Centered/left ↔ top-left
- Validation: Position changes

**RB-08: Font size scaling**
- Element: H1, breadcrumbs
- Breakpoints: All
- Expected: Text scales with viewport
- Validation: Font sizes increase

**RB-09: Spacing scaling**
- Element: Margins, padding
- Breakpoints: All
- Expected: Spacing scales with viewport
- Validation: Spacing increases

**RB-10: Image aspect ratio**
- Element: Background images
- Breakpoints: All
- Expected: Images maintain aspect ratio
- Validation: No distortion

---

## 7. ACCESSIBILITY TESTS

**A11Y-01: Keyboard navigation**
- Element: All interactive elements
- Expected: Tab navigation works
- Validation: Tab through elements

**A11Y-02: Focus indicators**
- Element: Buttons, links
- Expected: Visible focus state
- Validation: Focus outline visible

**A11Y-03: ARIA labels**
- Element: Notice buttons
- Expected: Proper ARIA labels
- Validation: aria-label present

**A11Y-04: Alt text**
- Element: Images
- Expected: Images have alt text
- Validation: alt attribute present

**A11Y-05: Color contrast (over image)**
- Element: Text over images
- Expected: Sufficient contrast ratio
- Validation: Contrast ratio ≥ 4.5:1

**A11Y-06: Color contrast (on white)**
- Element: Text on white background
- Expected: Sufficient contrast ratio
- Validation: Contrast ratio ≥ 4.5:1

**A11Y-07: Screen reader compatibility**
- Element: All elements
- Expected: Screen reader announces correctly
- Validation: Screen reader testing

**A11Y-08: Video controls accessible**
- Element: Video buttons
- Expected: Keyboard accessible
- Validation: Keyboard control works

**A11Y-09: Carousel controls accessible**
- Element: Carousel navigation
- Expected: Keyboard accessible
- Validation: Arrow keys work

**A11Y-10: Heading hierarchy**
- Element: H1 element
- Expected: Proper heading level
- Validation: H1 is first heading

---

## 8. PERFORMANCE TESTS

**PERF-01: Image loading**
- Element: Background images
- Expected: Images load within 3 seconds
- Validation: Load time < 3s

**PERF-02: Loader display**
- Element: Loader element
- Expected: Loader shows while image loading
- Validation: Loader visible

**PERF-03: Video loading**
- Element: Video element
- Expected: Video loads and plays smoothly
- Validation: No stuttering

**PERF-04: Carousel image preload**
- Element: Carousel images
- Expected: Next images preloaded
- Validation: Smooth transitions

**PERF-05: Animation performance**
- Element: Transitions, fades
- Expected: Smooth 60fps animations
- Validation: No jank

**PERF-06: Mobile performance**
- Element: All elements
- Expected: Fast load on mobile
- Validation: Load time acceptable

---

## 9. EDGE CASES & ERROR HANDLING

**EDGE-01: Very long H1 text**
- Scenario: H1 with 100+ characters
- Expected: Text wraps properly, no overflow
- Validation: Text contained

**EDGE-02: Missing background image**
- Scenario: Image fails to load
- Expected: Fallback background or loader
- Validation: Graceful degradation

**EDGE-03: Missing video**
- Scenario: Video fails to load
- Expected: Fallback image or error message
- Validation: Error handling

**EDGE-04: Single carousel image**
- Scenario: Only 1 image in carousel
- Expected: No pagination, no arrows
- Validation: Controls hidden

**EDGE-05: Many carousel images**
- Scenario: 10+ images in carousel
- Expected: All images accessible
- Validation: Pagination works

**EDGE-06: Slow network**
- Scenario: 3G connection
- Expected: Loader displays, progressive load
- Validation: Loader visible

**EDGE-07: No JavaScript**
- Scenario: JS disabled
- Expected: Fallback layout displays
- Validation: Basic functionality

**EDGE-08: Missing notice buttons**
- Scenario: 0 buttons configured
- Expected: Layout doesn't break
- Validation: No errors

**EDGE-09: Missing CTA buttons**
- Scenario: 0 CTAs configured
- Expected: Layout doesn't break
- Validation: No errors

**EDGE-10: Very short header**
- Scenario: Minimal content
- Expected: Minimum height maintained
- Validation: Height ≥ minimum

---

## 10. CROSS-BROWSER TESTS

**CB-01: Chrome (latest)**
- Variants: All variants
- Expected: Full functionality

**CB-02: Firefox (latest)**
- Variants: All variants
- Expected: Full functionality

**CB-03: Safari (latest)**
- Variants: All variants
- Expected: Full functionality

**CB-04: Edge (latest)**
- Variants: All variants
- Expected: Full functionality

**CB-05: Mobile Safari (iOS)**
- Variants: All variants
- Expected: Full functionality

**CB-06: Chrome Mobile (Android)**
- Variants: All variants
- Expected: Full functionality

---

## Test Execution Priority

### **Priority 1 (Critical)** - Must Pass
- All Common Tests (Breadcrumbs, Notice Buttons, H1)
- Layout positioning for all variants
- Responsive behavior at all breakpoints
- Video auto-play and controls
- Carousel navigation

### **Priority 2 (High)** - Should Pass
- Hover states
- Gradient behavior
- Accessibility basics
- Performance (loading)

### **Priority 3 (Medium)** - Nice to Have
- Edge cases
- Cross-browser compatibility
- Advanced accessibility
- Animation smoothness

---

## Test Data Requirements

### **Test URLs Needed:**
- `/header-normal-v1` - Normal Header Variant 1
- `/header-normal-v2` - Normal Header Variant 2
- `/header-normal-v3` - Normal Header Variant 3
- `/header-normal-v4` - Normal Header Variant 4
- `/header-no-header-v1` - No Header Variant 1
- `/header-no-header-v2` - No Header Variant 2
- `/header-video-v1` - Video Header Variant 1
- `/header-video-v2` - Video Header Variant 2
- `/header-carousel-v1` - Image Carousel Header Variant 1
- `/header-carousel-v2` - Image Carousel Header Variant 2

### **Test Assets Needed:**
- Background images (various sizes)
- Video file (for video headers)
- Multiple carousel images (3-5 images)
- Logo image
- Test content (H1 text, featured paragraphs)

---

## Success Criteria

✅ **All Priority 1 tests pass** at 375px, 1440px, 2560px  
✅ **90%+ of Priority 2 tests pass**  
✅ **Breadcrumbs hidden ≤ 399px, visible ≥ 400px**  
✅ **Video auto-plays, loops, and is muted by default**  
✅ **Carousel pagination and navigation work correctly**  
✅ **All hover states function properly**  
✅ **No console errors or warnings**  
✅ **Accessible to keyboard and screen reader users**

---

## Total Test Count: **200+ individual test cases**
