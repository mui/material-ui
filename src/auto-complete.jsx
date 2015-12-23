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

const AutoComplete = React.createClass({

  mixins: [
    StylePropable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    anchorOrigin: PropTypes.origin,
    animated: React.PropTypes.bool,
    dataSource: React.PropTypes.array,
    disableFocusRipple: React.PropTypes.bool,
    errorStyle: React.PropTypes.object,
    errorText: React.PropTypes.string,
    filter: React.PropTypes.func,
    floatingLabelText: React.PropTypes.string,
    fullWidth: React.PropTypes.bool,
    hintText: React.PropTypes.string,
    listStyle: React.PropTypes.object,
    menuCloseDelay: React.PropTypes.number,
    menuProps: React.PropTypes.object,
    menuStyle: React.PropTypes.object,
    onNewRequest: React.PropTypes.func,
    onUpdateInput: React.PropTypes.func,
    open: React.PropTypes.bool,
    searchText: React.PropTypes.string,
    showAllItems: React.PropTypes.bool,
    style: React.PropTypes.object,
    targetOrigin: PropTypes.origin,
    touchTapCloseDelay: React.PropTypes.number,
    updateWhenFocused: React.PropTypes.bool,
  },

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
      showAllItems: false,
      searchText: '',
      menuCloseDelay: 100,
      disableFocusRipple: true,
      updateWhenFocused: false,
      onUpdateInput: () => {},
      onNewRequest: () => {},
      filter: (searchText, key) => key.includes(searchText),
    };
  },

  getInitialState() {
    return {
      searchText: this.props.searchText,
      open: this.props.open,
      anchorEl: null,
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText,
      });
    }
  },
  componentWillMount() {
    this.focusOnInput = false;
    this.requestsList = [];
  },

  componentClickAway() {
    this._close();
    this.focusOnInput = false;
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
      showAllItems,
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
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: (!hintText && !floatingLabelText) ? '' : hintText,
      fullWidth: true,
      multiLine: false,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle),
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let displayFilter = showAllItems ? () => true : this.props.filter;
    let requestsList = [];

    this.props.dataSource.map((item) => {
      switch (typeof item) {
        case 'string':
          if (displayFilter(this.state.searchText, item, item)) {
            requestsList.push(item);
          }
          break;
        case 'object':
          if (typeof item.text === 'string') {
            if (displayFilter(this.state.searchText, item.text, item.value)) {
              requestsList.push(item);
            }
            else if (item.display) {
              requestsList.push(item);
            }
          }
          break;
      }
    });

    this.requestsList = requestsList;

    let menu = open && (this.state.searchText !== '' || showAllItems)
               && requestsList.length > 0 ? (
      <Menu
        {...menuProps}
        ref="menu"
        key="dropDownMenu"
        autoWidth={false}
        onEscKeyDown={this._close}
        initiallyKeyboardFocused={false}
        onItemTouchTap={this._handleItemTouchTap}
        listStyle={this.mergeAndPrefix(styles.list, listStyle)}
        style={mergedMenuStyles}>
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
      <div style={mergedRootStyles}
        onKeyDown={this._handleKeyDown}>
        <div
          style={{
            width: '100%',
          }}>
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
              if (!open && ( showAllItems ||
                  this.props.updateWhenFocused || this.state.searchText !== '')) {
                this._updateRequests(this.state.searchText);
              }
              this.focusOnInput = true;
            }}

            {...textFieldProps} />
        </div>
        <Popover
          style={popoverStyle}
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          open={open}
          anchorEl={anchorEl}
          useLayerForClickAway={false}
          onRequestClose={this._close}>
            {menu}
        </Popover>
      </div>
    );
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

    let chosenRequest, index, searchText;
    if (typeof dataSource[0] === 'string') {
      chosenRequest = this.requestsList[parseInt(child.key, 10)];
      index = dataSource.indexOf(chosenRequest);
      searchText = dataSource[index];
    }
    else {
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


});

AutoComplete.Item = MenuItem;
AutoComplete.Divider = Divider;

export default AutoComplete;
