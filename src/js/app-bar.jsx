var React = require('react'),
  Classable = require('./mixins/classable.js'),
  IconButton = require('./icon-button.jsx'),
  Paper = require('./paper.jsx');

var AppBar = React.createClass({

  mixins: [Classable],

  propTypes: {
    onMenuIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    title : React.PropTypes.string,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    }
  },

  render: function() {
    var classes = this.getClasses('mui-app-bar'),
      title, menuIconButton;

    if (this.props.title) {
      title = <h1 className="mui-app-bar-title">{this.props.title}</h1>;
    }

    if (this.props.showMenuIconButton) {
      menuIconButton = (
        <IconButton
          className="mui-app-bar-navigation-icon-button"
          icon="navigation-menu"
          onTouchTap={this._onMenuIconButtonTouchTap}
        />
      );
    }

    return (
      <Paper rounded={false} className={classes} zDepth={this.props.zDepth}>
        {menuIconButton}
        {title}
        {this.props.children}
      </Paper>
    );
  },

  _onMenuIconButtonTouchTap: function(e) {
    if (this.props.onMenuIconButtonTouchTap) this.props.onMenuIconButtonTouchTap(e);
  }

});

module.exports = AppBar;