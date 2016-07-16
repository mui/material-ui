import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const CircularProgressExampleSimple = () => (
  <div>
    <CircularProgress />
    <CircularProgress size={60} thickness={7} />
    <CircularProgress size={80} thickness={5} />
  </div>
);

export default CircularProgressExampleSimple;
