import * as React from 'react';
import Snackbar, { SnackbarProps } from './Snackbar';
import SnackbarContext from './SnackbarContext';
import useId from '../utils/useId';

interface SnackbarProviderProps
  extends Omit<SnackbarProps, 'children' | 'classes' | 'key' | 'message' | 'onClose' | 'open'> {
  /** The maximum number of snackbars to display at a time.
   * @default 5
   */
  limit?: number;
}

const SnackbarProvider = ({
  limit = 5,
  children,
  ...others
}: SnackbarProviderProps & { children?: React.ReactElement<any, any> }) => {
  const [snackbars, setSnackbars] = React.useState<SnackbarProps[]>([]);

  const defaultSnackbarId = useId();

  const showSnackbar = (snackbar: SnackbarProps) => {
    const id = snackbar.id || defaultSnackbarId;
    setSnackbars((prevState) => {
      const updatedSnackbars = [...prevState, { ...snackbar, id }];
      return updatedSnackbars.slice(0, limit);
    });
    return id!;
  };

  const items = snackbars.map((snackbar) => (
    <Snackbar {...others} {...snackbar} key={snackbar.id} />
  ));

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {items}
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
