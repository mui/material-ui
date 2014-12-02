/**
 * @jsx React.DOM
 */

var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  mui = require('mui'),
  AppBar = mui.AppBar,
  AppCanvas = mui.AppCanvas,
  Menu = mui.Menu,
  IconButton = mui.IconButton,
  AppLeftNav = require('./app-left-nav.jsx');

var Master = React.createClass({

  mixins: [Router.State],

  render: function() {

    var title = 
      (this.isActive('get-started')) ? 'Get Started' :
      (this.isActive('css-framework')) ? 'Css Framework' :
      (this.isActive('components')) ? 'Components' : '';

    return (
      <AppCanvas predefinedLayout={1}>

        <AppBar
          className="mui-dark-theme"
          onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
          title={title}
          zDepth={0}>
          <IconButton className="github-icon-button" icon="mui-icon-github" onTouchTap={this._onGithubTouchTap} />
        </AppBar>

        <AppLeftNav ref="leftNav" />

        <RouteHandler />

        <div className="footer full-width-section mui-dark-theme">
          <p>
            Hand crafted with love by the engineers at <a href="http://call-em-all.com">Call-Em-All</a> and our 
            awesome <a href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
          </p>
          <IconButton className="github-icon-button" icon="mui-icon-github" onTouchTap={this._onGithubTouchTap} />
        </div>

      </AppCanvas>
    );
  },

  _onGithubTouchTap: function() {
    document.location.href='https://github.com/callemall/material-ui';
  },

  _onMenuIconButtonTouchTap: function() {
    this.refs.leftNav.toggle();
  }
  
});

module.exports = Master;