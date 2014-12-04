var React = require('react'),
  mui = require('mui'),
  Paper = mui.Paper,
  CodeExample = require('../../code-example/code-example.jsx'),
  ComponentInfo = require('../../component-info.jsx');

var PaperPage = React.createClass({

  render: function() {
    var code = 
      '//Rounded Corners\n' +
      '<Paper zDepth={1} />\n' +
      '<Paper zDepth={2} />\n' +
      '<Paper zDepth={3} />\n' +
      '<Paper zDepth={4} />\n' +
      '<Paper zDepth={5} />\n\n' +
      '//Sharp Corners\n' +
      '<Paper zDepth={1} rounded={false} />\n' +
      '<Paper zDepth={2} rounded={false} />\n' +
      '<Paper zDepth={3} rounded={false} />\n' +
      '<Paper zDepth={4} rounded={false} />\n' +
      '<Paper zDepth={5} rounded={false} />\n\n' +
      '//Circular\n' +
      '<Paper zDepth={1} circle={true} />\n' +
      '<Paper zDepth={2} circle={true} />\n' +
      '<Paper zDepth={3} circle={true} />\n' +
      '<Paper zDepth={4} circle={true} />\n' +
      '<Paper zDepth={5} circle={true} />';

    return (
      <div>

        <h2 className="mui-font-style-headline">Paper</h2>
        <CodeExample code={code}>
          <div className="paper-examples">

            <div className="paper-examples-group">
              <Paper zDepth={1} />
              <Paper zDepth={2} />
              <Paper zDepth={3} />
              <Paper zDepth={4} />
              <Paper zDepth={5} />
            </div>

            <div className="paper-examples-group">
              <Paper zDepth={1} rounded={false} />
              <Paper zDepth={2} rounded={false} />
              <Paper zDepth={3} rounded={false} />
              <Paper zDepth={4} rounded={false} />
              <Paper zDepth={5} rounded={false} />
            </div>

            <div className="paper-examples-group">
              <Paper zDepth={1} circle={true} />
              <Paper zDepth={2} circle={true} />
              <Paper zDepth={3} circle={true} />
              <Paper zDepth={4} circle={true} />
              <Paper zDepth={5} circle={true} />
            </div>
          </div>
        </CodeExample>

        <h3 className="mui-font-style-title">Props</h3>
        {this._getPropInfo()}

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Methods</h3>
        {this._getMethodInfo()}

      </div>
    );
  },

  _getPropInfo: function() {
    var info = [
          {
            name: 'circle',
            type: 'bool',
            header: 'default: false',
            desc: 'Set to true to generate a circlular paper container.'
          },
          {
            name: 'innerClassName',
            type: 'string',
            header: 'optional',
            desc: 'The paper container consists of 2 nested divs. It\'s ' +
              'sometimes helpful to assign an className to the inner div ' +
              'for styling. This property is the className for the inner div.'
          },
          {
            name: 'rounded',
            type: 'bool',
            header: 'default: true',
            desc: 'By default, the paper container will have a border radius. ' +
              'Set this to false to generate a container with sharp corners.'
          },
          {
            name: 'zDepth',
            type: 'number (0-5)',
            header: 'default: 1',
            desc: 'This number represents the zDepth of the paper shadow.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getMethodInfo: function() {
    var info = [
          {
            name: 'getInnerContainer',
            header: 'Paper.getInnerContainer()',
            desc: 'Returns a reference to the inner container div.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  }

});

module.exports = PaperPage;