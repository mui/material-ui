let React = require('react/addons');
let ClickAwayable = require('../mixins/click-awayable');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
let Children = require('../utils/children');
let KeyCode = require('../utils/key-code');
let Menu = require('../menus/menu');

let IconMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    openDirection: React.PropTypes.oneOf(['bottom-left', 'bottom-right',
      'top-left', 'top-right']),
    onItemTouchTap: React.PropTypes.func,
    menuListStyle: React.PropTypes.object,
    onKeyDown: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      onItemTouchTap: () => {}
    };
  },

  getInitialState() {
    return {
      open: false
    }
  },

  componentClickAway() {
    this.close();
  },

  render() {
    let {
      desktop,
      iconButtonElement,
      openDirection,
      onItemTouchTap,
      menuListStyle,
      width,
      style,
      ...other
    } = this.props;

    let open = this.state.open;

    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative'
      }
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    let iconButton = React.cloneElement(iconButtonElement, {
      onTouchTap: (e) => {
        this.open();
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      }.bind(this)
    }, iconButtonElement.props.children);

    return (
      <div
        {...other}
        style={mergedRootStyles}
        onKeyDown={this._handleKeyDown}>

        {iconButton}

        <Menu
          desktop={desktop}
          open={open}
          openDirection={openDirection}
          onItemTouchTap={this._handleItemTouchTap}
          width={width}
          menuListStyle={menuListStyle}>
          {this.props.children}
        </Menu>

      </div>
    );
  },

  close() {
    if (!this.state.close) {
      this.setState({
        open: false
      });
    }
  },

  open() {
    if (!this.state.open) {
      this.setState({
        open: true
      });
    }
  },

  _handleKeyDown(e) {
    switch (e.which) {
      case KeyCode.ESC:
        this.close();
      default:
        return;
    }
    e.preventDefault();
  },

  _handleItemTouchTap(e, child) {
    setTimeout(() => {
      this.close();
      this.props.onItemTouchTap(e, child);
    }, 200);
  }
});

module.exports = IconMenu;
