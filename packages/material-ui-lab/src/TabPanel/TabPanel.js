import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => {
  return {
    /* Styles applied to the root element. */
    root: {
      padding: theme.spacing(3),
    },
  };
};

const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  const { activeValue, children, className, classes, value, ...other } = props;

  return (
    <div
      className={clsx(classes.root, className)}
      hidden={value !== activeValue}
      ref={ref}
      role="tabpanel"
      {...other}
    >
      {value === activeValue && <Typography>{children}</Typography>}
    </div>
  );
});

TabPanel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The currently active value. Must be the same value that is passed to `Tabs`.
   */
  activeValue: PropTypes.any,
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
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiTabPanel' })(TabPanel);
