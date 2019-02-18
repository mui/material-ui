import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

function DeepChildRaw(props) {
  return <Button>{`spacing ${props.theme.spacing}`}</Button>;
}

DeepChildRaw.propTypes = {
  theme: PropTypes.object.isRequired,
};

const DeepChild = withTheme(DeepChildRaw);

function WithTheme() {
  return (
    <ThemeProvider
      theme={{
        spacing: '8px',
      }}
    >
      <DeepChild />
    </ThemeProvider>
  );
}

export default WithTheme;
