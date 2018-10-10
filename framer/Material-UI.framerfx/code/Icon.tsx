import * as React from 'react';
import { pascal } from 'naming-style';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import * as Icons from '@material-ui/icons';

interface Props {
  color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'error' | 'disabled';
  icon?: string;
  theme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'inherit',
  icon: 'add',
  theme: 'Filled',
  width: 24,
  height: 24,
};

export const Icon: React.SFC<Props> = (props: Props) => {
  const { height, icon: iconProp, theme, width, ...other } = props;
  const iconName = `${iconProp && pascal(iconProp)}${theme === 'Filled' ? '' : theme}`;
  // tslint:disable-next-line: ban-ts-ignore
  // @ts-ignore
  const Icon = Object.keys(Icons).includes(iconName) ? Icons[iconName] : undefined;

  return Icon ? <Icon style={{ width, height }} {...other} /> : null;
};

Icon.defaultProps = defaultProps;

addPropertyControls(Icon, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['inherit', 'primary', 'secondary', 'action', 'error', 'disabled'],
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
