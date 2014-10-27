/**
 * @jsx React.DOM
 */

var Home = require('./pages/home.jsx'),
	Buttons = require('./pages/buttons.jsx'),
	Colors = require('./pages/colors.jsx'),
	Dialog = require('./pages/dialog.jsx'),
	Icons = require('./pages/icons.jsx'),
	Inputs = require('./pages/inputs.jsx'),
	Menus = require('./pages/menus.jsx'),
	Switches = require('./pages/switches.jsx'),
	Toasts = require('./pages/toasts.jsx'),
	Toolbar = require('./pages/toolbars.jsx'),
	Typography = require('./pages/typography.jsx');

var Pages = {
	home: { url: '', title: 'Introduction', mainContentComponent: <Home /> },
	colors: { url: 'colors', title: 'Colors', mainContentComponent: <Colors /> },
	buttons: { url: 'buttons', title: 'Buttons', mainContentComponent: <Buttons /> },
	dialog: { url: 'dialog', title: 'Dialog', mainContentComponent: <Dialog /> },
	icons: { url: 'icons', title: 'Icons', mainContentComponent: <Icons /> },
	inputs: { url: 'inputs', title: 'Inputs', mainContentComponent: <Inputs /> },
	menus: { url: 'menus', title: 'Menus', mainContentComponent: <Menus /> },
	switches: { url: 'switches', title: 'Switches', mainContentComponent: <Switches /> },
	toasts: { url: 'toasts', title: 'Toasts', mainContentComponent: <Toasts /> },
	toolbars: { url: 'toolbar', title: 'Toolbars', mainContentComponent: <Toolbar /> },
	typography: { url: 'typography', title: 'Typography', mainContentComponent: <Typography /> },

	getPage: function(url) {
		if (!url) return this.home;

		for (prop in this) {
			if (this[prop].url === url) return this[prop];
		}
	}
}

module.exports = Pages;

