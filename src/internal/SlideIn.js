import React, {Component, PropTypes, Children} from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import SlideInChild from './SlideInChild';

class SlideIn extends Component {
  static propTypes = {
    childStyle: PropTypes.object,
    children: PropTypes.node,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    enterDelay: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
    direction: 'left',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getLeaveDirection = () => {
    return this.props.direction;
  };

  render() {
    const {
      enterDelay,
      children,
      childStyle,
      direction,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.context.muiTheme;

    const rootStyle = Object.assign({
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);

    return (
      <ReactTransitionGroup
        {...other}
        style={prepareStyles(rootStyle)}
        component="div"
      >
        {Children.map(children, (child) => {
          return (
            <SlideInChild
              key={child.key}
              direction={direction}
              enterDelay={enterDelay}
              getLeaveDirection={this.getLeaveDirection}
              style={childStyle}
            >
              {child}
            </SlideInChild>
          );
        })}
      </ReactTransitionGroup>
    );
  }
}

export default SlideIn;
