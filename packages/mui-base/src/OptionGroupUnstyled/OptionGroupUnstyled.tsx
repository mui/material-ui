import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import composeClasses from '../composeClasses';
import { getOptionGroupUnstyledUtilityClass } from './optionGroupUnstyledClasses';
import {
  OptionGroupUnstyledLabelSlotProps,
  OptionGroupUnstyledListSlotProps,
  OptionGroupUnstyledProps,
  OptionGroupUnstyledRootSlotProps,
  OptionGroupUnstyledTypeMap,
} from './OptionGroupUnstyled.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';

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
 * - [Unstyled Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [OptionGroupUnstyled API](https://mui.com/base/api/option-group-unstyled/)
 */
const OptionGroupUnstyled = React.forwardRef(function OptionGroupUnstyled<
  BaseComponentType extends React.ElementType = OptionGroupUnstyledTypeMap['defaultComponent'],
>(props: OptionGroupUnstyledProps<BaseComponentType>, ref: React.ForwardedRef<HTMLLIElement>) {
  const {
    component,
    disabled = false,
    slotProps = {},
    slots = { root: 'li', label: 'span', list: 'ul' },
    ...other
  } = props;

  const Root = component || slots.root!;
  const Label = slots.label!;
  const List = slots.list!;

  const classes = useUtilityClasses(disabled);

  const rootProps: WithOptionalOwnerState<OptionGroupUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
    },
    ownerState: props,
    className: classes.root,
  });

  const labelProps: WithOptionalOwnerState<OptionGroupUnstyledLabelSlotProps> = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps.label,
    ownerState: props,
    className: classes.label,
  });

  const listProps: WithOptionalOwnerState<OptionGroupUnstyledListSlotProps> = useSlotProps({
    elementType: List,
    externalSlotProps: slotProps.list,
    ownerState: props,
    className: classes.list,
  });

  return (
    <Root {...rootProps}>
      <Label {...labelProps}>{props.label}</Label>
      <List {...listProps}>{props.children}</List>
    </Root>
  );
}) as OverridableComponent<OptionGroupUnstyledTypeMap>;

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true` all the options in the group will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The human-readable description of the group.
   */
  label: PropTypes.node,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the OptionGroupUnstyled.
   * Either a string to use a HTML element or a component.
   * @default { root: 'li', label: 'span', list: 'ul' }
   */
  slots: PropTypes.shape({
    label: PropTypes.elementType,
    list: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
} as any;

export default OptionGroupUnstyled;
