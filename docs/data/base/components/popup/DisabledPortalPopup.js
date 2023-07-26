import * as React from 'react';
import PropTypes from 'prop-types';
import Popup from '@mui/base/Popup';
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
      <StyledPopup id={id} open={open} anchor={anchor} {...other}>
        <PopupBody>{buttonLabel}</PopupBody>
      </StyledPopup>
    </div>
  );
}

PopupWithTrigger.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  id: PropTypes.string,
};

const StyledPopup = styled(Popup)`
  z-index: 1;
`;

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  height: 150px;
  display: flex;
  align-items: center;
  padding: 16px;
  margin: 8px;
  background-color: ${theme.palette.mode === 'dark' ? '#121212' : '#efefef'};
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.05), 0 3px 2px -2px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
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
