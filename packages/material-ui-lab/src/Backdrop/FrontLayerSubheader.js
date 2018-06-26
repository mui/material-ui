import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = theme => {
  return {
    root: {
      zIndex: theme.zIndex.appBar - 1,
      backgroundColor: theme.palette.background.paper,
      position: 'sticky',
      top: 0,
      height: 56,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    divided: {
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.divider
    }
  };
};

function BackdropFrontSubheader(props) {
  const {
    classes,
    className: classNameProp,
    children,
    divided,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    { [classes.divided]: divided },
    classNameProp,
  );

  return (
    <div className={className}>
    { children }
    </div>
  );
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
};

BackdropFrontSubheader.defaultProps = {
  divided: true
};

export default withStyles(styles, { name: 'MuiBackdropFrontHeader' })(BackdropFrontSubheader);
