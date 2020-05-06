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
  activeValue: PropTypes.any.isRequired,
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
};

export default withStyles(styles, { name: 'MuiTabPanel' })(TabPanel);
