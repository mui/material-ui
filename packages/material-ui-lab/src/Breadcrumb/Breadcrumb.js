import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import ButtonBase from '@material-ui/core/ButtonBase';

const height = 24;

const styles = theme => ({
  button: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    height,
    lineHeight: `${height}px`,
    color: theme.palette.grey[800],
    borderRadius: 2,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:active': {
      boxShadow: theme.shadows[0],
      backgroundColor: emphasize(theme.palette.grey[100], 0.12),
    },
  },
  active: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  gutters: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    marginRight: 4,
    width: height / 1.2,
    height: height / 1.2,
    color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
  },
});

class Breadcrumb extends React.PureComponent {
  render() {
    const {
      classes,
      className: classNameProp,
      icon: iconProp,
      label,
      active,
      disableGutters,
      tabIndex: tabIndexProp,
      onClick,
      ...other
    } = this.props;

    let tabIndex = tabIndexProp;

    if (!tabIndex) {
      tabIndex = onClick ? 0 : -1;
    }

    let icon = null;
    if (React.isValidElement(iconProp)) {
      icon = React.cloneElement(iconProp, {
        className: classNames(classes.icon, iconProp.props.className),
      });
    }

    const className = classNames(
      {
        [classes.gutters]: !disableGutters,
        [classes.active]: active,
      },
      classNameProp,
    );

    return (
      <ButtonBase
        variant="default"
        color="primary"
        tabIndex={tabIndex}
        onClick={onClick}
        disabled={active}
        className={className}
        {...other}
      >
        {icon}
        {label}
      </ButtonBase>
    );
  }
}

Breadcrumb.propTypes = {
  /**
   * Indicates if the breadcrumb is the active one.
   * Usually set on the last element in the breadcrumb
   */
  active: PropTypes.bool,
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
   * If `true`, disables gutter padding.
   */
  disableGutters: PropTypes.bool,
  /**
   * The URL to link to when the breadcrumb is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * An icon to display before the breadcrumb.
   */
  icon: PropTypes.node,
  /**
   * The label to appear in the breadcrumb.
   */
  label: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
};

Breadcrumb.defaultProps = {
  disableGutters: false,
  active: false,
};

export default withStyles(styles, { name: 'MuiBreadcrumb' })(Breadcrumb);
