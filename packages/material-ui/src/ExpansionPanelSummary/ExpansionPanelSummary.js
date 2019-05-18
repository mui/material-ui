import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase from '../ButtonBase';
import IconButton from '../IconButton';
import withStyles from '../styles/withStyles';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      minHeight: 8 * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: '0 24px 0 24px',
      '&:hover:not($disabled)': {
        cursor: 'pointer',
      },
      '&$expanded': {
        minHeight: 64,
      },
      '&$focused': {
        backgroundColor: theme.palette.grey[300],
      },
      '&$disabled': {
        opacity: 0.38,
      },
    },
    /* Styles applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: {},
    /* Styles applied to the root and children wrapper elements when focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the children wrapper element. */
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: '12px 0',
      '&$expanded': {
        margin: '20px 0',
      },
    },
    /* Styles applied to the `IconButton` component when `expandIcon` is supplied. */
    expandIcon: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&:hover': {
        // Disable the hover effect for the IconButton,
        // because a hover effect should apply to the entire Expand button and
        // not only to the IconButton.
        backgroundColor: 'transparent',
      },
      '&$expanded': {
        transform: 'rotate(180deg)',
      },
    },
  };
};

const ExpansionPanelSummary = React.forwardRef(function ExpansionPanelSummary(props, ref) {
  const {
    children,
    classes,
    className,
    disabled = false,
    expanded,
    expandIcon,
    IconButtonProps,
    onBlur,
    onChange,
    onClick,
    onFocusVisible,
    ...other
  } = props;

  const [focusedState, setFocusedState] = React.useState(false);
  const handleFocusVisible = event => {
    setFocusedState(true);

    if (onFocusVisible) {
      onFocusVisible(event);
    }
  };
  const handleBlur = event => {
    setFocusedState(false);

    if (onBlur) {
      onBlur(event);
    }
  };
  const handleChange = event => {
    if (onChange) {
      onChange(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ButtonBase
      focusRipple={false}
      disableRipple
      disabled={disabled}
      component="div"
      aria-expanded={expanded}
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.expanded]: expanded,
          [classes.focused]: focusedState,
        },
        className,
      )}
      onFocusVisible={handleFocusVisible}
      onBlur={handleBlur}
      onClick={handleChange}
      ref={ref}
      {...other}
    >
      <div className={clsx(classes.content, { [classes.expanded]: expanded })}>{children}</div>
      {expandIcon && (
        <IconButton
          disabled={disabled}
          className={clsx(classes.expandIcon, {
            [classes.expanded]: expanded,
          })}
          edge="end"
          component="div"
          tabIndex={-1}
          aria-hidden
          {...IconButtonProps}
        >
          {expandIcon}
        </IconButton>
      )}
    </ButtonBase>
  );
});

ExpansionPanelSummary.propTypes = {
  /**
   * The content of the expansion panel summary.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   * If `true`, the summary will be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   * If `true`, expands the summary, otherwise collapse it.
   */
  expanded: PropTypes.bool,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,
  /**
   * Properties applied to the `IconButton` element wrapping the expand icon.
   */
  IconButtonProps: PropTypes.object,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
};

export default withStyles(styles, { name: 'MuiExpansionPanelSummary' })(ExpansionPanelSummary);
