// @flow

import React from 'react';
import classNames from 'classnames';
import type { Element } from 'react';
import { Manager, Target, Popper } from 'react-popper';
import { capitalizeFirstLetter } from '../utils/helpers';
import common from '../colors/common';
import grey from '../colors/grey';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-flex',
  },
  popper: {
    zIndex: theme.zIndex.tooltip,
  },
  tooltip: {
    background: grey[700],
    borderRadius: 2,
    color: common.fullWhite,
    fontSize: 14,
    height: 32,
    lineHeight: '32px',
    opacity: 0,
    padding: '0 16px',
    transform: 'scale(0)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.up('sm')]: {
      height: 22,
      lineHeight: '22px',
      padding: '0 8px',
      fontSize: 10,
    },
  },
  tooltipLeft: {
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginRight: 14,
    },
  },
  tooltipRight: {
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 14,
    },
  },
  tooltipTop: {
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 14,
    },
  },
  tooltipBottom: {
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginTop: 14,
    },
  },
  tooltipOpen: {
    opacity: 0.9,
    transform: 'scale(1)',
  },
});

type DefaultProps = {
  classes: Object,
  placement: string,
};

export type Props = {
  /**
   * Tooltip reference component
   */
  children: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Tooltip label.
   */
  label: string,
  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onRequestClose?: Function,
  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onRequestOpen?: Function,
  /**
   * If `true`, the tooltip is shown.
   */
  open?: boolean,
  /**
   * Tooltip placement
   */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top',
};

type AllProps = DefaultProps & Props;

type State = {
  open?: boolean,
};

class Tooltip extends React.Component<AllProps, State> {
  props: AllProps;

  static defaultProps = {
    placement: 'bottom',
  };

  state: State = {};

  componentWillMount() {
    const { props } = this;

    this.isControlled = props.open !== undefined;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.setState({
        open: false,
      });
    }
  }

  isControlled = null;

  handleRequestClose = event => {
    const newOpen = false;

    if (!this.isControlled) {
      this.setState({ open: newOpen });
    }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(event, newOpen);
    }
  };

  handleRequestOpen = event => {
    const newOpen = true;

    if (!this.isControlled) {
      this.setState({ open: newOpen });
    }

    if (this.props.onRequestOpen) {
      this.props.onRequestOpen(event, newOpen);
    }
  };

  render() {
    const {
      children: childrenProp,
      classes,
      label,
      open: openProp,
      placement,
      className: classNameProp,
    } = this.props;

    const open = this.isControlled ? openProp : this.state.open;

    let children = null;
    if (childrenProp) {
      if (React.isValidElement(childrenProp)) {
        children = React.cloneElement(childrenProp, {
          onMouseOver: this.handleRequestOpen,
          onFocus: this.handleRequestOpen,
          onMouseLeave: this.handleRequestClose,
          onBlur: this.handleRequestClose,
          onKeyboardFocus: open ? this.handleRequestClose : this.handleRequestOpen,
        });
      } else {
        children = childrenProp;
      }
    }

    return (
      <Manager className={classNames(classes.root, classNameProp)}>
        <Target>{children}</Target>
        <Popper placement={placement} className={classes.popper}>
          <div
            className={classNames(
              classes.tooltip,
              { [classes.tooltipOpen]: open },
              classes[`tooltip${capitalizeFirstLetter(placement.split('-')[0])}`],
            )}
          >
            {label}
          </div>
        </Popper>
      </Manager>
    );
  }
}

export default withStyles(styles, { name: 'MuiTooltip' })(Tooltip);
