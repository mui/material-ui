import * as React from 'react';
import { Badge, badgeClasses } from '@mui/base/Badge';
// Demo auxiliary components
import { styled, Stack } from '@mui/system';
import { Button, buttonClasses } from '@mui/base/Button';
import { Switch, switchClasses } from '@mui/base/Switch';
// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';

const blue = {
  500: '#007FFF',
};

const grey = {
  300: '#afb8c1',
  900: '#24292f',
};

const StyledBadge = styled(Badge)(
  ({ theme }) => `
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-self: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 14px;
  line-height: 1;

  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    white-space: nowrap;
    text-align: center;
    border-radius: 12px;
    background: ${blue[500]};
    box-shadow: 0px 4px 6x ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }

  & .${badgeClasses.invisible} {
    opacity: 0;
    pointer-events: none;
  }
  `,
);

export default function BadgeVisibility() {
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={1} useFlexGap>
      <StyledBadge badgeContent={count} invisible={invisible}>
        <MailIcon />
      </StyledBadge>
      <Stack direction="row" justifyContent="center" gap={1} useFlexGap>
        <Button
          aria-label="decrease"
          onClick={() => {
            setCount(Math.max(count - 1, 0));
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <Button
          aria-label="increase"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
        <div>
          <Switch size="sm" checked={!invisible} onChange={handleBadgeVisibility} />
        </div>
      </Stack>
    </Stack>
  );
}
