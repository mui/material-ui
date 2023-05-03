import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  chainPropTypes,
  integerPropType,
  unstable_useForkRef as useForkRef,
  unstable_capitalize as capitalize,
} from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import useAutocomplete, {
  AutocompleteGroupedOption,
  UseAutocompleteProps,
} from '@mui/base/useAutocomplete';
import Popper from '@mui/base/Popper';
import { useThemeProps } from '../styles';
import ClearIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import styled from '../styles/styled';
// slot components
import { StyledIconButton } from '../IconButton/IconButton';
// default render components
import Chip, { chipClasses } from '../Chip';
import ChipDelete from '../ChipDelete';
import {
  StyledInputRoot,
  StyledInputHtml,
  StyledInputStartDecorator,
  StyledInputEndDecorator,
} from '../Input/Input';
import List from '../List';
import ListProvider from '../List/ListProvider';
import ListSubheader from '../ListSubheader';
import ListItem from '../ListItem';
import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';
import {
  AutocompleteProps,
  AutocompleteRenderGroupParams,
  AutocompleteRenderGetTagProps,
  AutocompleteOwnerState,
} from './AutocompleteProps';
import FormControlContext from '../FormControl/FormControlContext';
import { StyledAutocompleteListbox } from '../AutocompleteListbox/AutocompleteListbox';
import { StyledAutocompleteOption } from '../AutocompleteOption/AutocompleteOption';
import useSlot from '../utils/useSlot';
import ColorInversion, { useColorInversion } from '../styles/ColorInversion';

type OwnerState = Omit<AutocompleteOwnerState<any, any, any, any>, 'onChange' | 'defaultValue'>;

const defaultIsActiveElementInListbox = (listboxRef: React.RefObject<HTMLElement>) =>
  listboxRef.current !== null && listboxRef.current.contains(document.activeElement);
// @ts-ignore
const defaultGetOptionLabel = (option) => option.label ?? option;
const defaultLimitTagsText = (more: string | number) => `+${more}`;
const defaultRenderGroup = (params: AutocompleteRenderGroupParams) => (
  <ListItem key={params.key} nested>
    <ListSubheader sticky>{params.group}</ListSubheader>
    <List>{params.children}</List>
  </ListItem>
);

const defaultVariantMapping = {
  plain: 'plain',
  outlined: 'plain',
  soft: 'soft',
  solid: 'solid',
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const {
    disabled,
    focused,
    hasClearIcon,
    hasPopupIcon,
    popupOpen,
    variant,
    color,
    size,
    multiple,
  } = ownerState;

  const slots = {
    root: [
      'root',
      focused && 'focused',
      hasClearIcon && 'hasClearIcon',
      hasPopupIcon && 'hasPopupIcon',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    wrapper: ['wrapper', multiple && 'multiple'],
    input: ['input'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen', disabled && 'disabled'],
    listbox: ['listbox'],
    option: ['option'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    limitTag: ['limitTag'],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, {});
};

const AutocompleteRoot = styled(StyledInputRoot as unknown as 'div', {
  name: 'JoyAutocomplete',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  '--Autocomplete-wrapperGap': '3px',
  ...(ownerState.size === 'lg' && {
    '--Autocomplete-wrapperGap': '4px',
  }),
  /* Avoid double tap issue on iOS */
  '@media (pointer: fine)': {
    [`&:hover .${autocompleteClasses.clearIndicator}`]: {
      visibility: 'visible',
    },
  },
  ...(ownerState.multiple &&
    !ownerState.startDecorator && {
      paddingInlineStart: 0,
    }),
}));

/**
 * Wrapper groups the chips (multi selection) and the input
 * so that start/end decorators can stay in the normal flow.
 */
const AutocompleteWrapper = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => styles.wrapper,
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  flex: 1, // stretch to fill the root slot
  minWidth: 0, // won't push end decorator out of the autocomplete
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  [`&.${autocompleteClasses.multiple}`]: {
    paddingBlockEnd: 'min(var(--_Input-paddingBlock), var(--Autocomplete-wrapperGap))',
    // TODO: use [CSS :has](https://caniuse.com/?search=%3Ahas) later
    ...(ownerState.startDecorator &&
      Array.isArray(ownerState.value) &&
      (ownerState.value as Array<unknown>).length > 0 && {
        marginBlockStart: 'min(var(--_Input-paddingBlock) - var(--Autocomplete-wrapperGap), 0px)',
        marginInlineStart: 'calc(-1 * var(--Autocomplete-wrapperGap))',
        [`& .${autocompleteClasses.input}`]: {
          marginInlineStart: 'max(var(--Autocomplete-wrapperGap), var(--Input-gap))',
        },
      }),
  },
  [`& .${chipClasses.root}`]: {
    // TODO: use flexbox `gap` later.
    minWidth: 0,
    marginInlineStart: 'var(--Autocomplete-wrapperGap)',
    marginBlockStart: 'var(--Autocomplete-wrapperGap)',
  },
}));

