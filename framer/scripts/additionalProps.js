import { componentSettings } from './framerConfig';

const additionalProps = (component) => {
  const templates = {
    appBarColor: {
      type: {
        name: 'enum',
        value: [
          { value: "'default'" },
          { value: "'primary'" },
          { value: "'secondary'" },
          { value: "'inherit'" },
        ],
      },
    },
    avatarImageFile: {
      type: {
        name: 'image',
        title: "'Avatar Image File'",
      },
      defaultValue: { value: componentSettings[component].propValues.avatarImageFile },
    },
    avatarImageUrl: {
      type: {
        name: 'string',
        title: "'Avatar Image URL'",
        hidden(props) {
          return props.avatarImageFile !== '';
        },
      },
      defaultValue: { value: componentSettings[component].propValues.avatarImageUrl },
    },
    badgeContent: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.badgeContent },
    },
    backgroundColor: {
      type: { name: 'color' },
      defaultValue: { value: componentSettings[component].propValues.backgroundColor },
    },
    badgeColor: {
      type: {
        name: 'enum',
        value: [
          { value: "'default'" },
          { value: "'primary'" },
          { value: "'secondary'" },
          { value: "'error'" },
        ],
      },
      defaultValue: { value: componentSettings[component].propValues.badgeColor },
    },
    checked: {
      type: { name: 'boolean' },
      description: 'Selection control default checked',
      defaultValue: { value: false },
    },
    checkedIcon: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.icon },
    },
    checkedIconTheme: {
      type: {
        name: 'enum',
        value: [
          { value: "'Filled'" },
          { value: "'Outlined'" },
          { value: "'Rounded'" },
          { value: "'TwoTone'" },
          { value: "'Sharp'" },
        ],
      },
    },
    clickable: {
      type: { name: 'boolean' },
      description: 'Chip - clickable (change default to `true`)',
      defaultValue: { value: componentSettings[component].propValues.clickable },
    },
    textColor: {
      type: { name: 'color' },
      defaultValue: { value: componentSettings[component].propValues.color },
    },
    deletable: {
      type: { name: 'boolean' },
      description: 'Chip - deletable',
      defaultValue: { value: componentSettings[component].propValues.deletable },
    },
    deleteIcon: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.deleteIcon },
      hidden(props) {
        return props.deletable === false;
      },
    },
    disabled: {
      type: { name: 'boolean' },
      defaultValue: { value: false },
    },
    elevation: {
      type: { name: 'number', min: 0, max: 24 },
      defaultValue: { value: componentSettings[component].propValues.elevation },
    },
    endIcon: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.icon },
    },
    endIconTheme: {
      type: {
        name: 'enum',
        value: [
          { value: "'Filled'" },
          { value: "'Outlined'" },
          { value: "'Rounded'" },
          { value: "'TwoTone'" },
          { value: "'Sharp'" },
        ],
      },
      defaultValue: { value: "'Filled'" },
    },
    fullWidth: {
      type: { name: 'boolean' },
      description: 'TextField - fullWidth',
      defaultValue: { value: componentSettings[component].propValues.fullWidth },
    },
    height: {
      type: { name: 'number' },
      defaultValue: { value: componentSettings[component].propValues.height },
    },
    helperText: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.helperText },
    },
    icon: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.icon },
    },
    iconTheme: {
      type: {
        name: 'enum',
        value: [
          { value: "'Filled'" },
          { value: "'Outlined'" },
          { value: "'Rounded'" },
          { value: "'TwoTone'" },
          { value: "'Sharp'" },
        ],
      },
      defaultValue: { value: "'Filled'" },
    },
    imageFile: {
      type: {
        name: 'image',
        title: "'Image File'",
        hidden(props) {
          return props.primaryAction && props.primaryAction !== 'avatar';
        },
      },
      defaultValue: { value: componentSettings[component].propValues.imageFile },
    },
    imageUrl: {
      type: {
        name: 'string',
        title: "'Image URL'",
        hidden(props) {
          return (
            props.imageFile !== '' || (props.primaryAction && props.primaryAction !== 'avatar')
          );
        },
      },
      defaultValue: { value: componentSettings[component].propValues.imageUrl },
    },
    inset: {
      type: { name: 'boolean' },
      description: 'ListItem/ListItemText - inset',
      defaultValue: { value: componentSettings[component].propValues.inset },
    },
    icons: {
      type: {
        name: 'array',
        title: "'Icons'",
        propertyControl: '{ type: ControlType.String }',
      },
      defaultValue: { value: componentSettings[component].propValues.icons },
    },
    label: {
      type: {
        name: 'string',
      },
      defaultValue: { value: componentSettings[component].propValues.label },
    },
    labels: {
      type: {
        name: 'array',
        propertyControl: '{ type: ControlType.String }',
      },
      defaultValue: { value: componentSettings[component].propValues.labels },
    },
    message: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.message },
    },
    paletteType: {
      type: { name: 'enum', value: [{ value: "'dark'" }, { value: "'light'" }] },
      description: 'Theme palette type',
      defaultValue: { value: "'light'" },
    },
    primaryAction: {
      type: {
        name: 'enum',
        value: [
          { value: "'none'" },
          { value: "'icon'" },
          { value: "'avatar'" },
          { value: "'checkbox'" },
        ],
      },
      defaultValue: { value: componentSettings[component].propValues.primaryAction },
    },
    primaryIcon: {
      type: {
        name: 'string',
        hidden(props) {
          return (
            (props.primaryAction !== 'icon' && props.primaryAction !== 'avatar') ||
            props.imageFile !== '' ||
            props.imageUrl !== ''
          );
        },
      },
      defaultValue: { value: componentSettings[component].propValues.primaryIcon },
    },
    progressValue: {
      type: {
        name: 'number',
        hidden(props) {
          return props.variant === 'indeterminate' || props.variant === 'query';
        },
      },
      defaultValue: { value: componentSettings[component].propValues.progressValue },
    },
    secondaryAction: {
      type: {
        name: 'enum',
        value: [
          { value: "'none'" },
          { value: "'iconButton'" },
          { value: "'checkbox'" },
          { value: "'switch'" },
        ],
      },
    },
    secondaryIcon: {
      type: {
        name: 'string',
        hidden(props) {
          return props.secondaryAction !== 'icon' && props.secondaryAction !== 'iconButton';
        },
      },
      defaultValue: { value: componentSettings[component].propValues.secondaryIcon },
    },
    secondaryLabel: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.secondaryLabel },
    },
    size: {
      type: { name: 'number', value: null },
      defaultValue: { value: componentSettings[component].propValues.size },
    },
    startIcon: {
      type: { name: 'string' },
      defaultValue: { value: componentSettings[component].propValues.icon },
    },
    startIconTheme: {
      type: {
        name: 'enum',
        value: [
          { value: "'Filled'" },
          { value: "'Outlined'" },
          { value: "'Rounded'" },
          { value: "'TwoTone'" },
          { value: "'Sharp'" },
        ],
      },
      defaultValue: { value: "'Filled'" },
    },
    theme: {
      type: {
        name: 'enum',
        value: [
          { value: "'Filled'" },
          { value: "'Outlined'" },
          { value: "'Rounded'" },
          { value: "'TwoTone'" },
          { value: "'Sharp'" },
        ],
      },
      description: 'Icon theme',
      defaultValue: { value: "'Filled'" },
    },
    thickness: {
      type: { name: 'number', min: 0, max: 22 },
      defaultValue: { value: componentSettings[component].propValues.thickness },
    },
    valueBuffer: {
      type: {
        name: 'number',
        hidden(props) {
          return props.variant !== 'buffer';
        },
      },
      defaultValue: { value: componentSettings[component].propValues.valueBuffer },
    },
    variant: {
      defaultValue: { value: componentSettings[component].propValues.variant },
    },
    width: {
      type: { name: 'number' },
      defaultValue: { value: componentSettings[component].propValues.width },
    },
  };

  // The props this component has default values for
  const propNames = Object.keys(componentSettings[component].propValues);

  const reducer = (additionalPropsObj, propName) => {
    const targetPropName = propName === 'progressValue' ? 'value' : propName;
    additionalPropsObj[targetPropName] = templates[propName];
    return additionalPropsObj;
  };

  return propNames.reduce(reducer, {});
};

export default additionalProps;
