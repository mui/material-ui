import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import * as Icons from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { pascalCase } from './utils';

interface Props extends SvgIconProps {
  color: 'action' | 'disabled' | 'error' | 'inherit' | 'primary' | 'secondary';
  icon: string;
  theme: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  width: number | string;
  height: number;
}

export function Icon(props: Props): JSX.Element | null {
  const { height, icon: iconProp, theme, width, ...other } = props;
  const iconName = `${iconProp && pascalCase(iconProp)}${
    theme === 'Filled' ? '' : theme
  }` as keyof typeof Icons;
  const Icon = Object.keys(Icons).indexOf(iconName) !== -1 ? Icons[iconName] : undefined;

  return Icon ? <Icon style={{ width, height }} {...other} /> : null;
}

Icon.defaultProps = {
  color: 'inherit' as 'inherit',
  icon: 'add',
  theme: 'Filled' as 'Filled',
  width: 24,
  height: 24,
};

addPropertyControls(Icon, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['action', 'disabled', 'error', 'inherit', 'primary', 'secondary'],
  },
  icon: {
    type: ControlType.String,
    title: 'Icon',
  },
  theme: {
    type: ControlType.Enum,
    title: 'Theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
});
