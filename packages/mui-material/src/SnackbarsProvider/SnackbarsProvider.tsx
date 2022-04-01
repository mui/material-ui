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

  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration,
    children,
    ClickAwayListenerProps,
    ContentProps,
    limit = 5,
    TransitionComponent = Grow,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    ...others
  } = props;

  const showSnackbar = (snackbar: SnackbarProps) => {
    setSnackbars((prevState) => {
      const updatedSnackbars = [
        ...prevState,
        {
          anchorOrigin: { vertical, horizontal },
          autoHideDuration,
          ClickAwayListenerProps,
          ContentProps,
          key: randomId(),
          open: true,
          TransitionComponent,
          transitionDuration,
          TransitionProps,
          ...snackbar,
        },
      ];
      return updatedSnackbars.slice(0, limit);
    });
  };

  const handleClose = (key: string) => () => {
    const newSnackbars = snackbars.map((snackbar) => {
      if (snackbar.key === key) {
        snackbar.open = false;
      }
      return snackbar;
    });
    setSnackbars([...newSnackbars]);
  };

  const ownerState = {
    anchorOrigin: { vertical, horizontal },
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
          <StyledSnackbar
            key={snackbar.key}
            ownerState={newOwnerState}
            {...others}
            {...snackbar}
            onClose={handleClose(snackbar.key)}
            ClickAwayListenerProps={{
              onClickAway: () => null,
              ...snackbar.ClickAwayListenerProps,
            }}
          />
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
