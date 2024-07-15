import * as React from 'react';
import { Badge as BaseBadge, badgeClasses } from '@mui/base/Badge';
// Auxiliary demo components
import { styled, Stack } from '@mui/system';
import { Button, buttonClasses } from '@mui/base/Button';
import { Switch, switchClasses } from '@mui/base/Switch';
import Divider from '@mui/material/Divider';
// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';

const blue = {
  200: '#99CCF3',
  500: '#007FFF',
};

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

const Badge = styled(BaseBadge)(
  ({ theme }) => `
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-self: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'IBM Plex Sans', sans-serif;
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

const StyledButton = styled(Button)(
  ({ theme }) => `
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: all 150ms ease;
  background-color: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
  }

  &.${buttonClasses.active} {
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 4px rgba(0, 127, 255, 0.5);
    outline: none;
  }
  `,
);

const Root = styled('span')(
  ({ theme }) => `
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  cursor: pointer;


  & .${switchClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    border-radius: 16px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchClasses.thumb} {
    position: relative;
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  }

  &.${switchClasses.focusVisible} .${switchClasses.track} {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? grey[700] : blue[200]};
  }

  &.${switchClasses.checked} {
    .${switchClasses.thumb} {
      left: 15px;
      top: 3px;
      background-color: #fff;
    }

    .${switchClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);

const StyledLabel = styled('label')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  `,
);

export default function BadgeVisibility() {
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      useFlexGap
      sx={{ justifyContent: 'center' }}
    >
      <Badge badgeContent={count} invisible={invisible}>
        <MailIcon />
      </Badge>
      <Divider sx={{ my: 2 }} />
      <Stack
        direction="row"
        useFlexGap
        sx={{ justifyContent: 'center', alignItems: 'center', gap: 1 }}
      >
        <StyledButton
          aria-label="decrease"
          onClick={() => {
            setCount(Math.max(count - 1, 0));
          }}
        >
          <RemoveIcon fontSize="small" color="primary" />
        </StyledButton>
        <StyledButton
          aria-label="increase"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          <AddIcon fontSize="small" color="primary" />
        </StyledButton>
        <Divider orientation="vertical" />
        <Stack direction="row" spacing={1} useFlexGap>
          <StyledLabel>Show badge</StyledLabel>
          <Switch
            slots={{
              root: Root,
            }}
            checked={!invisible}
            onChange={handleBadgeVisibility}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
