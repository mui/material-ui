'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import Typography from '@mui/material/Typography';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineOppositeContentUtilityClass } from './timelineOppositeContentClasses';
import convertTimelinePositionToClass from '../internal/convertTimelinePositionToClass';

const useUtilityClasses = (ownerState) => {
  const { position, classes } = ownerState;

  const slots = {
    root: ['root', convertTimelinePositionToClass(position)],
  };

  return composeClasses(slots, getTimelineOppositeContentUtilityClass, classes);
};

const TimelineOppositeContentRoot = styled(Typography, {
  name: 'MuiTimelineOppositeContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.root, styles[convertTimelinePositionToClass(ownerState.position)]];
  },
})(({ ownerState }) => ({
  padding: '6px 16px',
  marginRight: 'auto',
  textAlign: 'right',
  flex: 1,
  ...(ownerState.position === 'left' && {
    textAlign: 'left',
  }),
}));

const TimelineOppositeContent = React.forwardRef(function TimelineOppositeContent(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineOppositeContent' });
  const { className, ...other } = props;

  const { position: positionContext } = React.useContext(TimelineContext);

  const ownerState = {
    ...props,
    position: positionContext || 'left',
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineOppositeContentRoot
      component="div"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

TimelineOppositeContent.propTypes /* remove-proptypes */ = {
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

TimelineOppositeContent.muiName = 'TimelineOppositeContent';

export default TimelineOppositeContent;
