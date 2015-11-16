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
    dataSource: React.PropTypes.array,
    updateWhenFocused: React.PropTypes.bool,
    auto: React.PropTypes.bool,
    menuStyle: React.PropTypes.object,
    listStyle: React.PropTypes.object,
    menuProps: React.PropTypes.object,
    menuCloseDelay: React.PropTypes.number,
    onUpdateInput: React.PropTypes.func,
    onNewRequest: React.PropTypes.func,
    disableFocusRipple: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      animated: true,
      fullWidth: false,
      open: false,
      auto: false,
      searchText: '',
      menuCloseDelay: 100,
      disableFocusRipple: true,
      updateWhenFocused: false,
      onUpdateInput: () => {},
      onNewRequest: () => {},
    };
  },

  getInitialState() {
    return {
      searchText: this.props.searchText,
      requestsList: this.props.dataSource && this.props.auto
                      ? this.props.dataSource : null,
      open: this.props.open,
    };
  },
  
  componentWillMount(){
    this.focusOnInput = false;
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
      listStyle,
      auto,
      ...other,
    } = this.props;

    let requestsList = this.state.requestsList;

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
        top: this.props.floatingLabelText? 64 : 40,
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


    let menu = this.state.open && (this.state.searchText !== '' || auto)
               && requestsList && requestsList.length > 0 ? (
      <Menu
        {...menuProps}
        ref="menu"
        key="dropDownMenu"
        animated={animated}
        autoWidth={false}
        initiallyKeyboardFocused={false}
        onEscKeyDown={()=>this.setState({open:false})}
        onItemTouchTap={this._handleItemTouchTap}
        listStyle={this.mergeAndPrefix(styles.list, listStyle)}
        openDirection="bottom-left"
        style={mergedMenuStyles}>
        {
          requestsList.map((request, index) => {
            switch(typeof request){
              case 'string':
                return (<MenuItem
                          disableFocusRipple={this.props.disableFocusRipple}
                          innerDivStyle={{overflow:'hidden'}}
                          key={index}
                          value={request}
                          primaryText={request}
                          />);
              case 'object':
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
            onEnterKeyDown={()=>{
                 setTimeout(() => {
                   this.setState({open:false});
                 }, this.props.touchTapCloseDelay);
                this.props.onNewRequest(this.state.searchText);
            }}
            onChange={(e)=>{
                let searchText = e.target.value;
                this._updateRequests(searchText);
            }}
            onBlur={()=>{
              if(this.focusOnInput && this.state.open)
                this.refs.searchTextField.focus();
            }}
            onFocus={()=>{
              if(!this.state.open && ( auto ||
                  this.props.updateWhenFocused || this.state.searchText !== '')){
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

  _updateRequests(searchText){

    this.setState({
      searchText:searchText,
    });
    this.focusOnInput = true;

    if(this.props.dataSource){
      this.props.onUpdateInput(searchText);

      let list = this.props.dataSource.filter((v) => v.includes(searchText));

      if(this.props.auto && searchText === ''){
        list = this.props.dataSource;
      }
      this.setState({
        requestsList: list,
        open: true,
      })

      return;
    }


    let requestsListPromise = new Promise((resolve, reject) => {
      let list = this.props.onUpdateInput(searchText, this.state.requestsList);
      if(list){
        resolve(list);
      }
      else{
        reject();
      }
    });

    requestsListPromise.then(list => {
      this.setState({
        requestsList:list,
        open: true,
      });
    }, ()=>{
      this.setState({
        requestsList:null,
        open: false,
      });
    });
  },

  _handleItemTouchTap(e, child) {
    setTimeout(() => {
      this.setState({open:false});
    }, this.props.touchTapCloseDelay);

    let index=parseInt(child.key, 10);

    let chosenRequest=this.state.requestsList[index];
    this.setState({searchText:typeof chosenRequest === 'string' ?
          chosenRequest : chosenRequest.props.value});
    this.props.onNewRequest(chosenRequest, index, this.state.requestsList);

  },

  _handleKeyDown(e){
   switch(e.keyCode){
     case KeyCode.ESC:
       this.setState({open:false});
       break;
     case KeyCode.DOWN:
       if(this.focusOnInput && this.state.open){
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
