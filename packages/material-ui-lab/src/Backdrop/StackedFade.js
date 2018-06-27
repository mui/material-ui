// @inheritedComponent Fade

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';
import { duration } from '@material-ui/core/styles/transitions';

export const styles = {
  root: {
    position: 'relative',
    top: 0,
    left: '100%',
    marginLeft: '-100%',
    float: 'left',
  },
  selected: {},
};

function StackedFade(props) {
  const {
    classes,
    timeout,
    className: classNameProp,
    style: styleProp,
    in: inProp,
    ...other
  } = props;

  const className = classNames(classes.root, classNameProp);

  const inTransitionDelay =
    (styleProp && styleProp.transitionDuration) || typeof timeout === 'object'
      ? timeout.exit
      : timeout;

  const style = {
    ...styleProp,
    zIndex: inProp ? 1 : 0,
    transitionDelay: inProp ? inTransitionDelay : 0,
  };

  return <Fade className={className} style={style} in={inProp} timeout={timeout} {...other} />;
}

StackedFade.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

StackedFade.defaultProps = {
  timeout: duration.shortest,
};

export default withStyles(styles, { name: 'MuiStackedFade' })(StackedFade);
