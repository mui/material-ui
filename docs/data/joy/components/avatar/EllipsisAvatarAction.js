import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import IconButton from '@mui/joy/IconButton';
import SvgIcon from '@mui/joy/SvgIcon';

export default function EllipsisAvatarAction() {
  return (
    <AvatarGroup>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <IconButton
        color="neutral"
        onClick={() => alert('You clicked!')}
        sx={{
          borderRadius: '50%',
          marginInlineStart: 'var(--Avatar-marginInlineStart)',
          boxShadow: 'var(--Avatar-ring)',
        }}
      >
        <SvgIcon>
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </SvgIcon>
      </IconButton>
    </AvatarGroup>
  );
}
