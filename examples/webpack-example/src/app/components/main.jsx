/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let RaisedButton = require('material-ui/lib/raised-button');
let Dialog = require('material-ui/lib/dialog');
let ThemeManager = new (require('material-ui/lib/styles/theme-manager'))();
let Colors = require('material-ui/lib/styles/colors');

let Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500,
    });
  },

  render() {

    let containerStyle = {
      textAlign: 'center',
      paddingTop: '200px',
    };

    let standardActions = [
      { text: 'Okay' },
    ];

    return (
      <div style={containerStyle}>
        <Dialog
          title="Super Secret Password"
          actions={standardActions}
          ref="superSecretPasswordDialog">
          1-2-3-4-5
        </Dialog>

        <h1>material-ui</h1>
        <h2>example project</h2>

        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  },

});

module.exports = Main;
