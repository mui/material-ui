var React = require('react');
var Classable = require('../mixins/classable');

var LinkMenuItem = React.createClass({

    mixins: [Classable],
    
    propTypes: {
        index: React.PropTypes.number.isRequired,
        payload: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        target: React.PropTypes.string,
        disabled: React.PropTypes.bool
    },
    
    getDefaultProps: function() {
        return {
            disabled: false
        };
    },
    
    render: function() {
        var classes = this.getClasses('mui-menu-item', {
          'mui-is-disabled': this.props.disabled
        });
        var onClickHandler = (this.props.disabled) ? this._stopLink : undefined;
        // Prevent context menu 'Open In New Tab/Window'
        var linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
        var link = {linkAttribute: this.props.payload};
        
        return (
            <a key={this.props.index} className={classes} {...link} target={this.props.target} onClick={onClickHandler}>{this.props.text}</a>
        );
    },
    
    _stopLink: function(event) {
      event.preventDefault();
    }
});

module.exports = LinkMenuItem;