import React from 'react';
import TableRowColumn from './table-row-column';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const TableFooter = React.createClass({

  propTypes: {
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
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
