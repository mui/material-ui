import * as React from 'react';
import { Unstable_Popup as BasePopup, PopupProps } from '@mui/base/Unstable_Popup';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { styled } from '@mui/system';
import { useTransitionStateManager, TransitionContext } from '@mui/base/useTransition';
import { Fade } from '@mui/material';
import { useSpring, useSpringRef, animated } from '@react-spring/web';

const StyledPopup = styled(BasePopup)`
  width: max-content;
`;

const PopupBody = styled('div')`
  padding: 16px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.05), 0 3px 2px -2px rgb(0 0 0 / 0.1);
  border-radius: 4px;
  font-family: var(--joy-fontFamily-body);
  font-size: var(--joy-fontSize-sm);
  z-index: 1;
`;

const Section = styled('div')`
  padding: 8px;
  width: 150px;
`;

function Animated(props: React.PropsWithChildren<{ className?: string }>) {
  const { className, children } = props;
  const transitionContext = React.useContext(TransitionContext);
  if (!transitionContext) {
    throw new Error('Missing transition context');
  }

  const { requestedEnter, onEntering, onEntered, onExiting, onExited, hasExited } =
    useTransitionStateManager();

  React.useEffect(() => {
    if (requestedEnter && !hasExited) {
      onEntering();
    } else if (!requestedEnter && hasExited) {
      onExiting();
    }
  }, [onEntering, onExiting, requestedEnter, hasExited]);

  const handleAnimationEnd = React.useCallback(() => {
    if (!requestedEnter) {
      onExited();
    } else {
      onEntered();
    }
  }, [onExited, onEntered, requestedEnter]);

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={className + (requestedEnter ? ' open' : ' close')}
    >
      {children}
    </div>
  );
}

const PopAnimation = styled(Animated)`
  @keyframes open-animation {
    0% {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }

    50% {
      opacity: 1;
      transform: translateY(4px) scale(1.05);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes close-animation {
    0% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
      filter: blur(0);
    }

    100% {
      opacity: 0;
      transform: scale(1.2) rotate(4deg);
      filter: blur(3px);
    }
  }

  &.open {
    animation: open-animation 0.2s ease-out both;
  }

  &.close {
    animation: close-animation 0.4s ease-out forwards;
  }
`;

function PopupWithTrigger(props: PopupProps & { label: string }) {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const { label, children, ...other } = props;

  return (
    <Section>
      <Button ref={setAnchor} onClick={() => setOpen((o) => !o)} fullWidth>
        {open ? 'Close' : 'Open'} {label}
      </Button>
      <StyledPopup anchor={anchor} open={open} {...other}>
        {children ?? <PopupBody>This is a {label} popup</PopupBody>}
      </StyledPopup>
    </Section>
  );
}

function MaterialUITransitionAdapter(props: { children: React.ReactElement }) {
  const { requestedEnter, onEntering, onExited } = useTransitionStateManager();
  const { children } = props;

  return React.cloneElement(children, {
    in: requestedEnter,
    onExited,
    onEnter: onEntering,
  });
}

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

function ReactSpringTransition({ children }: React.PropsWithChildren<{}>) {
  const { requestedEnter, onEntering, onEntered, onExiting, onExited } =
    useTransitionStateManager();

  const api = useSpringRef();
  const springs = useSpring({
    ref: api,
    from: { opacity: 0, transform: 'translateY(-8px) scale(0.95)' },
  });

  React.useEffect(() => {
    if (requestedEnter) {
      api.start({
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        config: { tension: 250, friction: 10 },
        onStart: onEntering,
        onRest: onEntered,
      });
    } else {
      api.start({
        opacity: 0,
        transform: 'translateY(-8px) scale(0.95)',
        config: { tension: 170, friction: 26 },
        onStart: onExiting,
        onRest: onExited,
      });
    }
  }, [requestedEnter, api, onEntering, onEntered, onExiting, onExited]);

  return <animated.div style={springs}>{children}</animated.div>;
}

export default function PopupPlayground() {
  return (
    <CssVarsProvider>
      <Container>
        <PopupWithTrigger label="default" />
        <PopupWithTrigger label="placed to the right" placement="right" />
        <PopupWithTrigger label="always mounted" keepMounted />
        <PopupWithTrigger label="non-portaled" disablePortal />
        <PopupWithTrigger label="with offset" offset={20} />
        <PopupWithTrigger label="with Material UI transition">
          <MaterialUITransitionAdapter>
            <Fade timeout={250}>
              <PopupBody>This is an animated popup</PopupBody>
            </Fade>
          </MaterialUITransitionAdapter>
        </PopupWithTrigger>
        <PopupWithTrigger label="with context-based transition">
          <PopAnimation>
            <PopupBody>This is an animated popup</PopupBody>
          </PopAnimation>
        </PopupWithTrigger>
        <PopupWithTrigger label="with React Spring transition">
          <ReactSpringTransition>
            <PopupBody>This is an animated popup</PopupBody>
          </ReactSpringTransition>
        </PopupWithTrigger>
      </Container>
    </CssVarsProvider>
  );
}
