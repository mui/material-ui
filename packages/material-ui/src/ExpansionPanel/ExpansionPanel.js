import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import Collapse from '../Collapse';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition),
      },
      '&:first-child': {
        '&:before': {
          display: 'none',
        },
      },
      '&$expanded': {
        margin: '16px 0',
        '&:first-child': {
          marginTop: 0,
        },
        '&:last-child': {
          marginBottom: 0,
        },
        '&:before': {
          opacity: 0,
        },
      },
      '&$expanded + &': {
        '&:before': {
          display: 'none',
        },
      },
      '&$disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: 0,
      '&:first-child': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
      },
      '&:last-child': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        // Fix a rendering issue on Edge
        '@supports (-ms-ime-align: auto)': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    /* Styles applied to the root element if `expanded={true}`. */
    expanded: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
  };
};

const ExpansionPanel = React.forwardRef(function ExpansionPanel(props, ref) {
  const {
    children: childrenProp,
    classes,
    className,
    defaultExpanded = false,
    disabled = false,
    expanded: expandedProp,
    onChange,
    square = false,
    TransitionComponent = Collapse,
    TransitionProps,
    ...other
  } = props;

  const { current: isControlled } = React.useRef(expandedProp != null);
  const [expandedState, setExpandedState] = React.useState(defaultExpanded);
  const expanded = isControlled ? expandedProp : expandedState;

  const handleChange = event => {
    if (!isControlled) {
      setExpandedState(!expanded);
    }

    if (onChange) {
      onChange(event, !expanded);
    }
  };

  const [summary, ...children] = React.Children.toArray(childrenProp);

  return (
    <Paper
      className={clsx(
        classes.root,
        {
          [classes.expanded]: expanded,
          [classes.disabled]: disabled,
          [classes.rounded]: !square,
        },
        className,
      )}
      ref={ref}
      square={square}
      {...other}
    >
      {React.cloneElement(summary, {
        disabled,
        expanded,
        onChange: handleChange,
      })}
      <TransitionComponent in={expanded} timeout="auto" {...TransitionProps}>
        <div aria-labelledby={summary.props.id} id={summary.props['aria-controls']} role="region">
          {children}
        </div>
      </TransitionComponent>
    </Paper>
  );
});

ExpansionPanel.propTypes = {
  /**
   * The content of the expansion panel.
   */
  children: chainPropTypes(PropTypes.node.isRequired, props => {
    const summary = React.Children.toArray(props.children)[0];
    if (summary.type === React.Fragment) {
      return new Error(
        "Material-UI: the ExpansionPanel doesn't accept a Fragment as a child. " +
          'Consider providing an array instead.',
      );
    }

    if (!React.isValidElement(summary)) {
      return new Error(
        'Material-UI: expected the first child of ExpansionPanel to be a valid element.',
      );
    }

    return null;
  }),
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
   * If `true`, expands the panel by default.
   */
  defaultExpanded: PropTypes.bool,
  /**
   * If `true`, the panel will be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, expands the panel, otherwise collapse it.
   * Setting this prop enables control over the panel.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} expanded The `expanded` state of the panel
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  square: PropTypes.bool,
  /**
   * The component used for the collapse effect.
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Properties applied to the `Transition` element.
   */
  TransitionProps: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiExpansionPanel' })(ExpansionPanel);
