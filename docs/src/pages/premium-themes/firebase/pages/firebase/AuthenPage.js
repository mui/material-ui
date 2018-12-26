import { css } from 'emotion';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigator from '../../components/firebase/Navigator';
import Content from '../../components/firebase/Content';
import Header from '../../components/firebase/Header';
import theme from '../../theme/firebase/firebaseTheme';
import withTheme from './withTheme';

const AuthenPage = () => (
  <React.Fragment>
    <CssBaseline />
    <Navigator />
    <div className={css({ marginLeft: 256 })}>
      <Header />
      <Content />
    </div>
  </React.Fragment>
);

export default withTheme(theme)(AuthenPage);
