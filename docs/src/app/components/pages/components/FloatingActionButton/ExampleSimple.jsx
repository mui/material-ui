import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Add from 'material-ui/lib/svg-icons/content/add';

const style = {
  marginRight: 20,
};

const FloatingActionButtonExampleSimple = () => (
  <div>
    <FloatingActionButton style={style}>
      <Add/>
    </FloatingActionButton>
    <FloatingActionButton mini={true} style={style}>
      <Add/>
    </FloatingActionButton>
  </div>
);

export default FloatingActionButtonExampleSimple;
