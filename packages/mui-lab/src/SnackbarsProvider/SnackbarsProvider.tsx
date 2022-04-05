import * as React from 'react';
import PropTypes from 'prop-types';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import Grow from '@mui/material/Grow';
import SnackbarContent from '@mui/material/SnackbarContent';
import { styled, useTheme } from '@mui/material/styles';
import SnackbarsContext, { ShowSnackbarProps, SnackbarContentType } from './SnackbarsContext';
import SnackbarsContainer from './SnackbarsContainer';

const randomId = () => `mui-${Math.round(Math.random() * 1e5)}`;

const StyledSnackbar = styled(Snackbar)<{ ownerState: ShowSnackbarProps }>(
  ({ theme, ownerState }) => {
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
  },
);

export interface SnackbarsProviderProps
  extends Omit<SnackbarProps, 'children' | 'classes' | 'key' | 'message' | 'onClose' | 'open'> {
  /** The maximum number of snackbars to display at a time.
   * @default 5
   */
  limit?: number;
  /**
   * Replace the `SnackbarContent` component.
   */
  content?: SnackbarContentType;
}

type SnackbarsByAnchorOrigin = { [key: string]: ShowSnackbarProps[] };

const SnackbarsProvider = (props: SnackbarsProviderProps & { children?: React.ReactNode }) => {
  const [snackbars, setSnackbars] = React.useState<ShowSnackbarProps[]>([]);
  const theme = useTheme();

  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    action,
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration = null,
    children,
    ClickAwayListenerProps,
    content,
    ContentProps,
    limit = 5,
    TransitionComponent = Grow,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    ...others
  } = props;

  const showSnackbar = (snackbar: ShowSnackbarProps) => {
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
      if (snackbar.key !== key) {
        return snackbar;
      }
      return { ...snackbar, open: false };
    });
    setSnackbars([...newSnackbars]);
  };

  const handleExited = (key: string) => () => {
    setSnackbars([...snackbars.filter((snackbar) => snackbar.key !== key)]);
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
      <SnackbarsContainer key={origin} ownerState={newOwnerState}>
        {snackbarsByCategory.map((snackbar) => {
          let snackbarAction = snackbar.action || action;
          if (typeof snackbarAction === 'function') {
            snackbarAction = snackbarAction(snackbar.key);
          }

          let snackbarContent = snackbar.content || content;
          if (typeof snackbarContent === 'function') {
            snackbarContent = snackbarContent(snackbar.key);
          }

          return (
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
              TransitionProps={{
                onExited: handleExited(snackbar.key),
                ...snackbar.TransitionProps,
              }}
            >
              {snackbarContent || (
                <SnackbarContent
                  message={snackbar.message}
                  action={snackbarAction}
                  {...snackbar.ContentProps}
                />
              )}
            </StyledSnackbar>
          );
        })}
      </SnackbarsContainer>
    );
  });

  return (
    <SnackbarsContext.Provider value={{ showSnackbar, closeSnackbar: handleClose }}>
      {snackbarsContainer}
      {children}
    </SnackbarsContext.Provider>
  );
};

SnackbarsProvider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,
  /**
   * Props applied to the [`SnackbarContent`](/api/snackbar-content/) element.
   */
  ContentProps: PropTypes.object,
  /**
   * The maximum number of snackbars to display at a time.
   * @default 5
   */
  limit: PropTypes.number,
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,
} as any;

export default SnackbarsProvider;
