var React = require('react');
var mui = require('mui');
var CodeExample = require('../../code-example/code-example.jsx');

var ToastsPage = React.createClass({

  getInitialState: function() {
    return {
      message: 'You have deleted your broadcast.',
      action: 'undo'
    };
  },

  render: function() {
    return (
      <div>
        <h2 className="mui-font-style-headline">Toasts</h2>
        {this._getToastExample()}
      </div>
    );
  },

  _getToastExample: function() {
    var code = 
      "";

    return (
      <CodeExample code={code}>
        <button onClick={this.triggerToast}>Trigger Toast</button>
        <mui.Toast ref="Toast" message={this.state.message} action={this.state.action} />
      </CodeExample>
    );
  },

  triggerToast: function() {
    this.refs.Toast.toggle();
  },

});

module.exports = ToastsPage;