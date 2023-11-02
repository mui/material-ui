import * as React from 'react';
import { Unstable_Popup as BasePopup, PopupProps } from '@mui/base/Unstable_Popup';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { styled } from '@mui/system';
import { useTransitionStateManager } from '@mui/base/useTransition';
import { Fade } from '@mui/material';
import { useSpring, useSpringRef, animated } from '@react-spring/web';
import { CssAnimation, CssTransition } from '@mui/base/Transitions';

const styles = `
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

  .anim-open {
    animation: open-animation 0.2s ease-out both;
  }

  .anim-close {
    animation: close-animation 0.4s ease-out forwards;
  }

  .tran-open {
    opacity: 1;
    transform: translateY(0) scale(1)
    filter: blur(0);
    transition: transform 0.2s cubic-bezier(0.345, 0.275, 0.505, 1.625), opacity 0.2s ease-out;
  }

  .tran-close {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
    filter: blur(3px);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out, filter 0.2s ease-out;
  }
`;

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

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

const Section = styled('div')`
  padding: 8px;
  width: 150px;
`;

export default function TransitionsPlayground() {
  return (
    <CssVarsProvider>
      <style>{styles}</style>
      <Container>
        <PopupWithTrigger label="with Material UI transition">
          <MaterialUITransitionAdapter>
            <Fade timeout={250}>
              <PopupBody>This is an animated popup</PopupBody>
            </Fade>
          </MaterialUITransitionAdapter>
        </PopupWithTrigger>

        <PopupWithTrigger label="with CssAnimation component">
          <CssAnimation
            enterClassName="anim-open"
            exitClassName="anim-close"
            enterAnimationName="open-animation"
            exitAnimationName="close-animation"
          >
            <PopupBody>This is an animated popup</PopupBody>
          </CssAnimation>
        </PopupWithTrigger>

        {/* `keepMounted` is needed to trigger the enter animation (otherwise the popup just appears without transition) */}
        <PopupWithTrigger label="with CssTransition component" keepMounted>
          {/* In this example, there are multiple properties being transitioned on exit (with different duration)
              To make sure the popup is removed from the DOM after the longest transition, we need to specify
              `lastTransitionedPropertyOnExit` 
            */}
          <CssTransition
            enterClassName="tran-open"
            exitClassName="tran-close"
            lastTransitionedPropertyOnExit="transform"
          >
            <PopupBody>This is an animated popup</PopupBody>
          </CssTransition>
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
