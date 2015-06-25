let React = require('react');
let { IconButton } = require('material-ui');
let IconMenu = require('menus/icon-menu');
let MenuItem = require('menus/menu-item');
let MoreVertIcon = require('svg-icons/navigation/more-vert');
let ComponentDoc = require('../../component-doc');


class IconMenus extends React.Component {

  render() {

    let code = `
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>Refresh</MenuItem>
      <MenuItem>Send Feedback More</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Help</MenuItem>
      <MenuItem>Sign out</MenuItem>
    </IconMenu>
    `;

    let desc = null;

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
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
            name: 'menuPosition',
            type: 'oneOf [bottom-left, bottom-right, top-left, top-right]',
            header: 'default: bottom-left',
            desc: 'This is the placement of the menu relative to the IconButton.'
          },
          {
            name: 'menuStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override menu styles.'
          },
          {
            name: 'width',
            type: 'number',
            header: 'optional',
            desc: 'Sets the width of the menu. If not specified, the menu width ' +
              'will be dictated by its children. The rendered width will always be ' +
              'a keyline increment (64px for desktop, 56px otherwise).'
          }
        ]
      }
    ];

    let iconButtonElement = (
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    );

    return (
      <ComponentDoc
        name="Icon Menus"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <br/>

        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

        <IconMenu
          iconButtonElement={iconButtonElement}
          menuPosition="bottom-right">
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

        <IconMenu
          iconButtonElement={iconButtonElement}
          menuPosition="top-left">
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

        <IconMenu
          iconButtonElement={iconButtonElement}
          menuPosition="top-right">
          <MenuItem>Refresh</MenuItem>
          <MenuItem>Send Feedback</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </IconMenu>

      </ComponentDoc>
    );

  }

}

module.exports = IconMenus;
