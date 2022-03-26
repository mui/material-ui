import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import Snackbar, { SnackbarProps } from '../Snackbar';
import SnackbarsContext from '../Snackbar/SnackbarsContext';
import Grow from '../Grow';

const randomId = () => `mui-${Math.round(Math.random() * 1e5)}`;

interface SnackbarsProviderProps
  extends Omit<SnackbarProps, 'children' | 'classes' | 'key' | 'message' | 'onClose' | 'open'> {
  /** The maximum number of snackbars to display at a time.
   * @default 5
   */
  limit?: number;
}

const SnackbarsProvider = ({
  limit = 5,
  TransitionComponent = Grow,
  children,
  ...others
}: SnackbarsProviderProps & { children?: React.ReactNode }) => {
  const [snackbars, setSnackbars] = React.useState<SnackbarProps[]>([]);

  const showSnackbar = (snackbar: SnackbarProps) => {
    setSnackbars((prevState) => {
      const updatedSnackbars = [...prevState, { ...snackbar, open: true, id: randomId() }];
      return updatedSnackbars.slice(0, limit);
    });
  };

  const items = snackbars.map((snackbar) => (
    <TransitionComponent key={snackbar.id}>
      <Snackbar {...others} {...snackbar} />
    </TransitionComponent>
  ));

  return (
    <SnackbarsContext.Provider value={{ showSnackbar }}>
      <TransitionGroup>{items}</TransitionGroup>
      {children}
    </SnackbarsContext.Provider>
  );
};

export default SnackbarsProvider;
