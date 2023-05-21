import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Badge, { badgeClasses } from '@mui/base/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function BadgeVisibility() {
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: 2,
        },
        [`& .${badgeClasses.root}`]: {
          marginRight: 4,
        },
      }}
    >
      <div>
        <StyledBadge badgeContent={count}>
          <MailIcon />
        </StyledBadge>
        <ButtonGroup>
          <Button
            aria-label="reduce"
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
        </ButtonGroup>
      </div>
      <div>
        <StyledBadge badgeContent={count} invisible={invisible}>
          <MailIcon />
        </StyledBadge>
        <FormControlLabel
          sx={{ color: 'text.primary' }}
          control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
          label="Show Badge"
        />
      </div>
    </Box>
  );
}
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
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
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
