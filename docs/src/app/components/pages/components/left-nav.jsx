var React = require('react');
var mui = require('mui');
var MenuItem = mui.MenuItem;
var LeftNav = mui.LeftNav;
var Menu = mui.Menu;
var RaisedButton = mui.RaisedButton;
var ComponentDoc = require('../../component-doc.jsx');

var LeftNavPage = React.createClass({

  getInitialState: function() {
    return {
      isDocked: false
    };
  },

  render: function() { 

    var menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'css-framework', text: 'CSS Framework' },
      { route: 'components', text: 'Components' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      { type: MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' }
    ];

    var code = 
      'menuItems = [\n' +
      '  { route: \'get-started\', text: \'Get Started\' },\n' +
      '  { route: \'css-framework\', text: \'CSS Framework\' },\n' +
      '  { route: \'components\', text: \'Components\' },\n' +
      '  { type: MenuItem.Types.SUBHEADER, text: \'Resources\' },\n' +
      '  { \n' +
      '     type: MenuItem.Types.LINK, \n' +
      '     payload: \'https://github.com/callemall/material-ui\', \n' +
      '     text: \'GitHub\' \n' +
      '  },\n' +
      '];\n\n' +
      '//Docked Left Nav\n' +
      '<LeftNav docked={this.state.isDocked}>'+ '\n' +
      '    <Menu menuItems={menuItems} zDepth={0} />'+ '\n' +
      '</LeftNav>' + '\n\n' +

      '//Hideable Left Nav\n' +
      '<LeftNav docked={false}>'+ '\n' +
      '    <Menu menuItems={menuItems} zDepth={0} />'+ '\n' +
      '</LeftNav>';

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'docked',
            type: 'bool',
            header: 'default: true',
            desc: 'Indicates that the left nav should be docked. In this state, the ' +
              'overlay won\'t show and clicking on a menu item will not close the left nav.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'close',
            header: 'LeftNav.close()',
            desc: 'Closes the component, hiding it from view.'
          },
          {
            name: 'toggle',
            header: 'LeftNav.toggle()',
            desc: 'Toggles between the open and closed states.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Left Nav"
        code={code}
        componentInfo={componentInfo}>

        <div className="left-nav-example">
          <RaisedButton label="Toggle Docked Left Nav" onTouchTap={this._toggleDockedLeftNavClick} /><br/><br/>
          <RaisedButton label="Show Hideable Left Nav" onTouchTap={this._showLeftNavClick} />

          <LeftNav ref="dockedLeftNav" docked={this.state.isDocked}>
            <Menu menuItems={menuItems} zDepth={0} />
          </LeftNav>

          <LeftNav ref="leftNav" docked={false}>
            <Menu menuItems={menuItems} zDepth={0} />
          </LeftNav>
        </div>

      </ComponentDoc>
    );
    
  },

  _showLeftNavClick: function() {
    this.refs.leftNav.toggle();
  },

  _toggleDockedLeftNavClick: function() {
    this.refs.dockedLeftNav.toggle();
    this.setState({
      isDocked: !this.state.isDocked
    });
  }

});

module.exports = LeftNavPage;
