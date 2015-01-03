var React = require('react');
var mui = require('mui');
var RaisedButton = mui.RaisedButton;
var Snackbar = mui.Snackbar;
var CodeExample = require('../../code-example/code-example.jsx');

var ToastsPage = React.createClass({

  render: function() {
    var code = '';

    return (
      <div>
        <h2 className="mui-font-style-headline">Snackbar</h2>
        <CodeExample code={code}>
          <RaisedButton onClick={this._handleClick} label="Show Snackbar" />
          <Snackbar ref="snackbar" message="Time for a snack"action="dismiss" />
        </CodeExample>
      </div>
    );
  },

  _handleClick: function(e) {
    this.refs.snackbar.show();
  }

});

module.exports = ToastsPage;