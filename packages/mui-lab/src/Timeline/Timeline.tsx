import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SxProps } from '@mui/system';
// eslint-disable-next-line no-restricted-imports -- importing types
import { InternalStandardProps as StandardProps } from '@mui/material';
import { capitalize } from '@mui/material/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { styled, useThemeProps, Theme } from '@mui/material/styles';
import TimelineContext from './TimelineContext';
import { getTimelineUtilityClass } from './timelineClasses';

export type TimelineClassKey = keyof NonNullable<TimelineProps['classes']>;

export interface TimelineProps extends StandardProps<React.HTMLAttributes<HTMLUListElement>> {
  /**
   * The position where the TimelineContent should appear relative to the time axis.
   * @default 'right'
   */
  position?: 'left' | 'right' | 'alternate';
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `position="left"`. */
    positionLeft?: string;
    /** Styles applied to the root element if `position="right"`. */
    positionRight?: string;
    /** Styles applied to the root element if `position="alternate"`. */
    positionAlternate?: string;
  };

  /**
   * className applied to the root element.
   */
  className?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

type OwnerState = TimelineProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { position, classes } = ownerState;

  const slots = {
    root: ['root', position && `position${capitalize(position)}`],
  };

  return composeClasses(slots, getTimelineUtilityClass, classes);
};

const TimelineRoot = styled('ul' as const, {
  name: 'MuiTimeline' as const,
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      ownerState.position &&
        styles[`position${capitalize(ownerState.position)}` as TimelineClassKey],
    ];
  },
})<{ ownerState: OwnerState }>({
  display: 'flex',
  flexDirection: 'column',
  padding: '6px 16px',
  flexGrow: 1,
});

/**
 *
 * Demos:
 *
 * - [Timeline](https://mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [Timeline API](https://mui.com/material-ui/api/timeline/)
 */
const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(function Timeline(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimeline' });
  const { position = 'right', className, ...other } = props;
  const ownerState = { ...props, position };
  const classes = useUtilityClasses(ownerState);

  const contextValue = React.useMemo(() => ({ position }), [position]);

  return (
    <TimelineContext.Provider value={contextValue}>
      <TimelineRoot
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        // @ts-expect-error TypeScript bug, need to keep unknown for DX
        ref={ref}
        {...other}
      />
    </TimelineContext.Provider>
  );
}) as React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<HTMLUListElement>>;

Timeline.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The position where the TimelineContent should appear relative to the time axis.
   * @default 'right'
   */
  position: PropTypes.oneOf(['alternate', 'left', 'right']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

/**
 *
 * Demos:
 *
 * - [Timeline](https://mui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://mui.com/api/timeline/)
 */
export default Timeline;
