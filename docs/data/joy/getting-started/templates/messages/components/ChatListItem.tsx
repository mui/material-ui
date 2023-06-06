import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import AvatarWithStatus from './AvatarWithStatus';
import { ChatProps } from './MyMessages';

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  sender: any;
  messages: any;
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

export default function ChatListItem({
  unread = false,
  id,
  sender,
  messages,
  selectedChatId,
  setSelectedChat,
}: ChatListItemProps) {
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => setSelectedChat({ id, sender, messages })}
          selected={selected}
          variant={selected ? 'soft' : 'plain'}
          color="neutral"
          sx={{
            p: 2,
          }}
        >
          <Stack spacing={2} flex={1}>
            <Stack direction="row" justifyContent="space-between" flex={1}>
              <Stack direction="row">
                {/* new icon */}
                <Box width={20} display="flex" alignItems="center">
                  {messages[0].unread && (
                    <Sheet
                      color="primary"
                      variant="solid"
                      sx={{
                        height: 8,
                        width: 8,
                        borderRadius: 4,
                      }}
                    />
                  )}
                </Box>

                <AvatarWithStatus online={sender.online} src={sender.avatar} />

                <Box ml={1.5}>
                  <Typography fontSize="sm" fontWeight="lg">
                    {sender.name}
                  </Typography>
                  <Typography level="body2">{sender.username}</Typography>
                </Box>
              </Stack>
              <Typography level="body2">5 mins ago</Typography>
            </Stack>

            <Typography
              level="body2"
              pl={2.5}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {messages[0].content}
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
