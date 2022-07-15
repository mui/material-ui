import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';

export default function OverlapAvatarGroup() {
  return (
    <AvatarGroup sx={{ flexDirection: 'row-reverse' }}>
      <Avatar>+3</Avatar>
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </AvatarGroup>
  );
}
