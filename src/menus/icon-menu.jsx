let React = require('react/addons');
let ClickAwayable = require('../mixins/click-awayable');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
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
    menuPosition: React.PropTypes.oneOf(['bottom-left', 'bottom-right',
      'top-left', 'top-right']),
    menuStyle: React.PropTypes.object,
    onKeyDown: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      menuPosition: 'bottom-left'
    };
  },

  getInitialState() {
    return {
      open: false,
    }
  },

  componentClickAway() {
    this.close();
  },

  render() {
    let {
      desktop,
      iconButtonElement,
      menuPosition,
      menuStyle,
      width,
      style,
      ...other
    } = this.props;

    let open = this.state.open;
    let openDown = menuPosition.split('-')[0] === 'bottom';
    let openLeft = menuPosition.split('-')[1] === 'left';

    let styles = {
      root: {
        display: 'inline-block',
        position: 'relative'
      },

      //This is needed bacause the container scales x faster than
      //it scales y
      menuContainer: {
        transition: Transitions.easeOut('250ms', 'transform'),
        transitionDelay: open ? '0ms' : '250ms',
        position: 'absolute',
        zIndex: 10,
        top: openDown ? 12 : null,
        bottom: !openDown ? 12 : null,
        left: !openLeft ? 12 : null,
        right: openLeft ? 12 : null,
        transform: open ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: openLeft ? 'right' : 'left'
      },

      menu: {
        transition: Transitions.easeOut(null, ['transform', 'opacity']),
        transitionDuration: open ? '500ms' : '200ms',
        transform: open ? 'scaleY(1) translate3d(0,0,0)' : 'scaleY(0) translate3d(0,-8px,0)',
        transformOrigin: openDown ? 'top' : 'bottom',
        opacity: open ? 1 : 0
      },

      menuItem: {
        transition: Transitions.easeOut(null, 'opacity'),
        transitionDelay: open ? '400ms' : '0ms',
        opacity: open ? 1 : 0
      }
    };

    let _this = this;
    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedMenuContainerStyles = this.mergeAndPrefix(styles.menuContainer);
    let mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    let iconButton = React.cloneElement(iconButtonElement, {
      onTouchTap: (e) => {
        _this._handleIconButtonTouchTap(e, this);
      }
    }, iconButtonElement.props.children);

    //Cascade children opacity
    let childrenTransitionDelay = openDown ? 175 : 325;
    let childrenTransitionDelayIncrement = Math.ceil(150/React.Children.count(this.props.children));
    let children = React.Children.map(this.props.children, (child) => {

      if (openDown) {
        childrenTransitionDelay += childrenTransitionDelayIncrement;
      } else {
        childrenTransitionDelay -= childrenTransitionDelayIncrement;
      }

      let mergedChildrenStyles = this.mergeStyles(styles.menuItem, {
        transitionDelay: open ? childrenTransitionDelay + 'ms' : '0ms'
      }, child.props.style);

      let clonedChild = React.cloneElement(child, {
        onTouchTap: (e) => {
          _this._handleChildTouchTap(e, this);
        }
      }, child.props.children);

      return <div style={mergedChildrenStyles}>{clonedChild}</div>;

    });

    return (
      <div
        {...other}
        style={mergedRootStyles}
        onKeyDown={this._handleKeyDown}>

        {iconButton}

        <div style={mergedMenuContainerStyles}>
          <Menu
            desktop={desktop}
            width={width}
            style={mergedMenuStyles}>
            {children}
          </Menu>
        </div>

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

  _handleIconButtonTouchTap(e, iconButton) {
    this.open();
    if (iconButton.props.onTouchTap) iconButton.props.onTouchTap(e);
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

  _handleChildTouchTap(e, child) {
    setTimeout(() => {
      this.close();
      if (child.props.onTouchTap) child.props.onTouchTap(e);
    }, 200);
  }
});

module.exports = IconMenu;
