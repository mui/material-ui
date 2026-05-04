import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function unreadMessagesLabel(count: number) {
  if (count === 0) {
    return 'no unread messages';
  }
  return `${count} unread message${count === 1 ? '' : 's'}`;
}

export default function BadgeVisibility() {
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible((previousInvisible) => !previousInvisible);
  };

  return (
    <Stack spacing={3} sx={{ color: 'action.active' }}>
      <Stack direction="row" spacing={4} alignItems="center">
        <Badge
          color="secondary"
          badgeContent={count}
          role="img"
          aria-label={unreadMessagesLabel(count)}
        >
          <MailIcon />
        </Badge>
        <ButtonGroup>
          <Button
            aria-label="decrease unread messages"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase unread messages"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Stack>
      <Stack direction="row" spacing={4} alignItems="center">
        <Badge
          color="secondary"
          variant="dot"
          invisible={invisible}
          role="img"
          aria-label={invisible ? 'no unread messages' : 'unread messages'}
        >
          <MailIcon />
        </Badge>
        <FormControlLabel
          sx={{ color: 'text.primary' }}
          control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
          label="Show unread status"
        />
      </Stack>
    </Stack>
  );
}
