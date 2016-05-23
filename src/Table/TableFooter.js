import React, {Component, PropTypes} from 'react';
import TableRowColumn from './TableRowColumn';

function getStyles(props, context) {
  const {tableFooter} = context.muiTheme;

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

class TableFooter extends Component {
  static muiName = 'TableFooter';

  static propTypes = {
    /**
     * @ignore
     * Controls whether or not header rows should be adjusted
     * for a checkbox column. If the select all checkbox is true,
     * this property will not influence the number of columns.
     * This is mainly useful for "super header" rows so that
     * the checkbox column does not create an offset that needs
     * to be accounted for manually.
     */
    adjustForCheckbox: PropTypes.bool,
    /**
     * Children passed to table footer.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    adjustForCheckbox: true,
    style: {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      adjustForCheckbox,
      children,
      className,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

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
  }
}

export default TableFooter;
