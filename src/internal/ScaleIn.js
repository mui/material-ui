import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import ScaleInChild from './ScaleInChild';

const ScaleIn = React.createClass({

  propTypes: {
    childStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
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

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({}, {
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
          style={childStyle}
        >
          {child}
        </ScaleInChild>
      );
    });

    return (
      <ReactTransitionGroup
        {...other}
        style={prepareStyles(mergedRootStyles)}
        component="div"
      >
        {newChildren}
      </ReactTransitionGroup>
    );
  },

});

export default ScaleIn;
