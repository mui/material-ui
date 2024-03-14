import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';

export default function VerticalAvatarGroup() {
  return (
    <AvatarGroup sx={{ writingMode: 'vertical-rl' }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Avatar sx={{ transform: 'rotate(-90deg)' }}>+3</Avatar>
    </AvatarGroup>
  );
}
