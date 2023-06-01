import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Badge, Chip, IconButton, Input } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';

type ConversationListItemProps = ListItemButtonProps & {};

export default function ConversationListItem({
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
        >
          <Badge size="sm" />
          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
            <Badge
              color="success"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar size="sm" src="/static/images/avatar/1.jpg" />
            </Badge>
          </ListItemDecorator>
          <div>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <div>
                <Typography fontSize="sm">Mabel Boyle</Typography>
                <Typography fontSize="sm">@mabel</Typography>
              </div>
              <Typography fontSize="sm">5 mins ago</Typography>
            </Stack>
            <Typography fontSize="sm">
              Hey Olivia, Katherine sent me over the latest doc. I just have a quick
              question about the...
            </Typography>
          </div>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
