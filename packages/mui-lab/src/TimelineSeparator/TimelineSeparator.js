'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { styled, useThemeProps } from '@mui/material/styles';
import { getTimelineSeparatorUtilityClass } from './timelineSeparatorClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTimelineSeparatorUtilityClass, classes);
};

const TimelineSeparatorRoot = styled('div', {
  name: 'MuiTimelineSeparator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  display: 'flex',
  flexDirection: 'column',
  flex: 0,
  alignItems: 'center',
});

const TimelineSeparator = React.forwardRef(function TimelineSeparator(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTimelineSeparator',
  });

  const { className, ...other } = props;

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineSeparatorRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

TimelineSeparator.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TimelineSeparator;
