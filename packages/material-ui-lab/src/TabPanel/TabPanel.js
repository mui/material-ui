import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { getPanelId, getTabId, useTabContext } from '../TabContext';

export const styles = (theme) => {
  return {
    /* Styles applied to the root element. */
    root: {
      padding: theme.spacing(3),
    },
  };
};

const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  const { children, className, classes, value, ...other } = props;
  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  return (
    <div
      aria-labelledby={tabId}
      className={clsx(classes.root, className)}
      hidden={value !== context.value}
      id={id}
      ref={ref}
      role="tabpanel"
      {...other}
    >
      {value === context.value && children}
    </div>
  );
});

TabPanel.propTypes = {
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
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: PropTypes.string.isRequired,
};

export default withStyles(styles, { name: 'MuiTabPanel' })(TabPanel);
