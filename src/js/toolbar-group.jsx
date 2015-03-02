var React = require('react');
var Classable = require('./mixins/classable');
var StylePropable = require('./mixins/style-propable');
var CustomVariables = require('./styles/variables/custom-variables');

var ToolbarGroup = React.createClass({

  propTypes: {
    float: React.PropTypes.string
  },

  mixins: [Classable],

  render: function() {

    var classes = this.getClasses('mui-toolbar-group', {
      'mui-left': this.props.float === 'left',
      'mui-right': this.props.float === 'right'
    });

    // Styles for certain children mui components
    var dropDownMenuMain = {
      // color: CustomVariables.colors.lightBlack,
      display: 'inline-block',
      marginRight: CustomVariables.spacing.desktopGutter,
    }

    var dropDownMenuControlBg = {        
      backgroundColor: CustomVariables.toolbarMenuHoverColor,
      borderRadius: 0,
    };

    var dropDownMenuUnderline = {display: 'none'};

    React.Children.forEach(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'DropDownMenu' : 
            // currentChild.props.style = dropDownMenuMain;
            currentChild.props.styleControlBg = dropDownMenuControlBg;
            currentChild.props.styleUnderline = dropDownMenuUnderline;
          break;
      }
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = ToolbarGroup;
