import React from 'react';
import clsx from 'clsx';
import MuiAvatar from '@material-ui/core/Avatar';
import { AVATAR } from '../../theme/core';

const Avatar = ({ className, bordered, link, small, medium, ultraLarge, ...props }) => (
  <MuiAvatar
    className={clsx(
      AVATAR.root,
      className,
      bordered && AVATAR.bordered,
      link && AVATAR.link,
      small && AVATAR.small,
      medium && AVATAR.medium,
      ultraLarge && AVATAR.ultraLarge,
    )}
    {...props}
  />
);

export default Avatar;
