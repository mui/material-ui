var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TableRowColumn = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columnNumber: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onHoverExit: React.PropTypes.func,
    hoverable: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      hoverable: false
    };
  },

  getInitialState: function() {
    return {
      hovered: false
    };
  },

  getStyles: function() {
    var styles = {
      padding: 20,
      textAlign: 'left',
      fontSize: 13,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    };

    if (React.Children.count(this.props.children) === 1 && !isNaN(this.props.children)) {
      styles.textAlign = 'right';
    }

    return styles;
  },

  render: function() {
    var className = 'mui-table-row-column';
    var styles = this.getStyles();
    var handlers = {
      onClick: this._onColumnClick,
      onMouseOver: this._onMouseOver,
      onMouseOut: this._onMouseOut
    };

    return (
      <td
        key={this.props.key}
        className={className}
        style={this.mergeAndPrefix(styles, this.props.style)}
        {...handlers}>
        {this.props.children}
      </td>
    );
  },

  _onColumnClick: function(e) {
    if (this.props.onColumnClick) this.props.onColumnClick(e, this.props.columnNumber);
  },

  _onMouseOver: function(e) {
    if (this.props.hoverable) {
      console.log('hovered: ' + this.state.hovered);
      this.setState({hovered: true});
      if (this.props.onHover) this.props.onHover(e, this.props.columnNumber);
    }
  },

  _onMouseOut: function(e) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onHoverExit) this.props.onHoverExit(e, this.props.columnNumber);
    }
  }

});

module.exports = TableRowColumn;
