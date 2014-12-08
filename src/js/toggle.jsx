var React = require('react'),
    Classable = require('./mixins/classable.js'),
    Paper = require('./paper.jsx');

var Toggle = React.createClass({

  propTypes: {
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      toggled: this.props.toggled
    }
  },

  render: function() {
    var classes = this.getClasses('mui-toggle', {
      'mui-is-toggled': this.state.toggled
    })

    return (
      <div className={classes} onTouchTap={this._handleTouchTap}>
        <div className="mui-toggle-track" />
        <Paper className="mui-toggle-thumb" zDepth={1} />
      </div>
    );
  },

  _handleTouchTap: function(e) {
    var toggledState = !this.state.toggled;

    this.setState({ toggled: toggledState });

    if (this.props.onToggle) this.props.onToggle(e, toggledState);
  }

});

module.exports = Toggle;