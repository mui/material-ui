let React = require('react');
let Checkbox = require('../checkbox');
let StylePropable = require('../mixins/style-propable');
let TableHeaderColumn = require('./table-header-column');


let TableHeader = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    adjustForCheckbox: React.PropTypes.bool,
    displaySelectAll: React.PropTypes.bool,
    enableSelectAll: React.PropTypes.bool,
    onSelectAll: React.PropTypes.func,
    selectAllSelected: React.PropTypes.bool,
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
    return this.context.muiTheme.component.tableHeader;
  },

  getStyles() {
    let styles = {
      root:  {
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
      <thead className={classes} style={this.mergeAndPrefix(this.getStyles().root, style)}>
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

    const checkbox =
      <Checkbox
        key="selectallcb"
        name="selectallcb"
        value="selected"
        disabled={!this.props.enableSelectAll}
        checked={this.props.selectAllSelected}
        onCheck={this._onSelectAll} />;

    return (
      <TableHeaderColumn style={{width: 24}}>
        {checkbox}
      </TableHeaderColumn>
    );
  },

  _onSelectAll(e, checked) {
    if (this.props.onSelectAll) this.props.onSelectAll(checked);
  },

});

module.exports = TableHeader;
