import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import composeClasses from '../composeClasses';
import { getOptionGroupUnstyledUtilityClass } from './optionGroupUnstyledClasses';
import { OptionGroupUnstyledProps } from './OptionGroupUnstyled.types';

function useUtilityClasses(disabled: boolean) {
  const slots = {
    root: ['root', disabled && 'disabled'],
    label: ['label'],
    list: ['list'],
  };

  return composeClasses(slots, getOptionGroupUnstyledUtilityClass, {});
}

/**
 * An unstyled option group to be used within a SelectUnstyled.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [OptionGroupUnstyled API](https://mui.com/base/api/option-group-unstyled/)
 */
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

OptionGroupUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to components.Root.
   * If both are provided, the component is used.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the OptionGroupUnstyled.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Label: PropTypes.elementType,
    List: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    label: PropTypes.object,
    list: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * If `true` all the options in the group will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The human-readable description of the group.
   */
  label: PropTypes.node,
} as any;

export default OptionGroupUnstyled;
