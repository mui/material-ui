import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/base/composeClasses';
import { useAutocomplete, AutocompleteGroupedOption } from '@mui/base/AutocompleteUnstyled';
import PopperUnstyled, { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { useThemeProps } from '../styles';
import ClearIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import styled from '../styles/styled';
// slot components
import { IconButtonRoot } from '../IconButton/IconButton';
import { ListRoot } from '../List/List';
// default render components
import Chip, { chipClasses } from '../Chip';
import ChipDelete from '../ChipDelete';
import { IconButtonOwnerState } from '../IconButton';
import Input, { inputClasses } from '../Input';
import List, { listClasses } from '../List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import ListSubheader from '../ListSubheader';
import ListItem, { listItemClasses } from '../ListItem';
import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';
import {
  AutocompleteProps,
  AutocompleteRenderGroupParams,
  AutocompleteRenderGetTagProps,
  AutocompleteOwnerState,
} from './AutocompleteProps';
import FormControlContext from '../FormControl/FormControlContext';
import AutocompleteOption from '../AutocompleteOption';

type OwnerState = Omit<AutocompleteOwnerState<any, any, any, any>, 'onChange'>;

const defaultIsActiveElementInListbox = (listboxRef: React.RefObject<HTMLElement>) =>
  listboxRef.current !== null && listboxRef.current.contains(document.activeElement);
const defaultGetOptionLabel = <T extends unknown>(option: T) =>
  (option as { label: string }).label ?? option;
const defaultLimitTagsText = (more: string | number) => `+${more}`;
const defaultRenderInput = (params: any) => <Input {...params} />;
const defaultRenderGroup = (params: AutocompleteRenderGroupParams) => (
  <ListItem key={params.key} nested>
    <ListSubheader sticky>{params.group}</ListSubheader>
    <List>{params.children}</List>
  </ListItem>
);

const useUtilityClasses = (ownerState: OwnerState) => {
  const { focused, fullWidth, hasClearIcon, hasPopupIcon, popupOpen } = ownerState;

  const slots = {
    root: [
      'root',
      focused && 'focused',
      fullWidth && 'fullWidth',
      hasClearIcon && 'hasClearIcon',
      hasPopupIcon && 'hasPopupIcon',
    ],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    limitTag: ['limitTag'],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, {});
};

const AutocompleteRoot = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: OwnerState }>(({ ownerState }) => {
  let endDecoratorCount = 0;
  if (ownerState.hasClearIcon) {
    endDecoratorCount += 1;
  }
  if (ownerState.hasPopupIcon) {
    endDecoratorCount += 1;
  }
  return [
    {
      '--Autocomplete-endDecorator-count': endDecoratorCount,
      ...(ownerState.fullWidth && {
        width: '100%',
      }),
      /* Avoid double tap issue on iOS */
      '@media (pointer: fine)': {
        [`&:hover .${autocompleteClasses.clearIndicator}`]: {
          visibility: 'visible',
        },
      },
      [`& .${inputClasses.root}`]: {
        paddingInlineEnd: `calc(var(--Autocomplete-endDecorator-count, 0) * var(--Input-decorator-childHeight) + 2 * var(--_Input-paddingBlock))`,
      },
      [`& .${inputClasses.input}`]: {
        minWidth: 30,
        minHeight: 'calc(var(--Input-minHeight) - 2 * var(--variant-borderWidth, 0px))',
      },
      [`& .${inputClasses.endDecorator}`]: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 'var(--Input-paddingInline)',
      },
    },
    ownerState.multiple && {
      [`& .${inputClasses.root}`]: {
        flexWrap: 'wrap',
        paddingInlineStart: 0,
        paddingBlockEnd: 'var(--_Input-paddingBlock)',
      },
      [`& .${inputClasses.startDecorator}`]: {
        display: 'contents',
        color: 'inherit',
      },
      [`& .${inputClasses.input}`]: {
        marginInlineStart: 'var(--Input-paddingInline)',
        marginBlockEnd: 'calc(-1 * var(--_Input-paddingBlock))',
      },
      [`& .${chipClasses.root}`]: {
        // TODO: use flexbox `gap` on the root slot later.
        marginInlineStart: 'var(--_Input-paddingBlock)',
        marginBlockStart: 'var(--_Input-paddingBlock)',
      },
    },
  ];
});

const AutocompleteClearIndicator = styled(IconButtonRoot, {
  name: 'JoyAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})<{ ownerState: OwnerState & IconButtonOwnerState }>(({ ownerState }) => ({
  ...(!ownerState.freeSolo && {
    marginInlineEnd: 0, // prevent the automatic adjustment between Input and IconButtonRoot
  }),
  visibility: ownerState.focused ? 'visible' : 'hidden',
}));

