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
import getMuiTheme from './styles/getMuiTheme';
import warning from 'warning';

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
    triggerUpdateOnFocus: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

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
      menuCloseDelay: 200,
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

  componentWillUnmount() {
    clearTimeout(this.timerCloseId);
  },

  componentClickAway() {
    this.close();
    this.focusOnInput = false;
  },

  open() {
    this.setState({
      open: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
    });
  },

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

  updateRequests(searchText) {
    this.setState({
      searchText: searchText,
      open: true,
      anchorEl: ReactDOM.findDOMNode(this.refs.searchTextField),
    });

    this.focusOnInput = true;

    this.props.onUpdateInput(searchText, this.props.dataSource);
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

    this.setState({
      searchText: searchText,
    });

    this.props.onNewRequest(chosenRequest, index, dataSource);

    this.timerCloseId = setTimeout(() => {
      this.close();
    }, this.props.menuCloseDelay);
  },

  handleEnterKeyDown() {
    this.props.onNewRequest(this.state.searchText);

    this.timerCloseId = setTimeout(() => {
      this.close();
    }, this.props.menuCloseDelay);
  },

  handleKeyDown(event) {
    switch (event.keyCode) {
      case KeyCode.ESC:
        this.close();
        break;

      case KeyCode.DOWN:
        if (this.focusOnInput && this.state.open) {
          event.preventDefault();
          this.focusOnInput = false;
          this.open();
        }
        break;

      default:
        break;
    }
  },

  handleChange(event) {
    const value = event.target.value;
    this.updateRequests(value);
  },

  handleBlur() {
    if (this.focusOnInput && this.state.open) {
      this.refs.searchTextField.focus();
    }
  },

  handleFocus() {
    if (!this.state.open && (this.props.triggerUpdateOnFocus || this.requestsList > 0)) {
      this.updateRequests(this.state.searchText);
    }
    this.focusOnInput = true;
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
      ...other,
    } = this.props;

    const {
      open,
      anchorEl,
      searchText,
    } = this.state;

    const styles = {
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

    const requestsList = [];

    this.props.dataSource.map((item) => {
      switch (typeof item) {
        case 'string':
          if (this.props.filter(searchText, item, item)) {
            requestsList.push(item);
          }
          break;
        case 'object':
          if (typeof item.text === 'string') {
            if (this.props.filter(searchText, item.text, item)) {
              requestsList.push(item);
            }
          }
          break;
      }
    });

    this.requestsList = requestsList;

    const menu = open && requestsList.length > 0 ? (
      <Menu
        {...menuProps}
        ref="menu"
        key="dropDownMenu"
        autoWidth={false}
        onEscKeyDown={this.close}
        initiallyKeyboardFocused={false}
        onItemTouchTap={this.handleItemTouchTap}
        listStyle={this.mergeStyles(styles.list, listStyle)}
        style={this.mergeStyles(styles.menu, menuStyle)}
      >
        {
          requestsList.map((request, index) => {
            switch (typeof request) {
              case 'string':
                return (
                  <MenuItem
                    disableFocusRipple={disableFocusRipple}
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
                    disableFocusRipple: disableFocusRipple,
                  });
                }
                return React.cloneElement(request, {
                  key: index,
                  disableFocusRipple: disableFocusRipple,
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
        style={this.prepareStyles(this.mergeStyles(styles.root, style))}
        onKeyDown={this.handleKeyDown}
      >
        <div
          style={{
            width: '100%',
          }}
        >
          <TextField
            {...other}
            ref="searchTextField"
            value={searchText}
            onEnterKeyDown={this.handleEnterKeyDown}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            style={styles.input}
            floatingLabelText={floatingLabelText}
            hintText={(!hintText && !floatingLabelText) ? '' : hintText}
            fullWidth={true}
            multiLine={false}
            errorStyle={this.mergeStyles(styles.error, errorStyle)}
          />
        </div>
        <Popover
          style={popoverStyle}
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
