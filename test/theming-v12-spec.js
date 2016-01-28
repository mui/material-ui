//NOTE: all these tests depend on ThemeManager, DarkRawTheme, and Colors
//Modifying any of the above files will break these tests!

import AppBar from 'app-bar';
import RaisedButton from 'raised-button';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ThemeManager from 'styles/theme-manager';
import ThemeDecorator from 'styles/theme-decorator';
import getMuiTheme from 'styles/getMuiTheme';
import DarkRawTheme from 'styles/raw-themes/dark-raw-theme';
import Colors from 'styles/colors';

describe('Theming', () => {
  describe('ThemeManager', () => {
    it('should return new theme object when spacing modifier invoked', () => {
      let currentMuiTheme = getMuiTheme(DarkRawTheme);
      let modifiedMuiTheme = ThemeManager.modifyRawThemeSpacing(currentMuiTheme, currentMuiTheme.rawTheme.spacing);
      expect(currentMuiTheme === modifiedMuiTheme).to.be.false;
    });

    it('should return new theme object when palette modifier invoked', () => {
      let currentMuiTheme = getMuiTheme(DarkRawTheme);
      let modifiedMuiTheme = ThemeManager.modifyRawThemePalette(currentMuiTheme, currentMuiTheme.rawTheme.palette);

      expect(currentMuiTheme === modifiedMuiTheme).to.be.false;
    });

    it('should return new theme object when fontFamily modifier invoked', () => {
      let currentMuiTheme = getMuiTheme(DarkRawTheme);
      let modifiedMuiTheme = ThemeManager.modifyRawThemeFontFamily(currentMuiTheme,
        currentMuiTheme.rawTheme.fontFamily);

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
        let renderedAppbar = TestUtils.renderIntoDocument(<AppBarDarkTheme />);
        let appbarDivs = TestUtils.scryRenderedDOMComponentsWithTag(renderedAppbar, 'div');
        let firstDiv = appbarDivs[0];

        expect(firstDiv.style.backgroundColor).to.equal('rgb(0, 151, 167)');
      });

      it('should display with passed down dark theme and overriden specific attribute', () => {
        let renderedAppbar = TestUtils.renderIntoDocument(<AppBarDarkThemeOverride />);
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
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: getMuiTheme(DarkRawTheme),
    };
  },

  render() {
    return (<AppBar />);
  },
});

const AppBarDarkUsingContextWithOverride = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    let newMuiTheme = getMuiTheme(DarkRawTheme);
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


const darkMuiTheme = getMuiTheme(DarkRawTheme);
const AppBarDarkTheme = ThemeDecorator(darkMuiTheme)(AppBar);

const AppBarTitle = () => (
  <AppBar title="My AppBar" />
);

const darkMuiThemeWithOverride = getMuiTheme(DarkRawTheme, {
  appBar: {
    textColor: Colors.deepPurpleA700,
  },
});
const AppBarDarkThemeOverride = ThemeDecorator(darkMuiThemeWithOverride)(AppBarTitle);

//react component used to test whether or not theme updates down the hierarchy
const ButtonToUpdateThemeWithAppBar = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: getMuiTheme(DarkRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  handleClick() {
    let newMuiThemeWithOverride = getMuiTheme();
    newMuiThemeWithOverride.appBar.textColor = Colors.deepPurpleA700;

    this.setState({
      muiTheme: newMuiThemeWithOverride,
    });
  },

  render() {
    return (
      <div>
        <AppBar title="My AppBar" />
        <RaisedButton label="My Button" primary={true} onClick={this.handleClick} />
      </div>
    );
  },
});
