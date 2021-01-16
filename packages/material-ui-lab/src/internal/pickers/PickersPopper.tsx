import * as React from 'react';
import clsx from 'clsx';
import Grow from '@material-ui/core/Grow';
import Paper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import Popper, { PopperProps as MuiPopperProps } from '@material-ui/core/Popper';
import TrapFocus, {
  TrapFocusProps as MuiTrapFocusProps,
} from '@material-ui/core/Unstable_TrapFocus';
import { useForkRef, setRef, useEventCallback } from '@material-ui/core/utils';
import { MuiStyles, StyleRules, WithStyles, withStyles } from '@material-ui/core/styles';
import { TransitionProps as MuiTransitionProps } from '@material-ui/core/transitions';
import { useGlobalKeyDown, keycode } from './hooks/useKeyDown';

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

export type PickersPopperClassKey = 'root' | 'paper' | 'topTransition';

export const styles: MuiStyles<PickersPopperClassKey> = (
  theme,
): StyleRules<PickersPopperClassKey> => ({
  root: {
    zIndex: theme.zIndex.modal,
  },
  paper: {
    transformOrigin: 'top center',
    outline: 0,
  },
  topTransition: {
    transformOrigin: 'bottom center',
  },
});

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

      // Focus the paper element when popper opens, otherwise onBlur will not be invoked.
      // Remove "disableAutoFocus" prop on TrapFocus also works but TrapFocus seems buggy.
      // The page will jump a little bit when the button that opens the picker is
      // located at the bottom of the screen.
      paperRef.current?.focus();
    } else if (
      lastFocusedElementRef.current &&
      lastFocusedElementRef.current instanceof HTMLElement
    ) {
      // restore focus, is it necessary?
      lastFocusedElementRef.current.focus();
    }
  }, [open, role]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!open) {
      return;
    }

    // e.relatedTarget is the target receiving focus. Should not use document.activeElement
    // since TrapFocus will make it the paper element after clicking on the paper element.
    if (
      (event.relatedTarget && paperRef.current?.contains(event.relatedTarget as Node)) ||
      // Prevent Popper getting closed when press "tab" on the last element
      event.relatedTarget === paperRef.current?.nextSibling
    ) {
      return;
    }

    onClose();
  };

  return (
    <Popper
      transition
      role={role}
      open={open}
      anchorEl={anchorEl}
      className={clsx(classes.root, PopperProps?.className)}
      // Prevent the page from jumping to the top. Seems to be a bug in TrapFocus.
      disablePortal
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
