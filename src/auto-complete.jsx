import React from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import TextField from './text-field';
import Menu from './menus/menu';
import MenuItem from './menus/menu-item';
import Divider from './divider';
import Popover from './popover/popover';
import PropTypes from './utils/prop-types';
import getMuiTheme from './styles/getMuiTheme';
import warning from 'warning';
import deprecated from './utils/deprecatedPropType';

function getStyles(props, state) {
  const {
    anchorEl,
  } = state;

  const {
    fullWidth,
  } = props;

  const styles = {
    root: {
      display: 'inline-block',
      position: 'relative',
      width: fullWidth ? '100%' : 256,
    },
    menu: {
      width: '100%',
    },
    list: {
      display: 'block',
      width: fullWidth ? '100%' : 256,
    },
    innerDiv: {
      overflow: 'hidden',
    },
  };

  if (anchorEl && fullWidth) {
    styles.popover = {
      width: anchorEl.clientWidth,
    };
  }

  return styles;
}

const AutoComplete = React.createClass({

  propTypes: {
    /**
     * Location of the anchor for the auto complete.
     */
    anchorOrigin: PropTypes.origin,

    /**
     * If true, the auto complete is animated as it is toggled.
     */
    animated: React.PropTypes.bool,

    /**
     * Array of strings or nodes used to populate the list.
     */
    dataSource: React.PropTypes.array.isRequired,

    /**
     * Disables focus ripple when true.
     */
    disableFocusRipple: React.PropTypes.bool,

    /**
     * Override style prop for error.
     */
    errorStyle: React.PropTypes.object,

    /**
     * The error content to display.
     */
    errorText: React.PropTypes.string,

    /**
     * Callback function used to filter the auto complete.
     *
     * @param {string} searchText The text to search for within `dataSource`.
     * @param {string} key `dataSource` element, or `text` property on that element if it's not a string.
     * @returns {boolean} `true` indicates the auto complete list will include `key` when the input is `searchText`.
     */
    filter: React.PropTypes.func,

    /**
     * The content to use for adding floating label element.
     */
    floatingLabelText: React.PropTypes.string,

    /**
     * If true, the field receives the property `width: 100%`.
     */
    fullWidth: React.PropTypes.bool,

    /**
     * The hint content to display.
     */
    hintText: React.PropTypes.string,

    /**
     * Override style for list.
     */
    listStyle: React.PropTypes.object,

    /**
     * The max number of search results to be shown.
     * By default it shows all the items which matches filter.
     */
    maxSearchResults: React.PropTypes.number,

    /**
     * Delay for closing time of the menu.
     */
    menuCloseDelay: React.PropTypes.number,

    /**
     * Props to be passed to menu.
     */
    menuProps: React.PropTypes.object,

    /**
     * Override style for menu.
     */
    menuStyle: React.PropTypes.object,

    /**
     * Callback function that is fired when the `TextField` loses focus.
     *
     * @param {object} event `blur` event targeting the `TextField`.
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function that is fired when the `TextField` gains focus.
     *
     * @param {object} event `focus` event targeting the `TextField`.
     */
    onFocus: React.PropTypes.func,

    /**
     * Callback function that is fired when a list item is selected, or enter is pressed in the `TextField`.
     *
     * @param {string} chosenRequest Either the `TextField` input value, if enter is pressed in the `TextField`,
     * or the text value of the corresponding list item that was selected.
     * @param {number} index The index in `dataSource` of the list item selected, or `-1` if enter is pressed in the
     * `TextField`.
     */
    onNewRequest: React.PropTypes.func,

    /**
     * Callback function that is fired when the user updates the `TextField`.
     *
     * @param {string} searchText The auto-complete's `searchText` value.
     * @param {array} dataSource The auto-complete's `dataSource` array.
     */
    onUpdateInput: React.PropTypes.func,

    /**
     * Auto complete menu is open if true.
     */
    open: React.PropTypes.bool,

    /**
     * If true, the list item is showed when a focus event triggers.
     */
    openOnFocus: React.PropTypes.bool,

    /**
     * Text being input to auto complete.
     */
    searchText: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Origin for location of target.
     */
    targetOrigin: PropTypes.origin,

    /**
     * If true, will update when focus event triggers.
     */
    triggerUpdateOnFocus: deprecated(React.PropTypes.bool, 'Instead, use openOnFocus'),
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      animated: true,
      disableFocusRipple: true,
      filter: (searchText, key) => searchText !== '' && key.indexOf(searchText) !== -1,
      fullWidth: false,
      open: false,
      openOnFocus: false,
      onUpdateInput: () => {},
      onNewRequest: () => {},
      searchText: '',
      menuCloseDelay: 300,
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
    };
  },

  getInitialState() {
    return {
      searchText: this.props.searchText,
      open: this.props.open,
      anchorEl: null,
      muiTheme: this.context.muiTheme || getMuiTheme(),
      focusTextField: true,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    this.requestsList = [];
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText,
      });
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timerTouchTapCloseId);
  },

  timerTouchTapCloseId: null,

  close() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  },

  handleRequestClose() {
    // Only take into account the Popover clickAway when we are
    // not focusing the TextField.
    if (!this.state.focusTextField) {
      this.close();
    }
  },

  setValue(textValue) {
    warning(false, 'setValue() is deprecated, use the searchText property.');

    this.setState({
      searchText: textValue,
    });
  },

  getValue() {
    warning(false, 'getValue() is deprecated.');

    return this.state.searchText;
  },

  handleMouseDown(event) {
    // Keep the TextField focused
    event.preventDefault();
  },

  handleItemTouchTap(event, child) {
    const dataSource = this.props.dataSource;

    const index = parseInt(child.key, 10);
    const chosenRequest = dataSource[index];
    const searchText = typeof chosenRequest === 'string' ? chosenRequest : chosenRequest.text;

    this.props.onNewRequest(chosenRequest, index);

    this.timerTouchTapCloseId = setTimeout(() => {
      this.setState({
        searchText: searchText,
      });
      this.close();
      this.timerTouchTapCloseId = null;
    }, this.props.menuCloseDelay);
  },

  handleKeyDown(event) {
    switch (keycode(event)) {
      case 'enter':
        this.close();
        const searchText = this.state.searchText;
        if (searchText !== '') {
          this.props.onNewRequest(searchText, -1);
        }
        break;

      case 'esc':
        this.close();
        break;

      case 'down':
        event.preventDefault();
        this.setState({
          open: true,
          focusTextField: false,
          anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
        });
        break;

      default:
        break;
    }
  },

  handleChange(event) {
    const searchText = event.target.value;

    // Make sure that we have a new searchText.
    // Fix an issue with a Cordova Webview
    if (searchText === this.state.searchText) {
      return;
    }

    this.setState({
      searchText: searchText,
      open: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
    }, () => {
      this.props.onUpdateInput(searchText, this.props.dataSource);
    });
  },

  handleBlur(event) {
    if (this.state.focusTextField && this.timerTouchTapCloseId === null) {
      this.close();
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  },

  handleFocus(event) {
    if (!this.state.open && (this.props.triggerUpdateOnFocus || this.props.openOnFocus)) {
      this.setState({
        open: true,
        anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
      });
    }

    this.setState({
      focusTextField: true,
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  },

  blur() {
    this.refs.searchTextField.blur();
  },

  focus() {
    this.refs.searchTextField.focus();
  },

  render() {
    const {
      anchorOrigin,
      animated,
      style,
      errorStyle,
      floatingLabelText,
      hintText,
      fullWidth,
      menuStyle,
      menuProps,
      listStyle,
      targetOrigin,
      disableFocusRipple,
      triggerUpdateOnFocus,
      openOnFocus,
      maxSearchResults,
      dataSource,
      ...other,
    } = this.props;

    const {
      open,
      anchorEl,
      searchText,
      focusTextField,
      muiTheme: {
        prepareStyles,
      },
    } = this.state;

    const styles = getStyles(this.props, this.state);

    const requestsList = [];

    dataSource.every((item, index) => {
      switch (typeof item) {
        case 'string':
          if (this.props.filter(searchText, item, item)) {
            requestsList.push({
              text: item,
              value: (
                <MenuItem
                  innerDivStyle={styles.innerDiv}
                  value={item}
                  primaryText={item}
                  disableFocusRipple={disableFocusRipple}
                  key={index}
                />),
            });
          }
          break;

        case 'object':
          if (item && typeof item.text === 'string') {
            if (this.props.filter(searchText, item.text, item)) {
              if (item.value.type && (item.value.type.displayName === MenuItem.displayName ||
                 item.value.type.displayName === Divider.displayName)) {
                requestsList.push({
                  text: item.text,
                  value: React.cloneElement(item.value, {
                    key: index,
                    disableFocusRipple: this.props.disableFocusRipple,
                  }),
                });
              } else {
                requestsList.push({
                  text: item.text,
                  value: (
                    <MenuItem
                      innerDivStyle={styles.innerDiv}
                      primaryText={item.value}
                      disableFocusRipple={disableFocusRipple}
                      key={index}
                    />),
                });
              }
            }
          }
          break;
      }

      return !(maxSearchResults && maxSearchResults > 0 && requestsList.length === maxSearchResults);
    });

    this.requestsList = requestsList;

    const menu = open && requestsList.length > 0 && (
      <Menu
        {...menuProps}
        ref="menu"
        autoWidth={false}
        disableAutoFocus={focusTextField}
        onEscKeyDown={this.close}
        initiallyKeyboardFocused={false}
        onItemTouchTap={this.handleItemTouchTap}
        onMouseDown={this.handleMouseDown}
        listStyle={Object.assign(styles.list, listStyle)}
        style={Object.assign(styles.menu, menuStyle)}
      >
        {requestsList.map((i) => i.value)}
      </Menu>
    );

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} >
        <TextField
          {...other}
          ref="searchTextField"
          autoComplete="off"
          value={searchText}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          floatingLabelText={floatingLabelText}
          hintText={hintText}
          fullWidth={fullWidth}
          multiLine={false}
          errorStyle={errorStyle}
        />
        <Popover
          style={styles.popover}
          canAutoPosition={false}
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          useLayerForClickAway={false}
          onRequestClose={this.handleRequestClose}
          animated={animated}
        >
          {menu}
        </Popover>
      </div>
    );
  },

});

