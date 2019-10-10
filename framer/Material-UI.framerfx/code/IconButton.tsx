import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiIconButton from '@material-ui/core/IconButton';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiBadge from '@material-ui/core/Badge';
import { Icon } from './Icon';

interface Props {
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'small' | 'medium';
  icon?: string;
  iconTheme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  badgeContent?: string;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'default',
  disabled: false,
  size: 'medium',
  icon: 'favorite',
  iconTheme: 'Filled',
  badgeContent: '',
  badgeColor: 'default',
  width: 48,
  height: 48,
};

export const IconButton: React.SFC<Props> = (props: Props) => {
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
};

IconButton.defaultProps = defaultProps;

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
    options: ['small', 'medium'],
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
