import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';

export default function GroupAvatars() {
  return (
    <AvatarGroup>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Tooltip title="Foo • Bar • Baz">
        <Avatar>+3</Avatar>
      </Tooltip>
    </AvatarGroup>
  );
}
