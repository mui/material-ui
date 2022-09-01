import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { useAutocomplete, createFilterOptions } from '@mui/base/AutocompleteUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { useThemeProps } from '../styles';
import ClearIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import styled from '../styles/styled';
import Chip from '../Chip';
import { IconButtonRoot } from '../IconButton/IconButton';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import { ListRoot } from '../List/List';
import { ListItemButtonRoot } from '../ListItemButton/ListItemButton';
import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';

const useUtilityClasses = (ownerState) => {
  const {
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size,
  } = ownerState;

  const slots = {
    root: [
      'root',
      focused && 'focused',
      fullWidth && 'fullWidth',
      hasClearIcon && 'hasClearIcon',
      hasPopupIcon && 'hasPopupIcon',
    ],
    inputRoot: ['inputRoot'],
    input: ['input', inputFocused && 'inputFocused'],
    tag: ['tag', `tagSize${capitalize(size)}`],
    endAdornment: ['endAdornment'],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    popper: ['popper', disablePortal && 'popperDisablePortal'],
    paper: ['paper'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    option: ['option'],
    groupLabel: ['groupLabel'],
    groupUl: ['groupUl'],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, {});
};

const AutocompleteRoot = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ ownerState }) => ({
  [`&.${autocompleteClasses.focused} .${autocompleteClasses.clearIndicator}`]: {
    visibility: 'visible',
  },
  /* Avoid double tap issue on iOS */
  '@media (pointer: fine)': {
    [`&:hover .${autocompleteClasses.clearIndicator}`]: {
      visibility: 'visible',
    },
  },
  ...(ownerState.fullWidth && {
    width: '100%',
  }),
  [`& .${autocompleteClasses.tag}`]: {
    margin: 3,
    maxWidth: 'calc(100% - 6px)',
    ...(ownerState.size === 'small' && {
      margin: 2,
      maxWidth: 'calc(100% - 4px)',
    }),
  },
  [`& .${autocompleteClasses.inputRoot}`]: {
    flexWrap: 'wrap',
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4,
    },
    [`& .${autocompleteClasses.input}`]: {
      width: 0,
      minWidth: 30,
    },
  },
  // [`& .${inputClasses.root}`]: {
  //   paddingBottom: 1,
  //   '& .MuiInput-input': {
  //     padding: '4px 4px 4px 0px',
  //   },
  // },
  // [`& .${inputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
  //   [`& .${inputClasses.input}`]: {
  //     padding: '2px 4px 3px 0',
  //   },
  // },
  // [`& .${outlinedInputClasses.root}`]: {
  //   padding: 9,
  //   [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
  //     paddingRight: 26 + 4 + 9,
  //   },
  //   [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
  //     paddingRight: 52 + 4 + 9,
  //   },
  //   [`& .${autocompleteClasses.input}`]: {
  //     padding: '7.5px 4px 7.5px 6px',
  //   },
  //   [`& .${autocompleteClasses.endAdornment}`]: {
  //     right: 9,
  //   },
  // },
  // [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
  //   // Don't specify paddingRight, as it overrides the default value set when there is only
  //   // one of the popup or clear icon as the specificity is equal so the latter one wins
  //   paddingTop: 6,
  //   paddingBottom: 6,
  //   paddingLeft: 6,
  //   [`& .${autocompleteClasses.input}`]: {
  //     padding: '2.5px 4px 2.5px 6px',
  //   },
  // },
  // [`& .${filledInputClasses.root}`]: {
  //   paddingTop: 19,
  //   paddingLeft: 8,
  //   [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
  //     paddingRight: 26 + 4 + 9,
  //   },
  //   [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
  //     paddingRight: 52 + 4 + 9,
  //   },
  //   [`& .${filledInputClasses.input}`]: {
  //     padding: '7px 4px',
  //   },
  //   [`& .${autocompleteClasses.endAdornment}`]: {
  //     right: 9,
  //   },
  // },
  // [`& .${filledInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
  //   paddingBottom: 1,
  //   [`& .${filledInputClasses.input}`]: {
  //     padding: '2.5px 4px',
  //   },
  // },
  // [`& .${inputBaseClasses.hiddenLabel}`]: {
  //   paddingTop: 8,
  // },
  [`& .${autocompleteClasses.input}`]: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0,
    ...(ownerState.inputFocused && {
      opacity: 1,
    }),
  },
}));

const AutocompleteEndAdornment = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'EndAdornment',
  overridesResolver: (props, styles) => styles.endAdornment,
})({
  // We use a position absolute to support wrapping tags.
  position: 'absolute',
  right: 0,
  top: 'calc(50% - 14px)', // Center vertically
});

const AutocompleteClearIndicator = styled(IconButtonRoot, {
  name: 'JoyAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})({
  marginRight: -2,
  padding: 4,
  visibility: 'hidden',
});

