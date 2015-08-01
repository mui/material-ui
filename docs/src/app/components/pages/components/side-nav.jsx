let React = require('react');
let { SideNav, SideNavItem, SideNavHeader, SideNavDivider, SideNavSubheader, RaisedButton } = require('material-ui');
let ComponentDoc = require('../../component-doc');


class SideNavPage extends React.Component {

  constructor() {
    super();

    this.state = {
      isDocked: false
    };
  }

  render() {
    let code =
      '';

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'disableSwipeToOpen',
            type: 'bool',
            header: 'default: false',
            desc: 'Indicates whether swiping sideways when the nav is closed ' +
              'should open the nav.'
          },
          {
            name: 'docked',
            type: 'bool',
            header: 'default: true',
            desc: 'Indicates that the left nav should be docked. In this state, the ' +
              'overlay won\'t show and clicking on a menu item will not close the left nav.'
          },
          {
            name: 'header',
            type: 'element',
            header: 'optional',
            desc: 'A react component that will be displayed above all the menu items. ' +
              'Usually, this is used for a logo or a profile image.'
          },
          {
            name: 'openRight',
            type: 'boole',
            header: 'default: false',
            desc: 'Positions the SideNav to open from the right side.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of SideNav\'s root element.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'close',
            header: 'SideNav.close()',
            desc: 'Closes the component, hiding it from view.'
          },
          {
            name: 'toggle',
            header: 'SideNav.toggle()',
            desc: 'Toggles between the open and closed states.'
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
              'selected. Note that this requires the injectTapEventPlugin component. ' +
              'See the "Get Started" section for more detail.'
          },
          {
            name: 'onNavOpen',
            header: 'function()',
            desc: 'Fired when the component is opened'
          },
          {
            name: 'onNavClose',
            header: 'function()',
            desc: 'Fired when the component is closed'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Side Nav"
        code={code}
        componentInfo={componentInfo}>

        <div>

          <RaisedButton label="Toggle Docked Side Nav" onTouchTap={this._toggleDockedSideNavClick.bind(this)} /><br/><br/>
          <RaisedButton label="Show Overlay Side Nav" onTouchTap={this._showOverlaySideNavClick.bind(this)} />

          <SideNav ref="dockedSideNav" openType='docked' >
            <SideNavHeader disabled={false} onTouchTap={() => console.log("yeahhhhhhhh!")}>
              Maps!!!
            </SideNavHeader>
            <SideNavItem primaryText="Flights" onTouchTap={() => console.log("it works!")}/>
            <SideNavItem primaryText="Flights" />
            <SideNavItem primaryText="Flights" />
            <SideNavSubheader>
              Books
            </SideNavSubheader>
            <SideNavItem primaryText="Flights" />
            <SideNavItem primaryText="Flights" />
            <SideNavItem primaryText="Flights" />
            <SideNavDivider />
            <SideNavItem primaryText="Apps" />
          </SideNav>
          <SideNav ref="sideNav" openType='overlay'>
            <SideNavItem primaryText="Maps" />
            <SideNavItem primaryText="Books" />
            <SideNavItem primaryText="Flights" />
            <SideNavItem primaryText="Apps" />
          </SideNav>
        </div>

      </ComponentDoc>
    );
  }

  _showOverlaySideNavClick() {
    this.refs.sideNav.toggle();
  }

  _toggleDockedSideNavClick() {
    this.refs.dockedSideNav.toggle();
    this.setState({
      isDocked: !this.state.isDocked
    });
  }

}

module.exports = SideNavPage;
