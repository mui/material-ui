import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import AnimateHeight from 'react-animate-height';

const SHORT_TRANSITION = 150

export const styles = theme => {
  const transition = {
    duration: SHORT_TRANSITION // theme.transitions.duration.shortest / 2,
  };
  return {
    root: {
      width: '100%',
      height: 0
    },
    collapsed: {
    //opacity: 0,
    //transition: theme.transitions.create('opacity', transition)
    },
    expanded: {
    }
  }
};

function BackdropBackSection(props) {
  const { children, classes, className: classNameProp, expanded, ...other } = props;

  const animationStateClasses = {
    animatingToHeightZero: classes.collapsed,
    animatingToHeightAuto: classes.expanded,
  };

  const className = classNames(
    classes.root,
    classNameProp,
  );

  // we delay for opacity animations
  const animationProps = !expanded ? {
    duration: SHORT_TRANSITION,
    //delay: SHORT_TRANSITION,
    height: 0,
    animateOpacity: true
  } : {
    duration: SHORT_TRANSITION,
    //delay: SHORT_TRANSITION,
    height: 'auto',
    animateOpacity: true
  }

  return (
    <AnimateHeight {...{ className, animationStateClasses }} {...animationProps} {...other}>
      {children}
    </AnimateHeight>
  );
}

BackdropBackSection.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
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
   * If `true`, expand to reveal contextual information.
   */
  expanded: PropTypes.bool,
};

BackdropBackSection.defaultProps = {
  expanded: false
};

export default withStyles(styles, { name: 'MuiBackdropBackSection' })(BackdropBackSection);
