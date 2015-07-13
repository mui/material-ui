let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');


let ListDivider = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    inset: React.PropTypes.bool,
  },

  render() {
    let {
      inset,
      style,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: this.context.muiTheme.palette.borderColor,
    }, style);

    return (
      <hr {...other} style={mergedStyles} />
    );
  },
});

module.exports = ListDivider;
