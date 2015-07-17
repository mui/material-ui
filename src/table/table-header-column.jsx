let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Tooltip = require('../tooltip');


let TableHeaderColumn = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    tooltip: React.PropTypes.string,
    columnNumber: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.tableHeaderColumn;
  },

  getStyles() {
    let theme = this.getTheme();
    let styles = {
      root:  {
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
        marginTop: theme.height,
      },
    };

    return styles;
  },

  render() {
    let className = 'mui-table-header-column';
    let styles = this.getStyles();
    let handlers = {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick,
    };
    let tooltip;

    if (this.props.tooltip !== undefined) {
      tooltip = (
        <Tooltip
          label={this.props.tooltip}
          show={this.state.hovered}
          style={this.mergeStyles(styles.tooltip)} />
      );
    }

    return (
      <th
        key={this.props.key}
        className={className}
        style={this.mergeAndPrefix(styles.root, this.props.style)}
        {...handlers}>
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

module.exports = TableHeaderColumn;
