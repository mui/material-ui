var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TableFooter = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columns: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {};
  },

  getTheme: function() {
    return this.context.muiTheme.component.tableFooter;
  },

  getStyles: function() {
    var styles = {
      cell: {
        borderTop: '1px solid ' + this.getTheme().borderColor,
        verticalAlign: 'bottom',
        padding: 20,
        textAlign: 'left',
        whiteSpace: 'nowrap'
      }
    };

    return styles;
  },

  render: function() {
    var className = 'mui-table-footer';

    return (
      <tfoot className={className}>
        {this._getFooterRow()}
      </tfoot>
    );
  },

  _getFooterRow: function() {
    return (
      <tr className='mui-table-footer-row'>
        {this._getColumnHeaders(this.props.columns, 'f')}
      </tr>
    );
  },

  _getColumnHeaders: function(footerData, keyPrefix) {
    var footers = [];
    var styles = this.getStyles();

    for (var index = 0; index < footerData.length; index++) {
      var {
        content,
        ...props
      } = footerData[index];
      var key = keyPrefix + index
      props.style = (props.style !== undefined) ? this.mergeAndPrefix(props.style, styles.cell) : styles.cell;

      footers.push(
        <td key={key} className='mui-table-footer-column' {...props}>
          {content}
        </td>
      );
    }

    return footers;
  }

});

module.exports = TableFooter;
