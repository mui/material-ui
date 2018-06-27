import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import AnimateHeight from 'react-animate-height';

export const styles = {
  root: {
    overflow: 'auto!important',
  },
  content: {},
};

const FADE_OUT = 150;
const EXPAND = 150;

function BackdropFrontContent(props) {
  const { classes, className: classNameProp, expanded, ...other } = props;

  const className = classNames(classes.root, classNameProp);

  const animationProps = {
    className,
    contentClassName: classes.content,
    delay: FADE_OUT,
    duration: EXPAND,
    height: expanded ? 'auto' : 0,
  };

  return <AnimateHeight {...animationProps} {...other} />;
}

BackdropFrontContent.propTypes = {
  /**
   * The content of the front panel.
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
   * @ignore
   * If `true`, parent panel is expanded.
   */
  expanded: PropTypes.bool,
};

BackdropFrontContent.defaultProps = {
  expanded: true,
};

BackdropFrontContent.muiName = 'BackdropFrontContent';

export default withStyles(styles, { name: 'MuiBackdropFrontContent' })(BackdropFrontContent);
