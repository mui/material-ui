let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let StylePropable = require('../mixins/style-propable');
let ScaleInChild = require('./scale-in-child');


let ScaleIn = React.createClass({

  mixins: [StylePropable],

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
    let {
      children,
      childStyle,
      enterDelay,
      maxScale,
      minScale,
      style,
      ...other,
    } = this.props;

    let mergedRootStyles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);

    let newChildren = React.Children.map(children, (child) => {
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
