let React = require('react');
let { Avatar, 
      SideNav,
      SideNavItem,
      SideNavHeader,
      SideNavDivider,
      SideNavSubheader,
      ListItem,
      MenuItem,
      Styles,      
      RaisedButton,
      FlatButton,
      FontIcon,
} = require('material-ui');
let ComponentDoc = require('../../component-doc');

let ActionAssignment = require('svg-icons/action/assignment');
let ArrowDropRight = require('svg-icons/navigation-arrow-drop-right');
let ContentInbox = require('svg-icons/content/inbox');
let ActionInfo = require('svg-icons/action/info');


class SideNavPage extends React.Component {

  render() {
    let code = '\n<SideNav ref="dockedSideNav" openType="docked" >'
      +'\n  <SideNavHeader disabled={true} >'
      +'\n    HEADER {/*same as primaryText="HEADER"*/}'
      +'\n  </SideNavHeader>'
      +'\n  <SideNavItem primaryText="plain text"/>'
      +'\n  <SideNavItem active={true} primaryText="actived item" />'
      +'\n  <SideNavItem primaryText="looks better?" />'
      +'\n  <SideNavDivider />'
      +'\n  <SideNavSubheader>'
      +'\n    AWESOME SUBHEADER'
      +'\n  </SideNavSubheader>'
      +'\n  <SideNavItem primaryText="even icons" leftIcon={<ContentInbox />} />'
      +'\n  <SideNavItem primaryText="are supported" rightIcon={<ActionInfo />} />'
      +'\n  <SideNavItem'
      +'\n    disabled={true}'
      +'\n    rightIcon={<ArrowDropRight />}'
      +'\n    primaryText="And" />'
      +'\n  <ListItem '
      +'\n    primaryText="ListItem" '
      +'\n    secondaryText="is also supported!" />'
      +'\n  <ListItem'
      +'\n    primaryText="but, there are" '
      +'\n    leftAvatar={<Avatar src="images/jsa-128.jpg" />} />'
      +'\n  <ListItem primaryText="More Waiting" '
      +'\n    leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor="#3f51b5"/>}/>'
      +'\n  <ListItem '
      +'\n    primaryText="For you" '
      +'\n    secondaryText="to try and contribute!" />'
      +'\n  <SideNavItem href="https://github.com/callemall/material-ui" style={{fontSize:18}}>'
      +'\n    <FontIcon style={exampleFlatButtonIcon} className="muidocs-icon-custom-github"/> <div>GitHub</div>'
      +'\n  </SideNavItem>'
      +'\n</SideNav>\n'

      +'\n<SideNav ref="sideNav" openType="overlay">'
      +'\n  <SideNavHeader>'
      +'\n    material ui'
      +'\n  </SideNavHeader>'
      +'\n  <SideNavItem primaryText="Get Started"/>'
      +'\n  <SideNavItem primaryText="Customization" />'
      +'\n  <SideNavItem active={true}>'
      +'\n    Components'
      +'\n  </SideNavItem>'
      +'\n  <SideNavDivider />'
      +'\n  <SideNavSubheader>'
      +'\n    Resources'
      +'\n  </SideNavSubheader>'
      +'\n  <SideNavItem primaryText="GitHub" href="https://github.com/callemall/material-ui" />'
      +'\n  <SideNavItem primaryText="React" href="http://facebook.github.io/react" />'
      +'\n  <SideNavItem primaryText="Material Design" href="https://www.google.com/design/spec/material-design/introduction.html"/>'
      +'\n</SideNav>'

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

    const exampleFlatButtonIcon = {
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'left',
        paddingLeft: '12px',
        lineHeight: '36px',
        color: Styles.Colors.cyan500
      };
    return (
      <ComponentDoc
        name="Side Nav"
        code={code}
        componentInfo={componentInfo}>

        <div>

          <RaisedButton label="Toggle Docked Side Nav" onTouchTap={this._toggleDockedSideNavClick.bind(this)} /><br/><br/>
          <RaisedButton label="Show Overlay Side Nav" onTouchTap={this._showOverlaySideNavClick.bind(this)} />

          <SideNav ref="dockedSideNav" openType='docked' >
            <SideNavHeader disabled={true} >
              HEADER {/*same as primaryText="HEADER"*/}
            </SideNavHeader>
            <SideNavItem primaryText="plain text"/>
            <SideNavItem active={true} primaryText="actived item" />
            <SideNavItem primaryText="looks better?" />
            <SideNavDivider />
            <SideNavSubheader>
              AWESOME SUBHEADER
            </SideNavSubheader>
            <SideNavItem primaryText="even icons" leftIcon={<ContentInbox />} />
            <SideNavItem primaryText="are supported" rightIcon={<ActionInfo />} />
            <SideNavItem
              disabled={true}
              rightIcon={<ArrowDropRight />}
              primaryText="And" />
            <ListItem 
              primaryText="ListItem" 
              secondaryText="is also supported!" />
            <ListItem
              primaryText="but, there are" 
              leftAvatar={<Avatar src="images/jsa-128.jpg" />} />
            <ListItem primaryText="More Waiting" 
              leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor="#3f51b5"/>}/>
            <ListItem 
              primaryText="For you" 
              secondaryText="to try and contribute!" />
            <SideNavItem href="https://github.com/callemall/material-ui" style={{fontSize:18}}>
              <FontIcon style={exampleFlatButtonIcon} className="muidocs-icon-custom-github"/> <div>GitHub</div>
            </SideNavItem>

          </SideNav>
          <SideNav ref="sideNav" openType='overlay'>
            <SideNavHeader>
              material ui
            </SideNavHeader>
            <SideNavItem primaryText="Get Started"/>
            <SideNavItem primaryText="Customization" />
            <SideNavItem active={true}>
              Components
            </SideNavItem>
            <SideNavDivider />
            <SideNavSubheader>
              Resources
            </SideNavSubheader>
            <SideNavItem primaryText="GitHub" href="https://github.com/callemall/material-ui" />
            <SideNavItem primaryText="React" href="http://facebook.github.io/react" />
            <SideNavItem primaryText="Material Design" href="https://www.google.com/design/spec/material-design/introduction.html"/>
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
  }

}

module.exports = SideNavPage;
