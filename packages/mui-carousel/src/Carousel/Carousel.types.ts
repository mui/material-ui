import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { SlotComponentProps } from '@mui/utils';
import { Theme } from '@mui/material/styles';
import { CarouselClasses } from './carouselClasses';
import {
  CarouselTransition,
  CarouselOrientation,
  SlideChangeReason,
  CarouselDirection,
  ResponsiveValue,
} from '../types';

/**
 * Override interface for extending carousel color options.
 * @example
 * declare module '@mui/carousel/Carousel' {
 *   interface CarouselPropsColorOverrides {
 *     customColor: true;
 *   }
 * }
 */
export interface CarouselPropsColorOverrides {}

/**
 * Override interface for extending carousel size options.
 */
export interface CarouselPropsSizeOverrides {}

/**
 * Override interface for extending slot props.
 */
export interface CarouselSlotPropsOverrides {}

/**
 * Owner state passed to styled components and slot props.
 * Contains all props plus internal state for styling decisions.
 */
export interface CarouselOwnerState extends Omit<CarouselOwnProps, 'slidesPerView'> {
  /** Current active slide index */
  activeIndex: number;
  /** Total number of slides */
  slideCount: number;
  /** Current transition direction */
  direction: CarouselDirection;
  /** Whether the carousel is currently being dragged/swiped */
  dragging: boolean;
  /** Whether auto-play is currently active */
  isAutoPlaying: boolean;
  /** Number of slides visible at once (resolved from responsive value) */
  slidesPerView?: number;
}

/**
 * Slots available for customizing carousel sub-components.
 */
export interface CarouselSlots {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component used for the slides container.
   * @default 'div'
   */
  slides?: React.ElementType;
  /**
   * The component used for each slide wrapper.
   * @default 'div'
   */
  slide?: React.ElementType;
  /**
   * The component used for the navigation container.
   * @default 'div'
   */
  navigation?: React.ElementType;
  /**
   * The component used for navigation buttons.
   * @default IconButton
   */
  navigationButton?: React.ElementType;
  /**
   * The component used for the indicators container.
   * @default 'div'
   */
  indicators?: React.ElementType;
  /**
   * The component used for each indicator.
   * @default 'button'
   */
  indicator?: React.ElementType;
}

/**
 * Props for carousel slot components.
 */
export interface CarouselSlotProps {
  root?: SlotComponentProps<'div', CarouselSlotPropsOverrides, CarouselOwnerState>;
  slides?: SlotComponentProps<'div', CarouselSlotPropsOverrides, CarouselOwnerState>;
  slide?: SlotComponentProps<'div', CarouselSlotPropsOverrides, CarouselOwnerState>;
  navigation?: SlotComponentProps<'div', CarouselSlotPropsOverrides, CarouselOwnerState>;
  navigationButton?: SlotComponentProps<'button', CarouselSlotPropsOverrides, CarouselOwnerState>;
  indicators?: SlotComponentProps<'div', CarouselSlotPropsOverrides, CarouselOwnerState>;
  indicator?: SlotComponentProps<'button', CarouselSlotPropsOverrides, CarouselOwnerState>;
}

/**
 * Props specific to the Carousel component.
 */
export interface CarouselOwnProps {
  /**
   * The content of the carousel. Each direct child becomes a slide.
   */
  children: React.ReactNode;
  /**
   * The index of the active slide (controlled mode).
   * Use with `onChange` for controlled behavior.
   */
  activeIndex?: number;
  /**
   * The default active slide index (uncontrolled mode).
   * @default 0
   */
  defaultActiveIndex?: number;
  /**
   * If `true`, slides will automatically advance.
   * @default false
   */
  autoPlay?: boolean;
  /**
   * The interval (in milliseconds) between auto-play transitions.
   * Only applies when `autoPlay` is `true`.
   * @default 5000
   */
  autoPlayInterval?: number;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CarouselClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * If `true`, touch/mouse swipe gestures are disabled.
   * @default false
   */
  disableGestures?: boolean;
  /**
   * If `true`, keyboard navigation is disabled.
   * @default false
   */
  disableKeyboard?: boolean;
  /**
   * If `true`, the carousel will loop from last slide to first (and vice versa).
   * @default false
   */
  enableLoop?: boolean;
  /**
   * If `true`, the navigation arrows are hidden.
   * @default false
   */
  hideNavigation?: boolean;
  /**
   * If `true`, the indicator dots are hidden.
   * @default false
   */
  hideIndicators?: boolean;
  /**
   * Callback fired when the active slide changes.
   *
   * @param {React.SyntheticEvent | null} event - The event source of the callback.
   *   Can be null when triggered by auto-play.
   * @param {number} newIndex - The new active slide index.
   * @param {SlideChangeReason} reason - The reason for the slide change.
   */
  onChange?: (
    event: React.SyntheticEvent | null,
    newIndex: number,
    reason: SlideChangeReason,
  ) => void;
  /**
   * The carousel orientation.
   * @default 'horizontal'
   */
  orientation?: CarouselOrientation;
  /**
   * Number of slides visible at once.
   * Can be a number or a responsive object with breakpoint values.
   *
   * @default 1
   * @example
   * // Simple number
   * slidesPerView={3}
   *
   * // Responsive object
   * slidesPerView={{ xs: 1, sm: 2, md: 3 }}
   */
  slidesPerView?: ResponsiveValue<number>;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: CarouselSlots;
  /**
   * The extra props for the slot components.
   * @default {}
   */
  slotProps?: CarouselSlotProps;
  /**
   * Spacing between slides (in pixels or CSS value).
   * @default 0
   */
  spacing?: number | string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The transition effect used when changing slides.
   * @default 'slide'
   */
  transition?: CarouselTransition;
  /**
   * The duration of the transition animation (in milliseconds).
   * @default 450
   */
  transitionDuration?: number;
  /**
   * Props applied to the previous navigation button.
   */
  prevButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /**
   * Props applied to the next navigation button.
   */
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /**
   * Custom icon for the previous button.
   */
  prevIcon?: React.ReactNode;
  /**
   * Custom icon for the next button.
   */
  nextIcon?: React.ReactNode;
  /**
   * The aria-label for the carousel region.
   * @default 'Carousel'
   */
  'aria-label'?: string;
  /**
   * The id of the element that labels the carousel.
   */
  'aria-labelledby'?: string;
}

/**
 * Props for the Carousel component.
 * Includes all own props plus standard div attributes.
 */
export type CarouselProps = CarouselOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof CarouselOwnProps>;

/**
 * Ref type for the Carousel component.
 */
export type CarouselRef = HTMLDivElement;
