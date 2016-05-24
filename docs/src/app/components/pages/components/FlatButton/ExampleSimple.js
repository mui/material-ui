import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" style={{width: '200px'}}/>
    <FlatButton label="Primary" primary={true} />
    <FlatButton label="Secondary" secondary={true} />
    <FlatButton label="Disabled" disabled={true} />
  </div>
);

export default FlatButtonExampleSimple;
