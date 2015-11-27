const React = require('react');
const ReactTransitionGroup = require('react-addons-transition-group');
const StylePropable = require('./mixins/style-propable');
const ClickAwayable = require('./mixins/click-awayable');
const KeyCode = require('./utils/key-code');
const TextField = require('./text-field');
const Menu = require('./menus/menu');
const MenuItem = require('./menus/menu-item');
const MenuDivider = require('./menus/menu-divider');

const AutoComplete = React.createClass({

  mixins: [
    StylePropable,
    ClickAwayable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    animated: React.PropTypes.bool,
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    errorStyle: React.PropTypes.object,
    hintText: React.PropTypes.string,
    searchText: React.PropTypes.string,
    dataSource: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    updateWhenFocused: React.PropTypes.bool,
    showAllItems: React.PropTypes.bool,
    menuStyle: React.PropTypes.object,
    listStyle: React.PropTypes.object,
    menuProps: React.PropTypes.object,
    menuCloseDelay: React.PropTypes.number,
    onUpdateInput: React.PropTypes.func,
    onNewRequest: React.PropTypes.func,
    filter: React.PropTypes.func,
    disableFocusRipple: React.PropTypes.bool,
    fullWidth: React.PropTypes.bool,
    touchTapCloseDelay: React.PropTypes.number,
    open: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
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
    this.setState({open:false});
    this.focusOnInput = false;
  },

  render() {
    let {
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
      ...other,
    } = this.props;

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
        top: this.props.floatingLabelText ? 64 : 40,
        left: 0,
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

    if (Array.isArray(this.props.dataSource)) {
      this.props.dataSource.map((item, index) => {
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
    }
    else {
      for (let k in this.props.dataSource) {
        if (displayFilter(this.state.searchText, k, this.props.dataSource[k])) {
          requestsList.push(this.props.dataSource[k]);
        }
      }
    }

    this.requestsList = requestsList;

    let menu = this.state.open && (this.state.searchText !== '' || showAllItems)
               && requestsList.length > 0 ? (
      <Menu
        {...menuProps}
        ref="menu"
        key="dropDownMenu"
        animated={animated}
        autoWidth={false}
        initiallyKeyboardFocused={false}
        onEscKeyDown={() => this.setState({open:false})}
        onItemTouchTap={this._handleItemTouchTap}
        listStyle={this.mergeAndPrefix(styles.list, listStyle)}
        openDirection="bottom-left"
        style={mergedMenuStyles}>
        {
          requestsList.map((request, index) => {
            switch (typeof request) {
              case 'string':
                return (<MenuItem
                          disableFocusRipple={this.props.disableFocusRipple}
                          innerDivStyle={{overflow:'hidden'}}
                          key={index}
                          value={request}
                          primaryText={request}
                          />);
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

    return (
      <div style={mergedRootStyles}
           onKeyDown={this._handleKeyDown}>
        <div
          style={{
            width:'100%',
          }}>
          <TextField
            {...other}
            ref="searchTextField"
            value={this.state.searchText}
            onEnterKeyDown={() => {
              setTimeout(() => {
                this.setState({open:false});
              }, this.props.touchTapCloseDelay);
              this.props.onNewRequest(this.state.searchText);
            }}
            onChange={(e) => {
              let searchText = e.target.value;
              this._updateRequests(searchText);
            }}
            onBlur={() => {
              if (this.focusOnInput && this.state.open)
                this.refs.searchTextField.focus();
            }}
            onFocus={() => {
              if (!this.state.open && ( showAllItems ||
                  this.props.updateWhenFocused || this.state.searchText !== '')) {
                this._updateRequests(this.state.searchText);
              }
              this.focusOnInput = true;
            }}

            {...textFieldProps} />
        </div>
          <ReactTransitionGroup>{menu}</ReactTransitionGroup>
      </div>
    );
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
      searchText:searchText,
      open: true,
    });

    this.focusOnInput = true;

    this.props.onUpdateInput(searchText, this.props.dataSource);

  },

  _handleItemTouchTap(e, child) {
    setTimeout(() => {
      this.setState({open:false});
    }, this.props.touchTapCloseDelay);

    let dataSource = this.props.dataSource;

    let chosenRequest, index, searchText;
    if (Array.isArray(dataSource)) {
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
    }
    else {
      chosenRequest = this.requestsList[parseInt(child.key, 10)];
      index = Object.keys(dataSource).filter((key) => chosenRequest === dataSource[key])[0];
      searchText = index;
    }

    this.setState({searchText: searchText});

    this.props.onNewRequest(chosenRequest, index, dataSource);

  },

  _handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.ESC:
        this.setState({open:false});
        break;
      case KeyCode.DOWN:
        if (this.focusOnInput && this.state.open) {
          e.preventDefault();
          this.focusOnInput = false;
          this.setState({open:true});
        }
        break;
      default:
        break;
    }
  },


});

AutoComplete.Item = MenuItem;
AutoComplete.Divider = MenuDivider;

module.exports = AutoComplete;
