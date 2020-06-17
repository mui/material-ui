import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/withStyles' {
  // Augment the BaseCSSProperties so that we can control jss-rtl
  interface BaseCSSProperties {
    /**
     * Used to control if the rule-set should be affected by rtl transformation
     */
    flip?: boolean;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
