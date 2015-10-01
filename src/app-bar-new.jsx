const React = require('react');
const Paper = require('./paper');
const ThemeManager = require('./styles/theme-manager');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const StylePropable = require('./mixins/style-propable');

const AppBarNew = React.createClass({

	mixins: [StylePropable],

	getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };    
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

	_getStyles () {
		let spacing = this.state.muiTheme.rawTheme.spacing;
		let appBarStyle = this.state.muiTheme.appBar;
		return {
			root: {
				backgroundColor: appBarStyle.color,
				width: '100%',
				height: 64,
				paddingLeft: 24,
				paddingRight: 24,
				paddingTop: 20,
				paddingBottom: 20,
			},
			navIcon: {
				margin: 0,
				padding: 0,
				width: 24,
				overflow: 'hidden',
				float: 'left',
			},
			container: {
				marginLeft: 36,
				marginTop: 0,
				marginBottom: 0,
				marginRight: 0,
				padding: 0,
				float: 'left',
			},
			actionIcon: {
				float: 'right',
				marginLeft: 0,
				marginTop: 0,
				marginBottom: 0,
				marginRight: 20,
				padding: 0,
				width: 24,
				overflow: 'hidden',
			},
			menuIcon: {
				float: 'right',
				margin: 0,
				padding: 0,
				width: 24,
				overflow: 'hidden',
			},
		};
	},

	render () {
		return (
      <Paper
        rounded={false}
        className={this.props.className}
        style={this.mergeAndPrefix(this._getStyles().root, this.props.style)}
        zDepth={this.props.zDepth}>
          {this._getNavIcon()}
          {this._getContainer()}
          {this._getMenuIcon()}
          {this._getActionsIcons()}
      </Paper>
    );
	},

	_getNavIcon () {
		if((this.props.children[0]).props.type === "navIcon")
		{
			let navIconElement = (this.props.children[0]).props.children;
			return React.cloneElement(navIconElement, {style: this.mergeAndPrefix(this._getStyles().navIcon, navIconElement.props.style)});
		}
	},

	_getContainer () {
		let pos = -1;
		if(
			((this.props.children[0]).props.type === "container" && (pos = 0)) ||
			((this.props.children[1]).props.type === "container" && (pos = 1))
			)
		{
			let containerElement = (this.props.children[pos]).props.children;
			return React.cloneElement(containerElement, {style: this.mergeAndPrefix(this._getStyles().container, containerElement.props.style)});
		}
	},

	_getActionsIcons () {
		let pos = -1;
		if(
			((this.props.children[0]).props.type === "actionIcons" && (pos = 0)) ||
			((this.props.children[1]).props.type === "actionIcons" && (pos = 1)) ||
			((this.props.children[2]).props.type === "actionIcons" && (pos = 2))
			)
		{
			let actionIconElement = (this.props.children[pos]).props.children;
			return React.cloneElement(actionIconElement, {style: this.mergeAndPrefix(this._getStyles().actionIcon, actionIconElement.props.style)});
		}
	},

	_getMenuIcon () {
		let pos = -1;
		if(
			((this.props.children[0]).props.type === "menuIcon" && (pos = 0)) ||
			((this.props.children[1]).props.type === "menuIcon" && (pos = 1)) ||
			((this.props.children[2]).props.type === "menuIcon" && (pos = 2)) ||
			((this.props.children[3]).props.type === "menuIcon" && (pos = 3))
			)
		{
			let menuIconElement = (this.props.children[pos]).props.children;
			return React.cloneElement(menuIconElement, {style: this.mergeAndPrefix(this._getStyles().menuIcon, menuIconElement.props.style)});
		}
	},

});

module.exports = AppBarNew;
