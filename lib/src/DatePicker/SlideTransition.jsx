import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const animationDuration = 300;

const SlideTransition = ({
  classes, children, slideDirection, ...other
}) => (
  <ReactCSSTransitionGroup
    transitionEnterTimeout={animationDuration}
    transitionLeaveTimeout={animationDuration}
    transitionName={{
      enter: classes[`slideEnter-${slideDirection}`],
      enterActive: classes.slideEnterActive,
      leave: classes.slideLeave,
      leaveActive: classes[`slideLeaveActiveLeft-${slideDirection}`],
    }}
    {...other}
  >
    {children}
  </ReactCSSTransitionGroup>
);

SlideTransition.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  slideDirection: PropTypes.oneOf(['left', 'right']).isRequired,
};

const styles = theme => ({
  'slideEnter-left': {
    transform: 'translate(100%)',
  },
  'slideEnter-right': {
    transform: 'translate(-100%)',
  },
  slideEnterActive: {
    transform: 'translate(0%)',
    transition: theme.transitions.create('transform', { duration: animationDuration }),
  },
  slideLeave: {
    transform: 'translate(0%)',
  },
  'slideLeaveActiveLeft-left': {
    transform: 'translate(-100%)',
    transition: theme.transitions.create('transform', { duration: animationDuration }),
  },
  'slideLeaveActiveLeft-right': {
    transform: 'translate(100%)',
    transition: theme.transitions.create('transform', { duration: animationDuration }),
  },
});

export default withStyles(styles, {
  name: 'MuiPickersSlideTransition',
})(SlideTransition);
