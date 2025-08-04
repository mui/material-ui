'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import { getTabPanelUtilityClass } from './tabPanelClasses';
import { getPanelId, getTabId, useTabContext } from '../TabContext';

const useUtilityClasses = (ownerState) => {
  const { classes, hidden } = ownerState;

  const slots = {
    root: ['root', hidden && 'hidden'],
  };

  return composeClasses(slots, getTabPanelUtilityClass, classes);
};

const TabPanelRoot = styled('div', {
  name: 'MuiTabPanel',
  slot: 'Root',
})(({ theme }) => ({
  padding: theme.spacing(3),
}));

const TabPanel = React.forwardRef(function TabPanel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTabPanel' });

  const { children, className, value, keepMounted = false, ...other } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  return (
    <TabPanelRoot
      aria-labelledby={tabId}
      className={clsx(classes.root, className)}
      hidden={value !== context.value}
      id={id}
      ref={ref}
      role="tabpanel"
      ownerState={ownerState}
      {...other}
    >
      {(keepMounted || value === context.value) && children}
    </TabPanelRoot>
  );
});

TabPanel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * Always keep the children in the DOM.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default TabPanel;
