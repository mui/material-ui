import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { SelectUnstyledContext } from '@mui/base/SelectUnstyled';
import ListItemButton from '../ListItemButton/ListItemButton';
import { styled, useThemeProps } from '../styles';
import { OptionProps, ExtendOption, OptionTypeMap } from './OptionProps';
import { getOptionUtilityClass } from './optionClasses';
import RowListContext from '../List/RowListContext';

const useUtilityClasses = (ownerState: OptionProps) => {
  const { color, disabled, highlighted, selected, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      highlighted && 'highlighted',
      selected && 'selected',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
  };

  return composeClasses(slots, getOptionUtilityClass, {});
};

const OptionRoot = styled(ListItemButton, {
  name: 'JoyOption',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{
  ownerState: OptionProps & { row: boolean; 'data-first-child'?: string };
}>({});

const Option = React.forwardRef(function Option(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyOption',
  });

  const row = React.useContext(RowListContext);

  const { children, disabled, value, label, ...other } = props;

  const selectContext = React.useContext(SelectUnstyledContext);
  if (!selectContext) {
    throw new Error('OptionUnstyled must be used within a SelectUnstyled');
  }

  const selectOption = {
    value,
    label: label || children,
    disabled,
  };

  const optionState = selectContext.getOptionState(selectOption);
  const optionProps = selectContext.getOptionProps(selectOption);
  const listboxRef = selectContext.listboxRef;

  const ownerState = {
    ...props,
    ...optionState,
    row,
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
    elementType: OptionRoot,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      ...optionProps,
      ref: handleRef,
    },
    className: classes.root,
    ownerState,
  });

  return <OptionRoot {...rootProps}>{children}</OptionRoot>;
}) as ExtendOption<OptionTypeMap>;

Option.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The empty space on the side(s) of the separator.
   */
  inset: PropTypes.oneOf(['gutter', 'leftGutter', 'startAdornment']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Option;
