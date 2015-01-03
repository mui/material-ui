var React = require('react');
var mui = require('mui');
var DropDownMenu = mui.DropDownMenu;
var ComponentDoc = require('../../component-doc.jsx');

var DropDownMenuPage = React.createClass({

  render: function() {

    var menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    var code = 
      "var menuItems = [\n" +
      "   { payload: '1', text: 'Never' },\n" +
      "   { payload: '2', text: 'Every Night' },\n" +
      "   { payload: '3', text: 'Weeknights' },\n" +
      "   { payload: '4', text: 'Weekends' },\n" +
      "   { payload: '5', text: 'Weekly' },\n" +
      "];\n\n" +
      "<DropDownMenu menuItems={menuItems} />";

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'autoWidth',
            type: 'bool',
            header: 'default: true',
            desc: 'The width will automatically be set according to the items ' +
              'inside the menu. To control this width in Css instead, set this ' +
              'prop to false.'
          },
          {
            name: 'menuItems',
            type: 'array',
            header: 'required',
            desc: 'JSON data representing all menu items in the dropdown.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onChange',
            header: 'function(e, selectedIndex, menuItem)',
            desc: 'Fired when a menu item is clicked that is not the one currently ' +
              'selected.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Drop Down Menu"
        code={code}
        componentInfo={componentInfo}>

        <DropDownMenu menuItems={menuItems} />

      </ComponentDoc>
    );
  }

});

module.exports = DropDownMenuPage;