var React = require('react');
var Checkbox = require('../checkbox');
var StylePropable = require('../mixins/style-propable');
var Tooltip = require('../tooltip');

var TableHeaderColumn = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    tooltip: React.PropTypes.string,
    columnNumber: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      showToolip: false
    };
  },

  getTheme: function() {
    return this.context.muiTheme.component.tableHeaderColumn;
  },

  getStyles: function() {
    var styles = {
      root:  {
        verticalAlign: 'bottom',
        fontWeight: 'normal',
        fontSize: 12,
        padding: 20,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: this.getTheme().textColor,
        position: 'relative'
      }
    };

    return styles;
  },

  render: function() {
    var className = 'mui-table-header-column';
    var handlers = {
      onMouseOver: this._onHover,
      onMouseExit: this._onHoverExit,
      onClick: this._onClick
    };
    var tooltip;

    if (this.props.tooltip !== undefined) {
      tooltip = (
        <Tooltip
          ref='tooltip'
          label={this.props.tooltip}
          show={this.state.showTooltip} />
      );
    }

    return (
      <th
        key={this.props.key}
        className={className}
        style={this.mergeAndPrefix(this.getStyles().root, this.props.style)}
        {...handlers}>
        {tooltip}
        {this.props.children}
      </th>
    );
  },

  _onMouseOver: function() {
    if (this.props.tooltip !== undefined) this.setState({showTooltip: true});
  },

  _onMouseExit: function() {
    if (this.props.tooltip !== undefined) this.setState({showTooltip: false});
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  }

});

module.exports = TableHeaderColumn;
