import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiListItem from '@material-ui/core/ListItem';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiListItemAvatar from '@material-ui/core/ListItemAvatar';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiListItemText from '@material-ui/core/ListItemText';
import { Avatar } from './Avatar';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiCheckbox from '@material-ui/core/Checkbox';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiSwitch from '@material-ui/core/Switch';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

interface Props {
  alignItems?: 'flex-start' | 'center';
  autoFocus?: boolean;
  button?: boolean;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  selected?: boolean;
  width?: number;
  height?: number;
  inset?: boolean;
  label?: string;
  secondaryLabel?: string;
  primaryAction?: 'none' | 'icon' | 'avatar' | 'checkbox';
  primaryIcon?: string;
  imageFile?: string;
  imageUrl?: string;
  secondaryAction?: 'none' | 'iconButton' | 'checkbox' | 'switch';
  secondaryIcon?: string;
}

const defaultProps: Props = {
  alignItems: 'center',
  autoFocus: false,
  button: false,
  dense: false,
  disabled: false,
  disableGutters: false,
  divider: false,
  selected: false,
  width: 568,
  height: 48,
  inset: false,
  label: 'Primary label',
  secondaryLabel: '',
  primaryAction: 'icon',
  primaryIcon: 'star',
  imageFile: '',
  imageUrl: '',
  secondaryIcon: '',
};

export const ListItem: React.SFC<Props> = (props: Props) => {
  const {
    height,
    imageFile,
    imageUrl,
    inset,
    label,
    primaryAction,
    primaryIcon,
    secondaryAction,
    secondaryIcon,
    secondaryLabel,
    width,
    ...other
  } = props;

  let primary = null;
  let secondary = null;

  switch (primaryAction) {
    case 'icon':
      primary = (
        <MuiListItemIcon>
          <Icon icon={primaryIcon} />
        </MuiListItemIcon>
      );
      break;
    case 'avatar':
      primary = (
        <MuiListItemAvatar>
          <Avatar icon={primaryIcon} imageFile={imageFile} imageUrl={imageUrl} />
        </MuiListItemAvatar>
      );
      break;
    case 'checkbox':
      primary = (
        <MuiListItemIcon>
          <MuiCheckbox edge="start" />
        </MuiListItemIcon>
      );
      break;
  }

  switch (secondaryAction) {
    case 'iconButton':
      secondary = <IconButton icon={secondaryIcon} edge="end" />;
      break;
    case 'checkbox':
      secondary = <MuiCheckbox edge="end" />;
      break;
    case 'switch':
      secondary = <MuiSwitch edge="end" />;
      break;
  }

  return (
    <MuiListItem {...other}>
      {primary}
      <MuiListItemText
        inset={inset}
        primary={label}
        secondary={secondaryLabel ? secondaryLabel : undefined}
      />
      {/* MuiListItemSecondaryAction causes the text to have a bullet. No idea why! */}
      {/* <MuiListItemSecondaryAction> */}
      {secondary}
      {/* </MuiListItemSecondaryAction> */}
    </MuiListItem>
  );
};

ListItem.defaultProps = defaultProps;

addPropertyControls(ListItem, {
  alignItems: {
    type: ControlType.Enum,
    title: 'Align items',
    options: ['flex-start', 'center'],
  },
  autoFocus: {
    type: ControlType.Boolean,
    title: 'Auto focus',
  },
  button: {
    type: ControlType.Boolean,
    title: 'Button',
  },
  dense: {
    type: ControlType.Boolean,
    title: 'Dense',
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  disableGutters: {
    type: ControlType.Boolean,
    title: 'Disable gutters',
  },
  divider: {
    type: ControlType.Boolean,
    title: 'Divider',
  },
  selected: {
    type: ControlType.Boolean,
    title: 'Selected',
  },
  inset: {
    type: ControlType.Boolean,
    title: 'Inset',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
  secondaryLabel: {
    type: ControlType.String,
    title: 'Secondary label',
  },
  primaryAction: {
    type: ControlType.Enum,
    title: 'Primary action',
    options: ['none', 'icon', 'avatar', 'checkbox'],
  },
  primaryIcon: {
    type: ControlType.String,
    title: 'Primary icon',
    hidden: function hidden(props) {
      return (
        (props.primaryAction !== 'icon' && props.primaryAction !== 'avatar') ||
        props.imageFile !== '' ||
        props.imageUrl !== ''
      );
    },
  },
  imageFile: {
    type: ControlType.Image,
    title: 'Image File',
    hidden: function hidden(props) {
      return props.primaryAction && props.primaryAction !== 'avatar';
    },
  },
  imageUrl: {
    type: ControlType.String,
    title: 'Image URL',
    hidden: function hidden(props) {
      return props.imageFile !== '' || (props.primaryAction && props.primaryAction !== 'avatar');
    },
  },
  secondaryAction: {
    type: ControlType.Enum,
    title: 'Secondary action',
    options: ['none', 'iconButton', 'checkbox', 'switch'],
  },
  secondaryIcon: {
    type: ControlType.String,
    title: 'Secondary icon',
    hidden: function hidden(props) {
      return props.secondaryAction !== 'icon' && props.secondaryAction !== 'iconButton';
    },
  },
});
