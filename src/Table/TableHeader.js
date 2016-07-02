import React, {Component, PropTypes} from 'react';
import Checkbox from '../Checkbox';
import TableHeaderColumn from './TableHeaderColumn';

function getStyles(props, context) {
  const {tableHeader} = context.muiTheme;

  return {
    root: {
      borderBottom: `1px solid ${tableHeader.borderColor}`,
    },
  };
}

class TableHeader extends Component {
  static muiName = 'TableHeader';

  static propTypes = {
    /**
     * Controls whether or not header rows should be
     * adjusted for a checkbox column. If the select all
     * checkbox is true, this property will not influence
     * the number of columns. This is mainly useful for
     * "super header" rows so that the checkbox column
     * does not create an offset that needs to be accounted
     * for manually.
     */
    adjustForCheckbox: PropTypes.bool,
    /**
     * Children passed to table header.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Controls whether or not the select all checkbox is displayed.
     */
    displaySelectAll: PropTypes.bool,
    /**
     * If set to true, the select all button will be interactable.
     * If set to false, the button will not be interactable.
     * To hide the checkbox, set displaySelectAll to false.
     */
    enableSelectAll: PropTypes.bool,
    /**
     * @ignore
     * Callback when select all has been checked.
     */
    onSelectAll: PropTypes.func,
    /**
     * @ignore
     * True when select all has been checked.
     */
    selectAllSelected: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    adjustForCheckbox: true,
    displaySelectAll: true,
    enableSelectAll: true,
    selectAllSelected: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  createSuperHeaderRows() {
    const numChildren = React.Children.count(this.props.children);
    if (numChildren === 1) return undefined;

    const superHeaders = [];
    for (let index = 0; index < numChildren - 1; index++) {
      const child = this.props.children[index];

      if (!React.isValidElement(child)) continue;

      const props = {
        key: `sh${index}`,
        rowNumber: index,
      };
      superHeaders.push(this.createSuperHeaderRow(child, props));
    }

    if (superHeaders.length) return superHeaders;
  }

  createSuperHeaderRow(child, props) {
    const children = [];
    if (this.props.adjustForCheckbox) {
      children.push(this.getCheckboxPlaceholder(props));
    }
    React.Children.forEach(child.props.children, (child) => {
      children.push(child);
    });

    return React.cloneElement(child, props, children);
  }

  createBaseHeaderRow() {
    const numChildren = React.Children.count(this.props.children);
    const child = (numChildren === 1) ? this.props.children : this.props.children[numChildren - 1];
    const props = {
      key: `h${numChildren}`,
      rowNumber: numChildren,
    };

    const children = [this.getSelectAllCheckboxColumn(props)];
    React.Children.forEach(child.props.children, (child) => {
      children.push(child);
    });

    return React.cloneElement(
      child,
      props,
      children
    );
  }

  getCheckboxPlaceholder(props) {
    if (!this.props.adjustForCheckbox) return null;

    const disabled = !this.props.enableSelectAll;
    const key = `hpcb${props.rowNumber}`;
    return (
      <TableHeaderColumn
        key={key}
        style={{
          width: 24,
          cursor: disabled ? 'not-allowed' : 'inherit',
        }}
      />
    );
  }

  getSelectAllCheckboxColumn(props) {
    if (!this.props.displaySelectAll) return this.getCheckboxPlaceholder(props);

    const disabled = !this.props.enableSelectAll;
    const checkbox = (
      <Checkbox
        key="selectallcb"
        name="selectallcb"
        value="selected"
        disabled={disabled}
        checked={this.props.selectAllSelected}
        onCheck={this.handleCheckAll}
      />
    );

    const key = `hpcb${props.rowNumber}`;
    return (
      <TableHeaderColumn
        key={key}
        style={{
          width: 24,
          cursor: disabled ? 'not-allowed' : 'inherit',
        }}
      >
        {checkbox}
      </TableHeaderColumn>
    );
  }

  handleCheckAll = (event, checked) => {
    if (this.props.onSelectAll) this.props.onSelectAll(checked);
  };

  render() {
    const {
      className,
      style,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const superHeaderRows = this.createSuperHeaderRows();
    const baseHeaderRow = this.createBaseHeaderRow();

    return (
      <thead className={className} style={prepareStyles(Object.assign(styles.root, style))}>
        {superHeaderRows}
        {baseHeaderRow}
      </thead>
    );
  }
}

export default TableHeader;
