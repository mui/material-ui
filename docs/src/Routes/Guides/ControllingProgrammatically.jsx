import React from 'react';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const ControllingProgrammatically = () => (
  <div>
    <Typography variant="display2" gutterBottom> Control programmatically </Typography>

    <Typography variant="body1" gutterBottom>
      Any picker component provide special property <span className="inline-code"> pickerRef </span>
      to add an ability open picker from the code. See an example below
    </Typography>

    <SourcablePanel
      title="Open from button"
      sourceFile="Guides/ControllingProgrammatically.jsx"
    />
  </div>
);

export default ControllingProgrammatically;

