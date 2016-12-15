// @flow weak

import { createStyleSheet } from 'jss-theme-reactor';
import { createSwitch } from '../internal/SwitchBase';
import withSwitchLabel from '../internal/withSwitchLabel';

export const styleSheet = createStyleSheet('Checkbox', (theme) => {
  return {
    default: {
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
    disabled: {
      color: theme.palette.action.disabled,
    },
  };
});

const Checkbox = createSwitch({ styleSheet });

Checkbox.displayName = 'Checkbox';

export default Checkbox;

const LabelCheckbox = withSwitchLabel(Checkbox);

export { LabelCheckbox };
