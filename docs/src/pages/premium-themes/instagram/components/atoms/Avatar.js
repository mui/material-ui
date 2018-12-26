import React from 'react';
import cx from 'classnames';
import MuiAvatar from '@material-ui/core/Avatar';
import { AVATAR } from '../../theme/core';

const Avatar = ({ className, small, ultraLarge, ...props }) => (
  <MuiAvatar
    src={'http://i.pravatar.cc/300'}
    className={cx(AVATAR.root, className, small && AVATAR.small, ultraLarge && AVATAR.ultraLarge)}
    {...props}
  />
);

export default Avatar;
