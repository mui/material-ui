let React = require('react');
let StylePropable = require('../mixins/style-propable');


let TableFooter = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    columns: React.PropTypes.array.isRequired,
  },

  getDefaultProps() {
    return {};
  },

  getTheme() {
    return this.context.muiTheme.component.tableFooter;
  },

  getStyles() {

   let styles = {
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
    let className = 'mui-table-footer';

    return (
      <tfoot className={className}>
        {this._getFooterRow()}
      </tfoot>
    );
  },

  _getFooterRow() {
    return (
      <tr className='mui-table-footer-row'>
        {this._getColumnHeaders(this.props.columns, 'f')}
      </tr>
    );
  },

  _getColumnHeaders(footerData, keyPrefix) {
    let footers = [];
    let styles = this.getStyles();

    for (let index = 0; index < footerData.length; index++) {
      let {
        content,
        ...props,
      } = footerData[index];
      if (content === undefined) content = footerData[index];
      let key = keyPrefix + index;
      props.style = (props.style !== undefined) ? this.mergeAndPrefix(props.style, styles.cell) : styles.cell;

      footers.push(
        <td key={key} className='mui-table-footer-column' {...props}>
          {content}
        </td>
      );
    }

    return footers;
  },

});

module.exports = TableFooter;
