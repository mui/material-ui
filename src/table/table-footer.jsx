let React = require('react');
let TableRowColumn = require('./table-row-column');
let StylePropable = require('../mixins/style-propable');


let TableFooter = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    adjustForCheckbox: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      adjustForCheckbox: true,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.tableFooter;
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
      ...other,
    } = this.props;
    let classes = 'mui-table-footer';
    if (className) classes += ' ' + className;

    let footerRows = this._createRows();

    return (
      <tfoot className={classes} {...other}>
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
