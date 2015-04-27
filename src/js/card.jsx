var React = require('react'),
  Paper = require('./paper');

module.exports = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        actions: React.PropTypes.string,
        zDepth: React.PropTypes.oneOf([0,1,2,3,4,5])
    },

    getDefaultProps: function() {
        return {
            zDepth: 1
        };
    },

    render: function () {
        var classes = [
            this.props.className,
            'mui-card',
            'mui-z-depth-' + this.props.zDepth
        ].join(' ');

        var cardTitle;
        if (this.props.title) {
            cardTitle = <div className="mui-card-title">{this.props.title}</div>
        }

        var actions;
        if (this.props.actions) {
            actions = <div className="mui-card-actions">{this.props.actions}</div>
        }

        return (
            <div className={classes}>
                <div className="mui-card-content">
                    {cardTitle}
                    {this.props.children}
                </div>
                {actions}
            </div>
        );
    }
});
