import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { styled } from '@mui/system';

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <StyledPopperDiv>The content of the Popper.</StyledPopperDiv>
      </Popper>
    </div>
  );
}

const StyledPopperDiv = styled('div')(
  ({ theme }) => `
  padding: 0.5rem;
  border: 1px solid;
  background-color: ${theme.palette.mode === 'dark' ? '#121212' : '#fff'};
  opacity: 1;
  margin: 0.25rem 0px;
`,
);
