import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    tableRowColumn,
  } = state.muiTheme;

  const styles = {
    root: {
      paddingLeft: tableRowColumn.spacing,
      paddingRight: tableRowColumn.spacing,
      height: tableRowColumn.height,
      textAlign: 'left',
      fontSize: 13,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  };

  if (React.Children.count(props.children) === 1 && !isNaN(props.children)) {
    styles.textAlign = 'right';
  }

  return styles;
}

const TableRowColumn = React.createClass({

  propTypes: {
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Number to identify the header row. This property
     * is automatically populated when used with TableHeader.
     */
    columnNumber: React.PropTypes.number,

    /**
     * If true, this column responds to hover events.
     */
    hoverable: React.PropTypes.bool,

    /**
     * Key for this element.
     */
    key: React.PropTypes.string,

    /**
     * Callback function for click event.
     */
    onClick: React.PropTypes.func,

    /**
     * Callback function for hover event.
     */
    onHover: React.PropTypes.func,

    /**
     * Callback function for hover exit event.
     */
    onHoverExit: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      hoverable: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
      hovered: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  _onClick(event) {
    if (this.props.onClick) this.props.onClick(event, this.props.columnNumber);
  },

  _onMouseEnter(event) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onHover) this.props.onHover(event, this.props.columnNumber);
    }
  },

  _onMouseLeave(event) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onHoverExit) this.props.onHoverExit(event, this.props.columnNumber);
    }
  },

  render() {
    const {
      children,
      className,
      columnNumber,
      hoverable,
      onClick,
      onHover,
      onHoverExit,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const handlers = {
      onClick: this._onClick,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
    };

    return (
      <td
        key={this.props.key}
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
        {...handlers}
        {...other}
      >
        {children}
      </td>
    );
  },

});

export default TableRowColumn;
