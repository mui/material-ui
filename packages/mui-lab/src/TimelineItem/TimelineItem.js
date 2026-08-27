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
  // `:where()` contributes no specificity, so the rule sits at (0,1,1) and the
  // `Timeline` override the docs recommend for removing it always wins. A bare
  // `:not(:has(...))` would take its argument's specificity -- (0,2,1), level
  // with that override -- leaving the winner to emotion's insertion order, and
  // so to the order demos happen to render in
  // (https://github.com/mui/material-ui/pull/49028). The `:has()` check covers
  // opposite content that is not a direct child, which the children walk
  // behind `missingOppositeContent` cannot see
  // (https://github.com/mui/material-ui/pull/46663).
  [`&:where(:not(:has(.${timelineOppositeContentClasses.root})))::before`]: {
    content: '""',
    flex: 1,
    padding: '6px 16px',
  },
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
