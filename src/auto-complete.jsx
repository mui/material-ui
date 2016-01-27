import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import KeyCode from './utils/key-code';
import TextField from './text-field';
import Menu from './menus/menu';
import MenuItem from './menus/menu-item';
import Divider from './divider';
import Popover from './popover/popover';
import PropTypes from './utils/prop-types';
import deprecated from './utils/deprecatedPropType';
import getMuiTheme from './styles/getMuiTheme';

const AutoComplete = React.createClass({

  propTypes: {
    /**
     * Location of the anchor for the auto complete.
     */
    anchorOrigin: PropTypes.origin,

    /**
     * Whether or not the auto complete is animated as it is toggled.
     */
    animated: React.PropTypes.bool,

    /**
     * Array of strings or nodes used to populate the list.
     */
    dataSource: React.PropTypes.array,

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
     * Text being input to auto complete.
     */
    searchText: React.PropTypes.string,
    showAllItems: deprecated(React.PropTypes.bool,
      'showAllItems is deprecated, use noFilter instead'),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Origin for location of target.
     */
    targetOrigin: PropTypes.origin,

    /**
     * Delay for touch tap event closing of auto complete.
     */
    touchTapCloseDelay: React.PropTypes.number,

    /**
     * If true, will update when focus event triggers.
     */
    triggerUpdateOnFocus: React.PropTypes.bool,
    updateWhenFocused: deprecated(React.PropTypes.bool,
      'updateWhenFocused has been renamed to triggerUpdateOnFocus'),
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      animated: true,
      fullWidth: false,
      open: false,
      searchText: '',
      menuCloseDelay: 100,
      disableFocusRipple: true,
      onUpdateInput: () => {},
      onNewRequest: () => {},
      filter: (searchText, key) => searchText !== '' && key.includes(searchText),
      triggerUpdateOnFocus: false,
    };
  },

  getInitialState() {
    return {
      searchText: this.props.searchText,
      open: this.props.open,
      anchorEl: null,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    this.focusOnInput = false;
    this.requestsList = [];
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText,
      });
    }
  },

  componentClickAway() {
    this._close();
    this.focusOnInput = false;
  },

  _open() {
    this.setState({
      open: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
    });
  },

  _close() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  },

  setValue(textValue) {
    this.setState({
      searchText: textValue,
    });
  },

  getValue() {
    return this.state.searchText;
  },

  _updateRequests(searchText) {

    this.setState({
      searchText: searchText,
      open: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
    });

    this.focusOnInput = true;

    this.props.onUpdateInput(searchText, this.props.dataSource);

  },

  _handleItemTouchTap(e, child) {
    setTimeout(() => {
      this._close();
    }, this.props.touchTapCloseDelay);

    let dataSource = this.props.dataSource;

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

    this.setState({searchText: searchText});

    this.props.onNewRequest(chosenRequest, index, dataSource);

  },

  _handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.ESC:
        this._close();
        break;
      case KeyCode.DOWN:
        if (this.focusOnInput && this.state.open) {
          e.preventDefault();
          this.focusOnInput = false;
          this._open();
        }
        break;
      default:
        break;
    }
  },

  render() {
    let {
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
      ...other,
    } = this.props;

    const {open, anchorEl} = this.state;

    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
        width: this.props.fullWidth ? '100%' : 256,
      },
      input: {
      },
      error: {
      },
      menu: {
        width: '100%',
      },
      list: {
        display: 'block',
        width: this.props.fullWidth ? '100%' : 256,
      },
    };

    let textFieldProps = {
      style: this.mergeStyles(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: (!hintText && !floatingLabelText) ? '' : hintText,
      fullWidth: true,
      multiLine: false,
      errorStyle: this.mergeStyles(styles.error, errorStyle),
    };

    let mergedRootStyles = this.mergeStyles(styles.root, style);
    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let requestsList = [];

    this.props.dataSource.map((item) => {
      //showAllItems is deprecated, will be removed in the future
      if (this.props.showAllItems) {
        requestsList.push(item);
        return;
      }

      switch (typeof item) {
        case 'string':
          if (this.props.filter(this.state.searchText, item, item)) {
            requestsList.push(item);
          }
          break;
        case 'object':
          if (typeof item.text === 'string') {
            if (this.props.filter(this.state.searchText, item.text, item)) {
              requestsList.push(item);
            }
          }
          break;
      }
    });

    this.requestsList = requestsList;

    let menu = open && requestsList.length > 0 ? (
      <Menu
        {...menuProps}
        ref="menu"
        key="dropDownMenu"
        autoWidth={false}
        onEscKeyDown={this._close}
        initiallyKeyboardFocused={false}
        onItemTouchTap={this._handleItemTouchTap}
        listStyle={this.mergeStyles(styles.list, listStyle)}
        style={mergedMenuStyles}
      >
        {
          requestsList.map((request, index) => {
            switch (typeof request) {
              case 'string':
                return (
                  <MenuItem
                    disableFocusRipple={this.props.disableFocusRipple}
                    innerDivStyle={{overflow: 'hidden'}}
                    key={index}
                    value={request}
                    primaryText={request}
                  />
                );
              case 'object':
                if (typeof request.text === 'string') {
                  return React.cloneElement(request.value, {
                    key: request.text,
                    disableFocusRipple: this.props.disableFocusRipple,
                  });
                }
                return React.cloneElement(request, {
                  key: index,
                  disableFocusRipple: this.props.disableFocusRipple,
                });
              default:
                return null;
            }
          })
        }
      </Menu>
    ) : null;

    let popoverStyle;
    if (anchorEl && fullWidth) {
      popoverStyle = {width: anchorEl.clientWidth};
    }

    return (
      <div
        style={this.prepareStyles(mergedRootStyles)}
        onKeyDown={this._handleKeyDown}
      >
        <div
          style={{
            width: '100%',
          }}
        >
          <TextField
            {...other}
            ref="searchTextField"
            value={this.state.searchText}
            onEnterKeyDown={() => {
              setTimeout(() => {
                this._close();
              }, this.props.touchTapCloseDelay);
              this.props.onNewRequest(this.state.searchText);
            }}
            onChange={(e) => {
              let searchText = e.target.value;
              this._updateRequests(searchText);
            }}
            onBlur={() => {
              if (this.focusOnInput && open)
                this.refs.searchTextField.focus();
            }}
            onFocus={() => {
              if (!open && (this.props.triggerUpdateOnFocus
                || this.props.updateWhenFocused //this line will be removed in the future
                || this.requestsList > 0)) {
                this._updateRequests(this.state.searchText);
              }
              this.focusOnInput = true;
            }}

            {...textFieldProps}
          />
        </div>
        <Popover
          style={popoverStyle}
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          useLayerForClickAway={false}
          onRequestClose={this._close}
        >
          {menu}
        </Popover>
      </div>
    );
  },

});

AutoComplete.levenshteinDistance = (searchText, key) => {
  let current = [];
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
  if (distanceLessThan === undefined) return AutoComplete.levenshteinDistance;
  else if (typeof distanceLessThan !== 'number') {
    throw 'Error: AutoComplete.levenshteinDistanceFilter is a filter generator, not a filter!';
  }
  return (s, k) => AutoComplete.levenshteinDistance(s, k) < distanceLessThan;
};

AutoComplete.fuzzyFilter = (searchText, key) => {
  if (searchText.length === 0) return false;
  let subMatchKey = key.substring(0, searchText.length);
  let distance = AutoComplete.levenshteinDistance(searchText.toLowerCase(), subMatchKey.toLowerCase());
  return searchText.length > 3 ? distance < 2 : distance === 0;
};

AutoComplete.Item = MenuItem;
AutoComplete.Divider = Divider;

export default AutoComplete;
