/**
 * @jsx React.DOM
 */

var React = require('react'),
  //Dispatcher = require('../app-dispatcher.js'),
  mui = require('mui'),
  Menu = mui.Menu,
  Icon = mui.Icon,
  Pages = require('./pages.jsx'),
  AppLeftNav = require('./app-left-nav.jsx');

var Master = React.createClass({

  render: function() {
    // var page = Pages.getPage(this.state.currentUrl),
    //   title = page.title,
    //   currentMainComponent = page.mainContentComponent,
    //   contentCanvasClass = page.subPages ? 'mui-app-content-canvas with-nav' : 'mui-app-content-canvas',
    //   subNav;

    // if (page.subPages) {
    //   var menuItems = [],
    //     i = 0,
    //     selectedIndex,
    //     currentSubPage;

    //   for (prop in page.subPages) {
    //     currentSubPage = page.subPages[prop];

    //     if (this.state.currentUrl === currentSubPage.url) {
    //       selectedIndex = i;
    //       currentMainComponent = currentSubPage.mainContentComponent;
    //     }
    //     menuItems.push({ payload: currentSubPage.url, text: currentSubPage.title });
    //     i++;
    //   }

    //   subNav = (
    //     <div className="subNav">
    //       <Menu ref="menuItems" zDepth={0} menuItems={menuItems} selectedIndex={selectedIndex} onItemClick={this._onMenuItemClick} />
    //     </div>
    //   );
    // }

    var title = '',
      leftNavUrl = '';

    return (
      <mui.AppCanvas predefinedLayout={1}>
        <mui.AppBar onMenuIconClick={this._onMenuIconClick} title={title} zDepth={0}><Icon icon="github" onClick={this._onGithubClick} /></mui.AppBar>
        <AppLeftNav ref="leftNav" url={leftNavUrl} />
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

  // _onMenuItemClick: function(e, key, item) {
  //   Dispatcher.dispatchAction(Dispatcher.ActionTypes.NAV_USER_CLICK, { url: item.payload } ); 
  // },

  _onMenuIconClick: function() {
    this.refs.leftNav.toggle();
  }

  // _onStoreChange: function() {
  //   this.setState({
  //     currentUrl: AppStateStore.get('currentUrl')
  //   });
  // }
  
});

module.exports = Master;
