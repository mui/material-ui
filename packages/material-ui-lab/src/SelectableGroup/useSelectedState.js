import React from 'react';
import SelectableGroupContext from './SelectableGroupContext';

function useSelectedState() {
  return React.useContext(SelectableGroupContext);
}

export default useSelectedState;
