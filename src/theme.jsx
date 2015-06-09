var React = require('react');
var ThemeManager = require('./styles/theme-manager');


var Theme = React.createClass({

  propTypes: {
    theme: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  getChildContext: function() {
    return {
      muiTheme: this.themeManager.getCurrentTheme()
    };
  },

  componentWillMount: function() {
    this.themeManager = new ThemeManager();

    if (this.props.theme) {
      this.themeManager.setTheme(this.props.theme);
    }
  },

  render: function() {
    return this.props.children({themeManager: this.themeManager});
  }
});


function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function theme(obj) {
  return function(Component) {
    return React.createClass({

      displayName: 'Theme(' + getDisplayName(Component) + ')',

      render: function() {
        return (
          <Theme theme={obj}>
            {
              function(props) {
                return (<Component {...this.props} {...props}/>);
              }.bind(this)
            }
          </Theme>
        );
      }
    });
  }
}

module.exports = Theme;
module.exports.theme = theme;