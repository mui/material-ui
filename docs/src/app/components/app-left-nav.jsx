/**
 * @jsx React.DOM
 */

var React = require('react'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  mui = require('mui');

var AppLeftNav = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {
      menuItems: [
        { payload: 'get-started', text: 'Get Started' },
        { payload: 'css-framework', text: 'CSS Framework' },
        { payload: 'components', text: 'Components' },
        { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
        { type: mui.MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' },
        { type: mui.MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' },
        { type: mui.MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design/introduction.html', text: 'Material Design' }
      ]
    }
  },

  componentWillMount: function() {
    this._setSelectedIndex(this.props.url);
  },

  componentWillReceiveProps: function(newProps) {
    this._setSelectedIndex(newProps.url);
  },

  render: function() {
    var header = <div className="logo" onClick={this._onHeaderClick}>material ui</div>;

    return (
      <mui.LeftNav 
        ref="leftNav"
        isInitiallyOpen={false}
        header={header}
        menuItems={this.state.menuItems}
        selectedIndex={this.state.selectedIndex}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _setSelectedIndex: function(url) {
    var item;

    for (var i = 0; i < this.state.menuItems.length; i++) {
      item = this.state.menuItems[i];

      //only match the root part of the url
      if (url && item.payload && item.payload.url.split('/')[0] === url.split('/')[0]) {
        if (i !== this.state.selectedIndex) this.setState({ selectedIndex: i});
        return;
      }
    };

    this.setState({ selectedIndex: null});
  },

  _onHeaderClick: function() {
    this.transitionTo('root');
    this.refs.leftNav.close();
  }

});

module.exports = AppLeftNav;
