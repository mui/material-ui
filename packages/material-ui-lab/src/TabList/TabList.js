import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import { useTabContext, getTabId, getPanelId } from '../TabContext';

const TabList = React.forwardRef(function TabList(props, ref) {
  const { children: childrenProp, ...other } = props;
  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }
  const children = React.Children.map(childrenProp, (child) => {
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

TabList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default TabList;
