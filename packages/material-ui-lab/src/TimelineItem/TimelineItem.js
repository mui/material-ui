import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import TimelineContext from '../Timeline/TimelineContext';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    listStyle: 'none',
    display: 'flex',
    position: 'relative',
    height: '100%',
    '&:last-child .MuiTimelineItemTail-root': {
      display: 'none'
    },
  },
  alignAlternate: {
    '&:nth-child(even)': {
      right: '100%',
      textAlign: 'right',
      '& .MuiTimelineItemDot-root': {
        left: 'calc(100% - 4px)',
      },
      '& .MuiTimelineItemTail-root': {
        left: '100%',
      },
    }
  }
});

const TimelineItem = React.forwardRef(function TimelineItem(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'li',
    ...other
  } = props;

  const {
    align
  } = React.useContext(TimelineContext);

  return (
    <Component className={clsx(classes.root, classes[`align${capitalize(align)}`], className)} ref={ref} {...other}>
      {children}
    </Component>
  );
});

TimelineItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['outlined', 'standard']),
};

export default withStyles(styles, { name: 'MuiTimelineItem' })(TimelineItem);
