var React = require('react');
var CssEvent = require('./utils/css-event');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var ClickAwayable = require('./mixins/click-awayable');
var FlatButton = require('./flat-button');

var Snackbar = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  manuallyBindClickAway: true,

  propTypes: {
    action: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    openOnMount: React.PropTypes.bool,
    onActionTouchTap: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      open: this.props.openOnMount || false
    };
  },

  componentClickAway: function() {
    this.dismiss();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.open != this.state.open) {
      if (this.state.open) {
        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(this.getDOMNode(), function() {
          this._bindClickAway();
        }.bind(this));
      } else {
        this._unbindClickAway();
      }
    }
  },

  _main: function() {
    return this.mergeAndPrefix({
      color: CustomVariables.snackbarTextColor,
      backgroundColor: CustomVariables.snackbarBackgroundColor,
      borderRadius: 2,
      padding: '0px ' + CustomVariables.spacing.desktopGutter + 'px',
      height: CustomVariables.spacing.desktopSubheaderHeight,
      lineHeight: CustomVariables.spacing.desktopSubheaderHeight + 'px',
      minWidth: 288,
      maxWidth: 568,

      position: 'fixed',
      zIndex: 10,
      bottom: CustomVariables.spacing.desktopGutter,
      marginLeft: CustomVariables.spacing.desktopGutter,

      left: -10000,
      opacity: 0,
      transform: 'translate3d(0, 20px, 0)',
      transition:
        Transitions.easeOut('0ms', 'left', '400ms') + ',' +
        Transitions.easeOut('400ms', 'opacity') + ',' +
        Transitions.easeOut('400ms', 'transform'),
    });
  },

  _openMain: function() {
    return {
      left: 0,
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition:
        Transitions.easeOut('0ms', 'left', '0ms') + ',' +
        Transitions.easeOut('400ms', 'opacity', '0ms') + ',' +
        Transitions.easeOut('400ms', 'transform', '0ms'),
    }
  },

  _action: function() {
    return {
      color: CustomVariables.snackbarActionColor,
      float: 'right',
      marginTop: 6,
      marginRight: -16,
      marginLeft: CustomVariables.spacing.desktopGutter,
      backgroundColor: 'transparent',
    }
  },

  render: function() {

    var styles = this._main();
    if (this.state.open) styles = this.mergeStyles(styles, this._openMain());

    var action;
    if (this.props.action) {
      action = (
        <FlatButton
          style={this._action()}
          label={this.props.action}
          onTouchTap={this.props.onActionTouchTap} />
      );
    }

    return (
      <span style={styles}>
        <span className="mui-snackbar-message">{this.props.message}</span>
        {action}
      </span>
    );
  },

  show: function() {
    this.setState({ open: true });
  },
  
  dismiss: function() {
    this.setState({ open: false });
  }

});

module.exports = Snackbar;