import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { capitalize, isMuiElement } from '@material-ui/core/utils';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
} from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import TimelineContext from '../Timeline/TimelineContext';
import TimelineItemContext from './TimelineItemContext';
import timelineItemClasses, { getTimelineItemUtilityClass } from './timelineItemClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...styles[`align${capitalize(styleProps.align)}`],
      [`& .${timelineItemClasses.content}`]: styles.content,
      [`& .${timelineItemClasses.oppositeContent}`]: styles.oppositeContent,
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { align, classes } = styleProps;

  const slots = {
    root: ['root', `align${capitalize(align)}`],
    content: ['content'],
    oppositeContent: ['oppositeContent'],
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
      '& .MuiTimelineItem-content': {
        textAlign: 'right',
      },
      '& .MuiTimelineItem-oppositeContent': {
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

  const classesV5 = useUtilityClasses(styleProps);

  return (
    <TimelineItemContext.Provider
      value={{
        classes: { content: classesV5.content, oppositeContent: classesV5.oppositeContent },
      }}
    >
      <TimelineItemRoot
        className={clsx(classesV5.root, className)}
        styleProps={styleProps}
        ref={ref}
        {...other}
      />
    </TimelineItemContext.Provider>
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
};

export default TimelineItem;
