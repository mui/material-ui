var React = require('react');
var Colors = require('../styles/colors');
var StylePropable = require('../mixins/style-propable');

var ToolbarGroup = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    float: React.PropTypes.string,
    firstChild: React.PropTypes.bool,
    lastChild: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      float: 'left',
    };
  },

  /** Styles for certain mui components */
  _dropDownMenu: function() {
    var style = {
      main: {
        float: 'left',
        color: Colors.lightBlack,// removes hover color change, we want to keep it
        display: 'inline-block',
        marginRight: this.getSpacing(),
      },
      controlBg: {  
        backgroundColor: this.getTheme().menuHoverColor,
        borderRadius: 0,
      },
      underline: {
        display: 'none',
      }
    };

    return style;
  },

  _button: function (){
    var marginVertical = (this.getTheme().height - this.context.theme.component.button.height) / 2;
    var marginHorizontal = this.getSpacing();
    return {
      float: 'left',
      margin: marginVertical + 'px ' + marginHorizontal + 'px',
      position: 'relative',
    };
  },

  _icon: function() {
    return {
      main: {
        float: 'left',
        cursor: 'pointer',
        color: this.getTheme().iconColor,
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getSpacing(),
      },
      hover: {
        zIndex: 1,
        color: Colors.darkBlack,
      }
    };
  },

  _span: function() {
    return {
        float: 'left',
        color: this.getTheme().iconColor,
        lineHeight: this.getTheme().height + 'px',
      };
  },

  getTheme: function() {
    return this.context.theme.component.toolbar;
  },

  getSpacing: function() {
    return this.context.theme.spacing.desktopGutter;
  },

  render: function() {

    var styles = this.mergeAndPrefix({
      position: 'relative',
      float: this.props.float,
    });

    if (this.props.firstChild) styles.marginLeft = -24;
    if (this.props.lastChild) styles.marginRight = -24;

    React.Children.forEach(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'DropDownMenu' : 
          currentChild.props.style = this._dropDownMenu().main;
          currentChild.props.styleControlBg = this._dropDownMenu().controlBg;
          currentChild.props.styleUnderline = this._dropDownMenu().underline;
          break;
        case 'DropDownIcon' :
          currentChild.props.style = {float: 'left'};
          currentChild.props.iconStyle = this._icon().main;
          currentChild.props.hoverStyle = this._icon().hover;
          break;
        case 'RaisedButton' : case 'FlatButton' :
          currentChild.props.style = this._button();
          break;
        case 'FontIcon' : 
          currentChild.props.style = this._icon().main;
          currentChild.props.hoverStyle = this._icon().hover;
          break;
        case 'ToolbarSeparator' : case 'ToolbarTitle' :
          currentChild.props.style = this._span();
          break;
      }
    }, this);

    return (
      <div className={this.props.className} style={styles}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = ToolbarGroup;
