// @flow
// @inheritedComponent Paper

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import Collapse from '../transitions/Collapse';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';
import { isMuiElement } from '../utils/reactHelpers';

export const styles = (theme: Object) => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease,
  };
  return {
    root: {
      position: 'relative',
      boxShadow: theme.shadows[1],
      margin: 0,
      transition: theme.transitions.create(['margin'], transition),
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.text.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition),
      },
      '&:first-child': {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        '&:before': {
          display: 'none',
        },
      },
      '&:last-child': {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      },
      '&$expanded': {
        margin: `${theme.spacing.unit * 2}px 0`,
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
        backgroundColor: theme.palette.grey[200],
      },
    },
    expanded: {},
    disabled: {
      color: theme.palette.action.disabled,
    },
  };
};

type ProvidedProps = {
  classes: Object,
  defaultExpanded: boolean,
  disabled: boolean,
};

export type Props = {
  /**
   * The content of the expansion panel.
   */
  children?: Node,
  /**
   * Allows to [extend the style](#css-api) applied to the component.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Properties applied to the `Collapse` element.
   */
  collapseProps?: Object,
  /**
   * If `true`, expands the panel by default.
   */
  defaultExpanded?: boolean,
  /**
   * If `true`, the panel will be displayed in a disabled state.
   */
  disabled?: boolean,
  /**
   * If `true`, expands the panel, otherwise collapse it.
   * Setting this prop enables control over the panel.
   */
  expanded?: boolean,
  /**
   * Callback fired on every expand/collapse state change.
   *
   * @param {object} event The event source of the callback
   */
  onChange?: Function,
};

type State = {
  expanded: boolean,
};

class ExpansionPanel extends React.Component<ProvidedProps & Props, State> {
  static defaultProps = {
    classes: {},
    defaultExpanded: false,
    disabled: false,
  };

  state = {
    expanded: false,
  };

  componentWillMount() {
    const { expanded, defaultExpanded } = this.props;
    this.isControlled = expanded !== undefined;
    this.setState({
      expanded: this.isControlled ? expanded : defaultExpanded,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled) {
      this.setState({
        expanded: nextProps.expanded,
      });
    }
  }

  isControlled = null;

  handleChange = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const expand = !this.state.expanded;
    if (onChange) {
      onChange(this, expand);
    }
    if (!this.isControlled) {
      this.setState({ expanded: expand });
    }
  };

  render() {
    const {
      children: childrenProp,
      classes,
      className: classNameProp,
      collapseProps,
      defaultExpanded,
      disabled,
      expanded,
      ...other
    } = this.props;

    const className = classNames(
      {
        [classes.root]: true,
        [classes.expanded]: this.state.expanded,
        [classes.disabled]: disabled,
      },
      classNameProp,
    );

    let summary = null;

    const children = React.Children.map(childrenProp, child => {
      if (isMuiElement(child, ['ExpansionPanelSummary'])) {
        summary = React.cloneElement(child, {
          disabled,
          expanded: this.state.expanded,
          onChange: this.handleChange,
        });
        return null;
      }
      return child;
    });

    return (
      <Paper className={className} elevation={0} square {...other}>
        {summary}
        <Collapse in={this.state.expanded} transitionDuration="auto" {...collapseProps}>
          {children}
        </Collapse>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'MuiExpansionPanel' })(ExpansionPanel);
