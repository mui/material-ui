import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiBadge from '@material-ui/core/Badge';
import { Icon } from './Icon';

interface Props {
  badgeContent?: string;
  max?: number;
  showZero?: boolean;
  variant?: 'dot' | 'standard';
  icon?: string;
  theme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  badgeContent: '8',
  max: 99,
  showZero: false,
  variant: 'standard',
  icon: '',
  theme: 'Filled',
  badgeColor: 'primary',
  width: 22,
  height: 22,
};

const style: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Badge: React.SFC<Props> = (props: Props) => {
  const { badgeColor: color, badgeContent, icon, theme, width, height, ...other } = props;
  const content =
    icon === '' ? (
      badgeContent
    ) : (
      // @ts-ignore
      <Icon icon={icon} theme={theme} style={{ width: '75%', height: '75%' }} />
    );

  return <MuiBadge badgeContent={content} color={color} style={style} {...other} />;
};

Badge.defaultProps = defaultProps;

addPropertyControls(Badge, {
  badgeContent: {
    type: ControlType.String,
    title: 'Badge content',
  },
  max: {
    type: ControlType.Number,
    title: 'Max',
  },
  showZero: {
    type: ControlType.Boolean,
    title: 'Show zero',
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['dot', 'standard'],
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
  badgeColor: {
    type: ControlType.Enum,
    title: 'Badge color',
    options: ['default', 'primary', 'secondary', 'error'],
  },
});
