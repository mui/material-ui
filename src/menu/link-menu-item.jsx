var React = require('react');
var StylePropable = require('../mixins/style-propable');

var LinkMenuItem = React.createClass({

  mixins: [StylePropable],
  
  contextTypes: {
    muiTheme: React.PropTypes.object
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

  getTheme: function() {
    return this.context.muiTheme.component.menuItem;
  },

  getStyles: function() {
    var style = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'block',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor
      }
    };
    return style;
  },

  render: function() {
    var onClickHandler = (this.props.disabled) ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    var linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
    var link = {};
    link[linkAttribute] = this.props.payload

    var styles = this.getStyles();

    var linkStyles = 
      this.mergeAndPrefix(
        styles.root, 
        this.props.selected && styles.rootWhenSelected,
        (this.state.hovered && !this.props.disabled) && styles.rootWhenHovered,
        this.props.style,
        this.props.disabled && styles.rootWhenDisabled);

    return (
      <a 
        key={this.props.index} 
        target={this.props.target} 
        style={linkStyles} {...link} 
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
