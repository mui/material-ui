import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Chip, IconButton } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import CircleIcon from '@mui/icons-material/Circle';
import { UserProps } from './MyMessages';

type MessagesPaneHeaderProps = UserProps & {};

export default function MessagesPaneHeader({ sender }: MessagesPaneHeaderProps) {
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
        <Avatar size="lg" src={sender.avatar} />

        <div>
          <Typography
            fontWeight="lg"
            fontSize="lg"
            endDecorator={
              sender.online ? (
                <Chip
                  variant="outlined"
                  size="sm"
                  color="neutral"
                  sx={{
                    '--Chip-radius': '6px',
                  }}
                  startDecorator={
                    <CircleIcon sx={{ fontSize: 8 }} color="success" />
                  }
                >
                  Online
                </Chip>
              ) : undefined
            }
          >
            {sender.name}
          </Typography>

          <Typography level="body2">{sender.username}</Typography>
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
