import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function SizeCheckboxes() {
  return (
    <div>
      <Checkbox defaultChecked inputProps={{ 'aria-label': 'small' }} size="small" />
      <Checkbox defaultChecked inputProps={{ 'aria-label': 'normal' }} />
      <Checkbox
        defaultChecked
        inputProps={{ 'aria-label': 'large' }}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
    </div>
  );
}