const AutocompleteInput = styled(StyledInputHtml as unknown as 'input', {
  name: 'JoyAutocomplete',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  minWidth: 30,
  minHeight: 'var(--Chip-minHeight)',
  ...(ownerState.multiple && {
    marginBlockStart: 'var(--Autocomplete-wrapperGap)',
    ...(!ownerState.startDecorator && {
      marginInlineStart: 'var(--Input-paddingInline)',
    }),
  }),
}));

const AutocompleteStartDecorator = styled(StyledInputStartDecorator as unknown as 'span', {
  name: 'JoyAutocomplete',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: OwnerState }>({});

const AutocompleteEndDecorator = styled(StyledInputEndDecorator as unknown as 'span', {
  name: 'JoyAutocomplete',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  // don't adjust if end decorator is not the last of the autocomplete
  ...((ownerState.hasClearIcon || ownerState.hasPopupIcon) && {
    '--Button-margin': '0px',
    '--IconButton-margin': '0px',
    '--Icon-margin': '0px',
  }),
}));

const AutocompleteClearIndicator = styled(StyledIconButton as unknown as 'button', {
  name: 'JoyAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  ...(!ownerState.hasPopupIcon && {
    marginInlineEnd: 'calc(var(--Input-decoratorChildOffset) * -1)',
  }),
  marginInlineStart: 'calc(var(--_Input-paddingBlock) / 2)',
  visibility: ownerState.focused ? 'visible' : 'hidden',
}));

const AutocompletePopupIndicator = styled(StyledIconButton as unknown as 'button', {
  name: 'JoyAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: (props, styles) => styles.popupIndicator,
})<{ ownerState: OwnerState }>(({ ownerState }) => ({
  marginInlineStart: 'calc(var(--_Input-paddingBlock) / 2)',
  marginInlineEnd: 'calc(var(--Input-decoratorChildOffset) * -1)',
  ...(ownerState.popupOpen && {
    transform: 'rotate(180deg)',
  }),
}));

const AutocompleteListbox = styled(StyledAutocompleteListbox, {
  name: 'JoyAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})<{ ownerState: OwnerState }>({});

const AutocompleteOption = styled(StyledAutocompleteOption, {
  name: 'JoyAutocomplete',
  slot: 'Option',
  overridesResolver: (props, styles) => styles.option,
})<{ ownerState: OwnerState }>({});

const AutocompleteLoading = styled(ListItem, {
  name: 'JoyAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
}));

const AutocompleteNoOptions = styled(ListItem, {
  name: 'JoyAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
}));

const AutocompleteLimitTag = styled('span', {
  name: 'JoyAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})<{ ownerState: OwnerState }>({
  marginInlineStart: 'calc(var(--Input-paddingInline) / 2)',
  marginBlockStart: 'var(--_Input-paddingBlock)',
});

