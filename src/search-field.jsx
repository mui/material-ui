const React = require('react');
const ReactTransitionGroup = require('react-addons-transition-group');
const StylePropable = require('./mixins/style-propable');
const ClickAwayable = require('./mixins/click-awayable');
const TextField = require('./text-field');
const Menu = require('./menus/menu');
const MenuItem = require('./menus/menu-item');

const SearchField = React.createClass({

  mixins: [
    StylePropable,
    ClickAwayable,
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
    listStyle: React.PropTypes.object,
    menuProps: React.PropTypes.object,
    menuCloseDelay: React.PropTypes.number,
    onUpdateRequests: React.PropTypes.func,
    onNewSearchRequest: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      fullWidth: false,
      open: false,
      searchText: '',
      menuCloseDelay: 100,

      onChange: () => {},
      onUpdateRequests: () => {},
      onNewRequest: () => {},
    };
  },

  getInitialState() {
    return {
      searchText: this.props.searchText,
      requestsList: null,
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
      style,
      errorStyle,
      floatingLabelText,
      hintText,
      fullWidth,
      menuStyle,
      menuProps,
      listStyle,
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
        top: 40,
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


    let menu = this.state.open && this.state.searchText !== '' && requestsList ? (
      <Menu
        {...menuProps}
        ref="menu"
        key="dropDownMenu"
        animated={true}
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
                          disableFocusRipple={true}
                          key={index}
                          value={request}
                          primaryText={request}
                          />);
              case 'object':
                return request;
              default:
                return null;
            }
          })
        }
      </Menu>
    ) : null;

    return (
      <div style={mergedRootStyles}
           onKeyDown={(e)=>{
            switch(e.keyCode){
              case 27: //esc
                this.setState({open:false});
                break;
              case 40: //down arrow
                if(this.focusOnInput && this.state.open){
                  e.preventDefault();
                  this.focusOnInput = false;
                  this.setState({open:true});
                }
                break;
              default:
                break;
            }
          }}>
        <div
          style={{
            widht:'100%',
          }}>
          <TextField
            {...other}
            ref="searchTextField"
            value={this.state.searchText}
            onEnterKeyDown={()=>{
                 setTimeout(() => {
                   this.state({open:false});
                 }, this.props.touchTapCloseDelay);
                this.props.onNewRequest(this.state.searchText);
            }}
            onChange={
              this._handleSearchTextChange
            }
            onBlur={()=>{
              if(this.focusOnInput && this.state.open)
                this.refs.searchTextField.focus();
            }}
            onFocus={()=>{
              if(!this.state.open && this.searchText !== ''){
                this.updateRequests(this.state.searchText);
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

  _handleSearchTextChange(e){

    let searchText = e.target.value;

    this.updateRequests(searchText);
  },

  updateRequests(searchText){
    let requestsListPromise = new Promise((resolve, reject) => {
      let list = this.props.onUpdateRequests(searchText);
      if(list){
        resolve(list);
      }
      else{
        reject();
      }
    });

    requestsListPromise.then(list => {
      this.focusOnInput = true;
      this.setState({
        searchText:searchText,
        requestsList:list,
        open: true,
      });
    }, ()=>{
      this.setState({
        searchText:searchText,
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

});

module.exports = SearchField;
