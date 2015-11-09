const React = require('react');
const { LeftNav, MenuItem, RaisedButton, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const Code = require('left-nav-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

export default class LeftNavPage extends React.Component {

  constructor() {
    super();
    this._showLeftNavClick = this._showLeftNavClick.bind(this);
    this._toggleDockedLeftNavClick = this._toggleDockedLeftNavClick.bind(this);
    this._showLeftNavChildrenClick = this._showLeftNavChildrenClick.bind(this);
    this.state = {
      isDocked: false,
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
            type: 'boole',
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
            name: 'close',
            header: 'LeftNav.close()',
            desc: 'Closes the component, hiding it from view.',
          },
          {
            name: 'toggle',
            header: 'LeftNav.toggle()',
            desc: 'Toggles between the open and closed states.',
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
            name: 'onNavOpen',
            header: 'function()',
            desc: 'Fired when the component is opened',
          },
          {
            name: 'onNavClose',
            header: 'function()',
            desc: 'Fired when the component is closed',
          },
        ],
      },
    ];

    return (
      <ComponentDoc
        name="Left Nav"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst LeftNav = require(\'material-ui/lib/left-nav\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <div>
            <div>
              <RaisedButton label="Toggle Docked Left Nav" onTouchTap={this._toggleDockedLeftNavClick} /><br/><br/>
              <RaisedButton label="Show Hideable Left Nav" onTouchTap={this._showLeftNavClick} /><br/><br/>
              <RaisedButton label="Show Hideable Children Left Nav" onTouchTap={this._showLeftNavChildrenClick} /><br/><br/>
            </div>

            <LeftNav ref="dockedLeftNav" docked={this.state.isDocked} menuItems={menuItems} />
            <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
            <LeftNav ref="leftNavChildren" docked={false}>
              <MenuItem index={0}>Menu Item</MenuItem>
              <MenuItem index={1}><a href="/link">Link</a></MenuItem>
            </LeftNav>
          </div>
        </CodeExample>
      </ComponentDoc>
    );
  }

  _showLeftNavClick() {
    this.refs.leftNav.toggle();
  }
  _showLeftNavChildrenClick() {
    this.refs.leftNavChildren.toggle();
  }
  _toggleDockedLeftNavClick() {
    this.refs.dockedLeftNav.toggle();
    this.setState({
      isDocked: !this.state.isDocked,
    });
  }

}
