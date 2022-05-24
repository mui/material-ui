import * as React from 'react';
import MuiError from '@mui/utils/macros/MuiError.macro';
import SnackbarsContext, { SnackbarsContextProps } from '../SnackbarsProvider/SnackbarsContext';

export default function useSnackbars(): SnackbarsContextProps {
  const context = React.useContext(SnackbarsContext);

  if (context === undefined) {
    throw new MuiError(
      'MUI: useSnackbars must be within a SnackbarsProvider. ' +
        'Make sure the component where you are using the useSnackbars hook is rendered within the SnackbarsProvider context. ' +
        'See https://mui.com/material-ui/react-stacked-snackbars/#usage for more info.',
    );
  }

  return context;
}
