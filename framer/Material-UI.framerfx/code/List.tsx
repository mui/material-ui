import * as React from 'react';
import { addPropertyControls, ControlType, Frame, Scroll } from 'framer';
import { ListItem } from './ListItem';

interface Props {
  alignItems?: 'flex-start' | 'center';
  autoFocus?: boolean;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  width?: number;
  height?: number;
  inset?: boolean;
  labels?: string[];
  secondaryLabels?: string[];
  primaryAction?: 'none' | 'icon' | 'avatar' | 'checkbox';
  primaryIcon?: string;
  imageFile?: string;
  imageUrl?: string;
  secondaryAction?: 'none' | 'icon' | 'iconButton' | 'checkbox' | 'switch';
  secondaryIcon?: string;
}

const defaultProps: Props = {
  alignItems: 'center',
  autoFocus: false,
  dense: false,
  disabled: false,
  disableGutters: false,
  divider: false,
  width: 568,
  height: 300,
  inset: false,
  labels: ['Brunch this weekend?', 'Summer BBQ', 'Oui Oui'],
  secondaryLabels: [
    "I'll be in your neighborhood doing errands this…",
    "Wish I could come, but I'm out of town this…",
    'Do you have Paris recommendations? Have you ever…',
  ],
  primaryAction: 'icon',
  primaryIcon: 'star',
  imageFile: '',
  imageUrl: '',
  secondaryIcon: '',
};

export const List: React.SFC<Props> = (props: Props) => {
  const { height, labels, secondaryLabels, width, ...other } = props;

  return (
    <Scroll width={width} height={height}>
      <Frame background="white" height="100%">
        {labels.map((label, index) => (
          <ListItem key={label} label={label} secondaryLabel={secondaryLabels[index]} {...other} />
        ))}
      </Frame>
    </Scroll>
  );

  return <ListItem {...other} />;
};

List.defaultProps = defaultProps;

addPropertyControls(List, {
  alignItems: {
    type: ControlType.Enum,
    title: 'Align items',
    options: ['flex-start', 'center'],
  },
  autoFocus: {
    type: ControlType.Boolean,
    title: 'Auto focus',
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
  inset: {
    type: ControlType.Boolean,
    title: 'Inset',
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
    options: ['none', 'icon', 'iconButton', 'checkbox', 'switch'],
  },
  secondaryIcon: {
    type: ControlType.String,
    title: 'Secondary icon',
    hidden: function hidden(props) {
      return props.secondaryAction !== 'icon' && props.secondaryAction !== 'iconButton';
    },
  },
  labels: {
    type: ControlType.Array,
    title: 'Labels',
    propertyControl: { type: ControlType.String },
  },
  secondaryLabels: {
    type: ControlType.Array,
    title: 'Secondary labels',
    propertyControl: { type: ControlType.String },
  },
});
