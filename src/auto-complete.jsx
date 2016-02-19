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
     * Function used to filter the auto complete.
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
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function that is fired when the `TextField` gains focus.
     */
    onFocus: React.PropTypes.func,

    /**
     * Gets called when list item is clicked or pressed enter.
     */
    onNewRequest: React.PropTypes.func,

    /**
     * Gets called each time the user updates the text field.
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
      filter: (searchText, key) => searchText !== '' && key.includes(searchText),
      fullWidth: false,
      open: false,
      openOnFocus: false,
      onUpdateInput: () => {},
      onNewRequest: () => {},
      searchText: '',
      menuCloseDelay: 200,
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
    clearTimeout(this.timerBlurCloseId);
  },

  componentClickAway() {
    this.close();
  },

  timerTouchTapCloseId: undefined,
  timerBlurCloseId: undefined,

  close() {
    this.setState({
      open: false,
      anchorEl: null,
    });
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

  handleItemTouchTap(event, child) {
    const dataSource = this.props.dataSource;
    let chosenRequest;
    let index;
    let searchText;

    if (typeof dataSource[0] === 'string') {
      chosenRequest = this.requestsList[parseInt(child.key, 10)];
      index = dataSource.indexOf(chosenRequest);
      searchText = dataSource[index];
    } else {
      chosenRequest = child.key;
      index = dataSource.indexOf(
        dataSource.filter((item) => chosenRequest === item.text)[0]);
      searchText = chosenRequest;
    }

    this.props.onNewRequest(chosenRequest, index);

    clearTimeout(this.timerBlurCloseId);
    this.timerTouchTapCloseId = setTimeout(() => {
      this.setState({
        searchText: searchText,
      });
      this.close();
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
    // Run asynchronously to wait for a potential handleItemTouchTap() call.
    // The blur event occurs first on a click device and after on a touch device.
    if (this.state.focusTextField) {
      this.timerBlurCloseId = setTimeout(() => {
        this.close();
      }, 0);
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

    dataSource.every((item) => {
      switch (typeof item) {
        case 'string':
          if (this.props.filter(searchText, item, item)) {
            requestsList.push(item);
          }
          break;

        case 'object':
          if (item && typeof item.text === 'string') {
            if (this.props.filter(searchText, item.text, item)) {
              requestsList.push(item);
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
        zDepth={0}
        disableAutoFocus={focusTextField}
        onEscKeyDown={this.close}
        initiallyKeyboardFocused={false}
        onItemTouchTap={this.handleItemTouchTap}
        listStyle={Object.assign(styles.list, listStyle)}
        style={Object.assign(styles.menu, menuStyle)}
      >
        {
          requestsList.map((request, index) => {
            switch (typeof request) {
              case 'string':
                return (
                  <MenuItem
                    disableFocusRipple={disableFocusRipple}
                    innerDivStyle={styles.innerDiv}
                    key={index}
                    value={request}
                    primaryText={request}
                  />
                );

              case 'object':
                if (typeof request.text === 'string') {
                  return React.cloneElement(request.value, {
                    key: request.text,
                    disableFocusRipple: disableFocusRipple,
                  });
                }

                return React.cloneElement(request, {
                  disableFocusRipple: disableFocusRipple,
                });

              default:
                return null;
            }
          })
        }
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
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          useLayerForClickAway={false}
          onRequestClose={this.close}
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
  return searchText !== '' && key.includes(searchText);
};

AutoComplete.caseInsensitiveFilter = (searchText, key) => {
  return key.toLowerCase().includes(searchText.toLowerCase());
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
