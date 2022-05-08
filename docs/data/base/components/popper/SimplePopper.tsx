import * as React from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled, Theme } from '@mui/system';

const StyledPopperDiv = styled('div')(
  ({ theme }: { theme: Theme }) => `
  padding: 0.5rem;
  border: 1px solid;
  background-color: ${theme.palette.mode === 'dark' ? '#121212' : '#fff'};
  opacity: 1;
  margin: 0.25rem 0px;
`,
);

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <PopperUnstyled id={id} open={open} anchorEl={anchorEl}>
        <StyledPopperDiv>The content of the Popper.</StyledPopperDiv>
      </PopperUnstyled>
    </div>
  );
}
