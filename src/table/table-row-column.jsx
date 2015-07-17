let React = require('react');
let StylePropable = require('../mixins/style-propable');


let TableRowColumn = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    columnNumber: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onHoverExit: React.PropTypes.func,
    hoverable: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      hoverable: false,
    };
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.tableRowColumn;
  },

  getStyles() {
    let theme = this.getTheme();
    let styles = {
      paddingLeft: theme.spacing,
      paddingRight: theme.spacing,
      height: theme.height,
      textAlign: 'left',
      fontSize: 13,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    };

    if (React.Children.count(this.props.children) === 1 && !isNaN(this.props.children)) {
      styles.textAlign = 'right';
    }

    return styles;
  },

  render() {
    let className = 'mui-table-row-column';
    let styles = this.getStyles();
    let handlers = {
      onClick: this._onClick,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
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

  _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  },

  _onMouseEnter(e) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onHover) this.props.onHover(e, this.props.columnNumber);
    }
  },

  _onMouseLeave(e) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onHoverExit) this.props.onHoverExit(e, this.props.columnNumber);
    }
  },

});

module.exports = TableRowColumn;
