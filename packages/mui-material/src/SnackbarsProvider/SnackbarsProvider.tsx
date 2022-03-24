import * as React from 'react';
import Snackbar, { SnackbarProps } from '../Snackbar';
import SnackbarsContext from '../Snackbar/SnackbarsContext';

interface SnackbarsProviderProps
  extends Omit<SnackbarProps, 'children' | 'classes' | 'key' | 'message' | 'onClose' | 'open'> {
  /** The maximum number of snackbars to display at a time.
   * @default 5
   */
  limit?: number;
}

const SnackbarsProvider = ({
  limit = 5,
  children,
  ...others
}: SnackbarsProviderProps & { children?: React.ReactNode }) => {
  const [snackbars, setSnackbars] = React.useState<SnackbarProps[]>([]);

  const showSnackbar = (snackbar: SnackbarProps) => {
    setSnackbars((prevState) => {
      const updatedSnackbars = [...prevState, { ...snackbar, open: true }];
      return updatedSnackbars.slice(0, limit);
    });
  };

  const items = snackbars.map((snackbar, index) => (
    <Snackbar {...others} {...snackbar} key={index} />
  ));

  return (
    <SnackbarsContext.Provider value={{ showSnackbar }}>
      {items}
      {children}
    </SnackbarsContext.Provider>
  );
};

export default SnackbarsProvider;
