/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
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
      '&$focused, &$focusVisible': {
        backgroundColor: theme.palette.action.focus,
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity,
      },
    },
    /* Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: {},
    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focused: {},
    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focusVisible: {},
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
    focusVisibleClassName,
    IconButtonProps = {},
    onClick,
    ...other
  } = props;

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
        },
        className,
      )}
      focusVisibleClassName={clsx(classes.focusVisible, classes.focused, focusVisibleClassName)}
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
  classes: chainPropTypes(PropTypes.object, (props) => {
    // Guard against when generation of classes is disabled in the stylesheets (`disableGeneration`).
    // For `disableGeneration` we don't have an accurate warning but `disableGeneration` is an advanced use case anyway.
    if (props.classes.focused !== undefined && props.classes.focused.indexOf(' ') !== -1) {
      return new Error(
        [
          'Material-UI: The `classes.focused` key is deprecated.',
          'Use `classes.focusVisible` instead.',
          'The name of the pseudo-class was changed for consistency.',
        ].join('\n'),
      );
    }

    return null;
  }),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * Props applied to the `IconButton` element wrapping the expand icon.
   */
  IconButtonProps: PropTypes.object,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: 'MuiAccordionSummary' })(AccordionSummary);
