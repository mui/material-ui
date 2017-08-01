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
  const expandButtonSize = 44;
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 48,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: `0 ${theme.spacing.unit * 3}px`,
      position: 'relative',
      '&:hover:not($disabled)': {
        cursor: 'pointer',
      },
      '&$focused': {
        backgroundColor: theme.palette.grey[300],
      },
      '&$expanded': {
        minHeight: 64,
      },
      '&$disabled': {
        opacity: 0.38,
      },
    },
    items: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      margin: '12px 0',
      transition: theme.transitions.create(['margin'], transition),
      '& > :last-child': {
        paddingRight: theme.spacing.unit * 3,
      },
      '&$expanded': {
        margin: '20px 0',
      },
    },
    action: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: theme.spacing.unit,
    },
    button: {
      width: expandButtonSize,
      height: expandButtonSize,
      color: theme.palette.text.icon,
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&$expanded': {
        transform: 'rotate(180deg)',
      },
    },
    expanded: {},
    focused: {},
    disabled: {
      color: theme.palette.action.disabled,
    },
  };
};

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the expansion panel summary.
   */
  children?: Node,
  /**
   * Allows to [extend the style](#css-api) applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the summary will be displayed in a disabled state.
   */
  disabled?: boolean,
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
};

type State = {
  focused: boolean,
};

class ExpansionPanelSummary extends React.Component<ProvidedProps & Props, State> {
  static muiName = 'ExpansionPanelSummary';

  static defaultProps = {
    classes: {},
    disabled: false,
    expandIcon: null,
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
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
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
        onKeyboardFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleChange}
        {...other}
      >
        <div className={classNames(classes.items, { [classes.expanded]: expanded })}>
          {children}
        </div>
        {expandIcon && (
          <div className={classes.action}>
            <IconButton
              disabled={disabled}
              className={classNames(classes.button, {
                [classes.expanded]: expanded,
              })}
              component="div"
              tabIndex="-1"
              onClick={this.handleChange}
            >
              {expandIcon}
            </IconButton>
          </div>
        )}
      </ButtonBase>
    );
  }
}

export default withStyles(styles, { name: 'MuiExpansionPanelSummary' })(ExpansionPanelSummary);
