import React from 'react';
import AppBar from 'material-ui/app-bar';
import Paper from 'material-ui/paper';
import IconButton from 'icon-button';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'flat-button';
import ComponentDoc from '../../component-doc';
import CodeExample from '../../code-example/code-example';
import CodeBlock from '../../code-example/code-block';
import Code from 'app-bar-code';
import IconMenu from 'menus/icon-menu';
import MenuItem from 'menus/menu-item';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class AppBarPage extends React.Component {

  constructor(props) {
    super(props);

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
                  'for the icon to be used here.',
          },
          {
            name: 'iconClassNameRight',
            type: 'string',
            header: 'optional',
            desc: 'Similiar to the iconClassNameLeft prop except that it applies ' +
                  'to the icon displayed on the right of the app bar.',
          },
          {
            name: 'iconElementLeft',
            type: 'element',
            header: 'optional',
            desc: 'The custom element to be displayed on the left side of the ' +
                  'app bar such as an SvgIcon.',
          },
          {
            name: 'iconElementRight',
            type: 'element',
            header: 'optional',
            desc: 'Similiar to the iconElementLeft prop except that this element ' +
                  'is displayed on the right of the app bar.',
          },
          {
            name: 'iconStyleRight',
            type: 'string',
            header: 'optional',
            desc: 'Override the inline-styles of the element displayed on the right side of the app bar.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the app bar\'s root element.',
          },
          {
            name: 'showMenuIconButton',
            type: 'bool',
            header: 'default: true',
            desc: 'Determines whether or not to display the Menu icon next to ' +
                  'the title. Setting this prop to false will hide the icon.',
          },
          {
            name: 'titleStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the app bar\'s title element.',
          },
          {
            name: 'title',
            type: 'node',
            header: 'optional',
            desc: 'The title to display on the app bar. Could be number, string, element or an array containing these types.',
          },
          {
            name: 'zDepth',
            type: 'oneOf [0,1,2,3,4,5]',
            header: 'default: 1',
            desc: 'The zDepth of the app bar. The shadow of the app bar is also ' +
                  'dependent on this property.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onLeftIconButtonTouchTap',
            header: 'AppBar.onLeftIconButtonTouchTap(e)',
            desc: 'Callback function for when the left icon is selected via ' +
                  'a touch tap.',
          },
          {
            name: 'onRightIconButtonTouchTap',
            header: 'AppBar.onRightIconButtonTouchTap(e)',
            desc: 'Callback function for when the right icon is selected via ' +
                  'a touch tap.',
          },
          {
            name: 'onTitleTouchTap',
            header: 'AppBar.onTitleTouchTap(e)',
            desc: 'Callback function for when the title text is selected via ' +
                  'a touch tap.',
          },
        ],
      },
    ];
  }

  render() {
    return (
      <ComponentDoc
        name="AppBar"
        desc={this.desc}
        componentInfo={this.componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            `//Import statement:
import AppBar from 'material-ui/lib/app-bar';

//See material-ui/lib/index.js for more
            `
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more" />
          <br />
          <AppBar
            title={<span style={styles.title} onTouchTap={this._onTouchTap}>Title</span>}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" />} />
          <br />
          <AppBar
            title="Title"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal:'right', vertical:'top'}}
                anchorOrigin={{horizontal:'right', vertical:'top'}}
              >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
          } />
        </CodeExample>
      </ComponentDoc>
    );
  }

  _onTouchTap() {
    alert('onTouchTap triggered on the title component');
  }

}
