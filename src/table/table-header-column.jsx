import React from 'react';
import StylePropable from '../mixins/style-propable';
import Tooltip from '../tooltip';
import muiThemeable from '../muiThemeable';

let TableHeaderColumn = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    columnNumber: React.PropTypes.number,
    key: React.PropTypes.string,
    onClick: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    tooltip: React.PropTypes.string,
    tooltipStyle: React.PropTypes.object,
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  getTheme() {
    return this.props._muiTheme.tableHeaderColumn;
  },

  getStyles() {
    let theme = this.getTheme();
    let styles = {
      root: {
        fontWeight: 'normal',
        fontSize: 12,
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
        height: theme.height,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: this.getTheme().textColor,
        position: 'relative',
      },
      tooltip: {
        boxSizing: 'border-box',
        marginTop: theme.height / 2,
      },
    };

    return styles;
  },

  render() {
    let styles = this.getStyles();
    let handlers = {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick,
    };
    let {
      className,
      columnNumber,
      onClick,
      style,
      tooltip,
      tooltipStyle,
      ...other,
    } = this.props;
    let classes = 'mui-table-header-column';
    if (className) classes += ' ' + className;

    if (this.props.tooltip !== undefined) {
      tooltip = (
        <Tooltip
          label={this.props.tooltip}
          show={this.state.hovered}
          style={this.mergeStyles(styles.tooltip, tooltipStyle)} />
      );
    }

    return (
      <th
        key={this.props.key}
        className={classes}
        style={this.prepareStyles(styles.root, style)}
        {...handlers}
        {...other}>
        {tooltip}
        {this.props.children}
      </th>
    );
  },

  _onMouseEnter() {
    if (this.props.tooltip !== undefined) this.setState({hovered: true});
  },

  _onMouseLeave() {
    if (this.props.tooltip !== undefined) this.setState({hovered: false});
  },

  _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  },

});

TableHeaderColumn = muiThemeable(TableHeaderColumn);

export default TableHeaderColumn;
