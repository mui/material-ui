import * as React from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

export default function ThemeButton() {
  return (
    <React.Fragment>
      <Fade in timeout={700}>
        <Button size="medium" variant="contained" sx={{ flexGrow: 1 }}>
          Buy Library
        </Button>
      </Fade>
      <Fade in timeout={700}>
        <Button size="medium" variant="contained" disabled sx={{ flexGrow: 1 }}>
          Buy Library
        </Button>
      </Fade>
    </React.Fragment>
  );
}
