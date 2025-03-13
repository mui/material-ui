'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import cardActionAreaClasses, { getCardActionAreaUtilityClass } from './cardActionAreaClasses';
import ButtonBase from '../ButtonBase';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    focusHighlight: ['focusHighlight'],
  };

  return composeClasses(slots, getCardActionAreaUtilityClass, classes);
};

const CardActionAreaRoot = styled(ButtonBase, {
  name: 'MuiCardActionArea',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(
  memoTheme(({ theme }) => ({
    display: 'block',
    textAlign: 'inherit',
    borderRadius: 'inherit', // for Safari to work https://github.com/mui/material-ui/issues/36285.
    width: '100%',
    [`&:hover .${cardActionAreaClasses.focusHighlight}`]: {
      opacity: (theme.vars || theme).palette.action.hoverOpacity,
      '@media (hover: none)': {
        opacity: 0,
      },
    },
    [`&.${cardActionAreaClasses.focusVisible} .${cardActionAreaClasses.focusHighlight}`]: {
      opacity: (theme.vars || theme).palette.action.focusOpacity,
    },
  })),
);

const CardActionAreaFocusHighlight = styled('span', {
  name: 'MuiCardActionArea',
  slot: 'FocusHighlight',
  overridesResolver: (props, styles) => styles.focusHighlight,
})(
  memoTheme(({ theme }) => ({
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    opacity: 0,
    backgroundColor: 'currentcolor',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    }),
  })),
);

const CardActionArea = React.forwardRef(function CardActionArea(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCardActionArea' });
  const { children, className, focusVisibleClassName, ...other } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <CardActionAreaRoot
      className={clsx(classes.root, className)}
      focusVisibleClassName={clsx(focusVisibleClassName, classes.focusVisible)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {children}
      <CardActionAreaFocusHighlight className={classes.focusHighlight} ownerState={ownerState} />
    </CardActionAreaRoot>
  );
});

CardActionArea.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default CardActionArea;
