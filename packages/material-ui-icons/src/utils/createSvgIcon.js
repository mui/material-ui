import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function createSvgIcon(path, displayName) {
  let Icon = props => (
    <SvgIcon {...props}>
      {path}
    </SvgIcon>
  );

  Icon.displayName = `${displayName}Icon`;
  Icon = React.memo(Icon);
  Icon.muiName = 'SvgIcon';

  return Icon;
};

export default createSvgIcon;
