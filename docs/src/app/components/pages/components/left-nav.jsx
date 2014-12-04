/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  MenuItem = mui.MenuItem,
  LeftNav = mui.LeftNav,
  RaisedButton = mui.RaisedButton,
  CodeExample = require('../../code-example/code-example.jsx'),
  ComponentInfo = require('../../component-info.jsx'),

  menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { route: 'css-framework', text: 'CSS Framework' },
    { route: 'components', text: 'Components' },
    { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
    { type: MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' }
  ];

var ButtonPage = React.createClass({

  getInitialState: function() {
    return {
      isDocked: false
    };
  },

  render: function() { 
    return (
      <div>
        <h2 className="mui-font-style-headline">Left Nav</h2>
        {this._getCodeExample()}

        <h3 className="mui-font-style-title">Props</h3>
        {this._getPropInfo()}

        <br/>
        <hr />
        <br/>

        <h3 className="mui-font-style-title">Methods</h3>
        {this._getMethodInfo()}

        <br/>
        <hr />
        <br/>

        <h3 className="mui-font-style-title">Events</h3>
        {this._getEventInfo()}
      </div>
    );
  },

  _getCodeExample: function() {
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
      '<LeftNav menuItems={menuItems} />\n\n' +
      '//Hideable Left Nav\n' +
      '<LeftNav docked={false} menuItems={menuItems} />\n\n';

    return (
      <CodeExample code={code}>
        <div className="left-nav-example">
          <RaisedButton label="Toggle Docked Left Nav" onTouchTap={this._toggleDockedLeftNavClick} /><br/><br/>
          <RaisedButton label="Show Hideable Left Nav" onTouchTap={this._showLeftNavClick} />
          <LeftNav ref="dockedLeftNav" docked={this.state.isDocked} menuItems={menuItems} />
          <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
        </div>
      </CodeExample>
    );
  },

  _getPropInfo: function() {
    var info = [
          {
            name: 'menuItems',
            type: 'array',
            header: 'required',
            desc: 'JSON data representing all menu items to render.'
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
            name: 'selectedIndex',
            type: 'number',
            header: 'optional',
            desc: 'Indicates the particular item in the menuItems array that is ' +
              'currently selected.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getMethodInfo: function() {
    var info = [
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
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getEventInfo: function() {
    var info = [
          {
            name: 'onChange',
            header: 'function(e, selectedIndex, menuItem)',
            desc: 'Fired when a menu item is clicked that is not the one currently ' +
              'selected.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
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

module.exports = ButtonPage;
