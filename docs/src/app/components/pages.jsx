/**;
 * @jsx React.DOM
 */

var Home = require('./pages/home.jsx'),
	GetStarted = require('./pages/get-started.jsx'),
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
	home: { 
		url: '', 
		title: 'material ui', 
		mainContentComponent: <Home /> 
	},
	getStarted: {
		url: 'get-started',
		title: 'Get Started',
		mainContentComponent: <GetStarted />
	},
	cssFramework: { 
		url: 'css-framework/colors', 
		title: 'Css Framework', 
		subPages: {
			colors: { url: 'css-framework/colors', title: 'Colors', mainContentComponent: <Colors /> },
			typography: { url: 'css-framework/typography', title: 'Typography', mainContentComponent: <Typography /> }
		}
	},
	components: {
		url: 'components/buttons',
		title: 'Components',
		subPages: {
			buttons: { url: 'components/buttons', title: 'Buttons', mainContentComponent: <Buttons /> },
			dialog: { url: 'components/dialog', title: 'Dialog', mainContentComponent: <Dialog /> },
			icons: { url: 'components/icons', title: 'Icons', mainContentComponent: <Icons /> },
			inputs: { url: 'components/inputs', title: 'Inputs', mainContentComponent: <Inputs /> },
			menus: { url: 'components/menus', title: 'Menus', mainContentComponent: <Menus /> },
			switches: { url: 'components/switches', title: 'Switches', mainContentComponent: <Switches /> },
			//toasts: { url: 'components/toasts', title: 'Toasts', mainContentComponent: <Toasts /> },
			toolbars: { url: 'components/toolbar', title: 'Toolbars', mainContentComponent: <Toolbar /> }
		}
	},

	getPage: function(url) {
		if (!url) return this.home;

		//Only match the first part of the url
		var rootUrl = url.split('/')[0],
			currentPage;

		for (prop in this) {
			currentPage = this[prop];
			if (currentPage.url.split('/')[0] === rootUrl) return currentPage;
		}
	}
}

module.exports = Pages;

