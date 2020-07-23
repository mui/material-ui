import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiFab from '@material-ui/core/Fab';
import { Icon } from './Icon';

interface Props {
  color: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled: boolean;
  href?: string;
  size: 'large' | 'medium' | 'small';
  variant: 'extended' | 'round';
  icon: string;
  iconTheme: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  label: string;
  width: number | string;
  height: number;
}

export function Fab(props: Props): JSX.Element {
  const { height, icon, label, iconTheme, variant, width, ...other } = props;
  return (
    <MuiFab variant={variant} {...other}>
      <Icon
        icon={icon}
        theme={iconTheme}
        style={variant === 'extended' ? { marginRight: 8 } : {}}
      />
      {variant === 'extended' ? label : null}
    </MuiFab>
  );
}

Fab.defaultProps = {
  color: 'default' as 'default',
  disabled: false,
  size: 'large' as 'large',
  variant: 'round' as 'round',
  icon: 'add',
  iconTheme: 'Filled' as 'Filled',
  label: 'extended',
  width: 56,
  height: 56,
};

addPropertyControls(Fab, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['default', 'inherit', 'primary', 'secondary'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  href: {
    type: ControlType.String,
    title: 'Href',
  },
  size: {
    type: ControlType.Enum,
    title: 'Size',
    options: ['large', 'medium', 'small'],
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['extended', 'round'],
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
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
