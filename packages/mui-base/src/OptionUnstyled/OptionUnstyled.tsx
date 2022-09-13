import React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { OptionState } from '@mui/base/useListbox';
import composeClasses from '../composeClasses';
import {
  OptionUnstyledProps,
  OptionUnstyledOwnerState,
  OptionUnstyledType,
} from './OptionUnstyled.types';
import { SelectUnstyledContext } from '../SelectUnstyled/SelectUnstyledContext';
import { getOptionUnstyledUtilityClass } from './optionUnstyledClasses';
import { useSlotProps } from '../utils';

function useUtilityClasses(ownerState: OptionState) {
  const { disabled, highlighted, selected } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected'],
  };

  return composeClasses(slots, getOptionUnstyledUtilityClass, {});
}

/**
 * An unstyled option to be used within a SelectUnstyled.
 */
const OptionUnstyled = React.forwardRef(function OptionUnstyled<TValue>(
  props: OptionUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const {
    children,
    component,
    components = {},
    componentsProps = {},
    disabled,
    value,
    label,
    ...other
  } = props;

  const selectContext = React.useContext(SelectUnstyledContext);
  if (!selectContext) {
    throw new Error('OptionUnstyled must be used within a SelectUnstyled');
  }

  const Root = component || components.Root || 'li';

  const selectOption = {
    value,
    label: label || children,
    disabled,
  };

  const optionState = selectContext.getOptionState(selectOption);
  const optionProps = selectContext.getOptionProps(selectOption);
  const listboxRef = selectContext.listboxRef;

  const ownerState: OptionUnstyledOwnerState<TValue> = {
    ...props,
    ...optionState,
  };

  const optionRef = React.useRef<HTMLLIElement>(null);
  const handleRef = useForkRef(ref, optionRef);

  React.useEffect(() => {
    // Scroll to the currently highlighted option
    if (optionState.highlighted) {
      if (!listboxRef.current || !optionRef.current) {
        return;
      }
      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();

      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [optionState.highlighted, listboxRef]);

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ...optionProps,
      ref: handleRef,
    },
    className: classes.root,
    ownerState,
  });

  return <Root {...rootProps}>{children}</Root>;
}) as OptionUnstyledType;

OptionUnstyled.propTypes /* remove-proptypes */ = {
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
   * The components used for each slot inside the OptionUnstyled.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the OptionUnstyled.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
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
   * The value of the option.
   */
  value: PropTypes.any.isRequired,
} as any;

/**
 * An unstyled option to be used within a SelectUnstyled.
 *
 * Demos:
 *
 * - [Unstyled select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [OptionUnstyled API](https://mui.com/base/api/option-unstyled/)
 */
export default React.memo(OptionUnstyled) as OptionUnstyledType;
