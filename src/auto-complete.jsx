import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import StylePropable from './mixins/style-propable';
import ClickAwayable from './mixins/click-awayable';
import KeyCode from './utils/key-code';
import ColorManipulator from './utils/color-manipulator';
import TextField from './text-field';
import List from './lists/list';
import ListItem from './lists/list-item';
import ListDivider from './lists/list-divider';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const AutoComplete = React.createClass({

  mixins: [
    StylePropable,
    ClickAwayable,
  ],

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    animated: React.PropTypes.bool, // deprecating because related to <Menu />
    dataSource: React.PropTypes.array,
    disableFocusRipple: React.PropTypes.bool, // deprecating because related to <Menu />
    errorStyle: React.PropTypes.object,
    errorText: React.PropTypes.string,
    filter: React.PropTypes.func,
    floatingLabelText: React.PropTypes.string,
    fullWidth: React.PropTypes.bool,
    hintText: React.PropTypes.string,
    listStyle: React.PropTypes.object,
    menuCloseDelay: React.PropTypes.number, // deprecating because related to <Menu />
    menuProps: React.PropTypes.object, // deprecating because related to <Menu />
    menuStyle: React.PropTypes.object, // deprecating because related to <Menu />
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onNewRequest: React.PropTypes.func,
    onUpdateInput: React.PropTypes.func,
    open: React.PropTypes.bool,
    searchText: React.PropTypes.string,
    showAllItems: React.PropTypes.bool,
    style: React.PropTypes.object,
    touchTapCloseDelay: React.PropTypes.number,
    updateWhenFocused: React.PropTypes.bool,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      open: this.props.open,
      searchText: this.props.searchText,
    };
  },

  componentWillReceiveProps: function(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
    /*
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText,
      });
    }*/

    // this._filterOptions(this.state.searchText);
  },

  componentWillMount() {
  },

  componentClickAway() {
    this.setState({open:false});
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
      name,
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
      list: {
        maxHeight: 200,
        overflowY: 'auto',
        position: 'absolute',
        width: this.props.fullWidth ? '100%' : 256,
        zIndex: 10,
      },
    };

    let textFieldProps = {
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle),
      floatingLabelText: floatingLabelText,
      fullWidth: true,
      hintText: (!hintText && !floatingLabelText) ? '' : hintText,
      multiLine: false,
      name: name,
      style: this.mergeAndPrefix(styles.input, style),
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    const textColor = this.state.muiTheme.rawTheme.palette.textColor;
    const hoverColor = ColorManipulator.fade(textColor, 0.1);

    let menu = this.state.open && (this.state.searchText !== '' || showAllItems)
      && this.state.filteredOptions.length > 0 ? (
      <List
        key="dropDownMenu"
        ref="menu"
        style={this.mergeAndPrefix(styles.list, listStyle)}
        zDepth={1}>
        {this.state.filteredOptions.map((option, index) => {
          const hoverStyle = (index === this.state.focusedOption) ? {backgroundColor: hoverColor} : {};
          return <ListItem
            disableKeyboardFocus={true}
            key={option.value}
            onTouchTap={(e) => this._handleTouchTap(e, index)}
            primaryText={option.text}
            style={hoverStyle}
            value={index} />;
        })}
      </List>
    ) : null;

    return (
      <div
        style={mergedRootStyles}>
        <TextField
          {...other}
          {...textFieldProps}
          onChange={this._handleInputOnChange}
          onBlur={this._handleInputOnBlur}
          onFocus={this._handleInputOnFocus}
          onKeyDown={this._handleInputOnKeyDown}
          ref="searchTextField"
          value={this.state.searchText}
           />
        <ReactTransitionGroup>{menu}</ReactTransitionGroup>
      </div>
    );
  },

  setValue(textValue) {
    this.setState({
      focusedOption: -1,
      open: false,
      value: textValue,
      searchText: textValue,
    });

    if (this.props.onChange) this.props.onChange(textValue);
    if (this.props.onUpdateInput) this.props.onUpdateInput(textValue);
  },

  getValue() {
    return this.state.value;
  },

  _updateRequests(searchText) {
    this._filterOptions(searchText);
  },

  _filterOptions(searchText) {
    const {dataSource, showAllItems} = this.props;
    const filteredOptions = [];
    const displayFilter = showAllItems ? () => true : this.props.filter;

    dataSource.map((item, index) => {
      switch (typeof item) {
        case 'string':
          if (displayFilter(searchText, item, index)) {
            filteredOptions.push({
              'text': item,
              'value': index,
            });
          }
          break;
        case 'object':
          if (displayFilter(searchText, item.text, item.value)) {
            filteredOptions.push(item);
          }
          break;
      }
    });

    this.setState({
      open: true,
      searchText: searchText,
      filteredOptions,
    });
  },

  _handleInputOnKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.ENTER:
        e.preventDefault();
        if (this.state.focusedOption !== undefined) {
          const selection = this.state.filteredOptions[this.state.focusedOption].text;
          this.setValue(selection);
        }
      case KeyCode.ESC:
        this.setState({open:false});
        break;
      case KeyCode.TAB:
        this.setState({open:false});
        break;
      case KeyCode.DOWN:
        e.preventDefault();
        if (this.state.focusedOption !== undefined || this.state.focusedOption < 0) {
          this.setState({
            focusedOption: this.state.focusedOption < this.state.filteredOptions.length - 1
              ? ++this.state.focusedOption : 0,
            open: true,
          });
        } else {
          this.setState({
            focusedOption: 0,
            open: true,
          });
        }
        break;
      case KeyCode.UP:
        e.preventDefault();
        if (this.state.focusedOption !== undefined) {
          this.setState({
            focusedOption: this.state.focusedOption > 0
              ? --this.state.focusedOption : this.state.filteredOptions.length - 1,
            open: true,
          });
        }
        break;
    }
  },

  _handleInputOnChange(e) {
    const searchText = e.target.value;
    this._filterOptions(searchText);
    if (this.props.onUpdateInput) this.props.onUpdateInput(searchText, e);
  },

  _handleInputOnBlur(e) {
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleInputOnFocus(e) {
    const {showAllItems} = this.props;
    if (showAllItems) {
      this._filterOptions(this.state.searchText);
    }
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleTouchTap(e, index) {
    const selection = this.state.filteredOptions[index].text;
    this.setValue(selection);
  },

});

AutoComplete.Item = ListItem;
AutoComplete.Divider = ListDivider;

export default AutoComplete;
