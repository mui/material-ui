'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import { capitalize } from '@mui/material/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { getTimelineDotUtilityClass } from './timelineDotClasses';

const useUtilityClasses = (ownerState) => {
  const { color, variant, classes } = ownerState;

  const slots = {
    root: ['root', variant, color !== 'inherit' && `${variant}${capitalize(color)}`],
  };

  return composeClasses(slots, getTimelineDotUtilityClass, classes);
};

const TimelineDotRoot = styled('span', {
  name: 'MuiTimelineDot',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[
        ownerState.color !== 'inherit' && `${ownerState.variant}${capitalize(ownerState.color)}`
      ],
      styles[ownerState.variant],
    ];
  },
})(({ ownerState, theme }) => ({
  display: 'flex',
  alignSelf: 'baseline',
  borderStyle: 'solid',
  borderWidth: 2,
  padding: 4,
  borderRadius: '50%',
  boxShadow: (theme.vars || theme).shadows[1],
  margin: '11.5px 0',
  ...(ownerState.variant === 'filled' && {
    borderColor: 'transparent',
    ...(ownerState.color !== 'inherit' && {
      ...(ownerState.color === 'grey'
        ? {
            color: (theme.vars || theme).palette.grey[50],
            backgroundColor: (theme.vars || theme).palette.grey[400],
          }
        : {
            color: (theme.vars || theme).palette[ownerState.color].contrastText,
            backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
          }),
    }),
  }),
  ...(ownerState.variant === 'outlined' && {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ...(ownerState.color !== 'inherit' && {
      ...(ownerState.color === 'grey'
        ? {
            borderColor: (theme.vars || theme).palette.grey[400],
          }
        : {
            borderColor: (theme.vars || theme).palette[ownerState.color].main,
          }),
    }),
  }),
}));

const TimelineDot = React.forwardRef(function TimelineDot(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineDot' });
  const { className, color = 'grey', variant = 'filled', ...other } = props;

  const ownerState = {
    ...props,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineDotRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

TimelineDot.propTypes /* remove-proptypes */ = {
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
   * The dot can have a different colors.
   * @default 'grey'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'error',
      'grey',
      'info',
      'inherit',
      'primary',
      'secondary',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined']),
    PropTypes.string,
  ]),
};

export default TimelineDot;