const excludeUseAutocompleteParams = <
  T extends Partial<UseAutocompleteProps<any, undefined, undefined, undefined>>,
>({
  autoComplete,
  autoHighlight,
  autoSelect,
  blurOnSelect,
  clearOnBlur,
  clearOnEscape,
  defaultValue,
  disableCloseOnSelect,
  disabledItemsFocusable,
  disableListWrap,
  filterSelectedOptions,
  handleHomeEndKeys,
  includeInputInList,
  openOnFocus,
  selectOnFocus,
  ...other
}: T) => other as T;
/**
 *
 * Demos:
 *
 * - [Autocomplete](https://mui.com/joy-ui/react-autocomplete/)
 *
 * API:
 *
 * - [Autocomplete API](https://mui.com/joy-ui/api/autocomplete/)
 */
const Autocomplete = React.forwardRef(function Autocomplete(
  inProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyAutocomplete',
  });

  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoFocus,
    clearIcon = <ClearIcon fontSize="md" />,
    clearText = 'Clear',
    closeText = 'Close',
    disableClearable = false,
    disabled: disabledProp,
    endDecorator,
    error: errorProp = false,
    filterOptions,
    forcePopupIcon = 'auto',
    freeSolo = false,
    getLimitTagsText = defaultLimitTagsText,
    getOptionDisabled,
    getOptionLabel = defaultGetOptionLabel,
    isOptionEqualToValue,
    groupBy,
    id,
    inputValue: inputValueProp,
    limitTags = -1,
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
    name,
    noOptionsText = 'No options',
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open,
    openText = 'Open',
    options,
    placeholder,
    popupIcon = <ArrowDropDownIcon />,
    readOnly = false,
    renderGroup = defaultRenderGroup,
    renderOption: renderOptionProp,
    renderTags,
    required,
    type,
    startDecorator,
    size: sizeProp = 'md',
    color: colorProp = 'neutral',
    variant = 'outlined',
    value: valueProp,
    component,
    slots = {},
    slotProps = {},
    ...otherProps
  } = props;
  const other = excludeUseAutocompleteParams(otherProps);

  const { getColor } = useColorInversion(variant);
  const formControl = React.useContext(FormControlContext);
  const error = inProps.error ?? formControl?.error ?? errorProp;
  const size = inProps.size ?? formControl?.size ?? sizeProp;
  const color = getColor(inProps.color, error ? 'danger' : formControl?.color ?? colorProp);
  const disabled = disabledProp ?? formControl?.disabled ?? false;

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    id: id ?? formControl?.htmlFor,
    componentName: 'Autocomplete',
    unstable_classNamePrefix: 'Joy',
    unstable_isActiveElementInListbox: defaultIsActiveElementInListbox,
  });

  const { onMouseDown: handleInputMouseDown } = getInputProps();
  const { onClick: handleRootOnClick } = getRootProps();
  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  const ownerState = {
    ...props,
    value,
    disabled,
    focused,
    hasOptions: !!groupedOptions.length,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  let selectedOptions;

  if (multiple && (value as Array<unknown>).length > 0) {
    const getCustomizedTagProps: AutocompleteRenderGetTagProps = (params) => {
      const { onDelete, ...tagProps } = getTagProps(params);
      return {
        disabled,
        size,
        onClick: onDelete,
        ...tagProps,
      };
    };

    if (renderTags) {
      selectedOptions = renderTags(value as Array<unknown>, getCustomizedTagProps, ownerState);
    } else {
      selectedOptions = (value as Array<unknown>).map((option, index) => {
        return (
          <Chip
            key={index}
            size={size}
            variant="soft"
            color={color === 'context' ? undefined : 'neutral'}
            endDecorator={<ChipDelete {...getCustomizedTagProps({ index })} />}
          >
            {getOptionLabel(option)}
          </Chip>
        );
      });
    }
  }

  const rootRef = useForkRef(ref, setAnchorEl);

  const rootStateClasses = {
    [autocompleteClasses.disabled]: disabled,
    [autocompleteClasses.error]: error,
    [autocompleteClasses.focused]: focused,
    [autocompleteClasses.formControl]: Boolean(formControl),
  };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref: rootRef,
    className: [classes.root, rootStateClasses],
    elementType: AutocompleteRoot,
    externalForwardedProps,
    ownerState,
    getSlotProps: getRootProps,
    additionalProps: {
      onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (handleRootOnClick) {
          handleRootOnClick(event);
        }
        if (event.currentTarget === event.target && handleInputMouseDown) {
          handleInputMouseDown(event as React.MouseEvent<HTMLInputElement, MouseEvent>);
        }
      },
    },
  });

  const [SlotWrapper, wrapperProps] = useSlot('wrapper', {
    className: classes.wrapper,
    elementType: AutocompleteWrapper,
    externalForwardedProps,
    ownerState,
  });

  const inputStateClasses = {
    [autocompleteClasses.disabled]: disabled,
  };

  const [SlotInput, inputProps] = useSlot('input', {
    className: [classes.input, inputStateClasses],
    elementType: AutocompleteInput,
    getSlotProps: (handlers) => {
      const { onBlur, onFocus, onMouseDown, ...inputSlotProps } = getInputProps();
      return {
        ...inputSlotProps,
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
          onBlur?.(event);
          handlers.onBlur?.(event);
        },
        onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
          onFocus?.(event);
          handlers.onFocus?.(event);
        },
        onMouseDown: (event: React.MouseEvent<HTMLInputElement>) => {
          onMouseDown?.(event);
          handlers.onMouseDown?.(event);
        },
      };
    },
    externalForwardedProps,
    ownerState,
    additionalProps: {
      autoFocus,
      placeholder,
      name,
      readOnly,
      disabled,
      required: required ?? formControl?.required,
      type,
      'aria-invalid': error || undefined,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby ?? formControl?.['aria-describedby'],
    },
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: AutocompleteStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: AutocompleteEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotClearIndicator, clearIndicatorProps] = useSlot('clearIndicator', {
    className: classes.clearIndicator,
    elementType: AutocompleteClearIndicator,
    getSlotProps: getClearProps,
    externalForwardedProps,
    ownerState,
    getSlotOwnerState: (mergedProps) => ({
      size: mergedProps.size || size,
      variant: mergedProps.variant || defaultVariantMapping[variant] || 'plain',
      color: mergedProps.color || 'neutral',
    }),
    additionalProps: {
      'aria-label': clearText,
      title: clearText,
    },
  });

  const [SlotPopupIndicator, popupIndicatorProps] = useSlot('popupIndicator', {
    className: classes.popupIndicator,
    elementType: AutocompletePopupIndicator,
    getSlotProps: getPopupIndicatorProps,
    externalForwardedProps,
    ownerState,
    getSlotOwnerState: (mergedProps) => ({
      size: mergedProps.size || size,
      variant: mergedProps.variant || defaultVariantMapping[variant] || 'plain',
      color: mergedProps.color || 'neutral',
    }),
    additionalProps: {
      disabled,
      'aria-label': popupOpen ? closeText : openText,
      title: popupOpen ? closeText : openText,
      type: 'button',
    },
  });

  const [SlotListbox, listboxProps] = useSlot('listbox', {
    className: classes.listbox,
    elementType: AutocompleteListbox,
    getSlotProps: getListboxProps,
    externalForwardedProps,
    ownerState,
    getSlotOwnerState: (mergedProps) => ({
      size: mergedProps.size || size,
      variant: mergedProps.variant || 'outlined',
      color: mergedProps.color || 'neutral',
      disableColorInversion: !mergedProps.disablePortal,
    }),
    additionalProps: {
      anchorEl,
      open: popupOpen,
      style: anchorEl
        ? {
            width: anchorEl.clientWidth,
          }
        : {},
    },
  });

  const [SlotLoading, loadingProps] = useSlot('loading', {
    className: classes.loading,
    elementType: AutocompleteLoading,
    externalForwardedProps,
    ownerState,
  });

  const [SlotNoOptions, noOptionsProps] = useSlot('noOptions', {
    className: classes.noOptions,
    elementType: AutocompleteNoOptions,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      role: 'presentation',
      onMouseDown: (event: React.MouseEvent<HTMLLIElement>) => {
        // Prevent input blur when interacting with the "no options" content
        event.preventDefault();
      },
    },
  });

  const [SlotLimitTag, limitTagProps] = useSlot('limitTag', {
    className: classes.limitTag,
    elementType: AutocompleteLimitTag,
    externalForwardedProps,
    ownerState,
  });

  if (limitTags > -1 && Array.isArray(selectedOptions)) {
    const more = selectedOptions.length - limitTags;
    if (!focused && more > 0) {
      selectedOptions = selectedOptions.splice(0, limitTags);
      selectedOptions.push(
        <SlotLimitTag key={selectedOptions.length} {...limitTagProps}>
          {getLimitTagsText(more)}
        </SlotLimitTag>,
      );
    }
  }

  const [SlotOption, baseOptionProps] = useSlot('option', {
    className: classes.option,
    elementType: AutocompleteOption,
    externalForwardedProps,
    ownerState,
    getSlotOwnerState: (mergedProps) => ({
      variant: mergedProps.variant || 'plain',
      color: mergedProps.color || 'neutral',
      disableColorInversion: !listboxProps.disablePortal,
    }),
    additionalProps: {
      as: 'li',
    },
  });

  const defaultRenderOption = (optionProps: any, option: unknown) => (
    <SlotOption {...optionProps}>{getOptionLabel(option)}</SlotOption>
  );

  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option: unknown, index: number) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption({ ...baseOptionProps, ...optionProps }, option, {
      // `aria-selected` prop will always by boolean, see useAutocomplete hook.
      selected: !!optionProps['aria-selected'],
      inputValue,
      ownerState,
    });
  };

  // Wait for `listboxProps` because `slotProps.listbox` could be a function.
  const modifiers = React.useMemo(
    () => [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
      ...(listboxProps.modifiers || []),
    ],
    [listboxProps.modifiers],
  );

  let popup = null;
  if (anchorEl) {
    popup = (
      <ListProvider nested>
        <SlotListbox
          {...listboxProps}
          className={clsx(
            listboxProps.className,
            listboxProps.ownerState?.color === 'context' && autocompleteClasses.colorContext,
          )}
          // @ts-ignore internal logic (too complex to typed PopperOwnProps to SlotListbox but this should be removed when we have `usePopper`)
          modifiers={modifiers}
          {...(!props.slots?.listbox && {
            as: Popper,
            slots: { root: listboxProps.as || 'ul' },
          })}
        >
          {groupedOptions.map((option, index) => {
            if (groupBy) {
              const typedOption = option as AutocompleteGroupedOption;
              return renderGroup({
                key: String(typedOption.key),
                group: typedOption.group,
                children: typedOption.options.map((option2, index2) =>
                  renderListOption(option2, typedOption.index + index2),
                ),
              });
            }
            return renderListOption(option, index);
          })}
          {loading && groupedOptions.length === 0 ? (
            <SlotLoading {...loadingProps}>{loadingText}</SlotLoading>
          ) : null}
          {groupedOptions.length === 0 && !freeSolo && !loading ? (
            <SlotNoOptions {...noOptionsProps}>{noOptionsText}</SlotNoOptions>
          ) : null}
        </SlotListbox>
      </ListProvider>
    );

    if (!listboxProps.disablePortal) {
      // For portal popup, the children should not inherit color inversion from the upper parent.
      popup = <ColorInversion.Provider value={undefined}>{popup}</ColorInversion.Provider>;
    }
  }

  return (
    <React.Fragment>
      <SlotRoot {...rootProps}>
        {startDecorator && (
          <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
        )}

        <SlotWrapper {...wrapperProps}>
          {selectedOptions}
          <SlotInput {...inputProps} />
        </SlotWrapper>
        {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}
        {hasClearIcon ? (
          <SlotClearIndicator {...clearIndicatorProps}>{clearIcon}</SlotClearIndicator>
        ) : null}
        {hasPopupIcon ? (
          <SlotPopupIndicator {...popupIndicatorProps}>{popupIcon}</SlotPopupIndicator>
        ) : null}
      </SlotRoot>
      {popup}
    </React.Fragment>
  );
}) as AutocompleteComponent;

