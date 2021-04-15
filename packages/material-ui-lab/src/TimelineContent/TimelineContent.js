import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { experimentalStyled } from '@material-ui/core/styles';
import useThemeProps from '@material-ui/core/styles/useThemeProps';
import Typography from '@material-ui/core/Typography';
import TimelineContext from '../Timeline/TimelineContext';
import TimelineItemContext from '../TimelineItem/TimelineItemContext';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;
  return deepmerge(
    {
      ...(styleProps.align === 'right' && styles.alignRight),
    },
    styles.root || {},
  );
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
  const { classes: contextClasses = {} } = React.useContext(TimelineItemContext);

  const styleProps = {
    align,
  };

  return (
    <TimelineContentRoot
      component="div"
      className={clsx(contextClasses.content, className)}
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
};

export default TimelineContent;
