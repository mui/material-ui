import * as React from 'react';
import Snackbar, { SnackbarProps } from '../Snackbar';
import SnackbarsContext from '../Snackbar/SnackbarsContext';
import Grow from '../Grow';
import SnackbarsContainer from './SnackbarsContainer';
import styled from '../styles/styled';
import useTheme from '../styles/useTheme';

const randomId = () => `mui-${Math.round(Math.random() * 1e5)}`;

const StyledSnackbar = styled(Snackbar)<{ ownerState: SnackbarProps }>(({ theme, ownerState }) => {
  return {
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...(ownerState.anchorOrigin!.vertical === 'bottom' && {
        '&:not(:last-of-type)': {
          marginTop: theme.spacing(),
        },
      }),
      ...(ownerState.anchorOrigin!.vertical === 'top' && {
        '&:not(:last-of-type)': {
          marginBottom: theme.spacing(),
        },
      }),
    },
  };
});

export interface SnackbarsProviderProps
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
  const theme = useTheme();

  const showSnackbar = (snackbar: SnackbarProps) => {
    setSnackbars((prevState) => {
      const updatedSnackbars = [
        ...prevState,
        {
          anchorOrigin: { vertical, horizontal },
          TransitionComponent,
          open: true,
          id: randomId(),
          ...snackbar,
        },
      ];
      return updatedSnackbars.slice(0, limit);
    });
  };

  const ownerState = {
    anchorOrigin: { vertical, horizontal },
    TransitionComponent,
    isRtl: theme.direction === 'rtl',
  };

  const items = snackbars.map((snackbar) => (
    <StyledSnackbar ownerState={ownerState} key={snackbar.id} {...others} {...snackbar} />
  ));

  return (
    <SnackbarsContext.Provider value={{ showSnackbar }}>
      {/* @ts-expect-error */}
      <SnackbarsContainer ownerState={ownerState}>{items}</SnackbarsContainer>
      {children}
    </SnackbarsContext.Provider>
  );
};

export default SnackbarsProvider;
