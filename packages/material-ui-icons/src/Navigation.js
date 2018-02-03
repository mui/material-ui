import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Navigation = props =>
  <SvgIconCustom {...props}>
    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
  </SvgIconCustom>;

Navigation = pure(Navigation);
Navigation.muiName = 'SvgIcon';

export default Navigation;
