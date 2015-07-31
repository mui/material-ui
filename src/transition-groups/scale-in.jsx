const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const ReactTransitionGroup = React.addons.TransitionGroup;
const StylePropable = require('../mixins/style-propable');
const ScaleInChild = require('./scale-in-child');


const ScaleIn = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    childStyle: React.PropTypes.object,
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      enterDelay: 0,
    };
  },

  render() {
    const {
      children,
      childStyle,
      enterDelay,
      maxScale,
      minScale,
      style,
      ...other,
    } = this.props;

    const mergedRootStyles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);

    const newChildren = React.Children.map(children, (child) => {
      return (
        <ScaleInChild
          key={child.key}
          enterDelay={enterDelay}
          maxScale={maxScale}
          minScale={minScale}
          style={childStyle}>
          {child}
        </ScaleInChild>
      );
    });

    return (
      <ReactTransitionGroup
        {...other}
        style={mergedRootStyles}
        component="div">
        {newChildren}
      </ReactTransitionGroup>
    );
  },

});

module.exports = ScaleIn;
