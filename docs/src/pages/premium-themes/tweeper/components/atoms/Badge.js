import React from 'react';
import cx from 'classnames';
import MuiBadge from '@material-ui/core/Badge';
import { BADGE } from '../../theme/core';

const Badge = ({ className, dotted, number, children, ...props }) => (
  <MuiBadge
    className={cx(BADGE.root, className, dotted && BADGE.dotted, number && BADGE.number)}
    classes={{
      badge: BADGE.badge,
    }}
    {...props}
  >
    {children}
  </MuiBadge>
);

export default Badge;
