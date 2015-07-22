let React = require('react');
let { DropDownMenu } = require('material-ui');
let ComponentDoc = require('../../component-doc');


class DropDownMenuPage extends React.Component {

  render() {

    let menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    let code =
      "let menuItems = [\n" +
      "   { payload: '1', text: 'Never' },\n" +
      "   { payload: '2', text: 'Every Night' },\n" +
      "   { payload: '3', text: 'Weeknights' },\n" +
      "   { payload: '4', text: 'Weekends' },\n" +
      "   { payload: '5', text: 'Weekly' },\n" +
      "];\n\n" +
      "<DropDownMenu menuItems={menuItems} />";

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'displayMember',
            type: 'string',
            header: 'default: text',
            desc: 'DropDownMenu will use text as default value, with this ' +
              'property you can choose another name.'
          },
          {
            name: 'valueMember',
            type: 'string',
            header: 'default: payload',
            desc: 'DropDownMenu will use payload as default value, with this ' +
              'property you can choose another name.'
          },
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
          },
          {
            name: 'menuItemStyle',
            type: 'array',
            header: 'required',
            desc: 'Overrides the inline-styles of the MenuItems when the ' +
                  'DropDownMenu is expanded.'
          },
          {
            name: 'selectedIndex',
            type: 'number',
            header: 'default: 0',
            desc: 'Index of the item selected.'
          },
          {
            name: 'underlineStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of DropDownMenu\'s underline.'
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of DropDownMenu\'s icon element.'
          },
          {
            name: 'labelStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of DropDownMenu\'s label when the DropDownMenu is inactive.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of DropDownMenu\'s root element.'
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

}

module.exports = DropDownMenuPage;
