'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { styled, useThemeProps } from '@mui/material/styles';
import { getTimelineConnectorUtilityClass } from './timelineConnectorClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTimelineConnectorUtilityClass, classes);
};

const TimelineConnectorRoot = styled('span', {
  name: 'MuiTimelineConnector',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => {
  return {
    width: 2,
    backgroundColor: (theme.vars || theme).palette.grey[400],
    flexGrow: 1,
  };
});

const TimelineConnector = React.forwardRef(function TimelineConnector(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTimelineConnector',
  });

  const { className, ...other } = props;

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineConnectorRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

TimelineConnector.propTypes /* remove-proptypes */ = {
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

export default TimelineConnector;
