/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  mui = require('mui'),
  CodeExample = require('../../code-example/code-example.jsx'),

  menuItems = [
    { payload: '1', text: 'Never' },
    { payload: '2', text: 'Every Night' },
    { payload: '3', text: 'Weeknights' },
    { payload: '4', text: 'Weekends' },
    { payload: '5', text: 'Weekly' },
  ];

var MenusPage = React.createClass({

  render: function() {
    return (
      <div>
        <h2 className="mui-font-style-headline">Drop Down Menu</h2>
        {this._getDropDownMenuExample()}
      </div>
    );
  },

  _getDropDownMenuExample: function() {
    var code = 
      "var menuItems = [\n" +
      "   { payload: '1', text: 'Never' },\n" +
      "   { payload: '2', text: 'Every Night' },\n" +
      "   { payload: '3', text: 'Weeknights' },\n" +
      "   { payload: '4', text: 'Weekends' },\n" +
      "   { payload: '5', text: 'Weekly' },\n" +
      "];\n\n" +
      "<DropDownMenu menuItems={menuItems} />";

    return (
      <CodeExample code={code}>
        <mui.DropDownMenu menuItems={menuItems} onChange={this._onDropDownMenuChange} />
      </CodeExample>
    );
  }

});

module.exports = MenusPage;