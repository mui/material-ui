import * as React from 'react';
import PropTypes from 'prop-types';
import { OverrideProps, DefaultComponentProps } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import PopperUnstyled, { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import {
  useSelect,
  SelectUnstyledContext,
  flattenOptionGroups,
  getOptionsFromChildren,
} from '@mui/base/SelectUnstyled';
import type { SelectChild, SelectOption } from '@mui/base/SelectUnstyled';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import { ListRoot } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import Unfold from '../internal/svg-icons/Unfold';
import { styled, useThemeProps } from '../styles';
import { SelectOwnProps, SelectStaticProps, SelectOwnerState, SelectTypeMap } from './SelectProps';
import selectClasses, { getSelectUtilityClass } from './selectClasses';
import { ListOwnerState } from '../List';
import FormControlContext from '../FormControl/FormControlContext';

function defaultRenderSingleValue<TValue>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

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
    listbox: [
      'listbox',
      open && 'expanded',
      disabled && 'disabled',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getSelectUtilityClass, {});
};

const SelectRoot = styled('div', {
  name: 'JoySelect',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SelectStaticProps }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      '--Select-radius': theme.vars.radius.sm,
      '--Select-gap': '0.5rem',
      '--Select-placeholderOpacity': 0.5,
      '--Select-focusedThickness': '2px',
      '--Select-focusedHighlight':
        theme.vars.palette[ownerState.color === 'neutral' ? 'primary' : ownerState.color!]?.[500],
      '--Select-indicator-color': theme.vars.palette.text.tertiary,
      ...(ownerState.size === 'sm' && {
        '--Select-minHeight': '2rem',
        '--Select-paddingInline': '0.5rem',
        '--Select-decorator-childHeight': 'min(1.5rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.25rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Select-minHeight': '2.5rem',
        '--Select-paddingInline': '0.75rem',
        '--Select-decorator-childHeight': 'min(2rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.5rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Select-minHeight': '3rem',
        '--Select-paddingInline': '1rem',
        '--Select-decorator-childHeight': 'min(2.375rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.75rem',
      }),
      // variables for controlling child components
      '--Select-decorator-childOffset':
        'min(calc(var(--Select-paddingInline) - (var(--Select-minHeight) - 2 * var(--variant-borderWidth) - var(--Select-decorator-childHeight)) / 2), var(--Select-paddingInline))',
      '--internal-paddingBlock':
        'max((var(--Select-minHeight) - 2 * var(--variant-borderWidth) - var(--Select-decorator-childHeight)) / 2, 0px)',
      '--Select-decorator-childRadius':
        'max((var(--Select-radius) - var(--variant-borderWidth)) - var(--internal-paddingBlock), min(var(--internal-paddingBlock) / 2, (var(--Select-radius) - var(--variant-borderWidth)) / 2))',
      '--Button-minHeight': 'var(--Select-decorator-childHeight)',
      '--IconButton-size': 'var(--Select-decorator-childHeight)',
      '--Button-radius': 'var(--Select-decorator-childRadius)',
      '--IconButton-radius': 'var(--Select-decorator-childRadius)',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 'var(--Select-minHeight)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'var(--Select-radius)',
      ...(!variantStyle.backgroundColor && {
        backgroundColor: theme.vars.palette.background.surface,
      }),
      paddingInline: `var(--Select-paddingInline)`,
      fontFamily: theme.vars.fontFamily.body,
      fontSize: theme.vars.fontSize.md,
      ...(ownerState.size === 'sm' && {
        fontSize: theme.vars.fontSize.sm,
      }),
      // TODO: discuss the transition approach in a separate PR.
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '&:before': {
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
        margin: 'calc(var(--variant-borderWidth) * -1)', // for outlined variant
      },
      [`&.${selectClasses.focusVisible}`]: {
        '--Select-indicator-color': 'var(--Select-focusedHighlight)',
      },
      [`&.${selectClasses.disabled}`]: {
        '--Select-indicator-color': 'inherit',
      },
      ...(ownerState.variant !== 'solid' && {
        [`&.${selectClasses.focusVisible}`]: {
          '&:before': {
            boxShadow: `inset 0 0 0 var(--Select-focusedThickness) var(--Select-focusedHighlight)`,
          },
        },
      }),
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
  outline: 'none',
  background: 'none',
  padding: 0,
  fontSize: 'inherit',
  color: 'inherit',
  alignSelf: 'stretch',
  // make children horizontally aligned
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  cursor: 'pointer',
  ...(!ownerState.value && {
    opacity: 'var(--Select-placeholderOpacity)',
  }),
}));

const SelectListbox = styled(ListRoot, {
  name: 'JoySelect',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.surface, // for sticky List
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)', // negative amount of the List's padding block
    ...scopedVariables,
    outline: 'none',
    boxShadow: theme.vars.shadow.md,
    zIndex: 1000,
    ...(!variantStyle.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
  };
});

const SelectStartDecorator = styled('span', {
  name: 'JoySelect',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 0 0 calc(var(--Select-decorator-childOffset) * -1)',
  '--IconButton-margin': '0 0 0 calc(var(--Select-decorator-childOffset) * -1)',
  '--Icon-margin': '0 0 0 calc(var(--Select-paddingInline) / -4)',
  pointerEvents: 'none', // to make the input focused when click on the element because start element usually is an icon
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
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 calc(var(--Select-decorator-childOffset) * -1) 0 0',
  '--IconButton-margin': '0 calc(var(--Select-decorator-childOffset) * -1) 0 0',
  '--Icon-margin': '0 calc(var(--Select-paddingInline) / -4) 0 0',
  display: 'inherit',
  alignItems: 'center',
  marginInlineStart: 'var(--Select-gap)',
  color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
}));

