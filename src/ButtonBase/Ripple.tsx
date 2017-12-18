import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import * as Transition from 'react-transition-group/Transition';
import { ClassNameMap } from '../styles/withStyles';
import { TransitionProps } from '../transitions/transition';

export type RippleClassKey =
  | 'root'
  | 'wrapper'
  | 'wrapperLeaving'
  | 'wrapperPulsating'
  | 'ripple'
  | 'rippleVisible'
  | 'rippleFast';

export interface RippleProps extends TransitionProps {
  classes: ClassNameMap<RippleClassKey>;
  pulsate?: boolean;
  rippleSize?: number;
  rippleX?: number;
  rippleY?: number;
}

interface State {
  rippleVisible: boolean;
  rippleLeaving: boolean;
}

/**
 * @ignore - internal component.
 */
class Ripple extends React.Component<RippleProps, State> {
  static defaultProps = {
    pulsate: false,
  };
  state: State = {
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

  render() {
    const {
      classes,
      className: classNameProp,
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      ...other,
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

    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };

    return (
      <Transition onEnter={this.handleEnter} onExit={this.handleExit} {...other}>
        <span className={className}>
          <span className={rippleClassName} style={rippleStyles} />
        </span>
      </Transition>
    );
  }
}

(Ripple as any).propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,
};

export default Ripple;
