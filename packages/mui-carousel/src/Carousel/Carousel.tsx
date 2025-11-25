'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useSlotProps from '@mui/utils/useSlotProps';
import { styled, useThemeProps } from '@mui/system';
import { CarouselProps, CarouselOwnerState } from './Carousel.types';
import { getCarouselUtilityClass } from './carouselClasses';
import { useCarousel } from '../hooks/useCarousel';
import { CarouselProvider } from '../CarouselContext';
import { CarouselContextValue } from '../types';
import {
  DEFAULT_TRANSITION_DURATION,
  DEFAULT_SLIDES_PER_VIEW,
  DEFAULT_AUTO_PLAY_INTERVAL,
} from '../utils/constants';
import {
  normalizeSpacing,
  calculateSlideWidth,
  calculateTransformOffset,
} from '../utils/carouselHelpers';

const useUtilityClasses = (ownerState: CarouselOwnerState) => {
  const { classes, isAutoPlaying } = ownerState;

  const slots = {
    root: ['root', 'horizontal', isAutoPlaying && 'autoPlaying'],
    slides: ['slides'],
    slide: ['slide'],
  };

  return composeClasses(slots, getCarouselUtilityClass, classes);
};

export const CarouselRoot = styled('div', {
  name: 'MuiCarousel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props as { ownerState: CarouselOwnerState };
    return [
      styles.root,
      styles.horizontal,
      ownerState.isAutoPlaying && styles.autoPlaying,
    ];
  },
})<{ ownerState: CarouselOwnerState }>({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const CarouselSlides = styled('div', {
  name: 'MuiCarousel',
  slot: 'Slides',
  overridesResolver: (props, styles) => styles.slides,
})<{ ownerState: CarouselOwnerState }>(({ ownerState }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  // No transition in PR-003 - will be added in PR-006
  // transition: `transform ${ownerState.transitionDuration}ms ease-in-out`,
  transform: calculateTransformOffset(
    ownerState.activeIndex,
    ownerState.slidesPerView ?? DEFAULT_SLIDES_PER_VIEW,
    ownerState.spacing,
  ),
  gap: normalizeSpacing(ownerState.spacing),
}));

export const CarouselSlide = styled('div', {
  name: 'MuiCarousel',
  slot: 'Slide',
  overridesResolver: (props, styles) => styles.slide,
})<{ ownerState: CarouselOwnerState }>(({ ownerState }) => ({
  flexShrink: 0,
  width: calculateSlideWidth(
    ownerState.slidesPerView ?? DEFAULT_SLIDES_PER_VIEW,
    ownerState.spacing,
  ),
  overflow: 'hidden',
}));

/**
 * A native, production-ready Carousel component for Material UI.
 *
 * Demos:
 *
 * - [Carousel](https://mui.com/material-ui/react-carousel/)
 *
 * API:
 *
 * - [Carousel API](https://mui.com/material-ui/api/carousel/)
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  inProps,
  ref,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiCarousel' });

  const {
    'aria-label': ariaLabel = 'Carousel',
    'aria-labelledby': ariaLabelledBy,
    children,
    className,
    activeIndex: activeIndexProp,
    defaultActiveIndex,
    autoPlay = false,
    autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL,
    classes: classesProp,
    disableGestures = false,
    disableKeyboard = false,
    enableLoop = false,
    hideNavigation = false,
    hideIndicators = false,
    onChange,
    orientation = 'horizontal',
    slidesPerView = DEFAULT_SLIDES_PER_VIEW,
    slots = {},
    slotProps = {},
    spacing,
    transition = 'slide',
    transitionDuration = DEFAULT_TRANSITION_DURATION,
    prevButtonProps,
    nextButtonProps,
    prevIcon,
    nextIcon,
    ...other
  } = props;

  // Use carousel state management hook
  const {
    activeIndex,
    slideCount,
    direction,
    dragging,
    isAutoPlaying,
    goToSlide,
    goToNext,
    goToPrevious,
    pauseAutoPlay,
    resumeAutoPlay,
    slides,
    ownerState: hookOwnerState,
  } = useCarousel({
    activeIndex: activeIndexProp,
    defaultActiveIndex,
    autoPlay,
    autoPlayInterval,
    children,
    enableLoop,
    onChange,
    slidesPerView,
    spacing,
    transition,
    transitionDuration,
  });

  // Compose owner state with all props
  const ownerState: CarouselOwnerState = {
    ...props,
    ...hookOwnerState,
    activeIndex,
    slideCount,
    direction,
    dragging,
    isAutoPlaying,
    classes: classesProp,
  };

  const classes = useUtilityClasses(ownerState);

  // Context value for sub-components
  const contextValue: CarouselContextValue = {
    activeIndex,
    slideCount,
    goToSlide,
    goToNext,
    goToPrevious,
    enableLoop,
    direction,
    isAutoPlaying,
    pauseAutoPlay,
    resumeAutoPlay,
    transition,
    transitionDuration,
  };

  // Slot components
  const RootSlot = slots.root ?? CarouselRoot;
  const SlidesSlot = slots.slides ?? CarouselSlides;
  const SlideSlot = slots.slide ?? CarouselSlide;

  // Root slot props
  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      role: 'region',
      'aria-roledescription': 'carousel',
      'aria-label': ariaLabelledBy ? undefined : ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    },
    ownerState,
    className: clsx(classes.root, className),
  });

  // Slides container slot props
  const slidesProps = useSlotProps({
    elementType: SlidesSlot,
    externalSlotProps: slotProps.slides,
    additionalProps: {
      'aria-live': isAutoPlaying ? 'off' : 'polite',
    },
    ownerState,
    className: classes.slides,
  });

  return (
    <CarouselProvider value={contextValue}>
      <RootSlot {...rootProps}>
        <SlidesSlot {...slidesProps}>
          {slides.map((child, index) => {
            const isActive = index === activeIndex;
            const slideOwnerState = {
              ...ownerState,
              slideIndex: index,
              isActive,
            };

            return (
              <SlideSlot
                key={child.key ?? index}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${slideCount}`}
                aria-hidden={!isActive}
                ownerState={slideOwnerState}
                className={clsx(classes.slide, {
                  [getCarouselUtilityClass('slideActive')]: isActive,
                })}
              >
                {child}
              </SlideSlot>
            );
          })}
        </SlidesSlot>
        {/* Navigation and indicators will be added in PR-004 */}
      </RootSlot>
    </CarouselProvider>
  );
});

