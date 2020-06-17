import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon, { IconProps } from '@material-ui/core/Icon';

const WrappedIcon = (props: IconProps) => <Icon {...props} />;
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
