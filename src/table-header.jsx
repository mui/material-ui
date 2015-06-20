let React = require('react'),
  Classable = require('./mixins/classable');

let TableHeader = React.createClass({

  mixins: [Classable],

  propTypes: {
    headerItems: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    let classes = this.getClasses('mui-table-header');

    return (
      <div className={classes}>
        {this._getChildren()}
        <div className="mui-table-header-pagify">
          (Pagify)
        </div>
      </div>
    );
  },

  _getChildren: function() {
    let children = [],
      headerItem,
      itemComponent

    for (let i=0; i < this.props.headerItems.length; i++) {
      headerItem = this.props.headerItems[i];

      itemComponent = (
        <div key={i} className="mui-table-header-column">{headerItem.text}</div>
      );

      children.push(itemComponent);
    }

    return children;
  }

});

module.exports = TableHeader;
