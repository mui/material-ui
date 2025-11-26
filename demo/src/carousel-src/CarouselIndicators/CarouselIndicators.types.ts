import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { CarouselIndicatorsClasses } from './carouselIndicatorsClasses';

/**
 * Owner state passed to styled components and slot props.
 * Contains all props plus internal state for styling decisions.
 */
export interface CarouselIndicatorsOwnerState extends CarouselIndicatorsOwnProps {
  /** Current active index */
  activeIndex: number;
  /** Total number of indicators/slides */
  slideCount: number;
  /** Whether this specific indicator is active (for individual indicators) */
  isActive?: boolean;
}

/**
 * Props specific to the CarouselIndicators component.
 */
export interface CarouselIndicatorsOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CarouselIndicatorsClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 * Props for the CarouselIndicators component.
 * Includes all own props plus standard div attributes.
 */
export type CarouselIndicatorsProps = CarouselIndicatorsOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof CarouselIndicatorsOwnProps>;
