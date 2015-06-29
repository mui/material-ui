let React = require('react/addons');
let ClickAwayable = require('../mixins/click-awayable');
let Controllable = require('../mixins/controllable');
let StylePropable = require('../mixins/style-propable');
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
    multiple: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right'
    ]),
    onItemTouchTap: React.PropTypes.func,
    menuListStyle: React.PropTypes.object,
    onKeyDown: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      onKeyDown: () => {},
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
      multiple,
      openDirection,
      onChange,
      onKeyDown,
      onItemTouchTap,
      menuListStyle,
      style,
      value,
      valueLink,
      width,
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
    });

    return (
      <div
        {...other}
        style={mergedRootStyles}
        onKeyDown={this._handleKeyDown}>

        {iconButton}

        <Menu
          desktop={desktop}
          menuListStyle={menuListStyle}
          multiple={multiple}
          onItemTouchTap={this._handleItemTouchTap}
          onChange={onChange}
          open={open}
          openDirection={openDirection}
          value={value}
          valueLink={valueLink}
          width={width}>
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
    this.props.onKeyDown(e);
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
