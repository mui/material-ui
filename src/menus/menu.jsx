let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let Dom = require('../utils/dom');
let List = require('../lists/list');

let Menu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    width: React.PropTypes.number
  },

  getDefaultProps() {
    return {
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
      style,
      width,
      ...other
    } = this.props;

    let styles = {
      root: {
        display: 'table-cell',
        paddingBottom: desktop ? 16 : 8,
        paddingTop: desktop ? 16 : 8,
        userSelect: 'none',
        width: width
      }
    };

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { desktop: desktop }, child.props.children);
    });

    return (
      <List {...other} style={mergedRootStyles}>
        {children}
      </List>
    );
  },

  _setWidth() {

    let el = React.findDOMNode(this);
    let elWidth = el.offsetWidth;
    let keyWidth = this.state.keyWidth;
    let minWidth = keyWidth * 1.5;
    let keyIncrements = elWidth / keyWidth;
    let newWidth;

    keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
    newWidth = keyIncrements * keyWidth;

    if (newWidth < minWidth) newWidth = minWidth;

    Dom.withoutTransition(el, () => {
      el.style.width = newWidth + 'px';
    });
  }

});

module.exports = Menu;
