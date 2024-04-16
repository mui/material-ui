'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { OptionProps, OptionOwnerState, OptionType, OptionRootSlotProps } from './Option.types';
import { getOptionUtilityClass } from './optionClasses';
import { WithOptionalOwnerState, useSlotProps } from '../utils';
import { useOption, useOptionContextStabilizer } from '../useOption';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { ListContext } from '../useList';

function useUtilityClasses<OptionValue>(ownerState: OptionOwnerState<OptionValue>) {
  const { disabled, highlighted, selected } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected'],
  };

  return composeClasses(slots, useClassNamesOverride(getOptionUtilityClass));
}

const InnerOption = React.memo(
  React.forwardRef(function Option<OptionValue, RootComponentType extends React.ElementType>(
    props: OptionProps<OptionValue, RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>,
  ) {
    const {
      children,
      disabled = false,
      label,
      slotProps = {},
      slots = {},
      value,
      ...other
    } = props;

    const Root = slots.root ?? 'li';

    const optionRef = React.useRef<HTMLElement>(null);
    const combinedRef = useForkRef(optionRef, forwardedRef);

    // If `label` is not explicitly provided, the `children` are used for convenience.
    // This is used to populate the select's trigger with the selected option's label.
    const computedLabel =
      label ?? (typeof children === 'string' ? children : optionRef.current?.textContent?.trim());

    const { getRootProps, selected, highlighted, index } = useOption({
      disabled,
      label: computedLabel,
      rootRef: combinedRef,
      value,
    });

    const ownerState: OptionOwnerState<OptionValue> = {
      ...props,
      disabled,
      highlighted,
      index,
      selected,
    };

    const classes = useUtilityClasses(ownerState);

    const rootProps: WithOptionalOwnerState<OptionRootSlotProps<OptionValue>> = useSlotProps({
      getSlotProps: getRootProps,
      elementType: Root,
      externalSlotProps: slotProps.root,
      externalForwardedProps: other,
      className: classes.root,
      ownerState,
    });

    return <Root {...rootProps}>{children}</Root>;
  }),
);

/**
 * An unstyled option to be used within a Select.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/)
 *
 * API:
 *
 * - [Option API](https://mui.com/base-ui/react-select/components-api/#option)
 */
const Option = React.forwardRef(function Option<OptionValue>(
  props: OptionProps<OptionValue>,
  ref: React.ForwardedRef<Element>,
) {
  const { value } = props;

  // This wrapper component is used as a performance optimization.
  // `useOptionContextStabilizer` ensures that the context value
  // is stable across renders, so that the actual Option re-renders
  // only when it needs to.
  const { contextValue } = useOptionContextStabilizer(value);

  return (
    <ListContext.Provider value={contextValue}>
      <InnerOption {...props} ref={ref} />
    </ListContext.Provider>
  );
}) as OptionType;

Option.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The value of the option.
   */
  value: PropTypes.any.isRequired,
} as any;

export { Option };
