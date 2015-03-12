var React = require('react'),
  KeyCode = require('./utils/key-code'),
  Classable = require('./mixins/classable'),
  WindowListenable = require('./mixins/window-listenable'),
  Overlay = require('./overlay'),
  Paper = require('./paper');

var LeftNav = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    docked: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      docked: true
    };
  },

  getInitialState: function() {
    return {
      open: this.props.docked
    };
  },

  toggle: function() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function() {
    this.setState({ open: false });
    return this;
  },

  open: function() {
    this.setState({ open: true });
    return this;
  },

  render: function() {
    var classes = this.getClasses('mui-left-nav', {
        'mui-closed': !this.state.open
      }),
      selectedIndex = this.props.selectedIndex,
      overlay;

    if (!this.props.docked) overlay = <Overlay show={this.state.open} onTouchTap={this._onOverlayTouchTap} />;

    return (
      React.createElement("div", {className: classes},

        overlay,
        React.createElement(Paper, {
            ref: "clickAwayableElement",
            className: "mui-left-nav-menu",
            zDepth: 2,
            rounded: false},

          this.props.children
        )
      )
    );
  },

  _onOverlayTouchTap: function() {
    this.close();
  },

  _onWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC &&
        !this.props.docked &&
        this.state.open) {
      this.close();
    }
  }

});

module.exports = LeftNav;
