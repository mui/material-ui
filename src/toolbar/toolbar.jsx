let React = require('react');
let StylePropable = require('../mixins/style-propable');


let Toolbar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getTheme() {
    return this.context.muiTheme.component.toolbar;
  },

  getStyles() {
    return this.mergeAndPrefix({
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      backgroundColor: this.getTheme().backgroundColor,
      height: this.getTheme().height,
      width: '100%',
      padding: this.props.noGutter ? 0 : '0px ' + this.context.muiTheme.spacing.desktopGutter + 'px',
    }, this.props.style);
  },

  render() {
    return (
      <div className={this.props.className} style={this.getStyles()}>
        {this.props.children}
      </div>
    );
  },

});

module.exports = Toolbar;
