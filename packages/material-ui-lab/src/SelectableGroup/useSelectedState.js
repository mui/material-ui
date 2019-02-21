import React from 'react';
import SelectableGroupContext from './SelectableGroupContext';

function useSelectedState() {
  const context = React.useContext(SelectableGroupContext);

  return context;
}

export default useSelectedState;
