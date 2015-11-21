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
      filter: (searchText, key, value) => key.includes(searchText),
    };
  },

  getInitialState() {
    return {
      searchText: this.props.searchText,
      open: this.props.open,
    };
  },
  
  componentWillMount(){
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



    if(Array.isArray(this.props.dataSource)){

      if(this.props.showAllItems && this.state.searchText === ''){
        this.requestsList = this.props.dataSource;
      }
      else{
        this.requestsList = this.props.dataSource.filter((s) => this.props.filter(this.state.searchText, s));
      }

    }
    else{
      let list = [];
      if(this.props.showAllItems && this.state.searchText === ''){
        for(let k in this.props.dataSource){
            list.push(this.props.dataSource[k]);
        }
      }
      else{
        for(let k in this.props.dataSource){
          if(this.props.filter(this.state.searchText, k, this.props.dataSource[k])){
            list.push(this.props.dataSource[k]);
          }
        }
      }
      this.requestsList = list;
    }


    let requestsList = this.requestsList;

    let menu = this.state.open && (this.state.searchText !== '' || showAllItems)
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
              if(!this.state.open && ( showAllItems ||
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
    let chosenRequest=this.requestsList[parseInt(child.key, 10)];

    let index = Array.isArray(dataSource) ? dataSource.indexOf(chosenRequest) :
                  Object.keys(dataSource).filter((key) => chosenRequest === dataSource[key])[0];
    
    this.setState({searchText: Array.isArray(dataSource) ? dataSource[index] : index});

    this.props.onNewRequest(chosenRequest, index, dataSource);

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
