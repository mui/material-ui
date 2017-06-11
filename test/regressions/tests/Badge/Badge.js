// @flow

import React from 'react';
import Badge from 'material-ui/Badge';
import Icon from 'material-ui/Icon';

export default function SimpleBadge() {
  return (
    <Badge badgeContent={1} color="primary">
      <Icon>mail</Icon>
    </Badge>
  );
}
