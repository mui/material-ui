/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  mui = require('mui'),
  CodeExample = require('../../code-example/code-example.jsx'),
  ComponentInfo = require('../../component-info.jsx'),

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

        <h3 className="mui-font-style-title">Props</h3>
        {this._getPropInfo()}

        <br/>
        <hr />
        <br/>


        <h3 className="mui-font-style-title">Events</h3>
        {this._getEventInfo()}
        
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
        <mui.DropDownMenu menuItems={menuItems} />
      </CodeExample>
    );
  },

  _getPropInfo: function() {
    var info = [
          {
            name: 'menuItems',
            type: 'array',
            header: 'required',
            desc: 'JSON data representing all menu items in the dropdown.'
          },
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getEventInfo: function() {
    var info = [
          {
            name: 'onChange',
            header: 'function(e, selectedIndex, menuItem)',
            desc: 'Fired when a menu item is clicked that is not the one currently ' +
              'selected.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  }

});

module.exports = MenusPage;