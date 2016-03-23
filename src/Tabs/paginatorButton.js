import React from 'react';
import IconButton from '../IconButton';
import DefaultRawTheme from '../styles/baseThemes/lightBaseTheme';
import ThemeManager from '../styles/themeManager';
import ColorManipulator from '../utils/colorManipulator';

const TabPaginatorButton = React.createClass({
	propTypes: {
		className: React.PropTypes.string,
		disableTouchRipple: React.PropTypes.bool,
		disabled: React.PropTypes.bool.isRequired,
		iconStyle: React.PropTypes.object,
		isLeftPaginatorButton: React.PropTypes.bool.isRequired,
		iconClassName: Reapct.PropTypes.string,
		style: React.PropTypes.object
	},

	contextTypes: {
		muiTheme: React.PropTypes.object
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			disableTouchRipple: true
		};
	},

	getInitialState() {
		return {
			muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
		};
	},

	getChildContext() {
		return {
			muiTheme: this.state.muiTheme
		};
	},

	//to update theme inside state whenever a new theme is passed down
	//from the parent / owner using context
	componentWillReceiveProps(nextProps, nextContext) {
		let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
		this.setState({muiTheme: newMuiTheme});
	},

	render() {
		const {
			disabled,
			isLeftPaginatorButton,
			style,
			iconStyle,
			...other,
		} = this.props;

		// tab paginator button width comes from google's design guide
		// https://www.google.com/design/spec/components/tabs.html#tabs-specs
		let themeVariables = this.state.muiTheme.tabs;
		let iconClassName = this.props.iconClassName || "material-icons";
		let materialIcon;

		if (iconClassName === "material-icons") {
			materialIcon = isLeftPaginatorButton ? 'keyboard_arrow_left' : 'keyboard_arrow_right';
		}

		const styles = {
			buttonStyle: {
				position: 'absolute',
				top: 0,
				zIndex: 1,
				width: 32,
				height: '100%',
				padding: 0,
				backgroundColor: themeVariables.backgroundColor
			},
			iconStyle: {
				lineHeight: iconStyle && iconStyle.lineHeight ?
					iconStyle.lineHeight : '48px',
				color: iconStyle && iconStyle.color ?
					disabled ?
						ColorManipulator.fade(iconStyle.color, 0.3) :
						iconStyle.color
					: disabled ?
					this.state.muiTheme.tabs.textColor :
					this.state.muiTheme.tabs.selectedTextColor
			}
		};

		if (isLeftPaginatorButton) {
			styles.buttonStyle.left = 0;
		} else {
			styles.buttonStyle.right = 0;
		}

		return (
			<IconButton {...other}
				disableTouchRipple={this.props.disableTouchRipple}
				disabled={disabled}
				iconClassName={iconClassName}
				iconStyle={this._mergeStyles(iconStyle, styles.iconStyle)}
				style={this._mergeStyles(styles.buttonStyle, style)}
			>
				{materialIcon}
			</IconButton>
		);
	},

	_mergeStyles: function (...args) {
		return Object.assign({}, ...args);
	}
});

export default TabPaginatorButton;
