import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'material-ui-snackbar-provider';

function MyApp() {
  const snackbar = useSnackbar();

  const handleClick = () => {
    snackbar.showMessage('I love snacks.');
  };

  const handleClickError = () => {
    snackbar.showMessage('No snacks found.', 'Retry', () => {
      snackbar.showMessage('Found one!');
    });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickError}>Show snackbar with retry button</Button>
    </React.Fragment>
  );
}

export default function MaterialUiSnackbarProviderIntegration() {
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <MyApp />
    </SnackbarProvider>
  );
}
