/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {createMuiTheme} from './theme';
import {createStyleManager} from 'stylishly';
import MuiThemeProvider from './MuiThemeProvider';

describe('<MuiThemeProvider />', () => {
  // describe('defaults', () => {
  //   it('should create a new theme and styleManager', () => {
  //     const wrapper = shallow(
  //       <MuiThemeProvider>
  //         <h1>Hello World</h1>
  //       </MuiThemeProvider>
  //     );
  //     const wrapper2 = shallow(
  //       <MuiThemeProvider>
  //         <h1>Hello World</h1>
  //       </MuiThemeProvider>
  //     );
  //     assert.strictEqual(
  //       typeof wrapper.instance().theme,
  //       'object',
  //       'should store theme as an instance property'
  //     );
  //     assert.strictEqual(
  //       typeof wrapper.instance().styleManager,
  //       'object',
  //       'should store styleManager as an instance property'
  //     );
  //     assert.notStrictEqual(
  //       wrapper.instance().theme,
  //       wrapper2.instance().theme,
  //       'should have unique instances of a theme'
  //     );
  //     assert.notStrictEqual(
  //       wrapper.instance().styleManager,
  //       wrapper2.instance().styleManager,
  //       'should have unique instances of a styleManager'
  //     );
  //   });
  // });

  // describe('custom theme', () => {
  //   const theme = createMuiTheme();
  //   const styleManager = createStyleManager({theme});

  //   it('should use the custom theme and styleManager', () => {
  //     const wrapper = shallow(
  //       <MuiThemeProvider theme={theme} styleManager={styleManager}>
  //         <h1>Hello World</h1>
  //       </MuiThemeProvider>
  //     );
  //     assert.strictEqual(
  //       wrapper.instance().theme, theme, 'should store the custom theme as an instance property'
  //     );
  //     assert.strictEqual(
  //       wrapper.instance().styleManager, styleManager, 'should store the custom styleManager as an instance property'
  //     );
  //   });
  // });
});
