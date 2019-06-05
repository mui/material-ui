import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * @ignore - internal component.
 */
const Add = React.memo(function Add(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SvgIcon>
  );
});

Add.muiName = 'SvgIcon';

export default Add;
