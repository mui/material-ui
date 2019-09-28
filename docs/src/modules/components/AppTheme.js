import React from 'react';
import PropTypes from 'prop-types';
import Head from 'docs/src/modules/components/Head';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

export default function AppTheme(props) {
  const { children } = props;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.element.isRequired,
};
