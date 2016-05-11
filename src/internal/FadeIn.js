import React, {Component, PropTypes} from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import FadeInChild from './FadeInChild';

class FadeIn extends Component {
  static propTypes = {
    childStyle: PropTypes.object,
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      enterDelay,
      children,
      childStyle,
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
        <FadeInChild
          key={child.key}
          enterDelay={enterDelay}
          style={childStyle}
        >
          {child}
        </FadeInChild>
      );
    }, this);

    return (
      <ReactTransitionGroup
        {...other}
        style={prepareStyles(mergedRootStyles)}
        component="div"
      >
        {newChildren}
      </ReactTransitionGroup>
    );
  }
}

export default FadeIn;
