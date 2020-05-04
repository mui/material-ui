import React from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > .fa': {
        margin: theme.spacing(2),
      },
    },
  }),
);

export default function FontAwesome() {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Icon className="fa fa-plus-circle" />
      <Icon className="fa fa-plus-circle" color="primary" />
      <Icon className="fa fa-plus-circle" color="secondary" />
      <Icon className="fa fa-plus-circle" style={{ color: green[500] }} />
      <Icon className="fa fa-plus-circle" fontSize="small" />
      <Icon className="fa fa-plus-circle" style={{ fontSize: 30 }} />
    </div>
  );
}
