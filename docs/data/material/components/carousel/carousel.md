---
productId: material-ui
title: React Carousel component
components: Carousel, CarouselNavigation, CarouselIndicators
githubLabel: 'scope: carousel'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
githubSource: packages/mui-carousel/src/Carousel
---

# Carousel

<p class="description">Carousels display a collection of items that can be cycled through one at a time.</p>

Carousels are commonly used for showcasing images, products, testimonials, or any content that benefits from sequential presentation. They support touch gestures, keyboard navigation, and auto-play functionality.

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Basic carousel

A basic carousel displays slides with navigation arrows and indicator dots by default.

{{"demo": "BasicCarousel.js"}}

## Auto-play

Use the `autoPlay` prop to automatically advance slides at a specified interval. The `autoPlayInterval` prop controls the delay between transitions (default: 5000ms). Auto-play pauses on hover and focus by default.

{{"demo": "AutoPlayCarousel.js"}}

## Transitions

The carousel supports two transition types: `slide` (default) and `fade`. Use the `transitionDuration` prop to customize animation timing.

{{"demo": "TransitionCarousel.js"}}

## Responsive slides per view

Use the `slidesPerView` prop to show multiple slides at once. Pass a responsive object to adjust based on breakpoints.

{{"demo": "ResponsiveCarousel.js"}}

## Controlled carousel

For external state management, use the `activeIndex` prop combined with `onChange` callback.

{{"demo": "ControlledCarousel.js"}}

## Customization

Customize the carousel appearance with custom navigation icons, theming, and slot props.

{{"demo": "CustomizedCarousel.js"}}

## Image gallery

A full-width image gallery with captions and thumbnail-style indicators.

{{"demo": "ImageGallery.js"}}

## Testimonials

Display customer testimonials with professional styling and auto-play.

{{"demo": "TestimonialCarousel.js"}}

## Product carousel

An e-commerce style carousel showing multiple products with responsive behavior.

{{"demo": "ProductCarousel.js"}}

## Hidden controls

Use `hideNavigation` and `hideIndicators` to create minimal carousel interfaces suitable for touch-first designs.

{{"demo": "HiddenControls.js"}}

## Disabled features

Disable specific carousel features when needed:

- `disableGestures`: Disables touch/swipe navigation
- `disableKeyboard`: Disables keyboard navigation
- `autoPlay={false}`: Disables automatic slide advancement

{{"demo": "DisabledFeatures.js"}}

## Loop mode

Enable `enableLoop` to allow continuous cycling from the last slide back to the first (and vice versa).

The loop mode affects both navigation buttons and auto-play behavior:

- Navigation arrows remain enabled at boundaries
- Auto-play continues cycling indefinitely
- Keyboard navigation wraps around

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

The carousel component follows WAI-ARIA carousel design pattern:

- The carousel container has `role="region"` with `aria-roledescription="carousel"`
- Each slide has `role="group"` with `aria-roledescription="slide"`
- Indicators use `role="tablist"` with individual `role="tab"` for each dot
- The live region uses `aria-live="polite"` when not auto-playing, and `aria-live="off"` during auto-play to avoid excessive announcements

### Keyboard navigation

| Key | Action |
|-----|--------|
| <kbd>Arrow Left</kbd> | Move to previous slide |
| <kbd>Arrow Right</kbd> | Move to next slide |
| <kbd>Home</kbd> | Move to first slide |
| <kbd>End</kbd> | Move to last slide |
| <kbd>1</kbd>-<kbd>9</kbd> | Move to specific slide (1-9) |
| <kbd>Escape</kbd> | Pause auto-play |

In RTL (Right-to-Left) mode, arrow key directions are reversed.

### Reduced motion

The carousel respects the user's `prefers-reduced-motion` preference:

- Auto-play is disabled when reduced motion is preferred
- Transition durations are reduced to near-instant

### Screen readers

- Provide meaningful `aria-label` for the carousel (e.g., "Product showcase carousel")
- Each slide should contain descriptive content or have an `aria-label`
- Use `aria-labelledby` if the carousel has a visible title

```jsx
<Carousel aria-label="Featured products">
  <img src="..." alt="Product 1: Blue running shoes" />
  <img src="..." alt="Product 2: Red sneakers" />
</Carousel>
```

## When to use carousels

Carousels are appropriate for:

- **Image galleries**: Showcasing photos or artwork
- **Product displays**: E-commerce product slideshows
- **Testimonials**: Customer quotes and reviews
- **Feature tours**: Onboarding or feature highlights
- **Hero banners**: Promotional content rotation

Consider alternatives when:

- All content is equally important (use a grid instead)
- Content is time-sensitive (users may miss auto-play slides)
- The user needs to compare items side-by-side
