let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
let Children = require('../utils/children');
let Dom = require('../utils/dom');
let List = require('../lists/list');


let Menu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    listStyle: React.PropTypes.object,
    onItemTouchTap: React.PropTypes.func,
    open: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf(['bottom-left', 'bottom-right',
      'top-left', 'top-right']),
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
      desktop,
      listStyle,
      open,
      openDirection,
      style,
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
      }
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedListStyles = this.mergeStyles(styles.list, listStyle);

    //Cascade children opacity
    //let _this = this;
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
        desktop: desktop,
        onTouchTap: (e) => {
          this.props.onItemTouchTap(e, child);
          if (child.props.onTouchTap) child.props.onTouchTap(e);
        }
      }, child.props.children);

      return <div style={mergedChildrenStyles}>{clonedChild}</div>;

    }.bind(this));

    return (
      <div style={mergedRootStyles}>
        <List
          {...other}
          ref="list"
          style={mergedListStyles}>
          {children}
        </List>
      </div>
    );
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
