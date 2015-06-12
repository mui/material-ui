var React = require('react');
var mui = require('mui');
var ComponentDoc = require('../../component-doc.jsx');

var {ListItem} = mui;

class ListsPage extends React.Component {

  constructor(props) {
    super(props);

    this.code =
      '<ListItem showIconButton={true}>Apple</ListItem>\n' +
      '<ListItem showIconButton={true}>Orange</ListItem>\n' +
      '<ListItem showIconButton={true}>Ananas</ListItem>';

    this.desc = 'List items are used to create list. ';

    this.componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'iconClassName',
            type: 'string',
            header: 'optional',
            desc: 'The classname of the icon on the left of the list item. If you ' +
                  'are using a stylesheet for your icons, enter the class name ' +
                  'for the icon to be used here.'
          },
          {
            name: 'iconElement',
            type: 'element',
            header: 'optional',
            desc: 'The custom element to be displayed on the left side of the ' +
                  'list item such as an SvgIcon.'
          },
          {
            name: 'iconStyle',
            type: 'string',
            header: 'optional',
            desc: 'Override the inline-styles of the element displayed on the right side of the list item.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the app bars\'s root element.'
          },
          {
            name: 'showIconButton',
            type: 'boolean',
            header: 'default: true',
            desc: 'Determines whether or not to display the icon next to ' +
                  'the title. Setting this prop to false will hide the icon.'
          },
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onIconButtonTouchTap',
            header: 'ListItem.onIconButtonTouchTap(e)',
            desc: 'Callback function for when the left icon is selected via ' +
                  'a touch tap.'
          },
        ]
      }
    ];
  }

  render() {
    return (
      <ComponentDoc
        name="Lists"
        code={this.code}
        desc={this.desc}
        componentInfo={this.componentInfo}>
          <ListItem showIconButton={true}>Apple</ListItem>
          <ListItem showIconButton={true}>Orange</ListItem>
          <ListItem showIconButton={true}>Ananas</ListItem>
      </ComponentDoc>
    );
  }

}

module.exports = ListsPage;
