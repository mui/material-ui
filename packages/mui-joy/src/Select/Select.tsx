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
import Unfold from '../internal/svg-icons/Unfold';
import { styled, useThemeProps } from '../styles';
import { SelectOwnProps, SelectStaticProps, SelectOwnerState, SelectTypeMap } from './SelectProps';
import selectClasses, { getSelectUtilityClass } from './selectClasses';

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
})<{ ownerState: SelectStaticProps }>(({ theme, ownerState }) => [
  {
    '--Select-radius': theme.vars.radius.sm, // radius is used by the decorator children
    '--Select-gap': '0.5rem',
    '--Select-placeholderOpacity': 0.5,
    '--Select-focusedThickness': 'calc(var(--variant-borderWidth, 1px) + 1px)',
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
    minWidth: 0, // forces the Select to stay inside a container by default
    minHeight: 'var(--Select-minHeight)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'var(--Select-radius)',
    paddingInline: `var(--Select-paddingInline)`,
    fontFamily: theme.vars.fontFamily.body,
    fontSize: theme.vars.fontSize.md,
    ...(ownerState.size === 'sm' && {
      fontSize: theme.vars.fontSize.sm,
    }),
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
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
  },
  {
    // apply global variant styles
    ...theme.variants[`${ownerState.variant!}`]?.[ownerState.color!],
    '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
    [`&.${selectClasses.disabled}`]:
      theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  },
  ownerState.variant !== 'solid' && {
    // This style has to come after the global variant to set the background to initial
    [`&.${selectClasses.focusVisible}`]: {
      backgroundColor: 'initial',
      '&:before': {
        boxShadow: `inset 0 0 0 var(--Select-focusedThickness) var(--Select-focusedHighlight)`,
      },
    },
  },
]);

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
    outline: 'none',
    boxShadow: theme.vars.shadow.md,
    zIndex: 1000,
    ...(!variantStyle.backgroundColor && {
      backgroundColor: theme.vars.palette.background.body,
    }),
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.body, // for sticky List
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
    disabled: disabledProp,
    placeholder,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    onClose,
    renderValue: renderValueProp,
    value: valueProp,
    size = 'md',
    variant = 'outlined',
    color = 'neutral',
    startDecorator,
    endDecorator,
    indicator = <Unfold />,
    ...other
  } = props;

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
      ...(componentsProps.listbox?.modifiers || []),
    ],
    [componentsProps.listbox?.modifiers],
  );

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
    ownerState,
    className: classes.button,
  });

  const { component: listboxComponent, ...externalListboxProps } = componentsProps.listbox || {};
  const listboxProps = useSlotProps({
    elementType: SelectListbox,
    getSlotProps: getListboxProps,
    externalSlotProps: externalListboxProps,
    additionalProps: {
      ref: listboxRef,
      anchorEl,
      disablePortal: true,
      open: listboxOpen,
      placement: 'bottom' as const,
      component: SelectListbox,
      as: listboxComponent,
      modifiers: cachedModifiers,
    },
    ownerState: {
      ...ownerState,
      nesting: false,
      scoped: true,
      row: false,
    },
    className: classes.listbox,
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
          <SelectStartDecorator className={classes.startDecorator} ownerState={ownerState}>
            {startDecorator}
          </SelectStartDecorator>
        )}
        <SelectButton {...buttonProps}>
          {selectedOptions ? renderValue(selectedOptions) : placeholder}
        </SelectButton>
        {endDecorator && (
          <SelectEndDecorator className={classes.endDecorator} ownerState={ownerState}>
            {endDecorator}
          </SelectEndDecorator>
        )}
        {indicator && (
          <SelectIndicator className={classes.indicator} ownerState={ownerState}>
            {indicator}
          </SelectIndicator>
        )}
      </SelectRoot>
      {anchorEl && (
        <PopperUnstyled {...listboxProps}>
          <SelectUnstyledContext.Provider value={context}>
            {children}
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
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
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
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.object,
    popper: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
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
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
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
  value: PropTypes.oneOfType([PropTypes.oneOf(['']), PropTypes.any]),
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
