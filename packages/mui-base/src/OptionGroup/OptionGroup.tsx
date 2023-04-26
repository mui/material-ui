import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import composeClasses from '../composeClasses';
import { getOptionGroupUtilityClass } from './optionGroupClasses';
import {
  OptionGroupLabelSlotProps,
  OptionGroupListSlotProps,
  OptionGroupProps,
  OptionGroupRootSlotProps,
  OptionGroupTypeMap,
} from './OptionGroup.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(disabled: boolean) {
  const slots = {
    root: ['root', disabled && 'disabled'],
    label: ['label'],
    list: ['list'],
  };

  return composeClasses(slots, useClassNamesOverride(getOptionGroupUtilityClass));
}

/**
 * An unstyled option group to be used within a Select.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [OptionGroup API](https://mui.com/base/react-select/components-api/#option-group)
 */
const OptionGroup = React.forwardRef(function OptionGroup<
  BaseComponentType extends React.ElementType = OptionGroupTypeMap['defaultComponent'],
>(props: OptionGroupProps<BaseComponentType>, ref: React.ForwardedRef<HTMLLIElement>) {
  const { component, disabled = false, slotProps = {}, slots = {}, ...other } = props;

  const Root = component || slots?.root || 'li';
  const Label = slots?.label || 'span';
  const List = slots?.list || 'ul';

  const classes = useUtilityClasses(disabled);

  const rootProps: WithOptionalOwnerState<OptionGroupRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
    },
    ownerState: props,
    className: classes.root,
  });

  const labelProps: WithOptionalOwnerState<OptionGroupLabelSlotProps> = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps.label,
    ownerState: props,
    className: classes.label,
  });

  const listProps: WithOptionalOwnerState<OptionGroupListSlotProps> = useSlotProps({
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
}) as OverridableComponent<OptionGroupTypeMap>;

OptionGroup.propTypes /* remove-proptypes */ = {
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
   * The components used for each slot inside the OptionGroup.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    label: PropTypes.elementType,
    list: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
} as any;

export default OptionGroup;
