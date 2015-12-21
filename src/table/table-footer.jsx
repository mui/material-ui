import React from 'react';
import TableRowColumn from './table-row-column';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let TableFooter = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    adjustForCheckbox: React.PropTypes.bool,
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      adjustForCheckbox: true,
      style: {},
    };
  },

  getTheme() {
    return this.props._muiTheme.tableFooter;
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

TableFooter = muiThemeable(TableFooter);

export default TableFooter;
