import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, withSnackbar } from 'notistack';

class App extends React.Component {
  handleClick = () => {
    this.props.enqueueSnackbar('I love snacks.');
  }

  handleClickVariant = variant => () => {
    // variant could be success, error, warning or info
    this.props.enqueueSnackbar('I love snacks.', { variant });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Display multiple snackbars</Button>
        <Button onClick={this.handleClickVariant('warning')}>Display warning snackbar</Button>
      </div>
    );
  }
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const MyApp = withSnackbar(App);


export default () => (
  <SnackbarProvider maxSnack={3}>
    <MyApp />
  </SnackbarProvider>
);
