import React from 'react';
import Checkbox from '../checkbox';
import StylePropable from '../mixins/style-propable';
import TableHeaderColumn from './table-header-column';
import muiThemeable from '../muiThemeable';

let TableHeader = React.createClass({

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
    displaySelectAll: React.PropTypes.bool,
    enableSelectAll: React.PropTypes.bool,
    onSelectAll: React.PropTypes.func,
    selectAllSelected: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      adjustForCheckbox: true,
      displaySelectAll: true,
      enableSelectAll: true,
      selectAllSelected: false,
    };
  },

  getTheme() {
    return this.props._muiTheme.tableHeader;
  },

  getStyles() {
    let styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
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
    let classes = 'mui-table-header';
    if (className) classes += ' ' + className;

    let superHeaderRows = this._createSuperHeaderRows();
    let baseHeaderRow = this._createBaseHeaderRow();

    return (
      <thead className={classes} style={this.prepareStyles(this.getStyles().root, style)}>
        {superHeaderRows}
        {baseHeaderRow}
      </thead>
    );
  },

  _createSuperHeaderRows() {
    let numChildren = React.Children.count(this.props.children);
    if (numChildren === 1) return undefined;

    let superHeaders = [];
    for (let index = 0; index < numChildren - 1; index++) {
      let child = this.props.children[index];

      if (!React.isValidElement(child)) continue;

      let props = {
        className: 'mui-table-super-header-row',
        displayRowCheckbox: false,
        key: 'sh' + index,
        rowNumber: index,
      };
      superHeaders.push(this._createSuperHeaderRow(child, props));
    }

    if (superHeaders.length) return superHeaders;
  },

  _createSuperHeaderRow(child, props) {
    let children = [];
    if (this.props.adjustForCheckbox) {
      children.push(this._getCheckboxPlaceholder(props));
    }
    React.Children.forEach(child.props.children, (child) => {
      children.push(child);
    });

    return React.cloneElement(child, props, children);
  },

  _createBaseHeaderRow() {
    let numChildren = React.Children.count(this.props.children);
    let child = (numChildren === 1) ? this.props.children : this.props.children[numChildren - 1];
    let props = {
      className: 'mui-table-header-row',
      key: 'h' + numChildren,
      rowNumber: numChildren,
    };

    let children = [this._getSelectAllCheckboxColumn(props)];
    React.Children.forEach(child.props.children, (child) => {
      children.push(child);
    });

    return React.cloneElement(
      child,
      props,
      children
    );
  },

  _getCheckboxPlaceholder(props) {
    if (!this.props.adjustForCheckbox) return null;

    const key = 'hpcb' + props.rowNumber;
    return <TableHeaderColumn key={key} style={{width: 24}} />;
  },

  _getSelectAllCheckboxColumn(props) {
    if (!this.props.displaySelectAll) return this._getCheckboxPlaceholder(props);

    const checkbox = (
      <Checkbox
        key="selectallcb"
        name="selectallcb"
        value="selected"
        disabled={!this.props.enableSelectAll}
        checked={this.props.selectAllSelected}
        onCheck={this._onSelectAll}
      />
    );

    const key = 'hpcb' + props.rowNumber;
    return (
      <TableHeaderColumn key={key} style={{width: 24}}>
        {checkbox}
      </TableHeaderColumn>
    );
  },

  _onSelectAll(e, checked) {
    if (this.props.onSelectAll) this.props.onSelectAll(checked);
  },

});

TableHeader = muiThemeable(TableHeader);

export default TableHeader;
