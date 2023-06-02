import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import ConversationListItem from './ConversationListItem';

export default function ConversationsPane() {
  return (
    <Sheet
      sx={{
        // backgroundColor: 'background.body',
        // backgroundColor: 'blue',
        borderRight: '1px solid',
        borderColor: 'divider',
        height: '100dvh',
        overflowY: 'auto',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        // sx={{ backgroundColor: 'pink' }}
        py={3}
        px={2.5}
      >
        <Typography
          level="h1"
          fontSize="xl2"
          endDecorator={
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{
                '--Chip-radius': '6px',
              }}
            >
              40
            </Chip>
          }
        >
          Messages
        </Typography>

        <IconButton variant="outlined" aria-label="edit" color="neutral">
          <i data-feather="edit" />
        </IconButton>
      </Stack>
      <Box
        // sx={{ backgroundColor: 'red' }}
        px={2}
        pb={1.5}
      >
        <Input
          startDecorator={<i data-feather="search" />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      {/* <Typography>conversations list</Typography> */}
      <List
        sx={{
          // bgcolor: 'background.body',
          minWidth: '100%',
          '--ListItemDecorator-size': '48px',
          '--ListItem-paddingLeft': '1.5rem',
          '--ListItem-paddingRight': '1rem',
          py: 0,
        }}
      >
        <ConversationListItem selected isNew />
        <ConversationListItem />
        <ConversationListItem isNew />
        <ConversationListItem />
        <ConversationListItem />
        <ConversationListItem isNew />
        <ConversationListItem />
        <ConversationListItem />
        <ConversationListItem />
      </List>
    </Sheet>
  );
}
