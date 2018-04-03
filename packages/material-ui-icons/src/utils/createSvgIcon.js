import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

const createSvgIcon = path => displayName => {
  let Icon = props => (
    <SvgIconCustom {...props}>
      {path}
    </SvgIconCustom>
  );

  Icon = pure(Icon);
  Icon.muiName = 'SvgIcon';
  Icon.displayName = displayName;

  return Icon;
};

export default createSvgIcon;
