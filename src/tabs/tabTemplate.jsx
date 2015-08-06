let React = require('react');
let StylePropable = require('../mixins/style-propable');


let TabTemplate = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    selected: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
  },

  render() {
    let styles = this.mergeAndPrefix({
      'height': 0,
      'overflow': 'hidden',
      'width': '100%',
      'position': 'relative',
      'textAlign': 'initial',
    }, this.props.style);

    if (!this.props.selected) {
      styles.height = 0;
      styles.overflow = 'hidden';
    }

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = TabTemplate;
