import React from 'react';
import Checkbox from '../checkbox';
import StylePropable from '../mixins/style-propable';
import TableHeaderColumn from './table-header-column';
import getMuiTheme from '../styles/getMuiTheme';

const TableHeader = React.createClass({

  propTypes: {
    /**
     * Controls whether or not header rows should be
     * adjusted for a checkbox column. If the select all
     * checkbox is true, this property will not influence
     * the number of columns. This is mainly useful for
     * "super header" rows so that the checkbox column
     * does not create an offset that needs to be accounted
     * for manually.
     */
    adjustForCheckbox: React.PropTypes.bool,

    /**
     * Children passed to table header.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Controls whether or not the select all checkbox is displayed.
     */
    displaySelectAll: React.PropTypes.bool,

    /**
     * If set to true, the select all button will be interactable.
     * If set to false, the button will not be interactable.
     * To hide the checkbox, set displaySelectAll to false.
     */
    enableSelectAll: React.PropTypes.bool,

    /**
     * Callback when select all has been checked.
     */
    onSelectAll: React.PropTypes.func,

    /**
     * True when select all has been checked.
     */
    selectAllSelected: React.PropTypes.bool,

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
      displaySelectAll: true,
      enableSelectAll: true,
      selectAllSelected: false,
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
    return this.state.muiTheme.tableHeader;
  },

  getStyles() {
    let styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
      },
    };

    return styles;
  },

  _createSuperHeaderRows() {
    let numChildren = React.Children.count(this.props.children);
    if (numChildren === 1) return undefined;

    let superHeaders = [];
    for (let index = 0; index < numChildren - 1; index++) {
      let child = this.props.children[index];

      if (!React.isValidElement(child)) continue;

      let props = {
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

  render() {
    let {
      className,
      style,
      ...other,
    } = this.props;
    let superHeaderRows = this._createSuperHeaderRows();
    let baseHeaderRow = this._createBaseHeaderRow();

    return (
      <thead className={className} style={this.prepareStyles(this.getStyles().root, style)}>
        {superHeaderRows}
        {baseHeaderRow}
      </thead>
    );
  },

});

export default TableHeader;
