import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiChip from '@material-ui/core/Chip';
import { Icon } from './Icon';
import { Avatar } from './Avatar';

interface Props {
  clickable?: boolean;
  color?: 'default' | 'primary' | 'secondary';
  deleteIcon?: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
  size?: 'small' | 'medium';
  variant?: 'default' | 'outlined';
  avatarImageFile?: string;
  avatarImageUrl?: string;
  deletable?: boolean;
  iconTheme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  clickable: true,
  color: 'default',
  deleteIcon: '',
  disabled: false,
  icon: 'star',
  label: 'Chip',
  size: 'medium',
  variant: 'default',
  avatarImageFile: '',
  avatarImageUrl: '',
  deletable: false,
  iconTheme: 'Filled',
  width: 100,
  height: 32,
};

export const Chip: React.SFC<Props> = (props: Props) => {
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
          <Avatar imageFile={avatarImageFile} imageUrl={avatarImageUrl} />
        ) : undefined
      }
      icon={<Icon icon={icon} theme={iconTheme} />}
      onDelete={deletable ? () => {} : undefined}
      deleteIcon={deleteIcon === '' ? undefined : <Icon icon={deleteIcon} />}
      {...other}
    />
  );
};

Chip.defaultProps = defaultProps;

addPropertyControls(Chip, {
  clickable: {
    type: ControlType.Boolean,
    title: 'Clickable',
  },
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['default', 'primary', 'secondary'],
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
  size: {
    type: ControlType.Enum,
    title: 'Size',
    options: ['small', 'medium'],
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['default', 'outlined'],
  },
  avatarImageFile: {
    type: ControlType.Image,
    title: 'Avatar Image File',
  },
  avatarImageUrl: {
    type: ControlType.String,
    title: 'Avatar Image URL',
    hidden: function hidden(props) {
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
