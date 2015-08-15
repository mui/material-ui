let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let StylePropable = require('./mixins/style-propable');
let ClickAwayable = require('./mixins/click-awayable');
let TextField = require('./text-field');
let Menu = require('./menus/menu');
let MenuItem = require('./menus/menu-item');

let Events = require('./utils/events');
let debounce = require('./utils/debounce');

let SearchField = React.createClass({

  mixins: [
    StylePropable,
    ClickAwayable,
    React.addons.LinkedStateMixin,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    errorStyle: React.PropTypes.object,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    onChange: React.PropTypes.func,
    autoWidth: React.PropTypes.bool,
    menuStyle: React.PropTypes.object,
    menuProps: React.PropTypes.object,
    menuCloseDelay: React.PropTypes.number,
    updateDebounceTime: React.PropTypes.number,
    onUpdateRequests: React.PropTypes.func,
    onNewSearchRequest: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      fullWidth: false,
      open: false,
      searchText: '',
      menuCloseDelay: 100,
      updateDebounceTime: 500,

      onChange: () => {},
      onUpdateRequests: () => {},
      onNewRequest: () => {},
    };
  },

  getInitialState() {
    return {
      open: this.props.open,
      searchText: this.props.searchText,
      requestsList: null,
    };
  },

  componentClickAway() {
    this.close();
  },

  render() {
    let {
      style,
      errorStyle,
      floatingLabelText,
      hintText,
      fullWidth,
      errorText,
      id,
      menuStyle,
      menuProps,
      ...other,
    } = this.props;

    let open = this.state.open;
    let requestsList = this.state.requestsList;

    let styles = {
      input: {
        width: this.props.fullWidth ? '100%' : 256,
      },
      error: {

      },
      menu: {
        top: 12,
        left: 12,
        width: this.props.fullWidth ? '100%' : 256,
      },
    };

    let textFieldProps = {
      id: id,
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: (!hintText && !floatingLabelText) ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle),
    };

    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let menu = open && requestsList ? (
      <Menu
        {...menuProps}
        animated={true}
        initiallyKeyboardFocused={false}
        onEscKeyDown={()=>this.close(true)}
        onItemTouchTap={this._handleItemTouchTap}
        openDirection="bottom-left"
        value={this.state.searchText}
        style={mergedMenuStyles}>
        {
          requestsList.map(request => {
            /*eslint-disable */
            switch(typeof request){
              case 'string':
                return (<MenuItem
                          value={request}
                          primaryText={request} />);
              case 'object':
                if(request.value)
                  return request;
                // fall through
              default:
                return null;
            }
            /*eslint-enable */
          })
        }
      </Menu>
    ) : null;

    return (
      <div>
        <TextField
          {...other}
          ref="searchTextField"
          value={this.state.searchText}
          onChange={
            debounce(this._handleSearchTextChange,
              this.props.updateDebounceTime)
          }
          {...textFieldProps} />
        <ReactTransitionGroup>{menu}</ReactTransitionGroup>
      </div>
    );
  },

  open(textValue) {

    let newState = {
      open: true,
    };
    if(textValue){
        newState.searchText = textValue;
    }
    if (!this.state.open) {
      this.setState(newState);
    }
  },

  close(isESCKey) {
    if (this.state.open) {
      this.setState({open: false}, () => {
        if (isESCKey) {
          this.refs.searchTextField.focus();
        }
      });
    }
  },

  _handleSearchTextChange(e){

    let searchText = e.target.value;
    if(searchText!==''){
      let requestsList = this.props.onUpdateRequests(e.target.value);
      this.setState({requestsList:requestsList});
    }
    else {
      this.close(Events.isKeyboard(e));
    }

  },

  _handleItemTouchTap(e, child) {

    console.log(child);
    let isKeyboard = Events.isKeyboard(e);
    setTimeout(() => {
      this.close(isKeyboard);
    }, this.props.touchTapCloseDelay);

    this.refs.searchTextField.setValue(child.value);
    this.props.onNewRequest(child.value);

  },

});

module.exports = SearchField;
