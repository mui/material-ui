const React = require('react');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const TableRow = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    displayBorder: React.PropTypes.bool,
    hoverable: React.PropTypes.bool,
    onCellClick: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func,
    onRowClick: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    rowNumber: React.PropTypes.number,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      displayBorder: true,
      displayRowCheckbox: true,
      hoverable: false,
      selectable: true,
      selected: false,
      striped: false,
    };
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      hovered: false,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.tableRow;
  },

  getStyles() {
    let theme = this.getTheme();
    let cellBgColor = 'inherit';
    if (this.state.hovered) {
      cellBgColor = theme.hoverColor;
    }
    else if (this.props.selected) {
      cellBgColor = theme.selectedColor;
    }
    else if (this.props.striped) {
      cellBgColor = theme.stripeColor;
    }

    let styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
        color: this.getTheme().textColor,
      },
      cell: {
        backgroundColor: cellBgColor,
      },
    };

    if (!this.props.displayBorder) {
      styles.root.borderBottom = '';
    }

    return styles;
  },

  render() {
    let {
      className,
      displayBorder,
      hoverable,
      onCellClick,
      onCellHover,
      onCellHoverExit,
      onRowClick,
      onRowHover,
      onRowHoverExit,
      rowNumber,
      selectable,
      selected,
      striped,
      style,
      ...other,
    } = this.props;
    let classes = 'mui-table-row';
    if (className) classes += ' ' + className;
    let rowColumns = this._createColumns();

    return (
      <tr
        className={classes}
        style={this.prepareStyles(this.getStyles().root, style)}
        {...other}>
        {rowColumns}
      </tr>
    );
  },

  _createColumns() {
    let columnNumber = 1;
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return this._createColumn(child, columnNumber++);
      }
    });
  },

  _createColumn(child, columnNumber) {
    let key = this.props.rowNumber + '-' + columnNumber;
    let styles = this.getStyles();
    const handlers = {
      onClick: this._onCellClick,
      onHover: this._onCellHover,
      onHoverExit: this._onCellHoverExit,
    };

    return React.cloneElement(
      child,
      {
        columnNumber: columnNumber,
        hoverable: this.props.hoverable,
        key: child.props.key || key,
        style: this.mergeAndPrefix(styles.cell, child.props.style),
        ...handlers,
      }
    );
  },

  _onRowClick(e) {
    if (this.props.onRowClick) this.props.onRowClick(e, this.props.rowNumber);
  },

  _onRowHover(e) {
    if (this.props.onRowHover) this.props.onRowHover(e, this.props.rowNumber);
  },

  _onRowHoverExit(e) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(e, this.props.rowNumber);
  },

  _onCellClick(e, columnIndex) {
    if (this.props.selectable && this.props.onCellClick) this.props.onCellClick(e, this.props.rowNumber, columnIndex);
    e.ctrlKey = true;
    this._onRowClick(e);
  },

  _onCellHover(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onCellHover) this.props.onCellHover(e, this.props.rowNumber, columnIndex);
      this._onRowHover(e);
    }
  },

  _onCellHoverExit(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onCellHoverExit) this.props.onCellHoverExit(e, this.props.rowNumber, columnIndex);
      this._onRowHoverExit(e);
    }
  },

});

module.exports = TableRow;
