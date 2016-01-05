import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

const CircularProgressExampleSimple = () => (
  <div>
    <CircularProgress mode="indeterminate" />
    <CircularProgress mode="indeterminate" size={1.5}/>
    <CircularProgress mode="indeterminate" size={2}/>
  </div>
);

export default CircularProgressExampleSimple;
