import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const style = {
  marginRight: 20,
};

const FloatingButtonExampleComplex = () => (
  <div>
    <FloatingActionButton
      secondary={true}
      style={style}
    >
      <ContentAdd />
    </FloatingActionButton>
    <FloatingActionButton
      mini={true}
      secondary={true}
      style={style}
    >
      <ContentAdd />
    </FloatingActionButton>
    <FloatingActionButton
      disabled={true}
      style={style}
    >
      <ContentAdd />
    </FloatingActionButton>
    <FloatingActionButton
      mini={true}
      disabled={true}
      style={style}
    >
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

export default FloatingButtonExampleComplex;
