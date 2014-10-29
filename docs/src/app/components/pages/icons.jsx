/**
 * @jsx React.DOM
 */

var React = require('react'),
  	mui = require('mui'),
    Icon = mui.Icon,
    CodeExample = require('../code-example/code-example.jsx'),

    coreIcons = [
      'arrow-drop-down', 
      'arrow-drop-right',
      'cancel',
      'check',
      'check-all',
      'chevron-down',
      'chevron-right',
      'close',
      'delete',
      'help',
      'home',
      'menu',
      'more-horiz',
      'more-vert',
      'search',
      'settings'
    ],

    appIcons = [
      'broadcast',
      'cloud-download',
      'cloud-upload',
      'contacts',
      'edit',
      'favorite',
      'favorite-outline',
      'filter',
      'github',
      'group',
      'group-add',
      'mic',
      'pause',
      'person',
      'person-add',
      'phone',
      'pie',
      'play',
      'select-all',
      'sort',
      'star',
      'star-outline',
      'stop',
      'textsms',
      'web'
    ];

var IconsPage = React.createClass({

  render: function() {
    return (
    	<div>
        <h2 className="mui-font-style-headline">Icon Component</h2>
        {this._getComponentExample()}

        <h2 className="mui-font-style-headline">Core Icons</h2>
        <hr />
        <div className="icon-group">
          {this._getIconGroup(coreIcons)}
        </div>

        <br/>

        <h2 className="mui-font-style-headline">App Icons</h2>
        <hr />
        <div className="icon-group">
          {this._getIconGroup(appIcons)}
        </div>
        
		</div>
    );
  },

  _getIconGroup: function(icons) {
    var iconExamples = [];

    icons.forEach(function(icon) {
      iconExamples.push(this._getIconExample(icon));
    }, this);

    return iconExamples;
  },

  _getIconExample: function(icon) {
    return (
      <div className="icon-example">
        <Icon icon={icon} /><span>{icon}</span>
      </div>
    );
  },

  _getComponentExample: function() {
    var code = '<Icon icon="home" />';

    return (
      <CodeExample code={code}>
        <Icon icon='home' />
      </CodeExample>
    );
  }

});

module.exports = IconsPage;
