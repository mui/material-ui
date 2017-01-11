// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { createSwitch } from '../internal/SwitchBase';
import withSwitchLabel from '../internal/withSwitchLabel';
import RadioButtonCheckedIcon from '../svg-icons/radio-button-checked';
import RadioButtonUncheckedIcon from '../svg-icons/radio-button-unchecked';

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
  defaultIcon: <RadioButtonUncheckedIcon />,
  defaultCheckedIcon: <RadioButtonCheckedIcon />,
});

Radio.displayName = 'Radio';

export default Radio;

const LabelRadio = withSwitchLabel(Radio);

export { LabelRadio };