const AutocompletePopupIndicator = styled(IconButtonRoot, {
  name: 'JoyAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: (props, styles) => styles.popupIndicator,
})(({ ownerState }) => ({
  padding: 2,
  marginRight: -2,
  ...(ownerState.popupOpen && {
    transform: 'rotate(180deg)',
  }),
}));

const AutocompletePopper = styled(ListRoot, {
  name: 'JoyAutocomplete',
  slot: 'Popper',
  overridesResolver: (props, styles) => styles.popper,
})(({ theme, ownerState }) => ({
  '--List-radius': theme.vars.radius.sm,
  '--List-item-stickyBackground': theme.vars.palette.background.surface, // for sticky List
  '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)', // negative amount of the List's padding block
  zIndex: 1200,
  ...scopedVariables,
  boxShadow: theme.vars.shadow.md,
  overflow: 'auto',
  maxHeight: '40vh',
}));

const AutocompleteLoading = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading,
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px',
}));

const AutocompleteNoOptions = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px',
}));

const AutocompleteListbox = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: '8px 0',
  maxHeight: '40vh',
  overflow: 'auto',
  // [`& .${autocompleteClasses.option}`]: {
  //   minHeight: 48,
  //   display: 'flex',
  //   overflow: 'hidden',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   cursor: 'pointer',
  //   paddingTop: 6,
  //   boxSizing: 'border-box',
  //   outline: '0',
  //   WebkitTapHighlightColor: 'transparent',
  //   paddingBottom: 6,
  //   paddingLeft: 16,
  //   paddingRight: 16,
  //   [theme.breakpoints.up('sm')]: {
  //     minHeight: 'auto',
  //   },
  //   [`&.${autocompleteClasses.focused}`]: {
  //     // backgroundColor: (theme.vars || theme).palette.action.hover,
  //     // Reset on touch devices, it doesn't add specificity
  //     '@media (hover: none)': {
  //       backgroundColor: 'transparent',
  //     },
  //   },
  //   '&[aria-disabled="true"]': {
  //     // opacity: (theme.vars || theme).palette.action.disabledOpacity,
  //     pointerEvents: 'none',
  //   },
  //   [`&.${autocompleteClasses.focusVisible}`]: {
  //     // backgroundColor: (theme.vars || theme).palette.action.focus,
  //   },
  //   // '&[aria-selected="true"]': {
  //   //   backgroundColor: theme.vars
  //   //     ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
  //   //     : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  //   //   [`&.${autocompleteClasses.focused}`]: {
  //   //     backgroundColor: theme.vars
  //   //       ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
  //   //       : alpha(
  //   //           theme.palette.primary.main,
  //   //           theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
  //   //         ),
  //   //     // Reset on touch devices, it doesn't add specificity
  //   //     '@media (hover: none)': {
  //   //       backgroundColor: (theme.vars || theme).palette.action.selected,
  //   //     },
  //   //   },
  //   //   [`&.${autocompleteClasses.focusVisible}`]: {
  //   //     backgroundColor: theme.vars
  //   //       ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
  //   //       : alpha(
  //   //           theme.palette.primary.main,
  //   //           theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
  //   //         ),
  //   //   },
  //   // },
  // },
}));

const AutocompleteGroupLabel = styled('li', {
  name: 'JoyAutocomplete',
  slot: 'GroupLabel',
  overridesResolver: (props, styles) => styles.groupLabel,
})(({ theme }) => ({
  backgroundColor: theme.vars.palette.background.surface,
  top: -8,
}));

const AutocompleteGroupUl = styled('ul', {
  name: 'JoyAutocomplete',
  slot: 'GroupUl',
  overridesResolver: (props, styles) => styles.groupUl,
})({
  padding: 0,
  [`& .${autocompleteClasses.option}`]: {
    paddingLeft: 24,
  },
});

