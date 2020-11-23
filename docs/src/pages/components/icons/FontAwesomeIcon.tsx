import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2),
      },
    },
  }),
);

export default function FontAwesomeIcon() {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Icon baseClassName="fas" className="fa-plus-circle" />
      <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
        style={{ color: green[500] }}
      />
      <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" />
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
        style={{ fontSize: 30 }}
      />
    </div>
  );
}
