// @flow weak

import { createStyleSheet } from 'jss-theme-reactor';
import { createSwitch } from '../internal/SwitchBase';
import withSwitchLabel from '../internal/withSwitchLabel';

export const styleSheet = createStyleSheet('Radio', (theme) => {
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

const Radio = createSwitch({
  styleSheet,
  inputType: 'radio',
  defaultIcon: 'radio_button_unchecked',
  defaultCheckedIcon: 'radio_button_checked',
});

Radio.displayName = 'Radio';

export default Radio;

const LabelRadio = withSwitchLabel(Radio);

export { LabelRadio };
