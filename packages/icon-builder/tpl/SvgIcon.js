import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '{{{ muiRequireStmt }}}';

let {{className}} = (props) => (
  <SvgIcon {...props}>
    {{{paths}}}
  </SvgIcon>
);
{{className}} = pure({{className}});
{{className}}.displayName = '{{className}}';
{{className}}.muiName = 'SvgIcon';

export default {{className}};
