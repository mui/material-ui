import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import useAutocomplete, { createFilterOptions } from '../useAutocomplete';

export { createFilterOptions };

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    '&:hover $clearIndicatorDirty, &$focused $clearIndicatorDirty': {
      visibility: 'visible',
    },
  },
  /* Pseudo-class applied to the root element if focused. */
  focused: {},
  /* Styles applied to the tag elements, e.g. the chips. */
  tag: {
    margin: theme.spacing(0.5),
  },
  /* Styles applied to the Input element. */
  inputRoot: {
    flexWrap: 'wrap',
    '&[class*="MuiOutlinedInput-root"]': {
      padding: 8,
      '& $input': {
        padding: '10.5px 6px',
      },
    },
    '&[class*="MuiFilledInput-root"]': {
      paddingTop: 21,
      '& $input': {
        paddingTop: 10,
      },
    },
  },
  /* Styles applied to the input element. */
  input: {
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    opacity: 0,
    textOverflow: 'ellipsis',
  },
  /* Styles applied to the input element if tag focused. */
  inputFocused: {
    opacity: 1,
  },
  /* Styles applied to the clear indictator. */
  clearIndicator: {
    marginRight: -2,
    padding: 4,
    color: theme.palette.action.active,
    visibility: 'hidden',
  },
  /* Styles applied to the clear indictator if the input is dirty. */
  clearIndicatorDirty: {},
  /* Styles applied to the popup indictator. */
  popupIndicator: {
    padding: 2,
    marginRight: -2,
    color: theme.palette.action.active,
  },
  /* Styles applied to the popup indictator if the popup is open. */
  popupIndicatorOpen: {
    transform: 'rotate(180deg)',
  },
  /* Styles applied to the popper element. */
  popper: {
    zIndex: theme.zIndex.modal,
  },
  /* Styles applied to the popper element if `disablePortal={true}`. */
  popperDisablePortal: {
    position: 'absolute',
  },
  /* Styles applied to the `Paper` component. */
  paper: {
    ...theme.typography.body1,
    margin: '4px 0',
    '& > ul': {
      maxHeight: '40vh',
      overflow: 'auto',
    },
  },
  /* Styles applied to the `listbox` component. */
  listbox: {
    listStyle: 'none',
    margin: 0,
    padding: '8px 0px',
    position: 'relative',
  },
  /* Styles applied to the loading wrapper. */
  loading: {
    color: theme.palette.text.secondary,
    padding: '14px 16px',
  },
  /* Styles applied to the no option wrapper. */
  noOptions: {
    color: theme.palette.text.secondary,
    padding: '14px 16px',
  },
  /* Styles applied to the option elements. */
  option: {
    minHeight: 48,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    paddingTop: 6,
    outline: '0',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.action.selected,
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
    '&[aria-disabled="true"]': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
    '&:active': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  /* Styles applied to the group's label elements. */
  groupLabel: {
    backgroundColor: theme.palette.background.paper,
    top: -8,
  },
  /* Styles applied to the group's ul elements. */
  groupUl: {
    padding: 0,
  },
});

