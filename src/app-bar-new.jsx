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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

	_getStyles () {
		let spacing = this.state.muiTheme.rawTheme.spacing;
		let appBarStyle = this.state.muiTheme.appBar;
		return {
			root: {
				backgroundColor: appBarStyle.color,
				width: '100%',
				height: spacing.desktopKeylineIncrement,
				paddingLeft: spacing.desktopGutter,
				paddingRight: spacing.desktopGutter,
				paddingTop: 20,
				paddingBottom: 20,
			},

			navIconsGroup: {
				maxWidth: spacing.iconSize,
				overflow: 'hidden',
				position: 'absolute',
			},
			navIcon: {
				padding: 0,
				width: 24,
				height: 24,
			},

			container: {
				position: 'absolute',
				left: 56,
				color: appBarStyle.textColor,
				fontSize: 24,
			},
			containerElement: {
				margin: 0,
			},

			actionIconsGroup: {
				position: 'absolute',
				right: 48,
			},
			actionIcon: {
				padding: 0,
				width: 24,
				height: 24,
				marginLeft: 24,
				maxWidth: spacing.iconSize,
				overflow: 'hidden',
			},

			menuIconsGroup: {
				maxWidth: spacing.iconSize,
				overflow: 'hidden',
				position: 'absolute',
				right: 0,
			},
			menuIcon: {
				padding: 0,
				width: 24,
				height: 24,
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
        <div style = {{position: 'relative'}}>
          {this._getNavIconsGroup()}
          {this._getContainer()}
          {this._getActionsIconsGroup()}
          {this._getMenuIconsGroup()}
        </div>
      </Paper>
    );
	},

	_getNavIconsGroup () {
		if(typeof this.props.children === 'undefined')
			return;

		//here, children prop is defined
		let numChildren = React.Children.count(this.props.children);
		let found = false, navIconsGroup = null;

		for(let index = 0; index < numChildren && !found; index++)
		{
			//if children is not an array
			if(index === 0 && numChildren === 1 && (this.props.children).props["data-position"] === "navIconsGroup")
			{
				found = true;
				navIconsGroup = this.props.children;
			}

			else if(numChildren > 0 && (this.props.children[index]).props["data-position"] === "navIconsGroup")
			{
				found = true;
				navIconsGroup = this.props.children[index];
			}
		}

		if(found)
		{
			let childElements = React.Children.map(navIconsGroup.props.children, function (child){
				return React.cloneElement(child, {style: this.mergeAndPrefix(this._getStyles().navIcon, child.props.style)});
			}, this);

			return (
				<div style = {this.mergeAndPrefix(this._getStyles().navIconsGroup, navIconsGroup.props.style)}>
					{childElements}
				</div>
			);
		}
	},

	_getContainer () {
		if(typeof this.props.children === 'undefined')
			return;

		//here, children prop is defined
		let numChildren = React.Children.count(this.props.children);
		let found = false, container = null;

		for(let index = 0; index < numChildren && !found; index++)
		{
			//if children is not an array
			if(index === 0 && numChildren === 1 && (this.props.children).props["data-position"] === "container")
			{
				found = true;
				container = this.props.children;
			}

			else if(numChildren > 0 && (this.props.children[index]).props["data-position"] === "container")
			{
				found = true;
				container = this.props.children[index];
			}
		}

		if(found)
		{
			let childElements = React.Children.map(container.props.children, function (child){
				return React.cloneElement(child, {style: this.mergeAndPrefix(this._getStyles().containerElement, child.props.style)});
			}, this);

			return (
				<div style = {this.mergeAndPrefix(this._getStyles().container, container.props.style)}>
					{childElements}
				</div>
			);
		}
	},

	_getActionsIconsGroup () {
		if(typeof this.props.children === 'undefined')
			return;

		//here, children prop is defined
		let numChildren = React.Children.count(this.props.children);
		let found = false, actionIconsGroup = null;

		for(let index = 0; index < numChildren && !found; index++)
		{
			//if children is not an array
			if(index === 0 && numChildren === 1 && (this.props.children).props["data-position"] === "actionIconsGroup")
			{
				found = true;
				actionIconsGroup = this.props.children;
			}

			else if(numChildren > 0 && (this.props.children[index]).props["data-position"] === "actionIconsGroup")
			{
				found = true;
				actionIconsGroup = this.props.children[index];
			}
		}

		if(found)
		{
			let childElements = React.Children.map(actionIconsGroup.props.children, function (child){
				return React.cloneElement(child, {style: this.mergeAndPrefix(this._getStyles().actionIcon, child.props.style)});
			}, this);

			return (
				<div style = {this.mergeAndPrefix(this._getStyles().actionIconsGroup, actionIconsGroup.props.style)}>
					{childElements}
				</div>
			);
		}
	},

	_getMenuIconsGroup () {
		if(typeof this.props.children === 'undefined')
			return;

		//here, children prop is defined
		let numChildren = React.Children.count(this.props.children);
		let found = false, menuIconsGroup = null;

		for(let index = 0; index < numChildren && !found; index++)
		{
			//if children is not an array
			if(index === 0 && numChildren === 1 && (this.props.children).props["data-position"] === "menuIconsGroup")
			{
				found = true;
				menuIconsGroup = this.props.children;
			}

			else if(numChildren > 0 && (this.props.children[index]).props["data-position"] === "menuIconsGroup")
			{
				found = true;
				menuIconsGroup = this.props.children[index];
			}
		}

		if(found)
		{
			let childElements = React.Children.map(menuIconsGroup.props.children, function (child){
				return React.cloneElement(child, {style: this.mergeAndPrefix(this._getStyles().menuIcon, child.props.style)});
			}, this);

			return (
				<div style = {this.mergeAndPrefix(this._getStyles().menuIconsGroup, menuIconsGroup.props.style)}>
					{childElements}
				</div>
			);
		}
	},

});

module.exports = AppBarNew;
