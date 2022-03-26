import * as React from 'react';
import Snackbar, { SnackbarProps } from '../Snackbar';
import SnackbarsContext from '../Snackbar/SnackbarsContext';
import Grow from '../Grow';
import SnackbarContainer from './SnackbarContainer';
import styled from '../styles/styled';

const randomId = () => `mui-${Math.round(Math.random() * 1e5)}`;

const StyledSnackbar = styled(Snackbar)<{ ownerState: SnackbarProps }>(({ theme, ownerState }) => {
  return {
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    ...(ownerState.anchorOrigin?.vertical === 'bottom' &&
      ownerState.anchorOrigin?.horizontal === 'left' && {
        '&:not(:last-of-type)': {
          marginTop: theme.spacing(),
        },
      }),
  };
});

interface SnackbarsProviderProps
  extends Omit<SnackbarProps, 'children' | 'classes' | 'key' | 'message' | 'onClose' | 'open'> {
  /** The maximum number of snackbars to display at a time.
   * @default 5
   */
  limit?: number;
}

const SnackbarsProvider = ({
  limit = 5,
  anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
  TransitionComponent = Grow,
  children,
  ...others
}: SnackbarsProviderProps & { children?: React.ReactNode }) => {
  const [snackbars, setSnackbars] = React.useState<SnackbarProps[]>([]);

  const showSnackbar = (snackbar: SnackbarProps) => {
    setSnackbars((prevState) => {
      const updatedSnackbars = [
        ...prevState,
        {
          ...snackbar,
          anchorOrigin: { vertical, horizontal },
          TransitionComponent,
          open: true,
          id: randomId(),
        },
      ];
      return updatedSnackbars.slice(0, limit);
    });
  };

  const ownerState = {
    anchorOrigin: { vertical, horizontal },
    TransitionComponent,
  };

  const items = snackbars.map((snackbar) => (
    <StyledSnackbar key={snackbar.id} {...others} {...snackbar} ownerState={ownerState} />
  ));

  return (
    <SnackbarsContext.Provider value={{ showSnackbar }}>
      <SnackbarContainer ownerState={ownerState}>{items}</SnackbarContainer>
      {children}
    </SnackbarsContext.Provider>
  );
};

export default SnackbarsProvider;
