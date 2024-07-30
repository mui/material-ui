'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_useControlled as useControlled,
  unstable_useId as useId,
} from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { styled, useThemeProps } from '../styles';
import { getRadioGroupUtilityClass } from './radioGroupClasses';
import { RadioGroupOwnerState, RadioGroupTypeMap } from './RadioGroupProps';
import RadioGroupContext from './RadioGroupContext';
import FormControlContext from '../FormControl/FormControlContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: RadioGroupOwnerState) => {
  const { orientation, size, variant, color } = ownerState;
  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getRadioGroupUtilityClass, {});
};

const RadioGroupRoot = styled('div', {
  name: 'JoyRadioGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: RadioGroupOwnerState }>(({ ownerState, theme }) => ({
  ...(ownerState.size === 'sm' && {
    '--RadioGroup-gap': '0.625rem',
  }),
  ...(ownerState.size === 'md' && {
    '--RadioGroup-gap': '0.875rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--RadioGroup-gap': '1.25rem',
  }),
  display: 'flex',
  margin: 'var(--unstable_RadioGroup-margin)',
  flexDirection: ownerState.orientation === 'horizontal' ? 'row' : 'column',
  borderRadius: theme.vars.radius.sm,
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
}));
/**
 *
 * Demos:
 *
 * - [Radio](https://mui.com/joy-ui/react-radio-button/)
 *
 * API:
 *
 * - [RadioGroup API](https://mui.com/joy-ui/api/radio-group/)
 */
const RadioGroup = React.forwardRef(function RadioGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyRadioGroup',
  });

  const {
    className,
    component,
    children,
    name: nameProp,
    defaultValue,
    disableIcon = false,
    overlay,
    value: valueProp,
    onChange,
    color = 'neutral',
    variant = 'plain',
    size: sizeProp = 'md',
    orientation = 'vertical',
    role = 'radiogroup',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'RadioGroup',
  });
  const formControl = React.useContext(FormControlContext);
  const size = inProps.size || formControl?.size || sizeProp;

  const ownerState = {
    orientation,
    size,
    variant,
    color,
    role,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  const name = useId(nameProp);

  if (process.env.NODE_ENV !== 'production') {
    const registerEffect = formControl?.registerEffect;
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (registerEffect) {
        return registerEffect();
      }

      return undefined;
    }, [registerEffect]);
  }

  const contextValue = React.useMemo(
    () => ({
      disableIcon,
      overlay,
      orientation,
      size,
      name,
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueState(event.target.value);

        if (onChange) {
          onChange(event);
        }
      },
    }),
    [disableIcon, name, onChange, overlay, orientation, setValueState, size, value],
  );

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: RadioGroupRoot,
    externalForwardedProps: { ...other, component, slots, slotProps },
    ownerState,
    additionalProps: {
      as: component,
      role,
      // The `id` is just for the completeness, it does not have any effect because RadioGroup (div) is non-labelable element
      // MDN: "If it is not a labelable element, then the for attribute has no effect"
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#attr-for
      id: formControl?.htmlFor,
      'aria-labelledby': formControl?.labelId,
      'aria-describedby': formControl?.['aria-describedby'],
    },
  });

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <SlotRoot {...rootProps}>
        {/* Prevent radios from getting the FormControl's context because a single FormControl can only have one Radio */}
        <FormControlContext.Provider value={undefined}>
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  // to let Radio knows when to apply margin(Inline|Block)Start
                  ...(index === 0 && { 'data-first-child': '' }),
                  ...(index === React.Children.count(children) - 1 && { 'data-last-child': '' }),
                  'data-parent': 'RadioGroup',
                } as Record<string, string>)
              : child,
          )}
        </FormControlContext.Provider>
      </SlotRoot>
    </RadioGroupContext.Provider>
  );
}) as OverridableComponent<RadioGroupTypeMap>;

RadioGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * The radio's `disabledIcon` prop. If specified, the value is passed down to every radios under this element.
   * @default false
   */
  disableIcon: PropTypes.bool,
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The radio's `overlay` prop. If specified, the value is passed down to every radios under this element.
   * @default false
   */
  overlay: PropTypes.bool,
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default RadioGroup;
