import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { capitalize } from '@material-ui/core/utils';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
} from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '@material-ui/core/Typography';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineContentUtilityClass } from './timelineContentClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;
  return deepmerge(
    {
      ...styles[`align${capitalize(styleProps.align)}`],
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { align, classes } = styleProps;

  const slots = {
    root: ['root', `align${capitalize(align)}`],
  };

  return composeClasses(slots, getTimelineContentUtilityClass, classes);
};

const TimelineContentRoot = experimentalStyled(
  Typography,
  {},
  { name: 'MuiTimelineContent', slot: 'Root', overridesResolver },
)(({ styleProps }) => ({
  flex: 1,
  padding: '6px 16px',
  ...(styleProps.align === 'right' && {
    textAlign: 'right',
  }),
}));

const TimelineContent = React.forwardRef(function TimelineContent(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineContent' });
  const { className, ...other } = props;

  const { align = 'left' } = React.useContext(TimelineContext);

  const styleProps = {
    ...props,
    align,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TimelineContentRoot
      component="div"
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

TimelineContent.propTypes /* remove-proptypes */ = {
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

export default TimelineContent;
