import * as React from 'react';
import Grow from '@mui/material/Grow';
import Paper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import Popper, { PopperProps as MuiPopperProps } from '@mui/material/Popper';
import TrapFocus, { TrapFocusProps as MuiTrapFocusProps } from '@mui/material/Unstable_TrapFocus';
import { useForkRef, useEventCallback, ownerDocument } from '@mui/material/utils';
import { styled } from '@mui/material/styles';
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

export interface ExportedPickerPaperProps {
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable?: boolean;
  /**
   * Clear text message.
   * @default 'Clear'
   */
  clearText?: React.ReactNode;
  /**
   * Paper props passed down to [Paper](https://mui.com/api/paper/) component.
   */
  PaperProps?: Partial<MuiPaperProps>;
}

export interface ExportedPickerPopperProps {
  /**
   * Popper props passed down to [Popper](https://mui.com/api/popper/) component.
   */
  PopperProps?: Partial<MuiPopperProps>;
  /**
   * Custom component for popper [Transition](https://mui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent?: React.JSXElementConstructor<MuiTransitionProps>;
}

export interface PickerPopperProps extends ExportedPickerPopperProps, ExportedPickerPaperProps {
  role: 'tooltip' | 'dialog';
  TrapFocusProps?: Partial<MuiTrapFocusProps>;
  anchorEl: MuiPopperProps['anchorEl'];
  open: MuiPopperProps['open'];
  containerRef?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
  onClose: () => void;
  onBlur?: () => void;
  onClear?: () => void;
}

const PickersPopperRoot = styled(Popper)<{ ownerState: PickerPopperProps }>(({ theme }) => ({
  zIndex: theme.zIndex.modal,
}));

const PickersPopperPaper = styled(Paper)<{
  ownerState: PickerPopperProps & Pick<MuiPopperProps, 'placement'>;
}>(({ ownerState }) => ({
  transformOrigin: 'top center',
  outline: 0,
  ...(ownerState.placement === 'top' && {
    transformOrigin: 'bottom center',
  }),
}));

const PickersPopperAction = styled(DialogActions)<{
  ownerState: PickerPopperProps;
}>(({ ownerState }) => ({
  ...(ownerState.clearable
    ? {
        justifyContent: 'flex-start',
        '& > *:first-of-type': {
          marginRight: 'auto',
        },
      }
    : { padding: 0 }),
}));

function clickedRootScrollbar(event: MouseEvent, doc: Document) {
  return (
    doc.documentElement.clientWidth < event.clientX ||
    doc.documentElement.clientHeight < event.clientY
  );
}

/**
 * Based on @mui/material/ClickAwayListener without the customization.
 * We can probably strip away even more since children won't be portaled.
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

  const activatedRef = React.useRef(false);
  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    // Ensure that this hook is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    function armClickAwayListener() {
      activatedRef.current = true;
    }

    document.addEventListener('mousedown', armClickAwayListener, true);
    document.addEventListener('touchstart', armClickAwayListener, true);

    return () => {
      document.removeEventListener('mousedown', armClickAwayListener, true);
      document.removeEventListener('touchstart', armClickAwayListener, true);
      activatedRef.current = false;
    };
  }, [active]);

  // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.
  const handleClickAway = useEventCallback((event: MouseEvent | TouchEvent) => {
    if (!activatedRef.current) {
      return;
    }

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

const PickersPopper = (props: PickerPopperProps) => {
  const {
    anchorEl,
    children,
    containerRef = null,
    onClose,
    onClear,
    clearable = false,
    clearText = 'Clear',
    open,
    PopperProps,
    role,
    TransitionComponent = Grow,
    TrapFocusProps,
    PaperProps = {},
  } = props;

  React.useEffect(() => {
    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
  const paperRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(paperRef, containerRef);
  const handlePaperRef = useForkRef(handleRef, clickAwayRef as React.Ref<HTMLDivElement>);

  const ownerState = props;
  const {
    onClick: onPaperClickProp,
    onTouchStart: onPaperTouchStartProp,
    ...otherPaperProps
  } = PaperProps;

  return (
    <PickersPopperRoot
      transition
      role={role}
      open={open}
      anchorEl={anchorEl}
      ownerState={ownerState}
      {...PopperProps}
    >
      {({ TransitionProps, placement }) => (
        <TrapFocus
          open={open}
          disableAutoFocus
          disableEnforceFocus={role === 'tooltip'}
          isEnabled={() => true}
          {...TrapFocusProps}
        >
          <TransitionComponent {...TransitionProps}>
            <PickersPopperPaper
              tabIndex={-1}
              elevation={8}
              ref={handlePaperRef}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                onPaperClick(event);
                if (onPaperClickProp) {
                  onPaperClickProp(event);
                }
              }}
              onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => {
                onPaperTouchStart(event);
                if (onPaperTouchStartProp) {
                  onPaperTouchStartProp(event);
                }
              }}
              ownerState={{ ...ownerState, placement }}
              {...otherPaperProps}
            >
              {children}
              <PickersPopperAction ownerState={ownerState}>
                {clearable && (
                  <Button data-mui-test="clear-action-button" onClick={onClear}>
                    {clearText}
                  </Button>
                )}
              </PickersPopperAction>
            </PickersPopperPaper>
          </TransitionComponent>
        </TrapFocus>
      )}
    </PickersPopperRoot>
  );
};

export default PickersPopper;
