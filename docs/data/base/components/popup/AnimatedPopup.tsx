import * as React from 'react';
import { styled, Theme } from '@mui/system';
import Popup, { PopupChildrenProps } from '@mui/base/Popup';

export default function AnimatedPopup() {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button ref={setAnchor} onClick={() => setOpen((o) => !o)} type="button">
        Toggle Popup
      </Button>
      <Popup anchor={anchor} open={open} withTransition>
        {(props: PopupChildrenProps) => (
          <PopAnimation {...props}>
            <PopupBody>This is an animated popup.</PopupBody>
          </PopAnimation>
        )}
      </Popup>
    </div>
  );
}

function Animated(
  props: React.PropsWithChildren<{
    className?: string;
    requestOpen: boolean;
    onExited: () => void;
  }>,
) {
  const { requestOpen: open, onExited: onDisappeared, children, className } = props;

  const handleAnimationEnd = React.useCallback(() => {
    if (!open) {
      onDisappeared();
    }
  }, [onDisappeared, open]);

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={className + (open ? ' open' : ' close')}
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
    animation: open-animation 0.2s ease-out forwards;
  }

  &.close {
    animation: close-animation 0.4s ease-out forwards;
  }
`;

const PopupBody = styled('div')(
  ({ theme }: { theme: Theme }) => `
  width: max-content;
  padding: 16px;
  margin: 8px;
  background-color: ${theme.palette.mode === 'dark' ? '#121212' : '#fff'};
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.05), 0 3px 2px -2px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const Button = styled('button')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
  }

  &:focus-visible {
    box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
    outline: none;
  }
`;
