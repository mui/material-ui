import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize, isMuiElement } from '@material-ui/core/utils';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
} from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { timelineContentClasses } from '../TimelineContent';
import { timelineOppositeContentClasses } from '../TimelineOppositeContent';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineItemUtilityClass } from './timelineItemClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return {
    ...styles.root,
    ...styles[`align${capitalize(styleProps.align)}`],
  };
};

const useUtilityClasses = (styleProps) => {
  const { align, classes, hasOppositeContent } = styleProps;

  const slots = {
    root: ['root', `align${capitalize(align)}`, !hasOppositeContent && 'missingOppositeContent'],
  };

  return composeClasses(slots, getTimelineItemUtilityClass, classes);
};

const TimelineItemRoot = experimentalStyled(
  'li',
  {},
  {
    name: 'MuiTimelineItem',
    slot: 'Root',
    overridesResolver,
  },
)(({ styleProps }) => ({
  listStyle: 'none',
  display: 'flex',
  position: 'relative',
  minHeight: 70,
  ...(styleProps.align === 'right' && {
    flexDirection: 'row-reverse',
  }),
  ...(styleProps.align === 'alternate' && {
    '&:nth-child(even)': {
      flexDirection: 'row-reverse',
      [`& .${timelineContentClasses.root}`]: {
        textAlign: 'right',
      },
      [`& .${timelineOppositeContentClasses.root}`]: {
        textAlign: 'left',
      },
    },
  }),
  ...(!styleProps.hasOppositeContent && {
    '&:before': {
      content: '""',
      flex: 1,
      padding: '6px 16px',
    },
  }),
}));

const TimelineItem = React.forwardRef(function TimelineItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineItem' });
  const { className, ...other } = props;
  const { align = 'left' } = React.useContext(TimelineContext);

  let hasOppositeContent = false;

  React.Children.forEach(props.children, (child) => {
    if (isMuiElement(child, ['TimelineOppositeContent'])) {
      hasOppositeContent = true;
    }
  });

  const styleProps = {
    ...props,
    align,
    hasOppositeContent,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TimelineItemRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

TimelineItem.propTypes /* remove-proptypes */ = {
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
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default TimelineItem;