const SelectIndicator = styled('span', {
  name: 'JoySelect',
  slot: 'Indicator',
})<{ ownerState: SelectOwnerState<any> }>({
  color: 'var(--Select-indicator-color)',
  display: 'inherit',
  alignItems: 'center',
  marginInlineStart: 'var(--Select-gap)',
  marginInlineEnd: 'calc(var(--Select-paddingInline) / -4)',
});

const Select = React.forwardRef(function Select<TValue>(
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
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledExternalProp,
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
    // props to forward to the button (all handlers should go through componentsProps.button)
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    id,
    name,
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
  const color = formControl?.error ? 'danger' : inProps.color ?? formControl?.color ?? colorProp;

  const renderValue = renderValueProp ?? defaultRenderSingleValue;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const [groupedOptions, setGroupedOptions] = React.useState<SelectChild<TValue>[]>([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'SelectUnstyled',
    state: 'listboxOpen',
  });

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
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);

  React.useEffect(() => {
    setAnchorEl(rootRef.current);
  }, []);

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = (isOpen: boolean) => {
    setListboxOpen(isOpen);
    onListboxOpenChange?.(isOpen);
    if (!isOpen) {
      onClose?.();
    }
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value,
  } = useSelect({
    buttonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
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

  const selectedOptions = React.useMemo(() => {
    return options.find((o) => value === o.value);
  }, [options, value]);

  const rootProps = useSlotProps({
    elementType: SelectRoot,
    getSlotProps: (handlers) => ({
      onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
        if (!listboxOpen && event.target !== buttonRef.current && !event.isPropagationStopped()) {
          // show the popup if user click outside of the button element.
          // the close action is already handled by blur event.
          handleOpenChange(true);
        }
        handlers.onClick?.(event);
      },
    }),
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRef,
    },
    ownerState,
    className: classes.root,
  });

  const buttonProps = useSlotProps({
    elementType: SelectButton,
    getSlotProps: getButtonProps,
    externalSlotProps: componentsProps.button,
    additionalProps: {
      'aria-describedby': ariaDescribedby ?? formControl?.['aria-describedby'],
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      id: id ?? formControl?.htmlFor,
      name,
    },
    ownerState,
    className: classes.button,
  });

  const resolveListboxProps =
    typeof componentsProps.listbox === 'function'
      ? componentsProps.listbox(ownerState)
      : componentsProps.listbox;
  // cache the modifiers to prevent Popper from being recreated when React rerenders menu.
  const cachedModifiers = React.useMemo<PopperUnstyledProps['modifiers']>(
    () => [
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
      ...(resolveListboxProps?.modifiers || []),
    ],
    [resolveListboxProps?.modifiers],
  );

  const { component: listboxComponent, ...listboxProps } = useSlotProps({
    elementType: SelectListbox,
    getSlotProps: getListboxProps,
    externalSlotProps: componentsProps.listbox,
    additionalProps: {
      ref: listboxRef,
      anchorEl,
      disablePortal: true,
      open: listboxOpen,
      placement: 'bottom' as const,
      modifiers: cachedModifiers,
    },
    ownerState: {
      ...ownerState,
      nesting: false,
      row: false,
      wrap: false,
    } as SelectOwnerState<any> & ListOwnerState,
    className: classes.listbox,
  });

  const startDecoratorProps = useSlotProps({
    elementType: SelectStartDecorator,
    externalSlotProps: componentsProps.startDecorator,
    ownerState,
    className: classes.startDecorator,
  });

  const endDecoratorProps = useSlotProps({
    elementType: SelectEndDecorator,
    externalSlotProps: componentsProps.endDecorator,
    ownerState,
    className: classes.endDecorator,
  });

  const indicatorProps = useSlotProps({
    elementType: SelectIndicator,
    externalSlotProps: componentsProps.indicator,
    ownerState,
    className: classes.indicator,
  });

  const context = {
    getOptionProps,
    getOptionState,
    listboxRef,
    color,
  };

  return (
    <React.Fragment>
      <SelectRoot {...rootProps}>
        {startDecorator && (
          <SelectStartDecorator {...startDecoratorProps}>{startDecorator}</SelectStartDecorator>
        )}

        <SelectButton {...buttonProps}>
          {selectedOptions ? renderValue(selectedOptions) : placeholder}
        </SelectButton>
        {endDecorator && (
          <SelectEndDecorator {...endDecoratorProps}>{endDecorator}</SelectEndDecorator>
        )}

        {indicator && <SelectIndicator {...indicatorProps}>{indicator}</SelectIndicator>}
      </SelectRoot>
      {anchorEl && (
        // @ts-ignore internal logic: `listboxComponent` should not replace `SelectListbox`.
        <PopperUnstyled {...listboxProps} as={listboxComponent} component={SelectListbox}>
          <SelectUnstyledContext.Provider value={context}>
            {/* for building grouped options */}
            <ListProvider nested>{children}</ListProvider>
          </SelectUnstyledContext.Provider>
        </PopperUnstyled>
      )}
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
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
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
   * The props used for each slot inside the component.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    button: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes /* @typescript-to-proptypes-ignore */.any,
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
   * The indicator(*) for the select.
   *    ________________
   *   [ value        * ]
   *    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   */
  indicator: PropTypes.node,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose: PropTypes.func,
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
  value: PropTypes /* @typescript-to-proptypes-ignore */.any,
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Select;
