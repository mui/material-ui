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
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.05), 0 3px 2px -2px rgb(0 0 0 / 0.1);
  border-radius: 4px;
  /* stylelint-disable custom-property-pattern */
  font-family: var(--joy-fontFamily-body);
  font-size: var(--joy-fontSize-sm);
  /* stylelint-enable custom-property-pattern */
  z-index: 1;
`;

const Section = styled('div')`
  padding: 8px;
  width: 150px;
`;

function Animated(
  props: React.PropsWithChildren<{
    className?: string;
    open: boolean;
    onDisappeared: () => void;
  }>,
) {
  const { open, onDisappeared, children, className } = props;

  const handleAnimationEnd = React.useCallback(() => {
    if (!open) {
      onDisappeared();
    }
  }, [onDisappeared, open]);

  return (
    <div onAnimationEnd={handleAnimationEnd} className={className + (open ? ' open' : ' close')}>
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
    animation: open-animation 0.2s ease-out forwards;
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

export default function PopupPlayground() {
  return (
    <CssVarsProvider>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <PopupWithTrigger label="default" />
        <PopupWithTrigger label="placed to the right" placement="right" />
        <PopupWithTrigger label="always mounted" keepMounted />
        <PopupWithTrigger label="non-portaled" disablePortal />
        <PopupWithTrigger label="with offset" offset={20} />
        <PopupWithTrigger label="with Material UI transition" withTransition>
          {(props) => (
            <Fade {...props} timeout={250}>
              <PopupBody>This is an animated popup</PopupBody>
            </Fade>
          )}
        </PopupWithTrigger>

        <PopupWithTrigger label="with custom transition" withTransition>
          {({ requestOpen: open, onExited }) => (
            <PopAnimation open={open} onDisappeared={onExited}>
              <PopupBody>This is an animated popup</PopupBody>
            </PopAnimation>
          )}
        </PopupWithTrigger>
      </Box>
    </CssVarsProvider>
  );
}
