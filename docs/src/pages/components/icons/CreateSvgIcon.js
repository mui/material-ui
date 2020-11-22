import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createSvgIcon } from '@material-ui/core/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
}));

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

export default function CreateSvgIcon() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeIcon />
      <HomeIcon color="primary" />
    </div>
  );
}
