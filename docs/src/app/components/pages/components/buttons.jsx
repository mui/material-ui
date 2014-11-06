/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  PaperButton = mui.PaperButton,
  CodeExample = require('../../code-example/code-example.jsx');

var ButtonPage = React.createClass({

  render: function() {
    var code = 
      '//Flat Buttons\n' +
      '<PaperButton type="FLAT" label="Default" />\n' +
      '<PaperButton type="FLAT" label="Primary" primary={true} />\n' +
      '<PaperButton type="FLAT" label="Disabled" disabled={true} />\n\n' +
      '//Raised Buttons\n' + 
      '<PaperButton type="RAISED" label="Default" />\n' +
      '<PaperButton type="RAISED" label="Primary" primary={true} />\n' +
      '<PaperButton type="RAISED" label="Disabled" disabled={true} />\n\n' +
      '//Floating Action Buttons\n' +
      '<PaperButton type="FAB_MINI" icon="star" />\n' +
      '<PaperButton type="FAB" icon="star" />';

    return (
    	<div>

    		<h2 className="mui-font-style-headline">Buttons</h2>
        <CodeExample code={code}>

          <div className="button-examples">

            <div className="button-examples-row">
              <PaperButton type="FLAT" label="Default" onClick={this._onPaperButtonClick} />
              <PaperButton type="FLAT" label="Primary" primary={true} onClick={this._onPaperButtonClick} />
              <PaperButton type="FLAT" label="Disabled" disabled={true} />
            </div>

            <div className="button-examples-row">
              <PaperButton type="RAISED" label="Default" onClick={this._onPaperButtonClick} />
              <PaperButton type="RAISED" label="Primary" primary={true} onClick={this._onPaperButtonClick} />
              <PaperButton type="RAISED" label="Disabled" disabled={true} />
            </div>

            <div className="button-examples-row">
              <PaperButton type="FAB_MINI"icon="star" onClick={this._onPaperButtonClick} />
              <PaperButton type="FAB" icon="star" onClick={this._onPaperButtonClick} />
            </div>

          </div>

        </CodeExample>

    	</div>
    );
  }

});

module.exports = ButtonPage;
