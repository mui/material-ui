import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import Slide from '@material-ui/core/Slide';

const animationDuration = 350;

const transitionFactory = props => child => React.cloneElement(child, props);

const SlideTransition = ({
  classes, className, children, transKey, slideDirection,
}) => (
  <TransitionGroup
    className={classnames(classes.transitionContainer, className)}
    childFactory={transitionFactory({
       classNames: {
              enter: classes[`slideEnter-${slideDirection}`],
              enterActive: classes.slideEnterActive,
              exit: classes.slideExit,
              exitActive: classes[`slideExitActiveLeft-${slideDirection}`],
            },
      })
    }
  >
    <CSSTransition key={transKey} mountOnEnter unmountOnExit timeout={animationDuration}>
      {children}
    </CSSTransition>
  </TransitionGroup>
);

SlideTransition.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  slideDirection: PropTypes.oneOf(['left', 'right']).isRequired,
  transKey: PropTypes.string,
};

SlideTransition.defaultProps = {
  className: undefined,
};

const styles = (theme) => {
  const slideTransition = theme.transitions.create('transform', {
    duration: animationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
  });

  return {
    transitionContainer: {
      display: 'block',
      position: 'relative',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      },
    },
    'slideEnter-left': {
      willChange: 'transform',
      transform: 'translate(100%)',
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)',
    },
    slideEnterActive: {
      transform: 'translate(0%)',
      transition: slideTransition,
    },
    slideExit: {
      transform: 'translate(0%)',
    },
    'slideExitActiveLeft-left': {
      willChange: 'transform',
      transform: 'translate(-100%)',
      transition: slideTransition,
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(100%)',
      transition: slideTransition,
    },
  };
};

export default withStyles(styles, {
  name: 'MuiPickersSlideTransition',
})(SlideTransition);
