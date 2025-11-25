'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, useThemeProps } from '@mui/material/styles';
import { useCarouselContext } from '../CarouselContext';
import {
  CarouselIndicatorsProps,
  CarouselIndicatorsOwnerState,
} from './CarouselIndicators.types';
import { getCarouselIndicatorsUtilityClass } from './carouselIndicatorsClasses';

const useUtilityClasses = (ownerState: CarouselIndicatorsOwnerState) => {
  const { classes, isActive } = ownerState;

  const slots = {
    root: ['root'],
    indicator: ['indicator', isActive && 'indicatorActive'],
  };

  return composeClasses(slots, getCarouselIndicatorsUtilityClass, classes);
};

const IndicatorsRoot = styled('div', {
  name: 'MuiCarouselIndicators',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CarouselIndicatorsOwnerState }>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
}));

const Indicator = styled('button', {
  name: 'MuiCarouselIndicators',
  slot: 'Indicator',
  overridesResolver: (props, styles) => {
    const { ownerState } = props as { ownerState: CarouselIndicatorsOwnerState };
    return [styles.indicator, ownerState.isActive && styles.indicatorActive];
  },
})<{ ownerState: CarouselIndicatorsOwnerState }>(({ theme, ownerState }) => ({
  width: 8,
  height: 8,
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  backgroundColor: ownerState.isActive
    ? theme.palette.primary.main
    : theme.palette.action.disabled,
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: ownerState.isActive
      ? theme.palette.primary.dark
      : theme.palette.action.hover,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  ...(ownerState.isActive && {
    transform: 'scale(1.2)',
  }),
}));

/**
 * Indicator dots component for the Carousel.
 * Provides clickable dots for direct slide navigation.
 *
 * This component must be used within a Carousel component to access context.
 */
const CarouselIndicators = React.forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  function CarouselIndicators(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'MuiCarouselIndicators' });
    const { className, classes: classesProp, ...other } = props;

    const { activeIndex, slideCount, goToSlide } = useCarouselContext();

    const ownerState: CarouselIndicatorsOwnerState = {
      ...props,
      activeIndex,
      slideCount,
      classes: classesProp,
    };

    const classes = useUtilityClasses(ownerState);

    return (
      <IndicatorsRoot
        ref={ref}
        role="tablist"
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...other}
      >
        {Array.from({ length: slideCount }, (_, index) => {
          const isActive = index === activeIndex;
          const indicatorOwnerState = {
            ...ownerState,
            isActive,
          };
          const indicatorClasses = useUtilityClasses(indicatorOwnerState);

          return (
            <Indicator
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index, 'indicator')}
              ownerState={indicatorOwnerState}
              className={indicatorClasses.indicator}
            />
          );
        })}
      </IndicatorsRoot>
    );
  },
);

CarouselIndicators.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default CarouselIndicators;
