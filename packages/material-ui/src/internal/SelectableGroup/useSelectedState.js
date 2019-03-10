import React from 'react';
import SelectableGroupContext from './SelectableGroupContext';

/**
 * @ignore - internal component.
 */
function useSelectedState() {
  return React.useContext(SelectableGroupContext);
}

export default useSelectedState;
