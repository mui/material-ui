// @flow
// @inheritedComponent Input

import React from 'react';
import type { ChildrenArray, Element } from 'react';
import warning from 'warning';
import SelectInput from './SelectInput';
import withStyles from '../styles/withStyles';
import Input from '../Input'; // Import to enforce the CSS injection order
import { isMuiElement } from '../utils/reactHelpers';

type DefaultProps = {
  classes: Object,
  input: Element<*>,
  native: boolean,
  multiple: boolean,
};

export const styles = (theme: Object) => ({
  root: {
    position: 'relative',
  },
  select: {
    '-moz-appearance': 'none', // Remove Firefox custom style
    '-webkit-appearance': 'none', // Fix SSR issue
    appearance: 'none', // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    padding: `0 ${theme.spacing.unit * 4}px 0 0`,
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    minWidth: theme.spacing.unit * 2, // So it doesn't collapse.
    height: `calc(1em + ${theme.spacing.unit * 2 - 2}px)`,
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      background:
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: 0, // Reset Chrome style
    },
    // Remove Firefox focus border
    '&:-moz-focusring': {
      color: 'transparent',
      textShadow: '0 0 0 #000',
    },
  },
  selectMenu: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: `calc(1em + ${theme.spacing.unit * 2 - 2}px)`,
  },
  disabled: {
    cursor: 'default',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 4,
    color: theme.palette.text.secondary,
    'pointer-events': 'none', // Don't block pinter events on the select under the icon.
  },
});

export type Props = {
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: ChildrenArray<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * An `Input` element.
   */
  input?: Element<*>,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native?: boolean,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   */
  multiple?: boolean,
  /**
   * Properties applied to the `Menu` element.
   */
  MenuProps?: Object,
  /**
   * Render the selected value.
   * It's only useful when the `native` property is not set to `true`.
   */
  renderValue?: Function,
  /**
   * The input value, required for a controlled component.
   */
  value?: Array<string | number> | string | number,
};

type AllProps = DefaultProps & Props;

function Select(props: AllProps) {
  const { children, classes, input, native, multiple, MenuProps, renderValue, ...other } = props;

  // Instead of `Element<typeof Input>` to have more flexibility.
  warning(
    isMuiElement(input, ['Input']),
    [
      'Material-UI: you have provided an invalid value to the `input` property.',
      'We expect an element instance of the `Input` component.',
    ].join('\n'),
  );

  return React.cloneElement(input, {
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: SelectInput,
    ...other,
    inputProps: {
      ...input.props.inputProps,
      children,
      classes,
      native,
      multiple,
      MenuProps,
      renderValue,
    },
  });
}

Select.defaultProps = {
  input: <Input />,
  native: false,
  multiple: false,
};

Select.muiName = 'Select';

export default withStyles(styles, { name: 'MuiSelect' })(Select);
