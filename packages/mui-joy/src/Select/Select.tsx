import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverrideProps, DefaultComponentProps } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import Popper, { PopperProps } from '@mui/base/Popper';
import useSelect, { SelectActionTypes, SelectProvider } from '@mui/base/useSelect';
import { SelectOption } from '@mui/base/useOption';
import composeClasses from '@mui/base/composeClasses';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import GroupListContext from '../List/GroupListContext';
import Unfold from '../internal/svg-icons/Unfold';
import { styled, useThemeProps } from '../styles';
import ColorInversion, { useColorInversion } from '../styles/ColorInversion';
import { SelectOwnProps, SelectOwnerState, SelectTypeMap } from './SelectProps';
import useSlot from '../utils/useSlot';
import selectClasses, { getSelectUtilityClass } from './selectClasses';
import { ListOwnerState } from '../List';
import FormControlContext from '../FormControl/FormControlContext';

function defaultRenderSingleValue<TValue>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

function defaultFormValueProvider<TValue>(selectedOption: SelectOption<TValue> | null) {
  if (selectedOption?.value == null) {
    return '';
  }

  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }

  return JSON.stringify(selectedOption.value);
}

const defaultModifiers: PopperProps['modifiers'] = [
  {
    name: 'offset',
    options: {
      offset: [0, 4],
    },
  },
  {
    // popper will have the same width as root element when open
    name: 'equalWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
  },
];

const useUtilityClasses = (ownerState: SelectOwnerState<any>) => {
  const { color, disabled, focusVisible, size, variant, open } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      open && 'expanded',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    button: ['button'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
    indicator: ['indicator', open && 'expanded'],
    listbox: ['listbox', open && 'expanded', disabled && 'disabled'],
  };

  return composeClasses(slots, getSelectUtilityClass, {});
};

