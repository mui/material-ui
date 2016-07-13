import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const CircularProgressExampleSimple = () => (
  <div>
    <CircularProgress />
    <CircularProgress size={75} thickness={7} />
    <CircularProgress size={100} thickness={5} />
  </div>
);

export default CircularProgressExampleSimple;
