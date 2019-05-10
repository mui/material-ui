import React from 'react';
import clsx from 'clsx';
import MuiBadge from '@material-ui/core/Badge';
import { BADGE } from '../../theme/core';

const Badge = ({ className, dotted, number, ...props }) => (
  <MuiBadge
    className={clsx(BADGE.root, className, dotted && BADGE.dotted, number && BADGE.number)}
    classes={{
      badge: BADGE.badge,
    }}
    {...props}
  />
);

export default Badge;
