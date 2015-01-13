var React = require('react'),
    Classable = require('./mixins/classable.js'),
    Paper = require('./paper.jsx');

var Toggle = React.createClass({

  propTypes: {
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    label: React.PropTypes.string
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      toggled: this.props.toggled
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.hasOwnProperty('toggled')) this.setState({toggled: nextProps.toggled});
  },

  render: function() {
    var classes = this.getClasses('mui-toggle', {
      'mui-is-toggled': this.state.toggled
    })

    return (
      <div className="mui-toggle-wrap">
        {this.props.label ? <div className="mui-toggle-label" onTouchTap={this._handleTouchTap}>{this.props.label}</div> : ''}
        <div className={classes} onTouchTap={this._handleTouchTap}>
          <div className="mui-toggle-track" />
          <Paper className="mui-toggle-thumb" zDepth={1} />
        </div>
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