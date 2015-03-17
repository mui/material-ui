var React = require('react');
var StylePropable = require('../mixins/style-propable');
var CustomVariables = require('../styles/variables/custom-variables');

var LinkMenuItem = React.createClass({

  mixins: [StylePropable],
  
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
      lineHeight: CustomVariables.menuItemHeight + 'px',
      paddingLeft: CustomVariables.menuItemPadding,
      paddingRight: CustomVariables.menuItemPadding,
    });

    if (this.state.hovered && !this.props.disabled) style.backgroundColor = CustomVariables.menuItemHoverColor;
    if (this.props.selected) style.color = CustomVariables.menuItemSelectedTextColor;

    if (this.props.disabled) {
      style.cursor = 'default';
      style.color = CustomVariables.disabledColor;
    }

    return this.mergeAndPrefix(style);
  },

  render: function() {
    var onClickHandler = (this.props.disabled) ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    var linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
    var link = {linkAttribute: this.props.payload};

    return (
      <a 
        key={this.props.index} 
        target={this.props.target} 
        style={this._main()} {...link} 
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