import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useTabContext } from '../TabContext';

function TabPanels(props) {
  const { children } = props;
  const context = useTabContext();

  if (context === null) {
    return children;
  }

  const { panelPrefix, tabPrefix, value } = context;

  return (
    <React.Fragment>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          activeValue: value,
          'aria-labelledby': `${tabPrefix}-${index}`,
          id: `${panelPrefix}-${index}`,
          value: child.props.value === undefined ? index : undefined,
        });
      })}
    </React.Fragment>
  );
}

TabPanels.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default TabPanels;
