import * as React from 'react';
import Snackbar, { SnackbarProps } from '../Snackbar';
import SnackbarsContext from '../Snackbar/SnackbarsContext';
import useId from '../utils/useId';

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
}: SnackbarsProviderProps & { children?: React.ReactElement<any, any> }) => {
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
    <SnackbarsContext.Provider value={{ showSnackbar }}>
      {items}
      {children}
    </SnackbarsContext.Provider>
  );
};

export default SnackbarsProvider;
