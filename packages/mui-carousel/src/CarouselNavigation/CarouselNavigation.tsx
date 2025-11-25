'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, useTheme, useThemeProps } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useCarouselContext } from '../CarouselContext';
import {
  CarouselNavigationProps,
  CarouselNavigationOwnerState,
} from './CarouselNavigation.types';
import { getCarouselNavigationUtilityClass } from './carouselNavigationClasses';

const useUtilityClasses = (ownerState: CarouselNavigationOwnerState) => {
  const { classes, prevDisabled, nextDisabled } = ownerState;

  const slots = {
    root: ['root'],
    button: ['button'],
    buttonPrev: ['buttonPrev', prevDisabled && 'disabled'],
    buttonNext: ['buttonNext', nextDisabled && 'disabled'],
  };

  return composeClasses(slots, getCarouselNavigationUtilityClass, classes);
};

const NavigationRoot = styled('div', {
  name: 'MuiCarouselNavigation',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CarouselNavigationOwnerState }>({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 8px',
  zIndex: 1,
});

const NavigationButton = styled(IconButton, {
  name: 'MuiCarouselNavigation',
  slot: 'Button',
  overridesResolver: (props, styles) => {
    const { ownerState } = props as { ownerState: CarouselNavigationOwnerState };
    return [
      styles.button,
      ownerState.position === 'prev' && styles.buttonPrev,
      ownerState.position === 'next' && styles.buttonNext,
    ];
  },
})<{ ownerState: CarouselNavigationOwnerState }>(({ theme, ownerState }) => ({
  pointerEvents: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
  },
}));

/**
 * Navigation arrows component for the Carousel.
 * Provides prev/next buttons for slide navigation.
 *
 * This component must be used within a Carousel component to access context.
 */
const CarouselNavigation = React.forwardRef<HTMLDivElement, CarouselNavigationProps>(
  function CarouselNavigation(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'MuiCarouselNavigation' });
    const {
      className,
      classes: classesProp,
      prevIcon,
      nextIcon,
      prevButtonProps,
      nextButtonProps,
      ...other
    } = props;

    const theme = useTheme();
    const {
      activeIndex,
      slideCount,
      goToNext,
      goToPrevious,
      enableLoop,
      slidesContainerId,
    } = useCarouselContext();

    // Calculate disabled states
    const prevDisabled = !enableLoop && activeIndex === 0;
    const nextDisabled = !enableLoop && activeIndex === slideCount - 1;

    // RTL-aware icons
    const PrevIcon = theme.direction === 'rtl' ? KeyboardArrowRight : KeyboardArrowLeft;
    const NextIcon = theme.direction === 'rtl' ? KeyboardArrowLeft : KeyboardArrowRight;

    const ownerState: CarouselNavigationOwnerState = {
      ...props,
      prevDisabled,
      nextDisabled,
      classes: classesProp,
    };

    const classes = useUtilityClasses(ownerState);

    const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      goToPrevious('navigation');
      prevButtonProps?.onClick?.(event);
    };

    const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      goToNext('navigation');
      nextButtonProps?.onClick?.(event);
    };

    return (
      <NavigationRoot ref={ref} className={clsx(classes.root, className)} ownerState={ownerState} {...other}>
        <NavigationButton
          {...prevButtonProps}
          onClick={handlePrevClick}
          disabled={prevDisabled}
          aria-label="Go to previous slide"
          aria-controls={slidesContainerId}
          ownerState={{ ...ownerState, position: 'prev' }}
          className={clsx(classes.buttonPrev, prevButtonProps?.className)}
        >
          {prevIcon ?? <PrevIcon />}
        </NavigationButton>
        <NavigationButton
          {...nextButtonProps}
          onClick={handleNextClick}
          disabled={nextDisabled}
          aria-label="Go to next slide"
          aria-controls={slidesContainerId}
          ownerState={{ ...ownerState, position: 'next' }}
          className={clsx(classes.buttonNext, nextButtonProps?.className)}
        >
          {nextIcon ?? <NextIcon />}
        </NavigationButton>
      </NavigationRoot>
    );
  },
);

CarouselNavigation.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Custom icon for the next button.
   */
  nextIcon: PropTypes.node,
  /**
   * Props applied to the next navigation button.
   */
  nextButtonProps: PropTypes.object,
  /**
   * Custom icon for the previous button.
   */
  prevIcon: PropTypes.node,
  /**
   * Props applied to the previous navigation button.
   */
  prevButtonProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default CarouselNavigation;
