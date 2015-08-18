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
      onUpdateRequests: () => {},
      onNewRequest: () => {},
    };
  },

  getInitialState() {
    return {
      searchText: this.props.searchText,
      requestsList: null,
    };
  },

  componentWillMount(){
    this.open = this.props.open;
    this.focusOnInput = true;
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


    let menu = this.open && requestsList ? (
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
                          primaryText={request}
                          />);
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
                this.close();
                break;
              case 38: //up arrow
                if(this.focusOnInput){
                  this.focusOnInput = false;
                  this.open = true;
                  this.forceUpdate();
                }
                e.preventDefault();
                break;
              case 40: //down arrow
                if(this.focusOnInput){
                  this.focusOnInput = false;
                  this.open = true;
                  this.forceUpdate();
                }
                e.preventDefault();
                break;
              default:
                break;
            }
          }}>
        <div
          style={{
            widht:'100%',
          }}
          onClick={()=>{
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
              if(this.focusOnInput && this.open)
                this.refs.searchTextField.focus();
            }}
            onFocus={()=>{
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

  close() {
    this.open = false;
    this.forceUpdate();
  },

  open() {
    this.open = true;
    this.forceUpdate();
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
      this.focusOnInput = true;
      this.open = true;
      this.setState({
        searchText:searchText,
        requestsList:list,
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

    let index=parseInt(child.key,10);

    let chosenRequest=this.state.requestsList[index];
    this.setState({searchText:chosenRequest});
    this.props.onNewRequest(chosenRequest,index,this.state.requestsList);

  },

});

module.exports = SearchField;
