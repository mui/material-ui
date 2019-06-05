import React from 'react';
import PropTypes from 'prop-types';
import Head from 'docs/src/modules/components/Head';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const defaultTheme = createMuiTheme();

export default function AppTheme(props) {
  const { children, description, title } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Head title={title} description={description} />
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
