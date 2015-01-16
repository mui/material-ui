var React = require('react');
var Classable = require('./mixins/classable.js');
var Paper = require('./paper.jsx');

var Toggle = React.createClass({

  propTypes: {
    label: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      toggled: this.props.defaultToggled || false
    }
  },

/**/
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.hasOwnProperty('toggled')) this.setState({toggled: nextProps.defaultToggled});
  },

  render: function() {
    var classes = this.getClasses('mui-toggle', {
      'mui-is-toggled': this.state.toggled,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    })

    return (
      <div className="mui-toggle-wrap" onTouchTap={this._handleTouchTap}>
        
        <div className={classes} >
          <div className="mui-toggle-track" />
          <Paper className="mui-toggle-thumb" zDepth={1} />
        </div>
        
        <div className="mui-toggle-label">
          {this.props.label}
        </div>

      </div>
    );
  },

  _handleTouchTap: function(e) {
    var toggledState = !this.state.toggled;

    if (!this.props.disabled || this.props.disabled == false) {
          if (this.props.onToggle) this.props.onToggle(e, toggledState);
          this.setState({ toggled: toggledState });
    }
  },

  isToggled: function() {
    return this.state.toggled;
  },

  // no callback here because there is no event
  setToggled: function(newToggledValue) {
    this.setState({toggled: newToggledValue});
  }

});

module.exports = Toggle;