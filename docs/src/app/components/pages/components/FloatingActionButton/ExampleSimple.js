import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginRight: 20,
};

const FloatingActionButtonExampleSimple = () => (
  <div>
    <FloatingActionButton style={style}>
      <ContentAdd />
    </FloatingActionButton>

    <FloatingActionButton mini={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>

    <FloatingActionButton secondary={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>

    <FloatingActionButton mini={true} secondary={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>

    <FloatingActionButton disabled={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>

    <FloatingActionButton mini={true} disabled={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

export default FloatingActionButtonExampleSimple;
