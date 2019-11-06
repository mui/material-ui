import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiFab from '@material-ui/core/Fab';
import { Icon } from './Icon';

interface Props {
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled?: boolean;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'round' | 'extended';
  icon?: string;
  iconTheme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  label?: string;
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'default',
  disabled: false,
  size: 'large',
  variant: 'round',
  icon: 'add',
  iconTheme: 'Filled',
  label: 'extended',
  width: 56,
  height: 56,
};

export const Fab: React.SFC<Props> = (props: Props) => {
  const { height, icon, label, iconTheme, variant, width, ...other } = props;
  return (
    <MuiFab variant={variant} {...other}>
      <Icon
        icon={icon}
        theme={iconTheme}
        // tslint:disable-next-line: ban-ts-ignore
        // @ts-ignore
        style={variant === 'extended' ? { marginRight: 8 } : {}}
      />
      {variant === 'extended' ? label : null}
    </MuiFab>
  );
};

Fab.defaultProps = defaultProps;

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
    options: ['small', 'medium', 'large'],
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['round', 'extended'],
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
