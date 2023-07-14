import * as React from 'react';
import BasePopup, { PopupProps } from '@mui/base/Popup';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { Box, styled } from '@mui/system';
import Fade from '@mui/material/Fade';

const StyledPopup = styled(BasePopup)`
  width: max-content;
`;

const PopupBody = styled('div')`
  padding: 16px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05), 0 3px 2px -2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: var(--joy-fontFamily-body);
  font-size: var(--joy-fontSize-sm);
`;

const Section = styled('div')`
  padding: 8px;
  width: 150px;
`;

function Animated(
  props: React.PropsWithChildren<{
    className?: string;
    open: boolean;
    onAppearing: () => void;
    onDisappeared: () => void;
  }>,
) {
  const { open, onAppearing, onDisappeared, children, className } = props;

  const handleAnimationEnd = React.useCallback(() => {
    if (open) {
      onAppearing();
    } else {
      onDisappeared();
    }
  }, [onAppearing, onDisappeared, open]);

  return (
    <div onAnimationEnd={handleAnimationEnd} className={className + (open ? ' open' : ' close')}>
      {children}
    </div>
  );
}

const PopAnimation = styled(Animated)`
  @keyframes openAnimation {
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
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes closeAnimation {
    0% {
      opacity: 1;
      transform: translateY(0px) scale(1);
      filter: blur(0px);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
      filter: blur(3px);
    }
  }

  &.open {
    animation: openAnimation 0.2s ease-out forwards;
  }

  &.close {
    animation: closeAnimation 0.2s ease-out forwards;
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
      <StyledPopup anchor={anchor} open={open} placement="bottom" offset={20} {...other}>
        {children ?? <PopupBody>This is a {label} popup</PopupBody>}
      </StyledPopup>
    </Section>
  );
}

export default function PopupPlayground() {
  return (
    <CssVarsProvider>
      <Box sx={{ display: 'flex' }}>
        <PopupWithTrigger label="default" />
        <PopupWithTrigger keepMounted label="always mounted" />
        <PopupWithTrigger disablePortal label="non-portaled" />
        <PopupWithTrigger label="with Material UI transition" withTransition disablePortal>
          {(props) => (
            <Fade {...props} timeout={250}>
              <PopupBody>This is an animated popup</PopupBody>
            </Fade>
          )}
        </PopupWithTrigger>

        <PopupWithTrigger label="with custom transition" withTransition>
          {({ in: open, onEnter, onExited }) => (
            <PopAnimation open={open} onAppearing={onEnter} onDisappeared={onExited}>
              <PopupBody>This is an animated popup</PopupBody>
            </PopAnimation>
          )}
        </PopupWithTrigger>
      </Box>
    </CssVarsProvider>
  );
}
