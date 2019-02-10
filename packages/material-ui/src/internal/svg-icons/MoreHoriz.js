import React from 'react';
import SvgIcon from '../../SvgIcon';

/**
 * @ignore - internal component.
 */
let MoreHoriz = props => (
  <SvgIcon {...props}>
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </SvgIcon>
);
MoreHoriz = React.memo(MoreHoriz);
MoreHoriz.muiName = 'SvgIcon';

export default MoreHoriz;
