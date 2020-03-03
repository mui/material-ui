import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiButton from '@material-ui/core/Button';
import { Icon } from './Icon';

interface Props {
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled?: boolean;
  disableElevation?: boolean;
  endIcon?: string;
  fullWidth?: boolean;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  startIcon?: string;
  variant?: 'text' | 'outlined' | 'contained';
  startIconTheme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  endIconTheme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  label?: string;
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'default',
  disabled: false,
  disableElevation: false,
  endIcon: undefined,
  fullWidth: false,
  size: 'medium',
  startIcon: undefined,
  variant: 'text',
  startIconTheme: 'Filled',
  endIconTheme: 'Filled',
  label: 'Button',
  width: 100,
  height: 38,
};

export const Button: React.SFC<Props> = (props: Props) => {
  const {
    endIcon,
    endIconTheme,
    height,
    label,
    startIcon,
    startIconTheme,
    variant,
    width,
    ...other
  } = props;

  const StartIcon = startIcon === '' ? undefined : <Icon icon={startIcon} theme={startIconTheme} />;
  const EndIcon = endIcon === '' ? undefined : <Icon icon={endIcon} theme={endIconTheme} />;

  return (
    <div>
      <MuiButton variant={variant} startIcon={StartIcon} endIcon={EndIcon} {...other}>
        {label}
      </MuiButton>
    </div>
  );
};

Button.defaultProps = defaultProps;

addPropertyControls(Button, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['default', 'inherit', 'primary', 'secondary'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  disableElevation: {
    type: ControlType.Boolean,
    title: 'Disable elevation',
  },
  endIcon: {
    type: ControlType.String,
    title: 'End icon',
  },
  fullWidth: {
    type: ControlType.Boolean,
    title: 'Full width',
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
  startIcon: {
    type: ControlType.String,
    title: 'Start icon',
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['text', 'outlined', 'contained'],
  },
  startIconTheme: {
    type: ControlType.Enum,
    title: 'Start icon theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
  endIconTheme: {
    type: ControlType.Enum,
    title: 'End icon theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
