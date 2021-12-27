import clsx from 'clsx';
import React from 'react';
import composeClasses from '../composeClasses';
import { getOptionGroupUnstyledUtilityClass } from './optionGroupUnstyledClasses';
import OptionGroupUnstyledProps from './OptionGroupUnstyledProps';

function useUtilityClasses(disabled: boolean) {
  const slots = {
    root: ['root', disabled && 'disabled'],
    label: ['label'],
    list: ['list'],
  };

  return composeClasses(slots, getOptionGroupUnstyledUtilityClass, {});
}

const OptionGroupUnstyled = React.forwardRef(function OptionGroupUnstyled(
  props: OptionGroupUnstyledProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const {
    className,
    component,
    components = {},
    disabled = false,
    componentsProps = {},
    ...other
  } = props;

  const Root = component || components?.Root || 'li';
  const Label = components?.Label || 'span';
  const List = components?.List || 'ul';

  const classes = useUtilityClasses(disabled);

  const rootProps = {
    ...other,
    ref,
    ...componentsProps.root,
    className: clsx(classes.root, className, componentsProps.root?.className),
  };

  const labelProps = {
    ...componentsProps.label,
    className: clsx(classes.label, componentsProps.label?.className),
  };

  const listProps = {
    ...componentsProps.list,
    className: clsx(classes.list, componentsProps.list?.className),
  };

  return (
    <Root {...rootProps}>
      <Label {...labelProps}>{props.label}</Label>
      <List {...listProps}>{props.children}</List>
    </Root>
  );
});

export default OptionGroupUnstyled;
