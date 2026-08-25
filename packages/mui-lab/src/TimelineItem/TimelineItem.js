'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isMuiElement } from '@mui/material/utils';
import { styled, useThemeProps } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import { timelineContentClasses } from '../TimelineContent';
import { timelineOppositeContentClasses } from '../TimelineOppositeContent';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineItemUtilityClass } from './timelineItemClasses';
import convertTimelinePositionToClass from '../internal/convertTimelinePositionToClass';

const useUtilityClasses = (ownerState) => {
  const { position, classes, hasOppositeContent } = ownerState;

  const slots = {
    root: [
      'root',
      convertTimelinePositionToClass(position),
      !hasOppositeContent && 'missingOppositeContent',
    ],
  };

  return composeClasses(slots, getTimelineItemUtilityClass, classes);
};

const TimelineItemRoot = styled('li', {
  name: 'MuiTimelineItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[convertTimelinePositionToClass(ownerState.position)]];
  },
})(({ ownerState }) => ({
  listStyle: 'none',
  display: 'flex',
  position: 'relative',
  minHeight: 70,
  // The spacer that keeps content centred when there is no opposite content.
  // Kept at plain `&::before` -- (0,1,1) -- so the `Timeline` override the docs
  // recommend for removing it always wins on specificity. (`:where()` would do
  // the same, but the docs' `globalSelector` stylis middleware strips the class
  // in front of any `:where(`/`:is(`, turning the rule global -- see
  // emotion issue 2836 -- so it cannot be used in component styles.)
  ...(!ownerState.hasOppositeContent && {
    '&::before': {
      content: '""',
      flex: 1,
      padding: '6px 16px',
    },
    // The children walk behind `hasOppositeContent` only sees direct children.
    // Suppress the spacer from CSS when opposite content is nested deeper
    // (see #46663) -- (0,2,1), deliberately above the spacer rule.
    [`&:has(.${timelineOppositeContentClasses.root})::before`]: {
      content: 'none',
    },
  }),
  ...(ownerState.position === 'left' && {
    flexDirection: 'row-reverse',
  }),
  ...((ownerState.position === 'alternate' || ownerState.position === 'alternate-reverse') && {
    [`&:nth-of-type(${ownerState.position === 'alternate' ? 'even' : 'odd'})`]: {
      flexDirection: 'row-reverse',
      [`& .${timelineContentClasses.root}`]: {
        textAlign: 'right',
      },
      [`& .${timelineOppositeContentClasses.root}`]: {
        textAlign: 'left',
      },
    },
  }),
}));

const TimelineItem = React.forwardRef(function TimelineItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineItem' });
  const { position: positionProp, className, ...other } = props;
  const { position: positionContext } = React.useContext(TimelineContext);

  let hasOppositeContent = false;

  React.Children.forEach(props.children, (child) => {
    if (isMuiElement(child, ['TimelineOppositeContent'])) {
      hasOppositeContent = true;
    }
  });

  const ownerState = {
    ...props,
    position: positionProp || positionContext || 'right',
    hasOppositeContent,
  };

  const classes = useUtilityClasses(ownerState);

  const contextValue = React.useMemo(
    () => ({ position: ownerState.position }),
    [ownerState.position],
  );

  return (
    <TimelineContext.Provider value={contextValue}>
      <TimelineItemRoot
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      />
    </TimelineContext.Provider>
  );
});

TimelineItem.propTypes /* remove-proptypes */ = {
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
   * The position where the timeline's item should appear.
   */
  position: PropTypes.oneOf(['alternate-reverse', 'alternate', 'left', 'right']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TimelineItem;
