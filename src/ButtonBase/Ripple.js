// @flow weak

import * as React from 'react';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate?: boolean,
  /**
   * Diameter of the ripple.
   */
  rippleSize: number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: number,
};

type State = { rippleVisible: boolean, rippleLeaving: boolean };

/**
 * @ignore - internal component.
 */
class Ripple extends React.Component<Props, State> {
  props: Props;
  static defaultProps = {
    pulsate: false,
  };

  state = {
    rippleVisible: false,
    rippleLeaving: false,
  };

  handleEnter = () => {
    this.setState({
      rippleVisible: true,
    });
  };

  handleExit = () => {
    this.setState({
      rippleLeaving: true,
    });
  };

  getRippleStyles = props => {
    const { rippleSize, rippleX, rippleY } = props;

    return {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };
  };

  render() {
    const {
      classes,
      className: classNameProp,
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      ...other
    } = this.props;
    const { rippleVisible, rippleLeaving } = this.state;

    const className = classNames(
      classes.wrapper,
      {
        [classes.wrapperLeaving]: rippleLeaving,
        [classes.wrapperPulsating]: pulsate,
      },
      classNameProp,
    );

    const rippleClassName = classNames(classes.ripple, {
      [classes.rippleVisible]: rippleVisible,
      [classes.rippleFast]: pulsate,
    });

    return (
      <Transition onEnter={this.handleEnter} onExit={this.handleExit} {...other}>
        <span className={className}>
          <span className={rippleClassName} style={this.getRippleStyles(this.props)} />
        </span>
      </Transition>
    );
  }
}

export default Ripple;