AutoComplete.levenshteinDistance = (searchText, key) => {
  const current = [];
  let prev;
  let value;

  for (let i = 0; i <= key.length; i++) {
    for (let j = 0; j <= searchText.length; j++) {
      if (i && j) {
        if (searchText.charAt(j - 1) === key.charAt(i - 1)) value = prev;
        else value = Math.min(current[j], current[j - 1], prev) + 1;
      } else {
        value = i + j;
      }
      prev = current[j];
      current[j] = value;
    }
  }
  return current.pop();
};

AutoComplete.noFilter = () => true;

AutoComplete.defaultFilter = AutoComplete.caseSensitiveFilter = (searchText, key) => {
  return searchText !== '' && key.indexOf(searchText) !== -1;
};

AutoComplete.caseInsensitiveFilter = (searchText, key) => {
  return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
};

AutoComplete.levenshteinDistanceFilter = (distanceLessThan) => {
  if (distanceLessThan === undefined) {
    return AutoComplete.levenshteinDistance;
  } else if (typeof distanceLessThan !== 'number') {
    throw 'Error: AutoComplete.levenshteinDistanceFilter is a filter generator, not a filter!';
  }

  return (s, k) => AutoComplete.levenshteinDistance(s, k) < distanceLessThan;
};

AutoComplete.fuzzyFilter = (searchText, key) => {
  if (searchText.length === 0) {
    return false;
  }

  const subMatchKey = key.substring(0, searchText.length);
  const distance = AutoComplete.levenshteinDistance(searchText.toLowerCase(), subMatchKey.toLowerCase());

  return searchText.length > 3 ? distance < 2 : distance === 0;
};

AutoComplete.Item = MenuItem;
AutoComplete.Divider = Divider;

export default AutoComplete;
