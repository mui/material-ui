import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { styled, css } from '@mui/system';

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <TriggerButton aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </TriggerButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <StyledPopperDiv>The content of the Popper.</StyledPopperDiv>
      </Popper>
    </div>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const TriggerButton = styled('button')(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px 16px;
    line-height: 1.5;
    background: transparent;
    cursor: pointer;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? blue[300] : blue[500]};
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? blue[200] : blue[400]};
    }
  
    &:focus-visible {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
    `,
);

const StyledPopperDiv = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? blue[200] : blue[800]};
    font-size: 0.875rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    opacity: 1;
    margin: 0.25rem 0;
  `,
);
