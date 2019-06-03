import React from 'react';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    icon: {
      margin: theme.spacing(2),
    },
    iconHover: {
      margin: theme.spacing(2),
      '&:hover': {
        color: red[800],
      },
    },
  }),
);

export default function FontAwesome() {
  const classes = useStyles();

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <div className={classes.root}>
      <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} />
      <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} color="primary" />
      <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} color="secondary" />
      <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} color="action" />
      <Icon
        className={clsx(classes.iconHover, 'fa fa-plus-circle')}
        color="error"
        style={{ fontSize: 30 }}
      />
      <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} color="disabled" fontSize="large" />
    </div>
  );
}
