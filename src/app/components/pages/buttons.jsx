/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  PaperButton = mui.PaperButton,
  CodeExample = require('../code-example/code-example.jsx');

var ButtonPage = React.createClass({

  render: function() {
    return (
    	<div>

    		<h2>Flat Buttons</h2>
        {this._getFlatExamples()}

        <h2>Raised Buttons</h2>
        {this._getRaisedExamples()}

        <h2>Floating Action Buttons</h2>
        {this._getFabExamples()}

    	</div>
    );
  },

  _getFlatExamples: function() {
    var code = 
      '<PaperButton type={PaperButton.Types.FLAT} label="Default" />\n' +
      '<PaperButton type={PaperButton.Types.FLAT} label="Primary" primary={true} />\n' +
      '<PaperButton type={PaperButton.Types.FLAT} label="Disabled" disabled={true} />';

    return (
      <CodeExample code={code}>
        <PaperButton type={PaperButton.Types.FLAT} label="Default" onClick={this._onPaperButtonClick} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <PaperButton type={PaperButton.Types.FLAT} label="Primary" primary={true} onClick={this._onPaperButtonClick} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <PaperButton type={PaperButton.Types.FLAT} label="Disabled" disabled={true} />
      </CodeExample>
    );
  },

  _getRaisedExamples: function() {
    var code = 
      '<PaperButton type={PaperButton.Types.RAISED} label="Default" />\n' +
      '<PaperButton type={PaperButton.Types.RAISED} label="Primary" primary={true} />\n' +
      '<PaperButton type={PaperButton.Types.RAISED} label="Disabled" disabled={true} />';

    return (
      <CodeExample code={code}>
        <PaperButton type={PaperButton.Types.RAISED} label="Default" onClick={this._onPaperButtonClick} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <PaperButton type={PaperButton.Types.RAISED} label="Primary" primary={true} onClick={this._onPaperButtonClick} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <PaperButton type={PaperButton.Types.RAISED} label="Disabled" disabled={true} />
      </CodeExample>
    );
  },

  _getFabExamples: function() {
    var code = 
      '<PaperButton type={PaperButton.Types.FAB_MINI} />\n' +
      '<PaperButton type={PaperButton.Types.FAB} />';

    return (
      <CodeExample code={code}>
        <PaperButton type={PaperButton.Types.FAB_MINI} onClick={this._onPaperButtonClick} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <PaperButton type={PaperButton.Types.FAB} onClick={this._onPaperButtonClick} />
      </CodeExample>
    );
  },

  _onPaperButtonClick: function(e) {
  	console.log(e);
  }

});

module.exports = ButtonPage;
