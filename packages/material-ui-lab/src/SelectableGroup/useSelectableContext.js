import React from 'react';
import SelectableGroupContext from "./SelectableGroupContext";

function useSelectableContext(){
  const context = React.useContext(SelectableGroupContext);

  return context;
}

export default useSelectableContext;
