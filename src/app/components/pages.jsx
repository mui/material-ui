/**
 * @jsx React.DOM
 */

var Home = require('./pages/home.jsx'),
	Buttons = require('./pages/buttons.jsx'),
	Colors = require('./pages/colors.jsx'),
	Icons = require('./pages/icons.jsx'),
	Inputs = require('./pages/inputs.jsx'),
	Menus = require('./pages/menus.jsx'),
	RadioButtons = require('./pages/radio-buttons.jsx'),
	Tables = require('./pages/tables.jsx'),
	Toggles = require('./pages/toggles.jsx'),
	Typography = require('./pages/typography.jsx');

var Pages = {
	home: { url: '', title: 'Introduction', mainContentComponent: <Home /> },
	colors: { url: 'colors', title: 'Colors', mainContentComponent: <Colors /> },
	buttons: { url: 'buttons', title: 'Buttons', mainContentComponent: <Buttons /> },
	icons: { url: 'icons', title: 'Icons', mainContentComponent: <Icons /> },
	inputs: { url: 'inputs', title: 'Inputs', mainContentComponent: <Inputs /> },
	menus: { url: 'menus', title: 'Menus', mainContentComponent: <Menus /> },
	radiobuttons: { url: 'radio-buttons', title: 'Radio Buttons', mainContentComponent: <RadioButtons /> },
	tables: { url: 'table', title: 'Tables', mainContentComponent: <Tables /> },
	toggles: { url: 'toggles', title: 'Toggles', mainContentComponent: <Toggles /> },
	typography: { url: 'typography', title: 'Typography', mainContentComponent: <Typography /> },

	getPage: function(url) {
		if (!url) return this.home;

		for (prop in this) {
			if (this[prop].url === url) return this[prop];
		}
	}
}

module.exports = Pages;

