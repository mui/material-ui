import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

function WrappedIcon(props) {
  return <Icon {...props} />;
}

WrappedIcon.muiName = 'Icon';

export default function Composition() {
  return (
    <div>
      <IconButton>
        <Icon>alarm</Icon>
      </IconButton>
      <IconButton>
        <WrappedIcon>alarm</WrappedIcon>
      </IconButton>
    </div>
  );
}
