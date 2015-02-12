var React = require('react');
var StylePropable = require('../mixins/style-propable.js');

var TabTemplate = React.createClass({

  mixins: [StylePropable],

  render: function(){

    var styles = this.mergePropStyles({
      'display': 'block',
      'width': '100%',
      'position': 'relative',
      'text-align': 'initial'
    });

    return (
      <div styles={styles}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = TabTemplate;