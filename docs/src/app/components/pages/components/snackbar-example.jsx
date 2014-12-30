var React = require('react');
var mui = require('mui');
var CodeExample = require('../../code-example/code-example.jsx');

var ToastsPage = React.createClass({

  getInitialState: function() {
    return {
      message: 'Time for a snack',
      action: 'dismiss'
    };
  },

  render: function() {
    var code = '';

    return (
      <div>
        <h2 className="mui-font-style-headline">Snackbar</h2>
        <CodeExample code={code}>
          <button onClick={this._triggerToast}>Show Snackbar</button>
          <mui.Snackbar ref="Toast" message={this.state.message} action={this.state.action} />
        </CodeExample>
      </div>
    );
  },

  _triggerToast: function(e) {
    e.stopPropagation();
    console.log('show');
    this.refs.Toast.show();
  }

});

module.exports = ToastsPage;
