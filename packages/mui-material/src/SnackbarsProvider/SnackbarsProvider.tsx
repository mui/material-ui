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

type SnackbarsByAnchorOrigin = { [key: string]: SnackbarProps[] };

const SnackbarsProvider = (props: SnackbarsProviderProps & { children?: React.ReactNode }) => {
  const [snackbars, setSnackbars] = React.useState<SnackbarProps[]>([]);
  const theme = useTheme();

  const {
    limit = 5,
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    TransitionComponent = Grow,
    children,
    ...others
  } = props;

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

  const groupSnackbarsByAnchorOrigin = snackbars.reduce<SnackbarsByAnchorOrigin>((acc, current) => {
    const anchor = current.anchorOrigin;
    const category = `${anchor!.vertical}${anchor!.horizontal}`;
    const existingCategory = acc[category] || [];
    return {
      ...acc,
      [category]: [...existingCategory, current],
    };
  }, {});

  const snackbarsContainer = Object.keys(groupSnackbarsByAnchorOrigin).map((origin) => {
    const snackbarsByCategory = groupSnackbarsByAnchorOrigin[origin];
    const newOwnerState = { ...ownerState, anchorOrigin: snackbarsByCategory[0].anchorOrigin };
    return (
      <SnackbarsContainer
        key={origin}
        /* @ts-expect-error */
        ownerState={newOwnerState}
      >
        {snackbarsByCategory.map((snackbar) => (
          <StyledSnackbar key={snackbar.id} ownerState={newOwnerState} {...others} {...snackbar} />
        ))}
      </SnackbarsContainer>
    );
  });

  return (
    <SnackbarsContext.Provider value={{ showSnackbar }}>
      {snackbarsContainer}
      {children}
    </SnackbarsContext.Provider>
  );
};

export default SnackbarsProvider;
