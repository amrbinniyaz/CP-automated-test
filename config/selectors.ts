export const SELECTORS = {
  layout: {
    mainLayout: '.main-layout',
    heroContent: '.hero-cp__content',
    moduleContent: '.module-content'
  },
  text: {
    featuredParagraph: '.featuredParagraph',
    featuredParagraphV1: '.featuredParagraph', // Verified: no v1/v2 variants exist, using base class
    featuredParagraphV2: '.featuredParagraph', // Verified: no v1/v2 variants exist, using base class
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    bodyText: 'p'
  },
  widgets: {
    moduleWidget: '.module-widget',
    moduleWidgetWithBg: '.module-widget--with-bg',
    widgetWrapper: '.module-widget__wrapper',
    widgetTitle: '.module-widget__title',
    stories: '.module-widget--stories',
    events: '.module-widget--events', // Verified: exists (1 found on page)
    profiles: '.module-widget--profiles', // Verified: exists (4 found on page)
  },
  cards: {
    storyCard: '.story-card',
    storyCardContent: '.story-card__content',
    cardCarousel: '.module-widget--has-carousel',
    eventCard: '.event-card', // Verified: exists (3 found on page)
    profileCard: '.profile-card', // Verified: exists (10 found on page)
    promoCard: '.promo-card', // Verified: exists (24 found on page)
  },
  contentTemplates: {
    halfHalf: '.content-templates--equal-column', // Verified: actual class is content-templates--equal-column (note: templates is plural)
    fullWidth: '.content-templates--full-width-image', // Verified: actual class is content-templates--full-width-image (note: templates is plural)
  },
  buttons: {
    primary: '.downloadBtn', // Verified: actual class is downloadBtn
    secondary: '.secondaryDownloadBtn', // Verified: actual class is secondaryDownloadBtn
    tertiary: '.thirdDownloadBtn', // Verified: actual class is thirdDownloadBtn
  },
  lists: {
    bulletList: 'ul',
    numberedList: 'ol'
  },
  misc: {
    divider: 'hr',
    table: 'table',
    quote: 'blockquote', // Verified: no .quote class exists, using blockquote element (7 found on page)
    faq: '.faq', // Not found on page - may not exist or be on different pages
  }
} as const;
