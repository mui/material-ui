import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';

type AvatarWithStatusProps = AvatarProps & {
  online?: boolean;
};

export default function AvatarWithStatus({
  online = false,
  ...rest
}: AvatarWithStatusProps) {
  return (
    <div>
      <Badge
        color={online ? 'success' : 'neutral'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeInset="6px 6px"
      >
        <Avatar {...rest} />
      </Badge>
    </div>
  );
}
