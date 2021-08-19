import * as React from 'react';
import clsx from 'clsx';
import Grow from '@material-ui/core/Grow';
import Paper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import Popper, { PopperProps as MuiPopperProps } from '@material-ui/core/Popper';
import TrapFocus, {
  TrapFocusProps as MuiTrapFocusProps,
} from '@material-ui/core/Unstable_TrapFocus';
import { useForkRef, setRef, useEventCallback, ownerDocument } from '@material-ui/core/utils';
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

function clickedRootScrollbar(event: MouseEvent, doc: Document) {
  return (
    doc.documentElement.clientWidth < event.clientX ||
    doc.documentElement.clientHeight < event.clientY
  );
}

/**
 * Based on @material-ui/core/ClickAwayListener without the customization.
 * We can probably strip away even more since children won't be portaled.
 *
 * @param onClickAway
 * @param onClick
 * @param onTouchStart
 */
function useClickAwayListener(
  active: boolean,
  onClickAway: (event: MouseEvent | TouchEvent) => void,
): [React.Ref<Element>, React.MouseEventHandler, React.TouchEventHandler] {
  const movedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);

  const nodeRef = React.useRef<Element>(null);

  // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.
  const handleClickAway = useEventCallback((event: MouseEvent | TouchEvent) => {
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;

    const doc = ownerDocument(nodeRef.current);

    // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.
    if (
      !nodeRef.current ||
      // is a TouchEvent?
      ('clientX' in event && clickedRootScrollbar(event, doc))
    ) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    let insideDOM;

    // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM =
        !doc.documentElement.contains(event.target as Node | null) ||
        nodeRef.current.contains(event.target as Node | null);
    }

    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  });

  // Keep track of mouse/touch events that bubbled up through the portal.
  const handleSynthetic = () => {
    syntheticEventRef.current = true;
  };

  React.useEffect(() => {
    if (active) {
      const doc = ownerDocument(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);

      return () => {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }
    return undefined;
  }, [active, handleClickAway]);

  React.useEffect(() => {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (e.g. setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      const doc = ownerDocument(nodeRef.current);

      doc.addEventListener('click', handleClickAway);

      return () => {
        doc.removeEventListener('click', handleClickAway);
        // cleanup `handleClickAway`
        syntheticEventRef.current = false;
      };
    }
    return undefined;
  }, [active, handleClickAway]);

  return [nodeRef, handleSynthetic, handleSynthetic];
}

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

  useGlobalKeyDown(open, {
    [keycode.Esc]: onClose,
  });

  const lastFocusedElementRef = React.useRef<Element | null>(null);
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

  const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, onClose);
  const paperRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(paperRef, containerRef);

  const handlePaperRef = useEventCallback((node: HTMLElement) => {
    setRef(handleRef, node);
    setRef(clickAwayRef, node);

    if (node) {
      onOpen();
    }
  });

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
              onClick={onPaperClick}
              onTouchStart={onPaperTouchStart}
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