const AutocompletePopupIndicator = styled(IconButtonRoot, {
  name: 'JoyAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: (props, styles) => styles.popupIndicator,
})<{ ownerState: OwnerState & IconButtonOwnerState }>(({ ownerState }) => ({
  ...(ownerState.popupOpen && {
    transform: 'rotate(180deg)',
  }),
}));

const AutocompleteListbox = styled(ListRoot, {
  name: 'JoyAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--_outline-inside': '1', // to prevent the focus outline from being cut by overflow
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.surface,
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)',
    ...scopedVariables,
    boxShadow: theme.vars.shadow.md,
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
    zIndex: 1200,
    overflow: 'auto',
    maxHeight: '40vh',
    position: 'relative', // to make sure that the listbox is positioned for grouped options to work.
    [`& .${listItemClasses.nested}, & .${listItemClasses.nested} .${listClasses.root}`]: {
      // For grouped options autocomplete:
      // Force the position to make the scroll into view logic works because the `element.offsetTop` should reference to the listbox, not the grouped list.
      // See the implementation of the `useAutocomplete` line:370
      //
      // Resource: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
      position: 'initial',
    },
  };
});

const AutocompleteLoading = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px',
}));

const AutocompleteNoOptions = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px',
}));

const AutocompleteLimitTag = styled('span', {
  name: 'JoyAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})<{ ownerState: OwnerState }>({
  marginInlineStart: 'calc(var(--Input-paddingInline) / 2)',
  marginBlockStart: 'var(--_Input-paddingBlock)',
});

