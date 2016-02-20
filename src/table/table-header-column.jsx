import React from 'react';
import Tooltip from '../tooltip';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    tableHeaderColumn,
  } = state.muiTheme;

  return {
    root: {
      fontWeight: 'normal',
      fontSize: 12,
      paddingLeft: tableHeaderColumn.spacing,
      paddingRight: tableHeaderColumn.spacing,
      height: tableHeaderColumn.height,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: tableHeaderColumn.textColor,
      position: 'relative',
    },
    tooltip: {
      boxSizing: 'border-box',
      marginTop: tableHeaderColumn.height / 2,
    },
  };
}

const TableHeaderColumn = React.createClass({

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
     * Key prop for table header column.
     */
    key: React.PropTypes.string,

    /**
     * Callback function for click event.
     */
    onClick: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The string to supply to the tooltip. If not
     * string is supplied no tooltip will be shown.
     */
    tooltip: React.PropTypes.string,

    /**
     * Additional styling that can be applied to the tooltip.
     */
    tooltipStyle: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
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

  _onMouseEnter() {
    if (this.props.tooltip !== undefined) this.setState({hovered: true});
  },

  _onMouseLeave() {
    if (this.props.tooltip !== undefined) this.setState({hovered: false});
  },

  _onClick(event) {
    if (this.props.onClick) this.props.onClick(event, this.props.columnNumber);
  },

  render() {
    const {
      children,
      className,
      columnNumber,
      onClick,
      style,
      tooltip,
      tooltipStyle,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const handlers = {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick,
    };

    let tooltipNode;

    if (tooltip !== undefined) {
      tooltipNode = (
        <Tooltip
          label={tooltip}
          show={this.state.hovered}
          style={Object.assign(styles.tooltip, tooltipStyle)}
        />
      );
    }

    return (
      <th
        key={this.props.key}
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
        {...handlers}
        {...other}
      >
        {tooltipNode}
        {children}
      </th>
    );
  },

});

export default TableHeaderColumn;
