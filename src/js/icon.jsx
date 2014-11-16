var React = require('react'),
  Classable = require('./mixins/classable.js');

var Icon = React.createClass({

  mixins: [Classable],

  propTypes: {
    icon: React.PropTypes.string
  },

  render: function() {
    var { icon, ...other } = this.props,
      isMuiCustomIcon = this.props.icon.indexOf('mui-icon') > -1,
      mdfiClassName = 'mdfi_' + this.props.icon.replace(/-/g, '_'),
      iconClassName = isMuiCustomIcon ? this.props.icon : mdfiClassName,
      classes = this.getClasses('mui-icon ' + iconClassName);

    return (
      <span {...other} className={classes}>
        <span className="mui-icon-highlight">&nbsp;</span>
      </span>
    );
  }

});

module.exports = Icon;