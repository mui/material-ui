import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '{{{ muiRequireStmt }}}';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let {{className}} = props =>
  <SvgIconCustom {...props}>
    {{{paths}}}
  </SvgIconCustom>;

{{className}} = pure({{className}});
{{className}}.muiName = 'SvgIcon';

export default {{className}};
