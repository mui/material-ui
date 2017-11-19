// @flow
// @inheritedComponent ButtonBase

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import ButtonBase from '../ButtonBase';
import IconButton from '../IconButton';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease,
  };
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: theme.spacing.unit * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: `0 ${theme.spacing.unit}px 0 ${theme.spacing.unit * 3}px`,
      position: 'relative',
      '&:hover:not($disabled)': {
        cursor: 'pointer',
      },
    },
    expanded: {
      minHeight: 64,
    },
    focused: {
      backgroundColor: theme.palette.grey[300],
    },
    disabled: {
      opacity: 0.38,
      color: theme.palette.action.disabled,
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: `12px ${theme.spacing.unit}px 12px 0`,
    },
    contentExpanded: {
      margin: `20px ${theme.spacing.unit}px 20px 0`,
    },
    expandIcon: {
      color: theme.palette.text.icon,
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
    },
    expandIconExpanded: {
      transform: 'rotate(180deg)',
    },
  };
};

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * The content of the expansion panel summary.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the summary will be displayed in a disabled state.
   */
  disabled: boolean,
  /**
   * If `true`, expands the summary, otherwise collapse it.
   */
  expanded?: boolean,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon?: Node,
  /**
   * @ignore
   */
  onChange?: Function,
  /**
   * @ignore
   */
  onClick?: Function,
};

type State = {
  focused: boolean,
};

class ExpansionPanelSummary extends React.Component<ProvidedProps & Props, State> {
  static muiName = 'ExpansionPanelSummary';

  static defaultProps = {
    classes: {},
    disabled: false,
  };

  state = {
    focused: false,
  };

  handleFocus = () => {
    this.setState({
      focused: true,
    });
  };

  handleBlur = () => {
    this.setState({
      focused: false,
    });
  };

  handleChange = event => {
    const { onChange, onClick } = this.props;
    if (onChange) {
      onChange(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      children,
      classes,
      className,
      disabled,
      expanded,
      expandIcon,
      onChange,
      ...other
    } = this.props;
    const { focused } = this.state;

    return (
      <ButtonBase
        focusRipple={false}
        disableRipple
        disabled={disabled}
        component="div"
        className={classNames(
          classes.root,
          {
            [classes.disabled]: disabled,
            [classes.expanded]: expanded,
            [classes.focused]: focused,
          },
          className,
        )}
        {...other}
        onKeyboardFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleChange}
      >
        <div className={classNames(classes.content, { [classes.contentExpanded]: expanded })}>
          {children}
        </div>
        {expandIcon && (
          <IconButton
            disabled={disabled}
            className={classNames(classes.expandIcon, {
              [classes.expandIconExpanded]: expanded,
            })}
            component="div"
            tabIndex="-1"
            onClick={this.handleChange}
          >
            {expandIcon}
          </IconButton>
        )}
      </ButtonBase>
    );
  }
}

export default withStyles(styles, { name: 'MuiExpansionPanelSummary' })(ExpansionPanelSummary);
