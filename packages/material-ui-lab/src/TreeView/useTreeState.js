import React from 'react';
import TreeViewContext from './TreeViewContext';

function useTreeState() {
  return React.useContext(TreeViewContext);
}

export default useTreeState;
