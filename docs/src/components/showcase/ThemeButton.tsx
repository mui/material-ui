import * as React from 'react';
import Button from '@mui/material/Button';

export default function ThemeButton() {
  return (
    <React.Fragment>
      <Button size="medium" variant="contained" sx={{ flexGrow: 1 }}>
        Buy now
      </Button>
      <Button size="medium" variant="outlined" sx={{ flexGrow: 1 }}>
        Buy now
      </Button>
    </React.Fragment>
  );
}