function DisablePortal(props) {
  // eslint-disable-next-line react/prop-types
  const { popperRef, anchorEl, open, ...other } = props;
  return <div {...other} />;
}

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  /* eslint-disable no-unused-vars */
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    classes,
    className,
    clearOnEscape = false,
    clearText = 'Clear',
    closeIcon = <CloseIcon fontSize="small" />,
    closeText = 'Close',
    debug = false,
    defaultValue,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disableListWrap = false,
    disableOpenOnFocus = false,
    disablePortal = false,
    filterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel = x => x,
    groupBy,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    ListboxComponent = 'ul',
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
    noOptionsText = 'No options',
    onChange,
    onClose,
    onInputChange,
    onOpen,
    open,
    openText = 'Open',
    options = [],
    PaperComponent = Paper,
    PopperComponent: PopperComponentProp = Popper,
    popupIcon = <ArrowDropDownIcon />,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    value: valueProp,
    ...other
  } = props;
  /* eslint-enable no-unused-vars */

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });
  const PopperComponent = disablePortal ? DisablePortal : PopperComponentProp;

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
  } = useAutocomplete(props);

  let startAdornment;

  if (multiple && value.length > 0) {
    const getCustomizedTagProps = params => ({
      className: classes.tag,
      ...getTagProps(params),
    });

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map((option, index) => (
        <Chip label={getOptionLabel(option)} {...getCustomizedTagProps({ index })} />
      ));
    }
  }

  const defaultRenderGroup = params => (
    <li key={params.key}>
      <ListSubheader className={classes.groupLabel} component="div">
        {params.key}
      </ListSubheader>
      <ul className={classes.groupUl}>{params.children}</ul>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;
  const renderOption = renderOptionProp || getOptionLabel;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({ option, index });

    return (
      <li {...optionProps} className={classes.option}>
        {renderOption(option, {
          selected: optionProps['aria-selected'],
          inputValue,
        })}
      </li>
    );
  };

  return (
    <React.Fragment>
      <div
        ref={ref}
        className={clsx(
          classes.root,
          {
            [classes.focused]: focused,
          },
          className,
        )}
        {...getRootProps()}
        {...other}
      >
        {renderInput({
          id,
          disabled,
          InputLabelProps: getInputLabelProps(),
          InputProps: {
            ref: setAnchorEl,
            className: classes.inputRoot,
            startAdornment,
            endAdornment: (
              <React.Fragment>
                {disableClearable || disabled ? null : (
                  <IconButton
                    {...getClearProps()}
                    aria-label={clearText}
                    title={clearText}
                    className={clsx(classes.clearIndicator, {
                      [classes.clearIndicatorDirty]: dirty,
                    })}
                  >
                    {closeIcon}
                  </IconButton>
                )}

                {freeSolo ? null : (
                  <IconButton
                    {...getPopupIndicatorProps()}
                    disabled={disabled}
                    aria-label={popupOpen ? closeText : openText}
                    title={popupOpen ? closeText : openText}
                    className={clsx(classes.popupIndicator, {
                      [classes.popupIndicatorOpen]: popupOpen,
                    })}
                  >
                    {popupIcon}
                  </IconButton>
                )}
              </React.Fragment>
            ),
          },
          inputProps: {
            className: clsx(classes.input, {
              [classes.inputFocused]: focusedTag === -1,
            }),
            disabled,
            ...getInputProps(),
          },
        })}
      </div>
      {popupOpen && anchorEl ? (
        <PopperComponent
          className={clsx(classes.popper, {
            [classes.popperDisablePortal]: disablePortal,
          })}
          style={{
            width: anchorEl ? anchorEl.clientWidth : null,
          }}
          role="presentation"
          popperRef={popperRef}
          anchorEl={anchorEl}
          open
        >
          <PaperComponent className={classes.paper}>
            {loading ? <div className={classes.loading}>{loadingText}</div> : null}
            {groupedOptions.length === 0 && !freeSolo && !loading ? (
              <div className={classes.noOptions}>{noOptionsText}</div>
            ) : null}
            {groupedOptions.length > 0 ? (
              <ListboxComponent className={classes.listbox} {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                  if (groupBy) {
                    return renderGroup({
                      key: option.key,
                      children: option.options.map((option2, index2) =>
                        renderListOption(option2, option.index + index2),
                      ),
                    });
                  }
                  return renderListOption(option, index);
                })}
              </ListboxComponent>
            ) : null}
          </PaperComponent>
        </PopperComponent>
      ) : null}
    </React.Fragment>
  );
});

Autocomplete.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete: PropTypes.bool,
  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHighlight: PropTypes.bool,
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   */
  autoSelect: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   */
  clearOnEscape: PropTypes.bool,
  /**
   * Override the default text for the *clear* icon button.
   */
  clearText: PropTypes.string,
  /**
   * The icon to display in place of the default close icon.
   */
  closeIcon: PropTypes.node,
  /**
   * Override the default text for the *close popup* icon button.
   */
  closeText: PropTypes.string,
  /**
   * If `true`, the popup will ignore the blur event if the input if filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   */
  debug: PropTypes.bool,
  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the input can't be cleared.
   */
  disableClearable: PropTypes.bool,
  /**
   * If `true`, the popup won't close when a value is selected.
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the list box in the popup will not wrap focus.
   */
  disableListWrap: PropTypes.bool,
  /**
   * If `true`, the popup won't open on input focus.
   */
  disableOpenOnFocus: PropTypes.bool,
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * A filter function that determines the options that are eligible.
   *
   * @param {any[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {any[]}
   */
  filterOptions: PropTypes.func,
  /**
   * If `true`, hide the selected options from the list box.
   */
  filterSelectedOptions: PropTypes.bool,
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   */
  freeSolo: PropTypes.bool,
  /**
   * Used to determine the disabled state for a given option.
   */
  getOptionDisabled: PropTypes.func,
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   */
  getOptionLabel: PropTypes.func,
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {any} options The option to group.
   * @returns {string}
   */
  groupBy: PropTypes.func,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the highlight can move to the input.
   */
  includeInputInList: PropTypes.bool,
  /**
   * The input value.
   */
  inputValue: PropTypes.string,
  /**
   * The component used to render the listbox.
   */
  ListboxComponent: PropTypes.elementType,
  /**
   * If `true`, the component is in a loading state.
   */
  loading: PropTypes.bool,
  /**
   * Text to display when in a loading state.
   */
  loadingText: PropTypes.node,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Text to display when there are no options.
   */
  noOptionsText: PropTypes.node,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value
   */
  onInputChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * Control the popup` open state.
   */
  open: PropTypes.bool,
  /**
   * Override the default text for the *open popup* icon button.
   */
  openText: PropTypes.string,
  /**
   * Array of options.
   */
  options: PropTypes.array,
  /**
   * The component used to render the body of the popup.
   */
  PaperComponent: PropTypes.elementType,
  /**
   * The component used to position the popup.
   */
  PopperComponent: PropTypes.elementType,
  /**
   * The icon to display in place of the default popup icon.
   */
  popupIcon: PropTypes.node,
  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup: PropTypes.func,
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {any} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: PropTypes.func,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags: PropTypes.func,
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `getOptionSelected` prop.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiAutocomplete' })(Autocomplete);
