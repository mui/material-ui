import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    delay: theme.transitions.duration.shortest,
  };

  return {
    root: {
      zIndex: theme.zIndex.appBar - 2,
      backgroundColor: theme.palette.background.paper,
      position: 'sticky',
      top: 0,
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 56,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    divided: {
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.divider,
      transition: theme.transitions.create(['border-bottom-color'], transition),
    },
    minimized: {
      cursor: 'pointer',
      borderBottomColor: 'transparent',
    },
  };
};

function BackdropFrontSubheader(props) {
  const { classes, className: classNameProp, divided, expanded, ...other } = props;
  const className = classNames(
    classes.root,
    { [classes.divided]: divided, [classes.minimized]: !expanded },
    classNameProp,
  );

  return <div className={className} {...other} />;
}

BackdropFrontSubheader.propTypes = {
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
   * If `true`, a thin dividing border is included in the header.
   */
  divided: PropTypes.bool,
  /**
   * @ignore
   * If `true`, parent panel is expanded.
   */
  expanded: PropTypes.bool,
};

BackdropFrontSubheader.defaultProps = {
  divided: true,
  expanded: true,
};

BackdropFrontSubheader.muiName = 'BackdropFrontSubheader';

export default withStyles(styles, { name: 'MuiBackdropFrontSubheader' })(BackdropFrontSubheader);
