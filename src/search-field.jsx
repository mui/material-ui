let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let StylePropable = require('./mixins/style-propable');
let ClickAwayable = require('./mixins/click-awayable');
let TextField = require('./text-field');
let Menu = require('./menus/menu');
let MenuItem = require('./menus/menu-item');

let SearchField = React.createClass({

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
//      onUpdateRequests: (t) => {console.log(t); return [t,t+t,t+t+t];},
//      onNewRequest: (t) => {console.log('request:'+t);},
      onUpdateRequests: () => {},
      onNewRequest: () => {},
    };
  },

  getInitialState() {
    return {
      open: this.props.open,
      searchText: this.props.searchText,
      requestsList: null,
      focusOnTextField: true,
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
      menuStyle,
      menuProps,
      listStyle,
      ...other,
    } = this.props;

    let open = this.state.open;
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


    let menu = open && requestsList ? (
      <Menu
        {...menuProps}
        key="dropDownMenu"
        animated={true}
        autoWidth={false}
        initiallyKeyboardFocused={true}
        onEscKeyDown={()=>this.close()}
        onItemTouchTap={this._handleItemTouchTap}
        listStyle={this.mergeAndPrefix(styles.list,listStyle)}
        openDirection="bottom-left"
        style={mergedMenuStyles}>
        {
          requestsList.map((request,index) => {
            switch(typeof request){
              case 'string':
                return (<MenuItem
                          disableFocusRipple={true}
                          key={index}
                          value={request}
                          primaryText={request} />);
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
                this.setState({focusOnTextField:true});
                this.close();
                e.preventDefault();
                break;
              case 38: //up arrow
                if(this.state.focusOnTextField){
                  this.setState({focusOnTextField:false});
                }
                e.preventDefault();
                break;
              case 40: //down arrow
                if(this.state.focusOnTextField){
                  this.setState({focusOnTextField:false});
                }
                e.preventDefault();
                break;
            }
          }}>
        <div
          style={{
            widht:'100%',
          }}
          onClick={()=>{
            if(!open && this.state.focusOnTextField)
              this.updateRequests(this.state.searchText);
          }}>
          <TextField
            {...other}
            ref="searchTextField"
            value={this.state.searchText}
            onEnterKeyDown={()=>{
                setTimeout(() => {
                  this.close();
                }, this.props.touchTapCloseDelay);
                this.props.onNewRequest(this.state.searchText);
            }}
            onChange={
              this._handleSearchTextChange
            }
            onBlur={()=>{
              if(this.state.focusOnTextField)
                this.refs.searchTextField.focus();
            }}
            {...textFieldProps} />
        </div>
          <ReactTransitionGroup>{menu}</ReactTransitionGroup>
      </div>
    );
  },

  setValue(textValue,menu=false) {
    this.setState({
      open: menu,
      searchText: textValue,
    });
  },

  close() {
    this.setState({requestsList: false,focusOnTextField:true}, () => {
      this.refs.searchTextField.focus();
    });
  },

  _handleSearchTextChange(e){

    let searchText = e.target.value;

    this.updateRequests(searchText);
  },

  updateRequests(searchText){
    let requestsListPromise = new Promise(function(resolve,reject) {
      let list = this.props.onUpdateRequests(searchText);
      if(list){
        resolve(list);
      }
      else{
        reject();
      }
    }.bind(this));

    requestsListPromise.then(list => {
      this.setState({
        searchText:searchText,
        requestsList:list,
        open:true,
      });
    },()=>{
      this.setState({
        searchText:searchText,
        requestsList:null,
      });
      this.close();
    });
  },

  _handleItemTouchTap(e, child) {
    setTimeout(() => {
      this.close();
    }, this.props.touchTapCloseDelay);

    let chosenRequest=this.state.requestsList[child.key];
    this.setState({searchText:chosenRequest});
    this.props.onNewRequest(chosenRequest);

  },

});

module.exports = SearchField;
