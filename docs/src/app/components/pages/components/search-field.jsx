let React = require('react');

let { SearchField } = require('material-ui');
let MenuItem = require('menus/menu-item');
let ComponentDoc = require('../../component-doc');

let Code = require('icon-menus-code');

class SearchFields extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let desc = null;

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'closeOnItemTouchTap',
            type: 'bool',
            header: 'default: true',
            desc: 'If true, menu will close after an item is touchTapped.'
          },
          {
            name: 'desktop',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates if the menu should render with compact desktop styles.'
          },
          {
            name: 'iconButtonElement',
            type: 'element: IconButton',
            header: 'required',
            desc: 'This is the IconButton to render. This button will open the menu.'
          },
          {
            name: 'openDirection',
            type: 'oneOf [bottom-left, bottom-right, top-left, top-right]',
            header: 'default: bottom-left',
            desc: 'This is the placement of the menu relative to the IconButton.'
          },
          {
            name: 'menuStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override underlying menu style.'
          },
          {
            name: 'multiple',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the value can an array and allow the menu to be a multi-select.'
          },
          {
            name: 'value',
            type: 'string or array',
            header: 'optional',
            desc: 'The value of the selected menu item. If passed in, this will make the menu ' +
              'a controlled component. This component also supports valueLink.'
          },
          {
            name: 'width',
            type: 'string or number',
            header: 'optional',
            desc: 'Sets the width of the menu. If not specified, the menu width ' +
              'will be dictated by its children. The rendered width will always be ' +
              'a keyline increment (64px for desktop, 56px otherwise).'
          },
          {
            name: 'touchTapCloseDelay',
            type: 'number',
            header: 'default: 200',
            desc: 'Sets the delay in milliseconds before closing the menu when an item is clicked.'
          },
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onItemTouchTap',
            header: 'function(e, item)',
            desc: 'Fired when a menu item is touchTapped.'
          },
          {
            name: 'onChange',
            header: 'function(e, value)',
            desc: 'Fired when a menu item is touchTapped and the menu item value ' +
              'is not equal to the current menu value.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Search Field"
        code={Code}
        desc={desc}
        componentInfo={componentInfo}>

        <br/>

        <div>
          <SearchField onUpdateRequests={(t) => {console.log(t); return [t,t+t,t+t+t];}} />

        </div>

      </ComponentDoc>
    );

  }


}

module.exports = SearchFields;
