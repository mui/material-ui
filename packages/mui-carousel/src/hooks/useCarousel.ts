'use client';
import * as React from 'react';
import useControlled from '@mui/utils/useControlled';
import useEventCallback from '@mui/utils/useEventCallback';
import {
  CarouselDirection,
  CarouselTransition,
  SlideChangeReason,
} from '../types';
import { CarouselOwnProps, CarouselOwnerState } from '../Carousel/Carousel.types';
import {
  DEFAULT_AUTO_PLAY_INTERVAL,
  DEFAULT_TRANSITION_DURATION,
  DEFAULT_SLIDES_PER_VIEW,
} from '../utils/constants';
import { clampIndex, wrapIndex, getValidChildren } from '../utils/carouselHelpers';
import { useAutoPlay } from './useAutoPlay';

export interface UseCarouselParameters
  extends Pick<
    CarouselOwnProps,
    | 'activeIndex'
    | 'defaultActiveIndex'
    | 'autoPlay'
    | 'autoPlayInterval'
    | 'children'
    | 'disableGestures'
    | 'enableLoop'
    | 'onChange'
    | 'slidesPerView'
    | 'spacing'
    | 'transition'
    | 'transitionDuration'
  > {}

export interface UseCarouselReturnValue {
  /** Current active slide index */
  activeIndex: number;
  /** Total number of slides */
  slideCount: number;
  /** Current transition direction */
  direction: CarouselDirection;
  /** Whether the carousel is currently being dragged/swiped */
  dragging: boolean;
  /** Set dragging state */
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
  /** Whether auto-play is currently active */
  isAutoPlaying: boolean;
  /** Navigate to a specific slide */
  goToSlide: (index: number, reason?: SlideChangeReason, event?: React.SyntheticEvent | null) => void;
  /** Navigate to the next slide */
  goToNext: (reason?: SlideChangeReason, event?: React.SyntheticEvent | null) => void;
  /** Navigate to the previous slide */
  goToPrevious: (reason?: SlideChangeReason, event?: React.SyntheticEvent | null) => void;
  /** Pause auto-play */
  pauseAutoPlay: () => void;
  /** Resume auto-play */
  resumeAutoPlay: () => void;
  /** Whether navigation to previous is possible */
  canGoPrevious: boolean;
  /** Whether navigation to next is possible */
  canGoNext: boolean;
  /** Transition type */
  transition: CarouselTransition;
  /** Transition duration in ms */
  transitionDuration: number;
  /** Owner state for styled components */
  ownerState: CarouselOwnerState;
  /** Valid children as slides */
  slides: React.ReactElement[];
  /** Auto-play event handlers for root element */
  autoPlayHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

/**
 * Core hook for carousel state management.
 * Handles controlled/uncontrolled mode, navigation, and state computation.
 */
export function useCarousel(parameters: UseCarouselParameters): UseCarouselReturnValue {
  const {
    activeIndex: activeIndexProp,
    defaultActiveIndex = 0,
    autoPlay = false,
    autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL,
    children,
    enableLoop = false,
    onChange,
    slidesPerView = DEFAULT_SLIDES_PER_VIEW,
    spacing,
    transition = 'slide',
    transitionDuration = DEFAULT_TRANSITION_DURATION,
  } = parameters;

  // Get valid slide children
  const slides = React.useMemo(() => getValidChildren(children), [children]);
  const slideCount = slides.length;

  // Controlled/uncontrolled state for active index
  const [activeIndex, setActiveIndexState] = useControlled({
    controlled: activeIndexProp,
    default: defaultActiveIndex,
    name: 'Carousel',
    state: 'activeIndex',
  });

  // Track transition direction
  const [direction, setDirection] = React.useState<CarouselDirection>('forward');

  // Dragging state (for swipe/drag gestures)
  const [dragging, setDragging] = React.useState(false);

  // Calculate navigation boundaries
  const maxIndex = Math.max(0, slideCount - slidesPerView);
  const canGoPrevious = enableLoop || activeIndex > 0;
  const canGoNext = enableLoop || activeIndex < maxIndex;

  // Navigate to a specific slide
  const goToSlide = useEventCallback(
    (index: number, reason: SlideChangeReason = 'navigation', event: React.SyntheticEvent | null = null) => {
      let newIndex: number;

      if (enableLoop) {
        newIndex = wrapIndex(index, slideCount);
      } else {
        newIndex = clampIndex(index, 0, maxIndex);
      }

      // Determine direction
      if (newIndex > activeIndex) {
        setDirection('forward');
      } else if (newIndex < activeIndex) {
        setDirection('backward');
      }
      // If equal, keep current direction

      if (newIndex !== activeIndex) {
        setActiveIndexState(newIndex);
        onChange?.(event, newIndex, reason);
      }
    },
  );

  // Navigate to next slide
  const goToNext = useEventCallback(
    (reason: SlideChangeReason = 'navigation', event: React.SyntheticEvent | null = null) => {
      if (canGoNext) {
        goToSlide(activeIndex + 1, reason, event);
      }
    },
  );

  // Navigate to previous slide
  const goToPrevious = useEventCallback(
    (reason: SlideChangeReason = 'navigation', event: React.SyntheticEvent | null = null) => {
      if (canGoPrevious) {
        goToSlide(activeIndex - 1, reason, event);
      }
    },
  );

  // Auto-play tick handler
  const handleAutoPlayTick = useEventCallback(() => {
    if (!enableLoop && activeIndex >= maxIndex) {
      // At last slide and not looping - stop auto-play
      // The hook will handle pausing via pauseAutoPlay
      return;
    }
    goToNext('auto');
  });

  // Auto-play integration
  const {
    isPlaying: isAutoPlaying,
    pause: pauseAutoPlay,
    resume: resumeAutoPlay,
    handlers: autoPlayHandlers,
  } = useAutoPlay({
    enabled: autoPlay && slideCount > 1,
    interval: autoPlayInterval,
    onTick: handleAutoPlayTick,
    pauseOnHover: true,
    pauseOnFocus: true,
  });

  // Stop auto-play when reaching end of non-looping carousel
  React.useEffect(() => {
    if (!enableLoop && activeIndex >= maxIndex && isAutoPlaying) {
      pauseAutoPlay();
    }
  }, [activeIndex, maxIndex, enableLoop, isAutoPlaying, pauseAutoPlay]);

  // Compose owner state for styled components
  const ownerState: CarouselOwnerState = {
    activeIndex,
    slideCount,
    direction,
    dragging,
    isAutoPlaying,
    children,
    autoPlay,
    autoPlayInterval,
    enableLoop,
    slidesPerView,
    spacing,
    transition,
    transitionDuration,
  };

  return {
    activeIndex,
    slideCount,
    direction,
    dragging,
    setDragging,
    isAutoPlaying,
    goToSlide,
    goToNext,
    goToPrevious,
    pauseAutoPlay,
    resumeAutoPlay,
    canGoPrevious,
    canGoNext,
    transition,
    transitionDuration,
    ownerState,
    slides,
    autoPlayHandlers,
  };
}

export default useCarousel;
