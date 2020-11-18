import * as React from 'react';
import clsx from 'clsx';
import Grow from '@material-ui/core/Grow';
import Paper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import Popper, { PopperProps as MuiPopperProps } from '@material-ui/core/Popper';
import TrapFocus, {
  TrapFocusProps as MuiTrapFocusProps,
} from '@material-ui/core/Unstable_TrapFocus';
import { useForkRef, setRef, useEventCallback } from '@material-ui/core/utils';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps as MuiTransitionProps } from '@material-ui/core/transitions';
import { useGlobalKeyDown, keycode } from './hooks/useKeyDown';
import { IS_TOUCH_DEVICE_MEDIA } from './constants/dimensions';
import { executeInTheNextEventLoopTick } from './utils';

export interface ExportedPickerPopperProps {
  /**
   * Popper props passed down to [Popper](https://material-ui.com/api/popper/) component.
   */
  PopperProps?: Partial<MuiPopperProps>;
  /**
   * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent?: React.ComponentType<MuiTransitionProps>;
}

export interface PickerPopperProps extends ExportedPickerPopperProps, MuiPaperProps {
  role: 'tooltip' | 'dialog';
  TrapFocusProps?: Partial<MuiTrapFocusProps>;
  anchorEl: MuiPopperProps['anchorEl'];
  open: MuiPopperProps['open'];
  containerRef?: React.Ref<HTMLDivElement>;
  onClose: () => void;
  onOpen: () => void;
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.modal,
    },
    paper: {
      transformOrigin: 'top center',
      '&:focus': {
        [IS_TOUCH_DEVICE_MEDIA]: {
          outline: 0,
        },
      },
    },
    topTransition: {
      transformOrigin: 'bottom center',
    },
  });

export type PickersPopperClassKey = keyof WithStyles<typeof styles>['classes'];

const PickersPopper: React.FC<PickerPopperProps & WithStyles<typeof styles>> = (props) => {
  const {
    anchorEl,
    children,
    classes,
    containerRef = null,
    onClose,
    onOpen,
    open,
    PopperProps,
    role,
    TransitionComponent = Grow,
    TrapFocusProps,
  } = props;
  const paperRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(paperRef, containerRef);
  const lastFocusedElementRef = React.useRef<Element | null>(null);

  const handlePaperRef = useEventCallback((node) => {
    setRef(handleRef, node);

    if (node) {
      onOpen();
    }
  });

  useGlobalKeyDown(open, {
    [keycode.Esc]: onClose,
  });

  React.useEffect(() => {
    if (role === 'tooltip') {
      return;
    }

    if (open) {
      lastFocusedElementRef.current = document.activeElement;
    } else if (
      lastFocusedElementRef.current &&
      lastFocusedElementRef.current instanceof HTMLElement
    ) {
      lastFocusedElementRef.current.focus();
    }
  }, [open, role]);

  const handleBlur = () => {
    if (!open) {
      return;
    }

    // document.activeElement is updating on the next tick after `blur` called
    executeInTheNextEventLoopTick(() => {
      if (paperRef.current?.contains(document.activeElement)) {
        return;
      }

      onClose();
    });
  };

  return (
    <Popper
      transition
      role={role}
      open={open}
      anchorEl={anchorEl}
      className={clsx(classes.root, PopperProps?.className)}
      {...PopperProps}
    >
      {({ TransitionProps, placement }) => (
        <TrapFocus
          open={open}
          disableAutoFocus
          disableEnforceFocus={role === 'tooltip'}
          isEnabled={() => true}
          getDoc={() => paperRef.current?.ownerDocument ?? document}
          {...TrapFocusProps}
        >
          <TransitionComponent {...TransitionProps}>
            <Paper
              tabIndex={-1}
              elevation={8}
              ref={handlePaperRef}
              className={clsx(classes.paper, {
                [classes.topTransition]: placement === 'top',
              })}
              onBlur={handleBlur}
            >
              {children}
            </Paper>
          </TransitionComponent>
        </TrapFocus>
      )}
    </Popper>
  );
};

export default withStyles(styles, { name: 'MuiPickersPopper' })(PickersPopper);
