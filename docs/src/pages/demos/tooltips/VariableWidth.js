import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. 
Praesent non nunc mollis, fermentum neque at, semper arcu. 
Nullam eget est sed sem iaculis gravida eget vitae justo. 
`;

function VariableWidth() {
  return (
    <div>
      <Tooltip title={longText}>
        <Button>Default Width</Button>
      </Tooltip>
      <Tooltip title={longText} maxWidth={500}>
        <Button>Wraps at 500</Button>
      </Tooltip>
      <Tooltip title={longText} maxWidth={0}>
        <Button>No wrapping</Button>
      </Tooltip>
    </div>
  );
}

export default VariableWidth;
