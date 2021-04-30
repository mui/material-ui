import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiChip from '@material-ui/core/Chip';
import { Icon } from './Icon';
import { Avatar } from './Avatar';

interface Props {
  clickable: boolean;
  deleteIcon: string;
  disabled: boolean;
  icon: string;
  label: string;
  avatarImageFile: string;
  avatarImageUrl: string;
  deletable: boolean;
  iconTheme: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  width: number | string;
  height: number;
}

export function Chip(props: Props): JSX.Element {
  const {
    avatarImageFile,
    avatarImageUrl,
    deletable,
    deleteIcon,
    height,
    icon,
    iconTheme,
    width,
    ...other
  } = props;

  return (
    <MuiChip
      avatar={
        avatarImageFile || avatarImageUrl ? (
          <Avatar avatarImageFile={avatarImageFile} avatarImageUrl={avatarImageUrl} />
        ) : undefined
      }
      icon={<Icon icon={icon} theme={iconTheme} />}
      onDelete={deletable ? () => {} : undefined}
      deleteIcon={deleteIcon === '' ? undefined : <Icon icon={deleteIcon} />}
      {...other}
    />
  );
}

Chip.defaultProps = {
  clickable: true,
  deleteIcon: '',
  disabled: false,
  icon: 'star',
  label: 'Chip',
  avatarImageFile: '',
  avatarImageUrl: '',
  deletable: false,
  iconTheme: 'Filled' as 'Filled',
  width: 100,
  height: 32,
};

addPropertyControls(Chip, {
  clickable: {
    type: ControlType.Boolean,
    title: 'Clickable',
  },
  deleteIcon: {
    type: ControlType.String,
    title: 'Delete icon',
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  icon: {
    type: ControlType.String,
    title: 'Icon',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
  avatarImageFile: {
    type: ControlType.Image,
    title: 'Avatar Image File',
  },
  avatarImageUrl: {
    type: ControlType.String,
    title: 'Avatar Image URL',
    hidden(props) {
      return props.avatarImageFile !== '';
    },
  },
  deletable: {
    type: ControlType.Boolean,
    title: 'Deletable',
  },
  iconTheme: {
    type: ControlType.Enum,
    title: 'Icon theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
});
