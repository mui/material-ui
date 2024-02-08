import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Unstable_Popup as PopupBase } from '@mui/base/Unstable_Popup';
import { Button as ButtonBase } from '@mui/base/Button';
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
      transform: scale(1.5) rotate(8deg);
      filter: blur(4px);
    }
  }

  .anim-open {
    animation: open-animation 1s ease-out both;
  }

  .anim-close {
    animation: close-animation 1s ease-out forwards;
  }

  .open {
    opacity: 1;
    transform: translateY(0) scale(1)
    filter: blur(0);
    transition: transform 0.2s cubic-bezier(0.345, 0.275, 0.505, 1.625), opacity 0.2s ease-out;
  }

  .close {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
    filter: blur(3px);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out, filter 0.2s ease-out;
  }
`;

const grey = {
  200: '#DAE2ED',
  700: '#434D5B',
  900: '#1C2025',
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const Button = styled(ButtonBase)(
  ({ theme }) => `
  min-width: 175px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: background-color, box-shadow, 120ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 1px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.1)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

const Popup = styled(PopupBase)`
  width: max-content;
`;

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);

const Section = styled('div')`
  display: flex;
  gap: 12px;
  padding: 8px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default function AllTransitionsDemo() {
  return (
    <div>
      <style>{styles}</style>
      <Section>
        <PopupWithTrigger>
          <CssTransition
            enterClassName="open"
            exitClassName="close"
            lastTransitionedPropertyOnExit="transform"
          >
            <PopupBody>Animated with the CSS Transition component.</PopupBody>
          </CssTransition>
        </PopupWithTrigger>
        <PopupWithTrigger2>
          <CssAnimation
            enterClassName="anim-open"
            exitClassName="anim-close"
            enterAnimationName="open-animation"
            exitAnimationName="close-animation"
          >
            <PopupBody>Animated with the CSS Animation component.</PopupBody>
          </CssAnimation>
        </PopupWithTrigger2>
      </Section>
    </div>
  );
}

function PopupWithTrigger(props) {
  const [anchor, setAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { children, ...other } = props;

  return (
    <React.Fragment>
      <Button ref={setAnchor} onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide popup' : 'Open CSS Transition'}
      </Button>
      <Popup anchor={anchor} open={open} {...other}>
        {children}
      </Popup>
    </React.Fragment>
  );
}

PopupWithTrigger.propTypes = {
  children: PropTypes.node,
};

function PopupWithTrigger2(props) {
  const [anchor, setAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { children, ...other } = props;

  return (
    <React.Fragment>
      <Button ref={setAnchor} onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide popup' : 'Open CSS Animation'}
      </Button>
      <Popup anchor={anchor} open={open} {...other}>
        {children}
      </Popup>
    </React.Fragment>
  );
}

PopupWithTrigger2.propTypes = {
  children: PropTypes.node,
};
