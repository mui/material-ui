import * as React from 'react';
import Popup from '@mui/base/Popup';
import { styled, Theme } from '@mui/system';

export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popup
      </Button>
      <Popup id={id} open={open} anchor={anchor}>
        <PopupBody>The content of the Popup.</PopupBody>
      </Popup>
    </div>
  );
}

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
