import React from 'react';
import clsx from 'clsx';
import MuiBadge from '@material-ui/core/Badge';
import { BADGE } from '../../theme/core';

const Badge = ({ className, dotted, ...props }) => (
  <MuiBadge className={clsx(BADGE.root, className, dotted && BADGE.dotted)} {...props} />
);

export default Badge;
