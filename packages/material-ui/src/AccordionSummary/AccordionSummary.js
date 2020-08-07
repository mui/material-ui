/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase from '../ButtonBase';
import IconButton from '../IconButton';
import withStyles from '../styles/withStyles';
import AccordionContext from '../Accordion/AccordionContext';

export const styles = (theme) => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      minHeight: 8 * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: theme.spacing(0, 2),
      '&:hover:not($disabled)': {
        cursor: 'pointer',
      },
      '&$expanded': {
        minHeight: 64,
      },
      '&$focused': {
        backgroundColor: theme.palette.action.focus,
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity,
      },
    },
    /* Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: {},
    /* Pseudo-class applied to the root element if `focused={true}`. */
    focused: {},
    /* Pseudo-class applied to the root element if `disabled={true}`. */
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

const AccordionSummary = React.forwardRef(function AccordionSummary(props, ref) {
  const {
    children,
    classes,
    className,
    expandIcon,
    IconButtonProps,
    onBlur,
    onClick,
    onFocusVisible,
    ...other
  } = props;

  const [focusedState, setFocusedState] = React.useState(false);
  const handleFocusVisible = (event) => {
    setFocusedState(true);

    if (onFocusVisible) {
      onFocusVisible(event);
    }
  };
  const handleBlur = (event) => {
    setFocusedState(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  const { disabled = false, expanded, toggle } = React.useContext(AccordionContext);
  const handleChange = (event) => {
    if (toggle) {
      toggle(event);
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
          className={clsx(classes.expandIcon, {
            [classes.expanded]: expanded,
          })}
          edge="end"
          component="div"
          tabIndex={null}
          role={null}
          aria-hidden
          {...IconButtonProps}
        >
          {expandIcon}
        </IconButton>
      )}
    </ButtonBase>
  );
});

AccordionSummary.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the accordion summary.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,
  /**
   * Props applied to the `IconButton` element wrapping the expand icon.
   */
  IconButtonProps: PropTypes.object,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
};

export default withStyles(styles, { name: 'MuiAccordionSummary' })(AccordionSummary);
