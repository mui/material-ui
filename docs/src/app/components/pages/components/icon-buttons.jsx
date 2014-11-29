/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  IconButton = mui.IconButton,
  CodeExample = require('../../code-example/code-example.jsx'),
  ComponentInfo = require('../../component-info.jsx');

var IconButtonsPage = React.createClass({

  render: function() {
    return (
      <div>
        <h2 className="mui-font-style-headline">Icon Buttons</h2>
        {this._getExample()}

        <p className="mui-font-style-subhead-1">
          This component generates a button element and all props except for
          "icon" will be passed down to the button element. Also, focus styles
          will happen on tab but not on click.
        </p>

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Props</h3>
        {this._getPropInfo()}
        
      </div>
    );
  },

  _getExample: function() {
    var code =
      '<IconButton icon="action-grade" />\n' +
      '<IconButton icon="action-grade" disabled={true} />';

    return (
      <CodeExample code={code}>
        <IconButton icon="action-grade" />
        <IconButton icon="action-grade" disabled={true} />
      </CodeExample>
    );
  },

  _getPropInfo: function() {
    var info = [
          {
            name: 'icon',
            type: 'string',
            header: 'required',
            desc: 'The name of the icon to use.'
          },
        ];

    return <ComponentInfo infoArray={info} />;
  }

});

module.exports = IconButtonsPage;