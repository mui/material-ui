var React = require('react');
var StylePropable = require('../mixins/style-propable');

var LinkMenuItem = React.createClass({

  mixins: [StylePropable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    payload: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    target: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
  },
  
  getDefaultProps: function() {
    return {
      disabled: false
    };
  },

  getInitialState: function() {
    return {
      hovered: false
    }
  },

  /** Styles */
  _main: function() { // Same as MenuItem.
    var style = this.mergeAndPrefix({
      userSelect: 'none',
      cursor: 'pointer',
      display: 'block',
      lineHeight: this.getTheme().height + 'px',
      paddingLeft: this.getTheme().padding,
      paddingRight: this.getTheme().padding,
    });

    if (this.state.hovered && !this.props.disabled) style.backgroundColor = this.getTheme().hoverColor;
    if (this.props.selected) style.color = this.getTheme().selectedTextColor;

    return this.mergeAndPrefix(style);
  },

  getTheme: function() {
    return this.context.theme.component.menuItem;
  },

  render: function() {
    var onClickHandler = (this.props.disabled) ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    var linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
    var link = {linkAttribute: this.props.payload};

    var styles = this._main(); 
    if (this.props.disabled) {
      styles.cursor = 'default';
      styles.color = this.context.theme.palette.disabledColor;
    }

    return (
      <a 
        key={this.props.index} 
        target={this.props.target} 
        style={styles} {...link} 
        className={this.props.className} 
        onClick={onClickHandler}
        onMouseOver={this._handleMouseOver}
        onMouseOut={this._handleMouseOut}>
          {this.props.text}
      </a>
    );
  },
  
  _stopLink: function(event) {
    event.preventDefault();
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e);
  }
});

module.exports = LinkMenuItem;