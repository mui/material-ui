// @flow weak

import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const WrappedIcon = props => <Icon {...props} />;
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
