/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('mui'),
  Menu = mui.Menu,
  Icon = mui.Icon,
  AppLeftNav = require('./app-left-nav.jsx');

var Master = React.createClass({

  render: function() {

    var title = '';

    return (
      <mui.AppCanvas predefinedLayout={1}>
        <mui.AppBar onMenuIconClick={this._onMenuIconClick} title={title} zDepth={0}><Icon icon="github" onClick={this._onGithubClick} /></mui.AppBar>
        <AppLeftNav ref="leftNav" />
        <this.props.activeRouteHandler />
        <div className="footer">
            <Icon icon="github" onClick={this._onGithubClick} />
            <p>Hand crafted with love by the engineers at <a href="http://call-em-all.com">Call-Em-All</a> and our awesome <a href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.</p>
        </div>
      </mui.AppCanvas>
    );
  },

  _onGithubClick: function() {
    document.location.href='https://github.com/callemall/material-ui';
  },

  _onMenuIconClick: function() {
    this.refs.leftNav.toggle();
  }
  
});

module.exports = Master;
