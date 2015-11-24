import React from 'react';
import { LeftNav, MenuItem, RaisedButton, Paper } from 'material-ui';
import ComponentDoc from '../../component-doc';
import Code from 'left-nav-code';
import CodeExample from '../../code-example/code-example';
import CodeBlock from '../../code-example/code-block';

export default class LeftNavPage extends React.Component {

  constructor() {
    super();
    this._toggleLeftNavChildrenClick = this._toggleLeftNavChildrenClick.bind(this);
    this._toggleLeftNavControlledClick = this._toggleLeftNavControlledClick.bind(this);
    this._showLeftNavUndockedControlledClick = this._showLeftNavUndockedControlledClick.bind(this);
    this._changeLeftNavUndockedControlledClick = this._changeLeftNavUndockedControlledClick.bind(this);
    this.state = {
      navOpen: false,
      navWithChildrenOpen: false,
      undockedNavOpen: false,
    };
  }

  render() {
    let menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      { type: MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' },
      { text: 'Disabled', disabled: true },
      { type: MenuItem.Types.LINK, payload: 'https://www.google.com', text: 'Disabled Link', disabled: true },
    ];
    
    this.desc = 'The api of Left Nav has been changed to be declarative. ' + 
                'The methods close, open and toggle have been deprecated. ' +
                'In order to control the Left Nav use the open property and handle ' +
                'the onChangeRequest event. Also, as you have noticed there are no examples ' +
                'for uncontrolled mode. That is because uncontrolled Left Nav can only be open ' +
                'with swipe. The doc site has an uncontrolled Left Nav, swipe left with a touch ' +
                'device to see it.';

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'disableSwipeToOpen',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates whether swiping sideways when the nav is closed ' +
              'should open the nav.',
          },
          {
            name: 'docked',
            type: 'bool',
            header: 'default: true',
            desc: 'Indicates that the left nav should be docked. In this state, the ' +
              'overlay won\'t show and clicking on a menu item will not close the left nav.',
          },
          {
            name: 'open',
            type: 'bool',
            header: 'default: null',
            desc: 'Indicates that the left nav should be opened, closed or uncontrolled. Providing a boolean ' +
              'will turn the left nav into a controlled component.',
          },
          {
            name: 'header',
            type: 'element',
            header: 'optional',
            desc: 'A react component that will be displayed above all the menu items. ' +
              'Usually, this is used for a logo or a profile image.',
          },
          {
            name: 'menuItems',
            type: 'array',
            header: 'optional',
            desc: 'JSON data representing all menu items to render.',
          },
          {
            name: 'openRight',
            type: 'bool',
            header: 'default: false',
            desc: 'Positions the LeftNav to open from the right side.',
          },
          {
            name: 'selectedIndex',
            type: 'number',
            header: 'optional',
            desc: 'Indicates the particular item in the menuItems array that is ' +
              'currently selected.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of LeftNav\'s root element.',
          },
          {
            name: 'menuItemClassName',
            type: 'string',
            header: 'optional',
            desc: 'Class name for the menuItem.',
          },
          {
            name: 'menuItemClassNameSubheader',
            type: 'string',
            header: 'optional',
            desc: 'Class name for the subheader menuItem.',
          },
          {
            name: 'menuItemClassNameLink',
            type: 'string',
            header: 'optional',
            desc: 'Class name for the link menuItem.',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'Deprecated: open',
            header: 'LeftNav.open()',
            desc: 'Opens the component. ' +
              'Using this method is deprecated, use the ' +
              'open property and handle onChangeRequest to control the left nav.',
          },
          {
            name: 'Deprecated: close',
            header: 'LeftNav.close()',
            desc: 'Closes the component, hiding it from view. ' +
              'Using this method is deprecated, use the ' +
              'open property and handle onChangeRequest to control the left nav.',
          },
          {
            name: 'Deprecated: toggle',
            header: 'LeftNav.toggle()',
            desc: 'Toggles between the open and closed states. ' +
              'Using this method is deprecated, use the ' +
              'open property and handle onChangeRequest to control the left nav.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onChange',
            header: 'function(event, selectedIndex, menuItem)',
            desc: 'Fired when a menu item is clicked that is not the one currently ' +
              'selected. Note that this requires the injectTapEventPlugin component. ' +
              'See the "Get Started" section for more detail.',
          },
          {
            name: 'Deprecated: onNavOpen',
            header: 'function()',
            desc: 'Fired when the component is opened. ' +
              'Using this method is deprecated, use the ' +
              'open property and handle onChangeRequest to control the left nav.',
          },
          {
            name: 'Deprecated: onNavClose',
            header: 'function()',
            desc: 'Fired when the component is closed. ' +
              'Using this method is deprecated, use the ' +
              'open property and handle onChangeRequest to control the left nav.',
          },
          {
            name: 'onChangeRequest',
            header: 'function(open, reason)',
            desc: 'Callback function that is fired when the ' + 
              'open state of the left nav is requested to be changed. ' + 
              'The provided open argument determines whether the left nav is ' +
              'requested to be opened or closed. Also, the reason argument states why the ' +
              'left nav got closed or opend. It can be either \'clickaway\' for menuItem and ' +
              'overlay clicks, \'escape\' for pressing the escape key and \'swipe\' for swiping. ' +
              'For opening the reason is always \'swipe\'.',
          },
        ],
      },
    ];

    return (
      <ComponentDoc
        name="Left Nav"
        desc={this.desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            `//Import statement:
import LeftNav from 'material-ui/lib/left-nav/';

//See material-ui/lib/index.js for more
            `
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <div>
            <div>
              <RaisedButton label="Toggle Docked Controlled Left Nav" onTouchTap={this._toggleLeftNavControlledClick} /><br/><br/>
              <RaisedButton label="Toggle Docked Controlled Left Nav With Children" onTouchTap={this._toggleLeftNavChildrenClick} /><br/><br/>
              <RaisedButton label="Show Undocked Controlled Left Nav" onTouchTap={this._showLeftNavUndockedControlledClick} /><br/><br/>
            </div>

            <LeftNav ref="leftNavChildren" open={this.state.navWithChildrenOpen}>
              <MenuItem index={0}>Menu Item</MenuItem>
              <MenuItem index={1}><a href="/link">Link</a></MenuItem>
            </LeftNav>
            <LeftNav open={this.state.navOpen} menuItems={menuItems} />
            <LeftNav 
              open={this.state.undockedNavOpen} 
              onChangeRequest={this._changeLeftNavUndockedControlledClick}
              docked={false} 
              menuItems={menuItems} />
          </div>
        </CodeExample>
      </ComponentDoc>
    );
  }

  _toggleLeftNavChildrenClick() {
    this.setState({
      navWithChildrenOpen: !this.state.navWithChildrenOpen,
    });
  }
  
  _toggleLeftNavControlledClick() {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  }
  
  _showLeftNavUndockedControlledClick() {
    this.setState({
      undockedNavOpen: true,
    });
  }
  
  _changeLeftNavUndockedControlledClick(open) {
    this.setState({
      undockedNavOpen: open,
    });
  }

}
