let React = require('react/addons');
let update = React.addons.update;
let Controllable = require('../mixins/controllable');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
let Children = require('../utils/children');
let Dom = require('../utils/dom');
let List = require('../lists/list');


let Menu = React.createClass({

  mixins: [StylePropable, Controllable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    listStyle: React.PropTypes.object,
    multiple: React.PropTypes.bool,
    onItemTouchTap: React.PropTypes.func,
    open: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right'
    ]),
    selectedMenuItemStyle: React.PropTypes.object,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  getDefaultProps() {
    return {
      onItemTouchTap: () => {},
      open: true,
      openDirection: 'bottom-left',
      zDepth: 1
    };
  },

  getInitialState() {
    return {
      keyWidth: this.props.desktop ? 64 : 56
    };
  },

  componentDidMount() {
    this._setWidth();
  },

  componentDidUpdate() {
    this._setWidth();
  },

  render() {

    let {
      children,
      desktop,
      listStyle,
      multiple,
      open,
      openDirection,
      selectedMenuItemStyle,
      style,
      value,
      valueLink,
      width,
      ...other
    } = this.props;

    let openDown = openDirection.split('-')[0] === 'bottom';
    let openLeft = openDirection.split('-')[1] === 'left';

    let styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
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

      list: {
        display: 'table-cell',
        paddingBottom: desktop ? 16 : 8,
        paddingTop: desktop ? 16 : 8,
        userSelect: 'none',
        width: width,
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
      },

      selectedMenuItem: {
        color: this.context.muiTheme.palette.accent1Color
      }
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedListStyles = this.mergeStyles(styles.list, listStyle);

    //Cascade children opacity
    let childrenTransitionDelay = openDown ? 175 : 325;
    let childrenTransitionDelayIncrement = Math.ceil(150/React.Children.count(this.props.children));
    let newChildren = React.Children.map(children, (child) => {

      if (openDown) {
        childrenTransitionDelay += childrenTransitionDelayIncrement;
      } else {
        childrenTransitionDelay -= childrenTransitionDelayIncrement;
      }

      let childrenContainerStyles = this.mergeStyles(styles.menuItem, {
        transitionDelay: open ? childrenTransitionDelay + 'ms' : '0ms'
      });

      let menuValue = this.getValueLink(this.props).value;
      let childValue = child.props.value;
      let selectedChildrenStyles = {};

      if ((multiple && menuValue.length && menuValue.indexOf(childValue) !== -1) ||
        (!multiple && menuValue && menuValue === childValue)) {
        selectedChildrenStyles = this.mergeStyles(styles.selectedMenuItem, selectedMenuItemStyle);
      }

      let mergedChildrenStyles = this.mergeStyles(
        child.props.style || {},
        selectedChildrenStyles
      );

      let clonedChild = React.cloneElement(child, {
        desktop: desktop,
        onTouchTap: (e) => {
          this._handleMenuItemTouchTap(e, child);
          if (child.props.onTouchTap) child.props.onTouchTap(e);
        },
        style: mergedChildrenStyles
      });

      return <div style={childrenContainerStyles}>{clonedChild}</div>;

    }.bind(this));

    return (
      <div style={mergedRootStyles}>
        <List
          {...other}
          ref="list"
          style={mergedListStyles}>
          {newChildren}
        </List>
      </div>
    );
  },

  _handleMenuItemTouchTap(e, item) {
    let multiple = this.props.multiple;
    let valueLink = this.getValueLink(this.props);
    let menuValue = valueLink.value;
    let itemValue = item.props.value;

    if (multiple) {
      let index = menuValue.indexOf(itemValue);
      let newMenuValue = index === -1 ?
        update(menuValue, {$push: [itemValue]}) :
        update(menuValue, {$splice: [[index, 1]]});

      valueLink.requestChange(e, newMenuValue);

    } else if (!multiple && itemValue !== menuValue) {
      valueLink.requestChange(e, itemValue);
    }

    this.props.onItemTouchTap(e, item);
  },

  _setWidth() {
    let el = React.findDOMNode(this);
    let listEl = React.findDOMNode(this.refs.list);
    let elWidth = el.offsetWidth;
    let keyWidth = this.state.keyWidth;
    let minWidth = keyWidth * 1.5;
    let keyIncrements = elWidth / keyWidth;
    let newWidth;

    keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
    newWidth = keyIncrements * keyWidth;

    if (newWidth < minWidth) newWidth = minWidth;

    el.style.width = newWidth + 'px';
    listEl.style.width = newWidth + 'px';
  }

});

module.exports = Menu;
