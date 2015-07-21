let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Colors = require('../styles/colors.js');


let Tab = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    handleTouchTap: React.PropTypes.func,
    onActive: React.PropTypes.func,
    selected: React.PropTypes.bool,
    width: React.PropTypes.string,
    value: React.PropTypes.string,
  },

  getDefaultProps(){
    return {
      onActive: () => {},
    };
  },

  render() {
    let {
      label,
      selected,
      style,
      value,
      width,
      ...other,
    } = this.props;
    let styles = this.mergeAndPrefix({
      display: 'table-cell',
      cursor: 'pointer',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 48,
      color: Colors.white,
      opacity: selected ? 1 : 0.6,
      outline: 'none',
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'initial',
      fontFamily: this.context.muiTheme.contentFontFamily,
      boxSizing: 'border-box',
      width: width,
    }, style);

    return (
      <div
        {...other}
        style={styles}
        onTouchTap={this._handleTouchTap}>
        {label}
      </div>
    );
  },

   _handleTouchTap(e) {
    this.props.handleTouchTap(e, this);
  },

});

module.exports = Tab;
