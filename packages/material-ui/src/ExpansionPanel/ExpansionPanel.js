// @inheritedComponent Paper

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import Collapse from '../Collapse';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';
import { isMuiElement } from '../utils/reactHelpers';
import { PureProvider } from './ExpansionPanelContext';

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
      '&$expanded + &': {
        '&:before': {
          display: 'none',
        },
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
    expanded: {
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
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  };
};

const noop = () => {};
/**
 * state managment either controlled or uncontrolled
 * Like https://reactjs.org/docs/uncontrolled-components.html
 *
 * @param {T | null | undefined} value - the controlled value
 * @param {T | null | undefined} defaultValue - the initial value if uncontrolled
 * @returns {[T, (T | (T => T)) => void]} - matching useState return type
 */
function useMaybeControlled(value, defaultValue) {
  // equivalent to a read-only this.isControlled which is initialized in the constructor
  const { current: isControlled } = React.useRef(value != null);

  const [state, setState] = React.useState(defaultValue);

  return isControlled ? [value, noop] : [state, setState];
}

function ExpansionPanel(props) {
  const {
    children: childrenProp,
    classes,
    className: classNameProp,
    defaultExpanded,
    disabled,
    expanded: expandedProp,
    onChange,
    square,
    TransitionComponent,
    TransitionProps,
    ...other
  } = props;

  const [expanded, setExpanded] = useMaybeControlled(expandedProp, defaultExpanded);

  const handleChange = React.useCallback(
    event => {
      setExpanded(isExpanded => !isExpanded);
      if (onChange) {
        onChange(event, !expanded);
      }
    },
    [expanded, setExpanded, onChange],
  );

  let summary = null;

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null;
    }

    warning(
      child.type !== React.Fragment,
      [
        "Material-UI: the ExpansionPanel component doesn't accept a Fragment as a child.",
        'Consider providing an array instead.',
      ].join('\n'),
    );

    if (isMuiElement(child, ['ExpansionPanelSummary'])) {
      summary = child;
      return null;
    }

    return child;
  });

  return (
    <PureProvider disabled={disabled} expanded={expanded} onChange={handleChange}>
      <Paper
        className={clsx(
          classes.root,
          {
            [classes.expanded]: expanded,
            [classes.disabled]: disabled,
            [classes.rounded]: !square,
          },
          classNameProp,
        )}
        elevation={1}
        square={square}
        {...other}
      >
        {summary}
        <TransitionComponent in={expanded} timeout="auto" {...TransitionProps}>
          {children}
        </TransitionComponent>
      </Paper>
    </PureProvider>
  );
}

ExpansionPanel.propTypes = {
  /**
   * The content of the expansion panel.
   */
  children: PropTypes.node.isRequired,
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

ExpansionPanel.defaultProps = {
  defaultExpanded: false,
  disabled: false,
  onChange: noop,
  square: false,
  TransitionComponent: Collapse,
};

export default withStyles(styles, { name: 'MuiExpansionPanel' })(ExpansionPanel);
