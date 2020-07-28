import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton';
import MuiBadge from '@material-ui/core/Badge';
import { Icon } from './Icon';

interface Props extends MuiIconButtonProps {
  color: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled: boolean;
  size: 'medium' | 'small';
  icon: string;
  iconTheme: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  badgeContent: string;
  badgeColor: 'default' | 'primary' | 'secondary' | 'error';
  width: number | string;
  height: number;
}

export function IconButton(props: Props): JSX.Element {
  const { badgeColor, badgeContent, height, icon, iconTheme, width, ...other } = props;
  const IconBadge =
    badgeContent === '' ? (
      <Icon icon={icon} theme={iconTheme} />
    ) : (
      <MuiBadge badgeContent={badgeContent} color={badgeColor}>
        <Icon icon={icon} theme={iconTheme} />
      </MuiBadge>
    );

  return <MuiIconButton {...other}>{IconBadge}</MuiIconButton>;
}

IconButton.defaultProps = {
  color: 'default' as 'default',
  disabled: false,
  size: 'medium' as 'medium',
  icon: 'favorite',
  iconTheme: 'Filled' as 'Filled',
  badgeContent: '',
  badgeColor: 'default' as 'default',
  width: 48,
  height: 48,
};

addPropertyControls(IconButton, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['default', 'inherit', 'primary', 'secondary'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  size: {
    type: ControlType.Enum,
    title: 'Size',
    options: ['medium', 'small'],
  },
  icon: {
    type: ControlType.String,
    title: 'Icon',
  },
  iconTheme: {
    type: ControlType.Enum,
    title: 'Icon theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
  badgeContent: {
    type: ControlType.String,
    title: 'Badge content',
  },
  badgeColor: {
    type: ControlType.Enum,
    title: 'Badge color',
    options: ['default', 'primary', 'secondary', 'error'],
  },
});
