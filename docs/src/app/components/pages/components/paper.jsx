/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  Paper = mui.Paper,
  CodeExample = require('../../code-example/code-example.jsx');

var PaperPage = React.createClass({

  render: function() {
    var code = 
      '//Rounded Corners\n' +
      '<Paper zDepth="1" />\n' +
      '<Paper zDepth="2" />\n' +
      '<Paper zDepth="3" />\n' +
      '<Paper zDepth="4" />\n' +
      '<Paper zDepth="5" />\n\n' +
      '//Sharp Corners\n' +
      '<Paper zDepth="1" rounded={false} />\n' +
      '<Paper zDepth="2" rounded={false} />\n' +
      '<Paper zDepth="3" rounded={false} />\n' +
      '<Paper zDepth="4" rounded={false} />\n' +
      '<Paper zDepth="5" rounded={false} />\n\n' +
      '//Circular\n' +
      '<Paper zDepth="1" circle={true} />\n' +
      '<Paper zDepth="2" circle={true} />\n' +
      '<Paper zDepth="3" circle={true} />\n' +
      '<Paper zDepth="4" circle={true} />\n' +
      '<Paper zDepth="5" circle={true} />';

    return (
      <div>

        <h2 className="mui-font-style-headline">Paper</h2>
        <CodeExample code={code}>
          <div className="paper-examples">

            <div className="paper-examples-row">
              <Paper zDepth="1" />
              <Paper zDepth="2" />
              <Paper zDepth="3" />
              <Paper zDepth="4" />
              <Paper zDepth="5" />
            </div>

            <div className="paper-examples-row">
              <Paper zDepth="1" rounded={false} />
              <Paper zDepth="2" rounded={false} />
              <Paper zDepth="3" rounded={false} />
              <Paper zDepth="4" rounded={false} />
              <Paper zDepth="5" rounded={false} />
            </div>

            <div className="paper-examples-row">
              <Paper zDepth="1" circle={true} />
              <Paper zDepth="2" circle={true} />
              <Paper zDepth="3" circle={true} />
              <Paper zDepth="4" circle={true} />
              <Paper zDepth="5" circle={true} />
            </div>
          </div>
        </CodeExample>

      </div>
    );
  }

});

module.exports = PaperPage;
