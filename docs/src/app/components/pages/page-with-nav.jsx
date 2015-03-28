var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  mui = require('mui'),
  Menu = mui.Menu;

class PageWithNav extends React.Component {

  constructor() {
    super();
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onMenuItemClick = this._onMenuItemClick.bind(this);
  }

  render() {
    return (
      <div className="mui-app-content-canvas page-with-nav">
        <div className="page-with-nav-content">
          <RouteHandler />
        </div>
        <div className="page-with-nav-secondary-nav">
          <Menu 
            ref="menuItems" 
            zDepth={0} 
            menuItems={this.props.menuItems} 
            selectedIndex={this._getSelectedIndex()} 
            onItemClick={this._onMenuItemClick} />
        </div>
      </div>
    );
  }

  _getSelectedIndex() {
    var menuItems = this.props.menuItems;
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) {
        return i;
      }
    }
  }

  _onMenuItemClick(e, index, item) {
    this.context.router.transitionTo(item.route);
  }
  
}

PageWithNav.propTypes = {
  menuItems: React.PropTypes.array
};

PageWithNav.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PageWithNav;
