import * as React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  '@global': {
    '.cssjss-advanced-global-root': {
      height: 100,
      width: 100,
      backgroundColor: 'blue',
    },
    '.cssjss-advanced-global-child': {
      height: 8,
      backgroundColor: 'red',
    },
  },
});

export default function GlobalCss() {
  useStyles();

  return (
    <div className="cssjss-advanced-global-root">
      <div className="cssjss-advanced-global-child" />
    </div>
  );
}
