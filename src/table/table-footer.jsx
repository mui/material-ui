import React from 'react';
import TableRowColumn from './table-row-column';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    tableFooter,
  } = state.muiTheme;

  return {
    cell: {
      borderTop: `1px solid ${tableFooter.borderColor}`,
      verticalAlign: 'bottom',
      padding: 20,
      textAlign: 'left',
      whiteSpace: 'nowrap',
    },
  };
}

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

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

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

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      adjustForCheckbox,
      children,
      className,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const footerRows = React.Children.map(children, (child, rowNumber) => {
      const newChildProps = {
        displayBorder: false,
        key: `f-${rowNumber}`,
        rowNumber: rowNumber,
        style: Object.assign({}, styles.cell, child.props.style),
      };

      let newDescendants;
      if (adjustForCheckbox) {
        newDescendants = [
          <TableRowColumn key={`fpcb${rowNumber}`} style={{width: 24}} />,
          ...React.Children.toArray(child.props.children),
        ];
      }

      return React.cloneElement(child, newChildProps, newDescendants);
    });

    return (
      <tfoot className={className} style={prepareStyles(Object.assign({}, style))} {...other}>
        {footerRows}
      </tfoot>
    );
  },

});

export default TableFooter;
