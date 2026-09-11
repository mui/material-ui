'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { useTabContext, getTabId, getPanelId } from '../TabContext';

const TabList = React.forwardRef(function TabList(props, ref) {
  const { children: childrenProp, ...other } = props;
  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return React.cloneElement(child, {
      // SOMEDAY: `Tabs` will set those themselves
      'aria-controls': getPanelId(context, child.props.value),
      id: getTabId(context, child.props.value),
    });
  });

  return (
    <Tabs {...other} ref={ref} value={context.value}>
      {children}
    </Tabs>
  );
});

TabList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A list of `<Tab />` elements.
   */
  children: PropTypes.node,
};

export default TabList;
