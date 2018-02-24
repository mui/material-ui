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
    color: theme.palette.text.secondary,
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
  },
  buttonClosed: {
    opacity: 0,
    transform: 'scale(0)',
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
      ButtonProps,
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

    return (
      <Tooltip
        id={id}
        className={classNames(classes.root, classNameProp)}
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
          className={classNames(classes.button, !open && classes.buttonClosed)}
          style={{ transitionDelay: `${delay}ms` }}
          onClick={onClick}
          tabIndex={-1}
          role="menuitem"
          aria-labelledby={id}
          {...ButtonProps}
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
  ButtonProps: PropTypes.object,
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
  tooltipTitle: PropTypes.node,
};

SpeedDialAction.defaultProps = {
  delay: 0,
  open: false,
};

export default withStyles(styles)(SpeedDialAction);
