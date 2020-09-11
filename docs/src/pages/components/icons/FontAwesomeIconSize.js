import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import MdPhone from '@material-ui/icons/Phone';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const theme = createMuiTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});

export default function FontAwesomeIconSize() {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Chip icon={<MdPhone />} label="Call me" />
        <Chip icon={<Icon className="fas fa-phone-alt" />} label="Call me" />
      </ThemeProvider>
    </div>
  );
}
