// @flow

import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

export default function DeletableAvatarChip() {
  return <Chip avatar={<Avatar>MB</Avatar>} label="SvgIcon Chip" onRequestDelete={() => {}} />;
}
