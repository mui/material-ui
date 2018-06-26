import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import AnimateHeight from 'react-animate-height';

const SHORT_TRANSITION = 150

export const styles = theme => {
  return {
    root: {
      width: '100%',
      paddingLeft: 7.5,
      paddingRight: 7.5,
    },
    collapsed: {
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

  const animationProps = {
    className,
    animationStateClasses,
    duration: SHORT_TRANSITION,
    height: 'auto',
    animateOpacity: true,
    height: expanded ? 'auto' : 0,
  }

  return (
    <AnimateHeight {...animationProps} {...other}>
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
