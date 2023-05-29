import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function BottomActionsCard() {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <Box>
        <Avatar src="/static/images/avatar/1.jpg" size="lg" />
        <AvatarGroup>
          <Avatar src="/static/images/avatar/2.jpg" size="sm" />
          <Avatar src="/static/images/avatar/3.jpg" size="sm" />
          <Avatar src="/static/images/avatar/4.jpg" size="sm" />
          <Avatar>+4K</Avatar>
        </AvatarGroup>
      </Box>
      <Box>
        <Typography>NYC Coders</Typography>
        <Typography>
          We are a community of developers prepping for coding interviews,
          participate, chat with others and get better at interviewing.
        </Typography>
      </Box>
      <CardActions></CardActions>
    </Card>
  );
}
