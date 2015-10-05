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
			navIcon: {
				maxWidth: spacing.iconSize,
				overflow: 'hidden',
				position: 'absolute',
			},
			container: {
				position: 'absolute',
				left: 56,
				color: appBarStyle.textColor,
				fontSize: 24,
			},
			actionIconsContainer: {
				position: 'absolute',
				right: 48,
			},
			actionIcon: {
				marginLeft: 24,
				maxWidth: spacing.iconSize,
				overflow: 'hidden',
			},
			menuIcon: {
				maxWidth: spacing.iconSize,
				overflow: 'hidden',
				position: 'absolute',
				right: 0,
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
          {this._getNavIcon()}
          {this._getContainer()}
          {this._getActionsIcons()}
          {this._getMenuIcon()}
        </div>
      </Paper>
    );
	},

	_getNavIcon () {
		if(this.props.children)
		{
			//is children an array
			if(this.props.children.constructor === Array)
			{
				//iterate through children until "navIcon" position is found
				let found = false, navIconElement = null;
				for(let index = 0; index < this.props.children.length && !found; index++)
				{
					if ((this.props.children[index]).props["data-position"] === "navIcon")
					{
						found = true;
						navIconElement = this.props.children[index];
					}
				}

				if(found)
					return React.cloneElement(navIconElement, {style: this.mergeAndPrefix(this._getStyles().navIcon, navIconElement.props.style)});	
			}

			//otherwise it is a single element
			else if ((this.props.children).props["data-position"] === "navIcon")
			{
				return React.cloneElement(this.props.children, {style: this.mergeAndPrefix(this._getStyles().navIcon, (this.props.children).props.style)});	
			}
		}
	},

	_getContainer () {
		if(this.props.children)
		{
			//is children an array
			if(this.props.children.constructor === Array)
			{
				//iterate through children until "container" position is found
				let found = false, containerElement = null;
				for(let index = 0; index < this.props.children.length && !found; index++)
				{
					if ((this.props.children[index]).props["data-position"] === "container")
					{
						found = true;
						containerElement = this.props.children[index];
					}
				}

				if(found)
					return React.cloneElement(containerElement, {style: this.mergeAndPrefix(this._getStyles().container, containerElement.props.style)});	
			}

			//otherwise it is a single element
			else if ((this.props.children).props["data-position"] === "container")
			{
				return React.cloneElement(this.props.children, {style: this.mergeAndPrefix(this._getStyles().container, (this.props.children).props.style)});	
			}
		}
	},

	_getActionsIcons () {
		if(this.props.children)
		{
			//is children an array
			if(this.props.children.constructor === Array)
			{
				//iterate through children until "actionIcons" position is found
				let found = false, actionIconsContainer = null;
				for(let index = 0; index < this.props.children.length && !found; index++)
				{
					if ((this.props.children[index]).props["data-position"] === "actionIcons")
					{
						found = true;
						actionIconsContainer = this.props.children[index];
					}
				}

				if(found)
				{
					let childElements = React.Children.map(actionIconsContainer.props.children, function(child) {
									return React.cloneElement(child, {style: this.mergeAndPrefix(this._getStyles().actionIcon, child.props.style)});
								}, this);
					return (
						<div style = {this.mergeAndPrefix(this._getStyles().actionIconsContainer, actionIconsContainer.props.style)}>
							{childElements}
						</div>
					);
				}
			}

			//otherwise it is a single element
			else if ((this.props.children).props["data-position"] === "actionIcons")
			{
				let childElements = React.Children.map((this.props.children).props.children, function(child){
								return React.cloneElement(child, {style: this.mergeAndPrefix(this._getStyles().actionIcon, child.props.style)})
							}, this);
				return (
						<div style = {this.mergeAndPrefix(this._getStyles().actionIconsContainer, (this.props.children).props.style)}>
							{childElements}
						</div>
					);
			}
		}
	},

	_getMenuIcon () {
		if(this.props.children)
		{
			//is children an array
			if(this.props.children.constructor === Array)
			{
				//iterate through children until "menuIcon" position is found
				let found = false, menuIconElement = null;
				for(let index = 0; index < this.props.children.length && !found; index++)
				{
					if ((this.props.children[index]).props["data-position"] === "menuIcon")
					{
						found = true;
						menuIconElement = this.props.children[index];
					}
				}

				if(found)
					return React.cloneElement(menuIconElement, {style: this.mergeAndPrefix(this._getStyles().menuIcon, menuIconElement.props.style)});	
			}

			//otherwise it is a single element
			else if ((this.props.children).props["data-position"] === "menuIcon")
			{
				return React.cloneElement(this.props.children, {style: this.mergeAndPrefix(this._getStyles().menuIcon, (this.props.children).props.style)});	
			}
		}
	},

});

module.exports = AppBarNew;
