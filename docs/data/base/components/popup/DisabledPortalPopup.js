import * as React from 'react';
import PropTypes from 'prop-types';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { Box, styled } from '@mui/system';

export default function DisabledPortalPopup() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        overflowY: 'auto',
        position: 'relative',
        padding: '40px',
      }}
    >
      <PopupWithTrigger id="popup-with-portal" buttonLabel="With a portal" />
      <PopupWithTrigger
        id="popup-without-portal"
        buttonLabel="No portal, default strategy"
        disablePortal
      />
      <PopupWithTrigger
        id="popup-without-portal-fixed"
        buttonLabel="No portal, 'fixed' strategy"
        disablePortal
        strategy="fixed"
      />
    </Box>
  );
}

function PopupWithTrigger(props) {
  const { id, buttonLabel, ...other } = props;

  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        {buttonLabel}
      </Button>
      <Popup id={id} open={open} anchor={anchor} {...other}>
        <PopupBody>{buttonLabel}</PopupBody>
      </Popup>
    </div>
  );
}

PopupWithTrigger.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  id: PropTypes.string,
};

const Popup = styled(BasePopup)`
  z-index: 1;
`;

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  height: 150px;
  display: flex;
  align-items: center;
  padding: 16px;
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
`,
);

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const Button = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
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

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);