const Autocomplete = React.forwardRef(function Autocomplete(
  inProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyAutocomplete',
  });

  const {
    className,
    clearIcon = <ClearIcon fontSize="md" />,
    clearText = 'Clear',
    closeText = 'Close',
    componentsProps = {},
    disableClearable = false,
    disabled = false,
    disablePortal = false,
    filterOptions,
    forcePopupIcon = 'auto',
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = defaultLimitTagsText,
    getOptionDisabled,
    getOptionLabel = defaultGetOptionLabel,
    isOptionEqualToValue,
    groupBy,
    inputValue: inputValueProp,
    limitTags = -1,
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
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
    renderInput = defaultRenderInput,
    renderOption: renderOptionProp,
    renderTags,
    size: sizeProp = 'md',
    value: valueProp,
    ...otherProps
  } = props;
  const other = {} as Record<string, any>;
  Object.entries(otherProps).forEach((item) => {
    if (
      !item[0].match(
        // Do not spread these props to the root DOM
        /^(autoComplete|autoHighlight|autoSelect|blurOnSelect|clearOnBlur|clearOnEscape|defaultValue|disableCloseOnSelect|disabledItemsFocusable|disableListWrap|filterSelectedOptions|handleHomeEndKeys|includeInputInList|openOnFocus|selectOnFocus)$/,
      )
    ) {
      other[item[0]] = item[1];
    }
  });

  const formControl = React.useContext(FormControlContext);
  const size = inProps.size ?? formControl?.size ?? sizeProp;

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
    id: formControl?.htmlFor,
    componentName: 'Autocomplete',
    _classNamePrefix: 'Joy',
    _isActiveElementInListbox: defaultIsActiveElementInListbox,
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  // If you modify this, make sure to keep the `AutocompleteOwnerState` type in sync.
  const ownerState = {
    ...props,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size,
  } as OwnerState;

  const classes = useUtilityClasses(ownerState);

  let startDecorator;

  if (multiple && (value as Array<unknown>).length > 0) {
    const getCustomizedTagProps: AutocompleteRenderGetTagProps = (params) => ({
      disabled,
      size,
      ...getTagProps(params),
    });

    if (renderTags) {
      startDecorator = renderTags(value as Array<unknown>, getCustomizedTagProps, ownerState);
    } else {
      startDecorator = (value as Array<unknown>).map((option, index) => {
        const { onDelete, ...tagProps } = getCustomizedTagProps({ index });
        return (
          <Chip
            size={size}
            variant="soft"
            color="neutral"
            endDecorator={<ChipDelete onClick={onDelete} />}
            {...tagProps}
          >
            {getOptionLabel(option)}
          </Chip>
        );
      });
    }
  }

  if (limitTags > -1 && Array.isArray(startDecorator)) {
    const more = startDecorator.length - limitTags;
    if (!focused && more > 0) {
      startDecorator = startDecorator.splice(0, limitTags);
      startDecorator.push(
        <AutocompleteLimitTag key={startDecorator.length} ownerState={ownerState}>
          {getLimitTagsText(more)}
        </AutocompleteLimitTag>,
      );
    }
  }

  const defaultRenderOption = (optionProps: any, option: unknown) => (
    // Can't use `useSlotProps`
    <AutocompleteOption {...optionProps}>{getOptionLabel(option)}</AutocompleteOption>
  );

  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option: unknown, index: number) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption(optionProps, option, {
      // `aria-selected` prop will always by boolean, see useAutocomplete hook.
      selected: !!optionProps['aria-selected'],
      inputValue,
      ownerState,
    });
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
    ],
    [],
  );

  const rootProps = useSlotProps({
    elementType: AutocompleteRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: componentsProps.root,
    ownerState,
    additionalProps: {
      ref,
    },
    className: classes.root,
  });

  const clearIndicatorProps = useSlotProps({
    elementType: AutocompleteClearIndicator,
    getSlotProps: getClearProps as unknown as () => React.HTMLAttributes<HTMLButtonElement>,
    externalSlotProps: componentsProps.clearIndicator,
    className: classes.clearIndicator,
    ownerState: {
      ...ownerState,
      size,
      variant: 'plain',
      color: 'neutral',
    },
    additionalProps: {
      'aria-label': clearText,
      title: clearText,
    },
  });

  const popupIndicatorProps = useSlotProps({
    elementType: AutocompletePopupIndicator,
    getSlotProps:
      getPopupIndicatorProps as unknown as () => React.HTMLAttributes<HTMLButtonElement>,
    externalSlotProps: componentsProps.popupIndicator,
    className: classes.popupIndicator,
    ownerState: {
      ...ownerState,
      size,
      variant: 'plain',
      color: 'neutral',
    },
    additionalProps: {
      disabled,
      'aria-label': popupOpen ? closeText : openText,
      title: popupOpen ? closeText : openText,
    },
  });

  const { component: listboxComponent, ...listboxProps } = useSlotProps({
    elementType: AutocompleteListbox,
    // TODO: fix useSlotProps typings, the `component` should be infered from `externalSlotProps`
    getSlotProps: getListboxProps as () => React.HTMLAttributes<HTMLUListElement> & {
      component?: React.ElementType;
    },
    externalSlotProps: componentsProps.listbox,
    additionalProps: {
      anchorEl,
      disablePortal,
      open: popupOpen,
      modifiers: cachedModifiers,
    },
    ownerState: {
      ...ownerState,
      variant: 'outlined',
      color: 'neutral',
      nesting: false,
      row: false,
      wrap: false,
    },
    className: classes.listbox,
  });

  return (
    <React.Fragment>
      <AutocompleteRoot {...rootProps}>
        {renderInput({
          disabled,
          fullWidth: true,
          size,
          ref: setAnchorEl,
          placeholder,
          startDecorator,
          ...((hasClearIcon || hasPopupIcon) && {
            endDecorator: (
              <React.Fragment>
                {hasClearIcon ? (
                  <AutocompleteClearIndicator {...clearIndicatorProps}>
                    {clearIcon}
                  </AutocompleteClearIndicator>
                ) : null}

                {hasPopupIcon ? (
                  <AutocompletePopupIndicator {...popupIndicatorProps}>
                    {popupIcon}
                  </AutocompletePopupIndicator>
                ) : null}
              </React.Fragment>
            ),
          }),
          componentsProps: {
            input: {
              disabled,
              readOnly,
              ...getInputProps(),
            },
          },
        })}
      </AutocompleteRoot>
      {anchorEl ? (
        <PopperUnstyled {...listboxProps} as={listboxComponent} component={AutocompleteListbox}>
          <ListProvider nested>
            {loading && groupedOptions.length === 0 ? (
              <AutocompleteLoading className={classes.loading} ownerState={ownerState}>
                {loadingText}
              </AutocompleteLoading>
            ) : null}
            {groupedOptions.length === 0 && !freeSolo && !loading ? (
              <AutocompleteNoOptions
                className={classes.noOptions}
                ownerState={ownerState}
                role="presentation"
                onMouseDown={(event) => {
                  // Prevent input blur when interacting with the "no options" content
                  event.preventDefault();
                }}
              >
                {noOptionsText}
              </AutocompleteNoOptions>
            ) : null}
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
          </ListProvider>
        </PopperUnstyled>
      ) : null}
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
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete: PropTypes.bool,
  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight: PropTypes.bool,
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   * @default false
   */
  autoSelect: PropTypes.bool,
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect: PropTypes.oneOfType([PropTypes.oneOf(['mouse', 'touch']), PropTypes.bool]),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon: PropTypes.node,
  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set to `true` if you want to help the user enter a new value.
   * Set to `false` if you want to help the user resume their search.
   * @default !props.freeSolo
   */
  clearOnBlur: PropTypes.bool,
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape: PropTypes.bool,
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
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    clearIndicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    loading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    noOptions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    option: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popupIndicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.bool,
  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: PropTypes.bool,
  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap: PropTypes.bool,
  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * A function that determines the filtered options to be rendered on search.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions: PropTypes.func,
  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions: PropTypes.bool,
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
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
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
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys: PropTypes.bool,
  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList: PropTypes.bool,
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
  limitTags: PropTypes.number,
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
   * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`.
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
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus: PropTypes.bool,
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
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: PropTypes.func,
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
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
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
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value: PropTypes.any,
} as any;

export default Autocomplete;
