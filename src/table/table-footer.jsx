import React from 'react';
import TableRowColumn from './table-row-column';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

const TableFooter = React.createClass({

  propTypes: {
    /**
     * Controls whether or not header rows should be adjusted
     * for a checkbox column. If the select all checkbox is true,
     * this property will not influence the number of columns.
     * This is mainly useful for "super header" rows so that
     * the checkbox column does not create an offset that needs
     * to be accounted for manually.
     */
    adjustForCheckbox: React.PropTypes.bool,
    /**
     * Children passed to table footer.
     */
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

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      adjustForCheckbox: true,
      style: {},
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
      displayBorder: false,
      key: 'f-' + rowNumber,
      rowNumber: rowNumber,
      style: this.mergeStyles(styles.cell, child.props.style),
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

  render() {
    let {
      className,
      style,
      ...other,
    } = this.props;
    let footerRows = this._createRows();

    return (
      <tfoot className={className} style={this.prepareStyles(style)} {...other}>
        {footerRows}
      </tfoot>
    );
  },

});

export default TableFooter;
