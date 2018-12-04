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
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  icon: {
    marginRight: theme.spacing.unit / 2,
    width: height / 1.2,
    height: height / 1.2,
    color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
  },
});

function DefaultComponent(props) {
  const { className, label, icon, active, tabIndex, onClick, ...rest } = props;

  return (
    <ButtonBase
      variant="default"
      color="primary"
      className={className}
      tabIndex={tabIndex}
      onClick={onClick}
      disabled={active}
      {...rest}
    >
      {icon}
      {label}
    </ButtonBase>
  );
}

class Breadcrumb extends React.PureComponent {
  render() {
    const {
      classes,
      className,
      component: Component,
      icon: iconProp,
      label,
      active,
      disableGutters,
      tabIndex,
      onClick,
      ...other
    } = this.props;

    let newTabIndex = tabIndex;

    if (!newTabIndex) {
      newTabIndex = onClick ? 0 : -1;
    }

    let icon = null;
    if (iconProp && React.isValidElement(iconProp)) {
      icon = React.cloneElement(iconProp, {
        className: classNames(classes.icon, iconProp.props.className),
      });
    }
    return Component ? (
      <Component
        icon={icon}
        label={label}
        className={classNames(
          {
            [classes.gutters]: !disableGutters,
            [classes.active]: active,
          },
          className,
        )}
        tabIndex={newTabIndex}
        onClick={onClick}
        {...other}
      />
    ) : (
      <DefaultComponent
        icon={icon}
        label={label}
        active={active}
        className={classNames(
          classes.button,
          {
            [classes.gutters]: !disableGutters,
            [classes.active]: active,
          },
          className,
        )}
        tabIndex={newTabIndex}
        onClick={onClick}
        {...other}
      />
    );
  }
}

Breadcrumb.propTypes = {
  /**
   * @ignore
   */
  active: PropTypes.bool,
  /**
   * An icon to display before the breadcrumb.
   */
  className: PropTypes.string,
  /**
   * The label to appear in the breadcrumb.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * Handler to be called on click.
   */
  disableGutters: PropTypes.bool,
  /**
   * Indicates if the breadcrumb is the active one.
   * Usually set on the last element in the breadcrumb
   */
  href: PropTypes.string,
  /**
   * The component used instead of the default breadcrumb item.
   * Either a string to use a DOM element or a component.
   * The custom component should accept a className prop and a click event
   */
  icon: PropTypes.node,
  /**
   * If `true`, disables gutter padding.
   */
  label: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  onClick: PropTypes.func,
  target: PropTypes.oneOf(['_blank', '_parent', '_self', '_top', '']),
};

Breadcrumb.defaultProps = {
  disableGutters: false,
  active: false,
};

export default withStyles(styles, { name: 'MuiBreadcrumb' })(Breadcrumb);