const SelectRoot = styled('div', {
  name: 'JoySelect',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      '--Select-radius': theme.vars.radius.sm,
      '--Select-gap': '0.5rem',
      '--Select-placeholderOpacity': 0.5,
      '--Select-focusedThickness': theme.vars.focus.thickness,
      ...(ownerState.color === 'context'
        ? {
            '--Select-focusedHighlight': theme.vars.palette.focusVisible,
          }
        : {
            '--Select-focusedHighlight':
              theme.vars.palette[
                ownerState.color === 'neutral' ? 'primary' : ownerState.color!
              ]?.[500],
          }),
      '--Select-indicatorColor': variantStyle?.backgroundColor
        ? variantStyle?.color
        : theme.vars.palette.text.tertiary,
      ...(ownerState.size === 'sm' && {
        '--Select-minHeight': '2rem',
        '--Select-paddingInline': '0.5rem',
        '--Select-decoratorChildHeight': 'min(1.5rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.25rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Select-minHeight': '2.5rem',
        '--Select-paddingInline': '0.75rem',
        '--Select-decoratorChildHeight': 'min(2rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.5rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Select-minHeight': '3rem',
        '--Select-paddingInline': '1rem',
        '--Select-decoratorChildHeight': 'min(2.375rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.75rem',
      }),
      // variables for controlling child components
      '--Select-decoratorChildOffset':
        'min(calc(var(--Select-paddingInline) - (var(--Select-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Select-decoratorChildHeight)) / 2), var(--Select-paddingInline))',
      '--_Select-paddingBlock':
        'max((var(--Select-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Select-decoratorChildHeight)) / 2, 0px)',
      '--Select-decoratorChildRadius':
        'max(var(--Select-radius) - var(--variant-borderWidth, 0px) - var(--_Select-paddingBlock), min(var(--_Select-paddingBlock) + var(--variant-borderWidth, 0px), var(--Select-radius) / 2))',
      '--Button-minHeight': 'var(--Select-decoratorChildHeight)',
      '--IconButton-size': 'var(--Select-decoratorChildHeight)',
      '--Button-radius': 'var(--Select-decoratorChildRadius)',
      '--IconButton-radius': 'var(--Select-decoratorChildRadius)',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 'var(--Select-minHeight)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'var(--Select-radius)',
      cursor: 'pointer',
      ...(!variantStyle.backgroundColor && {
        backgroundColor: theme.vars.palette.background.surface,
      }),
      ...(ownerState.size && {
        paddingBlock: { sm: 2, md: 3, lg: 4 }[ownerState.size], // the padding-block act as a minimum spacing between content and root element
      }),
      paddingInline: `var(--Select-paddingInline)`,
      fontFamily: theme.vars.fontFamily.body,
      fontSize: theme.vars.fontSize.md,
      ...(ownerState.size === 'sm' && {
        fontSize: theme.vars.fontSize.sm,
      }),
      '&::before': {
        boxSizing: 'border-box',
        content: '""',
        display: 'block',
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        borderRadius: 'inherit',
        margin: 'calc(var(--variant-borderWidth, 0px) * -1)', // for outlined variant
      },
      [`&.${selectClasses.focusVisible}`]: {
        '--Select-indicatorColor': variantStyle?.color,
        '&::before': {
          boxShadow: `inset 0 0 0 var(--Select-focusedThickness) var(--Select-focusedHighlight)`,
        },
      },
      [`&.${selectClasses.disabled}`]: {
        '--Select-indicatorColor': 'inherit',
      },
    },
    {
      // apply global variant styles
      ...variantStyle,
      '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
      [`&.${selectClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
  ];
});

const SelectButton = styled('button', {
  name: 'JoySelect',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button,
})<{ ownerState: SelectOwnerState<any> }>(({ ownerState }) => ({
  // reset user-agent button style
  border: 0,
  outline: 0,
  background: 'none',
  padding: 0,
  fontSize: 'inherit',
  color: 'inherit',
  alignSelf: 'stretch',
  // make children horizontally aligned
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  fontFamily: 'inherit',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'auto',
  ...((ownerState.value === null || ownerState.value === undefined) && {
    opacity: 'var(--Select-placeholderOpacity)',
  }),
}));

const SelectListbox = styled(StyledList, {
  name: 'JoySelect',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => {
  const variantStyle =
    ownerState.color === 'context'
      ? undefined
      : theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--focus-outline-offset': `calc(${theme.vars.focus.thickness} * -1)`, // to prevent the focus outline from being cut by overflow
    '--List-radius': theme.vars.radius.sm,
    '--ListItem-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.popup,
    '--ListItem-stickyTop': 'calc(var(--List-padding, var(--ListDivider-gap)) * -1)', // negative amount of the List's padding block
    ...scopedVariables,
    minWidth: 'max-content', // prevent options from shrinking if some of them is wider than the Select's root.
    maxHeight: '44vh', // the best value from what I tried so far which does not cause screen flicker when listbox is open.
    overflow: 'auto',
    outline: 0,
    boxShadow: theme.shadow.md,
    zIndex: theme.vars.zIndex.popup,
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.popup,
    }),
  };
});

const SelectStartDecorator = styled('span', {
  name: 'JoySelect',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 0 0 calc(var(--Select-decoratorChildOffset) * -1)',
  '--IconButton-margin': '0 0 0 calc(var(--Select-decoratorChildOffset) * -1)',
  '--Icon-margin': '0 0 0 calc(var(--Select-paddingInline) / -4)',
  display: 'inherit',
  alignItems: 'center',
  marginInlineEnd: 'var(--Select-gap)',
  color: theme.vars.palette.text.tertiary,
  ...(ownerState.focusVisible && {
    color: 'var(--Select-focusedHighlight)',
  }),
}));

const SelectEndDecorator = styled('span', {
  name: 'JoySelect',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--Button-margin': '0 calc(var(--Select-decoratorChildOffset) * -1) 0 0',
    '--IconButton-margin': '0 calc(var(--Select-decoratorChildOffset) * -1) 0 0',
    '--Icon-margin': '0 calc(var(--Select-paddingInline) / -4) 0 0',
    display: 'inherit',
    alignItems: 'center',
    marginInlineStart: 'var(--Select-gap)',
    color: variantStyle?.color,
  };
});

const SelectIndicator = styled('span', {
  name: 'JoySelect',
  slot: 'Indicator',
})<{ ownerState: SelectOwnerState<any> }>(({ ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--Icon-fontSize': '1.125rem',
  }),
  ...(ownerState.size === 'md' && {
    '--Icon-fontSize': '1.25rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--Icon-fontSize': '1.5rem',
  }),
  color: 'var(--Select-indicatorColor)',
  display: 'inherit',
  alignItems: 'center',
  marginInlineStart: 'var(--Select-gap)',
  marginInlineEnd: 'calc(var(--Select-paddingInline) / -4)',
  [`.${selectClasses.endDecorator} + &`]: {
    marginInlineStart: 'calc(var(--Select-gap) / 2)',
  },
}));
/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/joy-ui/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/joy-ui/api/select/)
 */
const Select = React.forwardRef(function Select<TValue extends {}>(
  inProps: SelectOwnProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoySelect',
  });

  const {
    action,
    autoFocus,
    children,
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledExternalProp,
    getSerializedValue = defaultFormValueProvider,
    placeholder,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    onClose,
    renderValue: renderValueProp,
    value: valueProp,
    size: sizeProp = 'md',
    variant = 'outlined',
    color: colorProp = 'neutral',
    startDecorator,
    endDecorator,
    indicator = <Unfold />,
    // props to forward to the button (all handlers should go through slotProps.button)
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    id,
    name,
    slots = {},
    slotProps = {},
    ...other
  } = props as typeof inProps & {
    // need to cast types because SelectOwnProps does not have these properties
    'aria-describedby'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    id?: string;
    name?: string;
  };

  const formControl = React.useContext(FormControlContext);

  if (process.env.NODE_ENV !== 'production') {
    const registerEffect = formControl?.registerEffect;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (registerEffect) {
        return registerEffect();
      }

      return undefined;
    }, [registerEffect]);
  }

  const disabledProp = inProps.disabled ?? formControl?.disabled ?? disabledExternalProp;
  const size = inProps.size ?? formControl?.size ?? sizeProp;
  const { getColor } = useColorInversion(variant);
  const color = getColor(
    inProps.color,
    formControl?.error ? 'danger' : formControl?.color ?? colorProp,
  );

  const renderValue = renderValueProp ?? defaultRenderSingleValue;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const rootRef = React.useRef<HTMLElement | null>(null);
  const buttonRef = React.useRef<HTMLElement | null>(null);
  const listboxRef = React.useRef<HTMLElement | null>(null);

  const handleRef = useForkRef(ref, rootRef);

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        buttonRef.current?.focus();
      },
    }),
    [],
  );

  React.useEffect(() => {
    setAnchorEl(rootRef.current);
  }, []);

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      onListboxOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
    [onClose, onListboxOpenChange],
  );

  const {
    buttonActive,
    buttonFocusVisible,
    contextValue,
    disabled,
    dispatch,
    getButtonProps,
    getListboxProps,
    getOptionMetadata,
    open: listboxOpen,
    value,
  } = useSelect({
    buttonRef,
    defaultOpen: defaultListboxOpen,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpenProp,
    value: valueProp,
  });

  const ownerState = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value,
    size,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, slots, slotProps };

  const selectedOption = React.useMemo(
    () => getOptionMetadata(value as TValue) ?? null,
    [getOptionMetadata, value],
  );

  const [SlotRoot, rootProps] = useSlot('root', {
    ref: handleRef,
    className: classes.root,
    elementType: SelectRoot,
    externalForwardedProps,
    getSlotProps: (handlers) => ({
      onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
        if (
          !listboxOpen &&
          !buttonRef.current?.contains(event.target as Node) &&
          !event.isPropagationStopped()
        ) {
          // show the popup if user click outside of the button element.
          // the close action is already handled by blur event.
          dispatch({ type: SelectActionTypes.buttonClick, event });
        }
        handlers.onMouseDown?.(event);
      },
    }),
    ownerState,
  });

  const [SlotButton, buttonProps] = useSlot('button', {
    additionalProps: {
      'aria-describedby': ariaDescribedby ?? formControl?.['aria-describedby'],
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby ?? formControl?.labelId,
      id: id ?? formControl?.htmlFor,
      name,
    },
    className: classes.button,
    elementType: SelectButton,
    externalForwardedProps,
    getSlotProps: getButtonProps,
    ownerState,
  });

  const [SlotListbox, listboxProps] = useSlot('listbox', {
    additionalProps: {
      ref: listboxRef,
      anchorEl,
      disablePortal: true,
      open: listboxOpen,
      placement: 'bottom' as const,
      keepMounted: true,
    },
    className: classes.listbox,
    elementType: SelectListbox,
    externalForwardedProps,
    getSlotProps: getListboxProps,
    ownerState: {
      ...ownerState,
      nesting: false,
      row: false,
      wrap: false,
    } as SelectOwnerState<any> & ListOwnerState,
    getSlotOwnerState: (mergedProps) => ({
      size: mergedProps.size || size,
      variant: mergedProps.variant || 'outlined',
      color: mergedProps.color || 'neutral',
      disableColorInversion: !mergedProps.disablePortal,
    }),
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: SelectStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: SelectEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotIndicator, indicatorProps] = useSlot('indicator', {
    className: classes.indicator,
    elementType: SelectIndicator,
    externalForwardedProps,
    ownerState,
  });

  const context = React.useMemo(
    () => ({
      ...contextValue,
      color,
    }),
    [color, contextValue],
  );

  // Wait for `listboxProps` because `slotProps.listbox` could be a function.
  const modifiers = React.useMemo(
    () => [...defaultModifiers, ...(listboxProps.modifiers || [])],
    [listboxProps.modifiers],
  );

  let result = null;
  if (anchorEl) {
    result = (
      <SlotListbox
        {...listboxProps}
        className={clsx(
          listboxProps.className,
          listboxProps.ownerState?.color === 'context' && selectClasses.colorContext,
        )}
        // @ts-ignore internal logic (too complex to typed PopperOwnProps to SlotListbox but this should be removed when we have `usePopper`)
        modifiers={modifiers}
        {...(!props.slots?.listbox && {
          as: Popper,
          slots: { root: listboxProps.as || 'ul' },
        })}
      >
        <SelectProvider value={context}>
          <GroupListContext.Provider value="select">
            {/* for building grouped options */}
            <ListProvider nested>{children}</ListProvider>
          </GroupListContext.Provider>
        </SelectProvider>
      </SlotListbox>
    );

    if (!listboxProps.disablePortal) {
      result = (
        // For portal popup, the children should not inherit color inversion from the upper parent.
        <ColorInversion.Provider value={undefined}>{result}</ColorInversion.Provider>
      );
    }
  }

  return (
    <React.Fragment>
      <SlotRoot {...rootProps}>
        {startDecorator && (
          <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
        )}

        <SlotButton {...buttonProps}>
          {selectedOption ? renderValue(selectedOption) : placeholder}
        </SlotButton>
        {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}

        {indicator && <SlotIndicator {...indicatorProps}>{indicator}</SlotIndicator>}
      </SlotRoot>
      {result}

      {name && <input type="hidden" name={name} value={getSerializedValue(selectedOption)} />}
    </React.Fragment>
  );
}) as SelectComponent;

interface SelectComponent {
  <TValue extends {}, C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<SelectTypeMap<TValue>, C>,
  ): JSX.Element | null;
  <TValue extends {}>(props: DefaultComponentProps<SelectTypeMap<TValue>>): JSX.Element | null;
  propTypes?: any;
}

Select.propTypes /* remove-proptypes */ = {
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
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
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
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for the select.
   */
  endDecorator: PropTypes.node,
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue: PropTypes.func,
  /**
   * The indicator(*) for the select.
   *    ________________
   *   [ value        * ]
   *    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   */
  indicator: PropTypes.node,
  /**
   * `id` attribute of the listbox element.
   * Also used to derive the `id` attributes of options.
   */
  listboxId: PropTypes.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name: PropTypes.string,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * Text to show when there is no selected value.
   */
  placeholder: PropTypes.node,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    button: PropTypes.elementType,
    endDecorator: PropTypes.elementType,
    indicator: PropTypes.elementType,
    listbox: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
  }),
  /**
   * Leading adornment for the select.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Select;
