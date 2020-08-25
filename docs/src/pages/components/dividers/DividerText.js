import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  section1: {
    maxWidth: 360,
    padding: theme.spacing(1),
    margin: theme.spacing(1.5, 'auto'),
    width: 'fit-content',
    textAlign: 'center',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
  horizontalDivider: {
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default function DividerText() {
  const classes = useStyles();
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium. Etiam tempus sodales mauris vitae pulvinar. Nunc eu tortor odio.`;

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Typography color="textSecondary" variant="body2">
          {content}
        </Typography>
        <Divider className={classes.horizontalDivider}>CENTER</Divider>
        <Typography color="textSecondary" variant="body2">
          {content}
        </Typography>
        <Divider className={classes.horizontalDivider} textAlign="left">
          LEFT
        </Divider>
        <Typography color="textSecondary" variant="body2">
          {content}
        </Typography>
        <Divider className={classes.horizontalDivider} textAlign="right">
          RIGHT
        </Divider>
        <Typography color="textSecondary" variant="body2">
          {content}
        </Typography>
        <Divider className={classes.horizontalDivider}>
          <Chip label="CHIP" />
        </Divider>
        <Typography color="textSecondary" variant="body2">
          {content}
        </Typography>
      </div>
    </div>
  );
}
