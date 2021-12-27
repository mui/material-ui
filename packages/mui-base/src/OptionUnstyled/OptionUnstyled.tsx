import clsx from 'clsx';
import React from 'react';
import { OptionState } from '../ListboxUnstyled';
import composeClasses from '../composeClasses';
import OptionUnstyledProps from './OptionUnstyledProps';
import { SelectUnstyledContext } from '../SelectUnstyled/SelectUnstyledContext';
import { getOptionUnstyledUtilityClass } from './optionUnstyledClasses';
import appendOwnerState from '../utils/appendOwnerState';
import { OptionContext } from './OptionContext';

function useUtilityClasses(ownerState: OptionState) {
  const { disabled, highlighted, selected } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected'],
  };

  return composeClasses(slots, getOptionUnstyledUtilityClass, {});
}

const OptionUnstyled = React.forwardRef(function OptionUnstyled<TValue>(
  props: OptionUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const {
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled,
    value,
    ...other
  } = props;

  const selectContext = React.useContext(SelectUnstyledContext);
  if (!selectContext) {
    throw new Error('Option must be used within a SelectUnstyled');
  }

  const Root = component || components.Root || 'li';

  const selectOption = {
    value,
    label: children,
    disabled,
  };

  const optionState = selectContext.getOptionState(selectOption);
  const optionProps = selectContext.getOptionProps(selectOption);

  const ownerState = {
    ...props,
    ...optionState,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ref,
      ...optionProps,
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  return (
    <OptionContext.Provider value={optionState}>
      <Root {...rootProps}>{children}</Root>
    </OptionContext.Provider>
  );
});

export default OptionUnstyled;
