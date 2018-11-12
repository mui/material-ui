import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import withStyles from '@material-ui/core/styles/withStyles';
// COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigator from './components/Navigator';
import Content from './components/Content';
import Header from './components/Header';
// THEME
import theme from './theme';

const drawerWidth = 256;

const styles = () => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: drawerWidth,
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
  },
});

const FirebaseDemo = ({ classes }) => (
  <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <CssBaseline />
      <Navigator width={drawerWidth} />
      <div className={classes.appContent}>
        <Header />
        <main className={classes.mainContent}>
          <Content />
        </main>
      </div>
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)(FirebaseDemo);
