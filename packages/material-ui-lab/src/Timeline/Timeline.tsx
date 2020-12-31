import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// eslint-disable-next-line no-restricted-imports -- importing types
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import TimelineContext from './TimelineContext';

export const styles = createStyles({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '6px 16px',
    flexGrow: 1,
  },
  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {},
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {},
  /* Styles applied to the root element if `align="alternate"`. */
  alignAlternate: {},
});

export type TimelineClassKey = keyof WithStyles<typeof styles>['classes'];

export interface TimelineProps extends StandardProps<React.HTMLAttributes<HTMLUListElement>> {
  /**
   * The position where the timeline's content should appear.
   * @default 'left'
   */
  align?: 'left' | 'right' | 'alternate';
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
    /** Styles applied to the root element if `align="left"`. */
    alignLeft?: string;
    /** Styles applied to the root element if `align="right"`. */
    alignRight?: string;
    /** Styles applied to the root element if `align="alternate"`. */
    alignAlternate?: string;
  };
}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(function Timeline(props, ref) {
  const { align = 'left', classes, className, ...other } = props;

  return (
    <TimelineContext.Provider value={{ align }}>
      <ul
        className={clsx(
          classes!.root,
          // @ts-expect-error unsafe string concat
          classes[`align${capitalize(align)}`],
          className,
        )}
        // @ts-expect-error TypeScript bug, need to keep unknown for DX
        ref={ref}
        {...other}
      />
    </TimelineContext.Provider>
  );
});

Timeline.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The position where the timeline's content should appear.
   * @default 'left'
   */
  align: PropTypes.oneOf(['alternate', 'left', 'right']),
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
};

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://material-ui.com/api/timeline/)
 */
export default withStyles(styles, { name: 'MuiTimeline' })(Timeline);
