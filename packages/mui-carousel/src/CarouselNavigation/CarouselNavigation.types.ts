import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { CarouselNavigationClasses } from './carouselNavigationClasses';

/**
 * Owner state passed to styled components and slot props.
 * Contains all props plus internal state for styling decisions.
 */
export interface CarouselNavigationOwnerState extends CarouselNavigationOwnProps {
  /** Whether the previous button is disabled */
  prevDisabled: boolean;
  /** Whether the next button is disabled */
  nextDisabled: boolean;
  /** Button position (for styling) */
  position?: 'prev' | 'next';
}

/**
 * Props specific to the CarouselNavigation component.
 */
export interface CarouselNavigationOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CarouselNavigationClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Custom icon for the previous button.
   */
  prevIcon?: React.ReactNode;
  /**
   * Custom icon for the next button.
   */
  nextIcon?: React.ReactNode;
  /**
   * Props applied to the previous navigation button.
   */
  prevButtonProps?: React.ComponentPropsWithoutRef<'button'>;
  /**
   * Props applied to the next navigation button.
   */
  nextButtonProps?: React.ComponentPropsWithoutRef<'button'>;
}

/**
 * Props for the CarouselNavigation component.
 * Includes all own props plus standard div attributes.
 */
export type CarouselNavigationProps = CarouselNavigationOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof CarouselNavigationOwnProps>;
