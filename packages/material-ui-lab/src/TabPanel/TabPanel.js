import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
};

const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  const { activeValue, children, className, classes, value, ...other } = props;

  return (
    <Box
      className={clsx(classes.root, className)}
      hidden={value !== activeValue}
      p={3}
      ref={ref}
      role="tabpanel"
      {...other}
    >
      {value === activeValue && <Typography>{children}</Typography>}
    </Box>
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