Carousel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The index of the active slide (controlled mode).
   */
  activeIndex: PropTypes.number,
  /**
   * The aria-label for the carousel region.
   * @default 'Carousel'
   */
  'aria-label': PropTypes.string,
  /**
   * The id of the element that labels the carousel.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * If `true`, slides will automatically advance.
   * @default false
   */
  autoPlay: PropTypes.bool,
  /**
   * The interval (in milliseconds) between auto-play transitions.
   * @default 5000
   */
  autoPlayInterval: PropTypes.number,
  /**
   * The content of the carousel. Each direct child becomes a slide.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default active slide index (uncontrolled mode).
   * @default 0
   */
  defaultActiveIndex: PropTypes.number,
  /**
   * If `true`, touch/mouse swipe gestures are disabled.
   * @default false
   */
  disableGestures: PropTypes.bool,
  /**
   * If `true`, keyboard navigation is disabled.
   * @default false
   */
  disableKeyboard: PropTypes.bool,
  /**
   * If `true`, the carousel will loop from last slide to first.
   * @default false
   */
  enableLoop: PropTypes.bool,
  /**
   * If `true`, the indicator dots are hidden.
   * @default false
   */
  hideIndicators: PropTypes.bool,
  /**
   * If `true`, the navigation arrows are hidden.
   * @default false
   */
  hideNavigation: PropTypes.bool,
  /**
   * Custom icon for the next button.
   */
  nextIcon: PropTypes.node,
  /**
   * Callback fired when the active slide changes.
   */
  onChange: PropTypes.func,
  /**
   * The carousel orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal']),
  /**
   * Custom icon for the previous button.
   */
  prevIcon: PropTypes.node,
  /**
   * Number of slides visible at once.
   * @default 1
   */
  slidesPerView: PropTypes.number,
  /**
   * The extra props for the slot components.
   * @default {}
   */
  slotProps: PropTypes.shape({
    indicator: PropTypes.object,
    indicators: PropTypes.object,
    navigation: PropTypes.object,
    navigationButton: PropTypes.object,
    root: PropTypes.object,
    slide: PropTypes.object,
    slides: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
    indicators: PropTypes.elementType,
    navigation: PropTypes.elementType,
    navigationButton: PropTypes.elementType,
    root: PropTypes.elementType,
    slide: PropTypes.elementType,
    slides: PropTypes.elementType,
  }),
  /**
   * Spacing between slides.
   * @default 0
   */
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The transition effect used when changing slides.
   * @default 'slide'
   */
  transition: PropTypes.oneOf(['fade', 'slide']),
  /**
   * The duration of the transition animation (in milliseconds).
   * @default 450
   */
  transitionDuration: PropTypes.number,
} as any;

export default Carousel;
