//NOTE: all these tests depend on ThemeManager, DarkRawTheme, and Colors
//Modifying any of the above files will break these tests!

const AppBar = require('app-bar');
const RaisedButton = require('raised-button');
const React = require('react');
const TestUtils = React.addons.TestUtils;
const ThemeManager = require('styles/theme-manager');
const ThemeDecorator = require('styles/theme-decorator');
const DarkRawTheme = require('styles/raw-themes/dark-raw-theme');
const LightRawTheme = require('styles/raw-themes/light-raw-theme');
const Colors = require('styles/colors');

describe('Theming', () => {

	describe('ThemeManager', () => {

		it('should return new theme object when spacing modifier invoked', () => {
			let currentMuiTheme = ThemeManager.getMuiTheme(DarkRawTheme);
			let modifiedMuiTheme = ThemeManager.modifyRawThemeSpacing(currentMuiTheme, currentMuiTheme.rawTheme.spacing);

			expect(currentMuiTheme === modifiedMuiTheme).to.be.false;
		});

		it('should return new theme object when palette modifier invoked', () => {
			let currentMuiTheme = ThemeManager.getMuiTheme(DarkRawTheme);
			let modifiedMuiTheme = ThemeManager.modifyRawThemePalette(currentMuiTheme, currentMuiTheme.rawTheme.palette);

			expect(currentMuiTheme === modifiedMuiTheme).to.be.false;
		});

		it('should return new theme object when fontFamily modifier invoked', () => {
			let currentMuiTheme = ThemeManager.getMuiTheme(DarkRawTheme);
			let modifiedMuiTheme = ThemeManager.modifyRawThemeFontFamily(currentMuiTheme, currentMuiTheme.rawTheme.fontFamily);

			expect(currentMuiTheme === modifiedMuiTheme).to.be.false;
		});
	});

	describe('When no theme is specified, AppBar', () => {

		it('should display with default light theme', () => {

			let renderedAppbar = TestUtils.renderIntoDocument(<AppBar />);
			let appbarDivs = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'div');
			let firstDiv = appbarDivs[0];

			expect(firstDiv.style.backgroundColor).to.equal('rgb(0, 188, 212)');
		});
	});

	describe('When the dark theme is specified', () => {

		describe('using context / react lifecycle methods, AppBar', () => {

			it('should display with passed down dark theme', () => {

				let renderedAppbar = TestUtils.renderIntoDocument(<AppBarDarkUsingContext />);
				let appbarDivs = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'div');
				let firstDiv = appbarDivs[0];

				expect(firstDiv.style.backgroundColor).to.equal('rgb(0, 151, 167)');
			});

			it('should display with passed down dark theme and overriden specific attribute', () => {

				let renderedAppbar = TestUtils.renderIntoDocument(<AppBarDarkUsingContextWithOverride />);
				let appbarDivs = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'div');
				let firstDiv = appbarDivs[0];

				let appbarH1s = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'h1');
				let firstH1 = appbarH1s[0];

				expect(firstDiv.style.backgroundColor).to.equal('rgb(0, 151, 167)');
				expect(firstH1.style.color).to.equal('rgb(98, 0, 234)');
			});

		});

		describe('using theme decorator, AppBar', () => {

			it('should display with passed down dark theme', () => {

				let renderedAppbar = TestUtils.renderIntoDocument(<AppBarDarkUsingDecorator />);
				let appbarDivs = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'div');
				let firstDiv = appbarDivs[0];

				expect(firstDiv.style.backgroundColor).to.equal('rgb(0, 151, 167)');
			});

			it('should display with passed down dark theme and overriden specific attribute', () => {

				let renderedAppbar = TestUtils.renderIntoDocument(<AppBarDarkUsingDecoratorWithOverride />);
				let appbarDivs = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'div');
				let firstDiv = appbarDivs[0];

				let appbarH1s = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'h1');
				let firstH1 = appbarH1s[0];

				expect(firstDiv.style.backgroundColor).to.equal('rgb(0, 151, 167)');
				expect(firstH1.style.color).to.equal('rgb(98, 0, 234)');
			});

		});
	});
	
	describe('When theme is updated through button click, AppBar', () => {

		it('should display with updated theme', () => {
			let renderedComponent = TestUtils.renderIntoDocument(<ButtonToUpdateThemeWithAppBar />);
			let componentDivs = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'div');
			let appbarDiv = componentDivs[1];
			let buttonNode = (TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'button'))[1];

			let appbarH1s = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'h1');
			let firstH1 = appbarH1s[0];

			expect(appbarDiv.style.backgroundColor).to.equal('rgb(0, 151, 167)');
			expect(firstH1.style.color).to.equal('rgb(48, 48, 48)');

			//simulate button click
			TestUtils.Simulate.click(buttonNode);

			//now new theme should be applied and text color of app bar should be changed
			expect(appbarDiv.style.backgroundColor).to.equal('rgb(0, 188, 212)');
			expect(firstH1.style.color).to.equal('rgb(98, 0, 234)');
		});
	});
});

//react components used for context-theme-passing testing
const AppBarDarkUsingContext = React.createClass({

	childContextTypes: {
		muiTheme:React.PropTypes.object,
	},

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(DarkRawTheme)
		};
	},

	render() {
		return (<AppBar />);
	},
});

const AppBarDarkUsingContextWithOverride = React.createClass({

	childContextTypes: {
		muiTheme:React.PropTypes.object,
	},

	getInitialState() {
		let newMuiTheme = ThemeManager.getMuiTheme(DarkRawTheme);
		newMuiTheme.appBar.textColor = Colors.deepPurpleA700;

		return {
			muiTheme: newMuiTheme,
		};
	},

	getChildContext() {
		return {
			muiTheme: this.state.muiTheme,
		};
	},

	render() {
		return (<AppBar title="My AppBar" />);
	},
});

//react components used decorator-theme-passing texting
let darkMuiTheme = ThemeManager.getMuiTheme(DarkRawTheme);

@ThemeDecorator(darkMuiTheme)
class AppBarDarkUsingDecorator extends React.Component
{
	render() {
		return (<AppBar />);
	}
}

let darkMuiThemeWithOverride = ThemeManager.getMuiTheme(DarkRawTheme);
darkMuiThemeWithOverride.appBar.textColor = Colors.deepPurpleA700;

@ThemeDecorator(darkMuiThemeWithOverride)
class AppBarDarkUsingDecoratorWithOverride extends React.Component
{
	render() {
		return (<AppBar title="My AppBar"/>);
	}
}

//react component used to test whether or not theme updates down the hierarchy
const ButtonToUpdateThemeWithAppBar = React.createClass({
	getInitialState () {
		return {
			muiTheme: ThemeManager.getMuiTheme(DarkRawTheme),
		};
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object,
	},

	getChildContext () {
		return {
			muiTheme: this.state.muiTheme,
		};
	},

	handleClick() {
		let newMuiThemeWithOverride = ThemeManager.getMuiTheme(LightRawTheme);
		newMuiThemeWithOverride.appBar.textColor = Colors.deepPurpleA700;

		this.setState({
			muiTheme: newMuiThemeWithOverride,
		});
	},

	render () {
		return (
			<div>
				<AppBar title="My AppBar" />
				<RaisedButton label="My Button" primary={true} onClick={this.handleClick} />
			</div>
			);
	},

});