interface AutocompleteComponent {
  <
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
  >(
    props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  ): JSX.Element;
  propTypes?: any;
}

Autocomplete.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby': PropTypes.string,
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label': PropTypes.string,
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="md" />
   */
  clearIcon: PropTypes.node,
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Clear'
   */
  clearText: PropTypes.string,
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue: chainPropTypes(PropTypes.any, (props) => {
    if (props.multiple && props.defaultValue !== undefined && !Array.isArray(props.defaultValue)) {
      return new Error(
        [
          'MUI: The Autocomplete expects the `defaultValue` prop to be an array when `multiple={true}` or undefined.',
          `However, ${props.defaultValue} was provided.`,
        ].join('\n'),
      );
    }
    return null;
  }),
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for this input.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * A function that determines the filtered options to be rendered on search.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions: PropTypes.func,
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.bool]),
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo: PropTypes.bool,
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {string | number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more: string | number) => `+${more}`
   */
  getLimitTagsText: PropTypes.func,
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {T} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled: PropTypes.func,
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * If used in free solo mode, it must accept both the type of the options and a string.
   *
   * @param {T} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel: PropTypes.func,
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The options to group.
   * @returns {string}
   */
  groupBy: PropTypes.func,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id: PropTypes.string,
  /**
   * The input value.
   */
  inputValue: PropTypes.string,
  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality by default.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {T} option The option to test.
   * @param {T} value The value to test against.
   * @returns {boolean}
   */
  isOptionEqualToValue: PropTypes.func,
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags: integerPropType,
  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, e.g. `options` are empty).
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Loading…'
   */
  loadingText: PropTypes.node,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'No options'
   */
  noOptionsText: PropTypes.node,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {T|T[]} value The new value of the component.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the highlight option changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {T} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`, `"touch"`.
   */
  onHighlightChange: PropTypes.func,
  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Open'
   */
  openText: PropTypes.string,
  /**
   * Array of options.
   */
  options: PropTypes.array.isRequired,
  /**
   * The input placeholder
   */
  placeholder: PropTypes.string,
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon: PropTypes.node,
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * Render the group.
   *
   * @param {AutocompleteRenderGroupParams} params The group to render.
   * @returns {ReactNode}
   */
  renderGroup: PropTypes.func,
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: PropTypes.func,
  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderTags: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
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
    clearIndicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    limitTag: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    loading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    noOptions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    option: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popupIndicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    wrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    clearIndicator: PropTypes.elementType,
    endDecorator: PropTypes.elementType,
    input: PropTypes.elementType,
    limitTag: PropTypes.elementType,
    listbox: PropTypes.elementType,
    loading: PropTypes.elementType,
    noOptions: PropTypes.elementType,
    option: PropTypes.elementType,
    popupIndicator: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
    wrapper: PropTypes.elementType,
  }),
  /**
   * Leading adornment for this input.
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
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: PropTypes.string,
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value: chainPropTypes(PropTypes.any, (props) => {
    if (props.multiple && props.value !== undefined && !Array.isArray(props.value)) {
      return new Error(
        [
          'MUI: The Autocomplete expects the `value` prop to be an array when `multiple={true}` or undefined.',
          `However, ${props.value} was provided.`,
        ].join('\n'),
      );
    }
    return null;
  }),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Autocomplete;
