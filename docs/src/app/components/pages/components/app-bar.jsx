let React = require('react');
let { AppBar, DropDownMenu } = require('material-ui');
let IconButton = require('icon-button');
let NavigationClose = require('svg-icons/navigation/close');
let FlatButton = require('flat-button');
let RaisedButton = require('raised-button');
let ComponentDoc = require('../../component-doc');


class AppBarPage extends React.Component {

  constructor(props) {
    super(props);

    this.code =
          '<AppBar\n' +
          '  title="Title"\n' +
          '  iconClassNameRight="muidocs-icon-navigation-expand-more" />\n' +
          '\n' +
          '<AppBar\n' +
          '  title="Title"\n' +
          '  iconElementLeft={<IconButton><NavigationClose /></IconButton>}\n' +
          '  iconElementRight={<FlatButton label="Save" />} />';

    this.desc = 'App bars are a collection of components placed as a static ' +
                'header for an application. It is used for navigation, search ' +
                'branding, and actions. An app bar is also referred to as the ' +
                'primary toolbar or action bar for Android.';

    this.componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'iconClassNameLeft',
            type: 'string',
            header: 'optional',
            desc: 'The classname of the icon on the left of the app bar. If you ' +
                  'are using a stylesheet for your icons, enter the class name ' +
                  'for the icon to be used here.'
          },
          {
            name: 'iconClassNameRight',
            type: 'string',
            header: 'optional',
            desc: 'Similiar to the iconClassNameLeft prop except that it applies ' +
                  'to the icon displayed on the right of the app bar.'
          },
          {
            name: 'iconElementLeft',
            type: 'element',
            header: 'optional',
            desc: 'The custom element to be displayed on the left side of the ' +
                  'app bar such as an SvgIcon.'
          },
          {
            name: 'iconElementRight',
            type: 'element',
            header: 'optional',
            desc: 'Similiar to the iconElementLeft prop except that this element ' +
                  'is displayed on the right of the app bar.'
          },
          {
            name: 'iconStyleRight',
            type: 'string',
            header: 'optional',
            desc: 'Override the inline-styles of the element displayed on the right side of the app bar.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the app bars\'s root element.'
          },
          {
            name: 'showMenuIconButton',
            type: 'boolean',
            header: 'default: true',
            desc: 'Determines whether or not to display the Menu icon next to ' +
                  'the title. Setting this prop to false will hide the icon.'
          },
          {
            name: 'title',
            type: 'node|func',
            header: 'optional',
            desc: 'The title to display on the app bar. Could be number, string, ' +
                  'element or an array containing these types. Could also be a function that ' +
                  'will receive component styles object as argument and should return' +
                  'an element to be rendered.'
          },
          {
            name: 'zDepth',
            type: 'number',
            header: 'default: 1',
            desc: 'The zDepth of the app bar. The shadow of the app bar is also ' +
                  'dependent on this property.'
          },
          {
            name: 'position',
            type: '"fixed"|"static"|"waterfall"',
            header: 'default: "fixed"',
            desc: 'Specify position and behavior. Fixed - will have a fixed position at the top of viewport. ' +
                  'Static - will have a static position. Waterfall - will have a fixed position at the top' +
                  'of viewport and will decrease its height on window scroll down (see waterfall prop for ' +
                  'additional settings).'
          },
          {
            name: 'waterfall',
            type: 'object',
            header: 'required if position waterfall',
            desc: <span>Settings object for position waterfall. Should at least have <code>minHeight</code>
                  and <code>maxHeight</code> properties, both numeric. These specify min and max visual heigth
                  of the component while window scrolling. Optional <code>children</code> property can be a node
                  or a function (will receive component styles object as argument) returning a node. This node will
                  be inserted in the slide (scrolled) element of the component. Optional <code>onHeightChange</code> property
                  is a function called when visual height of the component changes on scroll. This function will
                  receive as arguments an object with <code>height</code> and <code>el</code> (DOM element of
                  the component) properties. Using <code>onHeightChange</code>, animation effects can be achieved
                  by altering style properties of specific DOM elements.
                  </span>
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onLeftIconButtonTouchTap',
            header: 'AppBar.onLeftIconButtonTouchTap(e)',
            desc: 'Callback function for when the left icon is selected via ' +
                  'a touch tap.'
          },
          {
            name: 'onRightIconButtonTouchTap',
            header: 'AppBar.onRightIconButtonTouchTap(e)',
            desc: 'Callback function for when the right icon is selected via ' +
                  'a touch tap.'
          }
        ]
      }
    ];
  }

  render() {
    return (
      <ComponentDoc
        name="AppBar"
        code={this.code}
        desc={this.desc}
        componentInfo={this.componentInfo}>
          <AppBar
            title="Title"
            position="static"
            iconClassNameRight="muidocs-icon-navigation-expand-more" />
          <br />
          <AppBar
            title="Title"
            position="static"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" />} />
          <br />
          <RaisedButton label="View Waterfall example"
            linkButton={true} href="/#/examples/app-bar-waterfall"
            primary={true}/>
      </ComponentDoc>
    );
  }

}

module.exports = AppBarPage;
