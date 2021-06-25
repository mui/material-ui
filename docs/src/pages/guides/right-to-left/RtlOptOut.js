import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(2),
    },
    affected: {
      textAlign: 'right',
    },
    unaffected: {
      flip: false,
      textAlign: 'right',
    },
  }),
  { defaultTheme },
);

export default function RtlOptOut() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.affected}>Affected</div>
      <div className={classes.unaffected}>Unaffected</div>
    </div>
  );
}
