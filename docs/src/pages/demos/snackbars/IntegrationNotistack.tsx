import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, VariantType, withSnackbar, withSnackbarProps } from 'notistack';

class App extends React.Component<withSnackbarProps> {
  handleClick = () => {
    this.props.enqueueSnackbar('I love snacks.');
  };

  handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    this.props.enqueueSnackbar('This is a warning message!', { variant });
  };

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleClick}>Show snackbar</Button>
        <Button onClick={this.handleClickVariant('warning')}>Show warning snackbar</Button>
      </React.Fragment>
    );
  }
}

(App as React.ComponentClass<withSnackbarProps>).propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const MyApp = withSnackbar(App);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;
