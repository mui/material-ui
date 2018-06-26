import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import AnimateHeight from 'react-animate-height';
import Fade from '@material-ui/core/Fade';

const FADE_OUT = 150
const EXPAND = 150
const FADE_IN = 150

export const styles = theme => {
  return {
    root: {
      width: '100%',
      paddingLeft: 7.5,
      paddingRight: 7.5,
      opacity: 0,
      zIndex: 0
    },
    expanded: {
      zIndex: 1,
      opacity: 0,
    }
  }
};

function BackdropBackSection(props) {
  const { children, classes, className: classNameProp, expanded, ...other } = props;

  const className = classNames(
    classes.root,
    classNameProp,
    { [classes.expanded]: expanded }
  );

  const animationProps = {
    delay: FADE_OUT,
    duration: EXPAND,
    height: 'auto',
    height: expanded ? 'auto' : 0,
  }

  const fadeProps = {
    in: expanded,
    timeout: expanded ? FADE_IN : FADE_OUT,
    style: {
      transitionDelay: expanded ? EXPAND + FADE_OUT : 0,
    }
  }

  return (
    <AnimateHeight {...animationProps} {...other}>
      <Fade {...fadeProps}>
        <div className={className}>
          {children}
        </div>
      </Fade>
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
