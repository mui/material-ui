import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactTransitionGroup from 'react-addons-transition-group';
import StylePropable from '../mixins/style-propable';
import ScaleInChild from './scale-in-child';
import muiThemeable from '../muiThemeable';

let ScaleIn = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

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

    const mergedRootStyles = this.prepareStyles({
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

ScaleIn = muiThemeable(ScaleIn);

export default ScaleIn;
