import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Add from 'material-ui/lib/svg-icons/content/add';

const style = {
  marginRight: 20,
};

const FloatingButtonExampleComplex = () => (
  <div>
    <FloatingActionButton secondary={true} style={style}>
      <Add/>
    </FloatingActionButton>
    <FloatingActionButton mini={true} secondary={true} style={style}>
      <Add />
    </FloatingActionButton>
    <FloatingActionButton
      disabled={true}
      style={style}>
      <Add/>
    </FloatingActionButton>
    <FloatingActionButton
      mini={true}
      disabled={true}
      style={style}>
      <Add/>
    </FloatingActionButton>
  </div>
);

export default FloatingButtonExampleComplex;
