import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  button: {
    margin: theme.spacing.unit,
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
    color: theme.palette.text.secondary,
  },
  buttonClosed: {
    opacity: 0,
    transform: 'scale3d(0, 0, 1)',
  },
});

class SpeedDialAction extends React.Component {
  state = {
    tooltipOpen: false,
  };

  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };

  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };

  render() {
    const {
      buttonProps,
      classes,
      className: classNameProp,
      delay,
      icon,
      id,
      onClick,
      open,
      tooltipTitle,
      ...other
    } = this.props;

    const actionButtonClassName = classNames(classes.button, !open && classes.buttonClosed);
    const className = classNames(classes.root, classNameProp);

    return (
      <Tooltip
        id={id}
        className={className}
        title={tooltipTitle}
        placement="left"
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={open && this.state.tooltipOpen}
        {...other}
      >
        <Button
          variant="fab"
          mini
          className={actionButtonClassName}
          style={{ transitionDelay: `${delay}ms` }}
          onClick={onClick}
          tabIndex={-1}
          role="menuitem"
          aria-labelledby={id}
          {...buttonProps}
        >
          {icon}
        </Button>
      </Tooltip>
    );
  }
}

SpeedDialAction.propTypes = {
  /**
   * Properties applied to the `Button` component.
   */
  buttonProps: PropTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: PropTypes.number,
  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  open: PropTypes.bool,
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.string,
};

SpeedDialAction.defaultProps = {
  delay: 0,
  open: false,
};

export default withStyles(styles)(SpeedDialAction);
