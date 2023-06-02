import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Badge, Box } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import AvatarWithStatus from './AvatarWithStatus';

type ConversationListItemProps = ListItemButtonProps & {
  isNew?: boolean;
};

export default function ConversationListItem({
  isNew = false,
  selected = false,
}: ConversationListItemProps) {
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => alert('You clicked')}
          selected={selected}
          variant={selected ? 'soft' : 'plain'}
          color="neutral"
          sx={{
            p: 2,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" flex={1}>
              <Stack direction="row">
                {/* new icon */}
                <Box width={20} display="flex" alignItems="center">
                  {isNew && (
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

                <AvatarWithStatus online={true} src="/static/images/avatar/1.jpg" />

                <Box ml={1.5}>
                  <Typography fontSize="sm" fontWeight="lg">
                    Mabel Boyle
                  </Typography>
                  <Typography level="body2">@mabel</Typography>
                </Box>
              </Stack>
              <Typography level="body2">5 mins ago</Typography>
            </Stack>

            <Typography
              level="body2"
              pl={2.5}
              sx={{
                display: '-webkit-box',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Hey Olivia, Katherine sent me over the latest doc. I just have a quick
              question about the thing that we talked about last week. When is a good
              time?
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
