var React = require('react'),
  mui = require('material-ui'),
  RaisedButton = mui.RaisedButton;

var Main = React.createClass({

  render: function() {

    return (
      <div className="example-page">

        <h1>material-ui</h1>
        <h2>example project</h2>

        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

      </div>
    );
  },

  _handleTouchTap: function() {
    alert('1-2-3-4-5');
  }
  
});

module.exports = Main;