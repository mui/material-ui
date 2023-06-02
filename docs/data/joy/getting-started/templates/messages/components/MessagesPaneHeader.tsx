import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Badge, Chip, IconButton } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import CheckIcon from '@mui/icons-material/Check';

export default function MessagesPaneHeader() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
      px={3}
      py={2.5}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Badge
          color="success"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<CheckIcon fontSize="small" />}
        >
          <Avatar size="lg" src="/static/images/avatar/1.jpg" />
        </Badge>
        <div>
          <Typography
            fontWeight="lg"
            fontSize="lg"
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                startDecorator={<Badge size="sm" />}
              >
                Online
              </Chip>
            }
          >
            Katherine Moss
          </Typography>

          <Typography level="body2">@kathy</Typography>
        </div>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <Button
          startDecorator={<i data-feather="phone-call" />}
          color="neutral"
          variant="outlined"
        >
          Call
        </Button>
        <Button>View profile</Button>
        <IconButton variant="plain" color="neutral">
          <i data-feather="more-vertical" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
