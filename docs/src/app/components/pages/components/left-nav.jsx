/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  LeftNav = mui.LeftNav,
  PaperButton = mui.PaperButton,
  CodeExample = require('../../code-example/code-example.jsx'),

  menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { route: 'css-framework', text: 'CSS Framework' },
    { route: 'components', text: 'Components' },
    { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
    { type: mui.MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' }
  ];

var ButtonPage = React.createClass({

  render: function() {
    var code = 
      'menuItems = [\n' +
      '  { route: \'get-started\', text: \'Get Started\' },\n' +
      '  { route: \'css-framework\', text: \'CSS Framework\' },\n' +
      '  { route: \'components\', text: \'Components\' },\n' +
      '  { type: mui.MenuItem.Types.SUBHEADER, text: \'Resources\' },\n' +
      '  { \n' +
      '     type: mui.MenuItem.Types.LINK, \n' +
      '     payload: \'https://github.com/callemall/material-ui\', \n' +
      '     text: \'GitHub\' \n' +
      '  },\n' +
      '];\n\n' +
      '//Docked Left Nav\n' +
      '<LeftNav menuItems={menuItems} />\n\n' +
      '//Hideable Left Nav\n' +
      '<LeftNav docked={false} isInitiallyOpen={false} menuItems={menuItems} />\n\n';
      
    return (
      <div>
        <h2 className="mui-font-style-headline">Left Nav</h2>
        <CodeExample code={code}>
          <div className="left-nav-example">
            <PaperButton label="Toggle Docked Left Nav" onClick={this._toggleDockedLeftNavClick} /><br/>
            <PaperButton label="Show Hideable Left Nav" onClick={this._showLeftNavClick} />
            <LeftNav ref="dockedLeftNav" isInitiallyOpen={false} menuItems={menuItems} />
            <LeftNav ref="leftNav" docked={false} isInitiallyOpen={false} menuItems={menuItems} />
          </div>
        </CodeExample>
      </div>
    );
  },

  _showLeftNavClick: function() {
    this.refs.leftNav.toggle();
  },

  _toggleDockedLeftNavClick: function() {
    this.refs.dockedLeftNav.toggle();
  }

});

module.exports = ButtonPage;
