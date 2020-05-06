import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import { useTabContext } from '../TabContext';

const TabList = React.forwardRef(function TabList(props, ref) {
  const { children: childrenProp, ...other } = props;
  const context = useTabContext();

  let children = childrenProp;
  if (context !== null) {
    const { panelPrefix, tabPrefix } = context;
    children = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        'aria-controls': `${panelPrefix}-${index}`,
        id: `${tabPrefix}-${index}`,
      });
    });
  }

  return (
    <Tabs {...other} ref={ref} value={context?.value}>
      {children}
    </Tabs>
  );
});

TabList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default TabList;
