const React = require('react');
const TableRowColumn = require('./table-row-column');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const TableFooter = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    adjustForCheckbox: React.PropTypes.bool,
    style: React.PropTypes.object,
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
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getDefaultProps() {
    return {
      adjustForCheckbox: true,
      style: {},
    };
  },

  getTheme() {
    return this.state.muiTheme.tableFooter;
  },

  getStyles() {
   const styles = {
      cell: {
        borderTop: '1px solid ' + this.getTheme().borderColor,
        verticalAlign: 'bottom',
        padding: 20,
        textAlign: 'left',
        whiteSpace: 'nowrap',
      },
    };

    return styles;
  },

  render() {
    let {
      className,
      style,
      ...other,
    } = this.props;
    let classes = 'mui-table-footer';
    if (className) classes += ' ' + className;

    let footerRows = this._createRows();

    return (
      <tfoot className={classes} style={this.prepareStyles(style)} {...other}>
        {footerRows}
      </tfoot>
    );
  },

  _createRows() {
    let rowNumber = 0;
    return (
      React.Children.map(this.props.children, (child) => {
        return this._createRow(child, rowNumber++);
      })
    );
  },

  _createRow(child, rowNumber) {
    let styles = this.getStyles();
    let props = {
      className: 'mui-table-footer-row',
      displayBorder: false,
      key: 'f-' + rowNumber,
      rowNumber: rowNumber,
      style: this.mergeAndPrefix(styles.cell, child.props.style),
    };

    let children = [this._getCheckboxPlaceholder(props)];
    React.Children.forEach(child.props.children, (child) => {
      children.push(child);
    });

    return React.cloneElement(child, props, children);
  },

  _getCheckboxPlaceholder(props) {
    if (!this.props.adjustForCheckbox) return null;

    let key = 'fpcb' + props.rowNumber;
    return <TableRowColumn key={key} style={{width: 24}} />;
  },

});

module.exports = TableFooter;