const Autocomplete = React.forwardRef(function Autocomplete(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyAutocomplete',
  });

  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    ChipProps,
    className,
    clearIcon = <ClearIcon fontSize="md" />,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = 'Clear',
    closeText = 'Close',
    componentsProps = {},
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterOptions,
    filterSelectedOptions = false,
    forcePopupIcon = 'auto',
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionDisabled,
    getOptionLabel = (option) => option.label ?? option,
    isOptionEqualToValue,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    limitTags = -1,
    ListboxComponent = 'ul',
    ListboxProps,
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
    openOnFocus = false,
    openText = 'Open',
    options,
    popupIcon = <ArrowDropDownIcon />,
    readOnly = false,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = 'md',
    value: valueProp,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({ ...props, componentName: 'Autocomplete' });

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
  };

  const classes = useUtilityClasses(ownerState);

  let startDecorator;

  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => ({
      className: classes.tag,
      disabled,
      ...getTagProps(params),
    });

    if (renderTags) {
      startDecorator = renderTags(value, getCustomizedTagProps, ownerState);
    } else {
      startDecorator = value.map((option, index) => (
        <Chip size={size} {...getCustomizedTagProps({ index })} {...ChipProps}>
          {getOptionLabel(option)}
        </Chip>
      ));
    }
  }

  if (limitTags > -1 && Array.isArray(startDecorator)) {
    const more = startDecorator.length - limitTags;
    if (!focused && more > 0) {
      startDecorator = startDecorator.splice(0, limitTags);
      startDecorator.push(
        <span className={classes.tag} key={startDecorator.length}>
          {getLimitTagsText(more)}
        </span>,
      );
    }
  }

  const defaultRenderGroup = (params) => (
    <ListItemButtonRoot
      as="li"
      ownerState={{ ...ownerState, variant: 'plain', color: 'neutral' }}
      key={params.key}
    >
      <AutocompleteGroupLabel
        className={classes.groupLabel}
        ownerState={ownerState}
        component="div"
      >
        {params.group}
      </AutocompleteGroupLabel>
      <AutocompleteGroupUl className={classes.groupUl} ownerState={ownerState}>
        {params.children}
      </AutocompleteGroupUl>
    </ListItemButtonRoot>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => (
    <ListItemButtonRoot
      as="li"
      ownerState={{ ...ownerState, variant: 'plain', color: 'neutral' }}
      {...props2}
    >
      {getOptionLabel(option)}
    </ListItemButtonRoot>
  );
  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption({ ...optionProps, className: classes.option }, option, {
      selected: optionProps['aria-selected'],
      inputValue,
    });
  };

  return (
    <React.Fragment>
      <AutocompleteRoot
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...getRootProps(other)}
      >
        {renderInput({
          id,
          disabled,
          fullWidth: true,
          size: size === 'sm' ? 'sm' : undefined,
          InputLabelProps: getInputLabelProps(),
          InputProps: {
            ref: setAnchorEl,
            className: classes.inputRoot,
            startDecorator,
            ...((hasClearIcon || hasPopupIcon) && {
              endDecorator: (
                <AutocompleteEndAdornment className={classes.endAdornment} ownerState={ownerState}>
                  {hasClearIcon ? (
                    <AutocompleteClearIndicator
                      {...getClearProps()}
                      aria-label={clearText}
                      title={clearText}
                      ownerState={ownerState}
                      {...componentsProps.clearIndicator}
                      className={clsx(
                        classes.clearIndicator,
                        componentsProps.clearIndicator?.className,
                      )}
                    >
                      {clearIcon}
                    </AutocompleteClearIndicator>
                  ) : null}

                  {hasPopupIcon ? (
                    <AutocompletePopupIndicator
                      {...getPopupIndicatorProps()}
                      disabled={disabled}
                      aria-label={popupOpen ? closeText : openText}
                      title={popupOpen ? closeText : openText}
                      ownerState={ownerState}
                      {...componentsProps.popupIndicator}
                      className={clsx(
                        classes.popupIndicator,
                        componentsProps.popupIndicator?.className,
                      )}
                    >
                      {popupIcon}
                    </AutocompletePopupIndicator>
                  ) : null}
                </AutocompleteEndAdornment>
              ),
            }),
          },
          inputProps: {
            className: classes.input,
            disabled,
            readOnly,
            ...getInputProps(),
          },
        })}
      </AutocompleteRoot>
      {anchorEl ? (
        <PopperUnstyled
          component={AutocompletePopper}
          disablePortal={disablePortal}
          style={{
            width: anchorEl ? anchorEl.clientWidth : null,
          }}
          ownerState={ownerState}
          anchorEl={anchorEl}
          open={popupOpen}
          {...componentsProps.popper}
          {...getListboxProps()}
          className={clsx(classes.popper, componentsProps.popper?.className)}
        >
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
                return renderGroup({
                  key: option.key,
                  group: option.group,
                  children: option.options.map((option2, index2) =>
                    renderListOption(option2, option.index + index2),
                  ),
                });
              }
              return renderListOption(option, index);
            })}
            {/* {groupedOptions.length > 0 ? (
              <AutocompleteListbox
                as={ListboxComponent}
                className={classes.listbox}
                ownerState={ownerState}
                {...getListboxProps()}
                {...ListboxProps}
              >
                {groupedOptions.map((option, index) => {
                  if (groupBy) {
                    return renderGroup({
                      key: option.key,
                      group: option.group,
                      children: option.options.map((option2, index2) =>
                        renderListOption(option2, option.index + index2),
                      ),
                    });
                  }
                  return renderListOption(option, index);
                })}
              </AutocompleteListbox>
            ) : null} */}
          </ListProvider>
        </PopperUnstyled>
      ) : null}
    </React.Fragment>
  );
});

Autocomplete.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Autocomplete;
