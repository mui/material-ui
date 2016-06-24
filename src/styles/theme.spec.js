/* eslint-env mocha */
import {assert} from 'chai';
import sinon from 'sinon';
import {createMuiTheme, createPalette} from './theme';
import {
  indigo,
  pink,
  deepOrange,
  green,
  darkText,
  lightText,
} from './colors';

// describe('styles/theme', () => {
//   describe('createMuiTheme()', () => {
//     it('should be a function', () => {
//       assert.strictEqual(
//         typeof createMuiTheme,
//         'function',
//         'should be a function'
//       );
//     });
//   });

//   describe('muiTheme', () => {
//     const muiTheme = createMuiTheme();

//     it('should have a palette', () => {
//       assert.ok(muiTheme.palette, 'should have a palette');
//     });

//     it('should have a hash as an ID', () => {
//       assert.ok(muiTheme.id, 'should have an ID');
//       assert.strictEqual(muiTheme.id, createMuiTheme().id, 'should have the same ID');
//     });
//   });

//   describe('custom muiTheme', () => {
//     const myFunc = sinon.spy();
//     const muiTheme = createMuiTheme(
//       {foo: 'bar'},
//       {myFunc}
//     );

//     it('should have the custom palette', () => {
//       assert.strictEqual(muiTheme.palette.foo, 'bar', 'should have a palette');
//     });

//     it('should have a unique hash as an ID', () => {
//       assert.ok(muiTheme.id, 'should have a unique ID');
//       assert.notStrictEqual(
//         muiTheme.id,
//         createMuiTheme().id,
//         'should not have the same ID as default'
//       );
//     });

//     it('should have a custom function', () => {
//       assert.strictEqual(muiTheme.myFunc, myFunc, 'should be the custom function');
//       muiTheme.myFunc();
//       assert.ok(myFunc.calledOnce, 'should call the custom function');
//     });
//   });

//   describe('createPalette()', () => {
//     it('should create a material design palette according to spec', () => {
//       const palette = createPalette();
//       assert.strictEqual(
//         palette.primary,
//         indigo,
//         'should use indigo as the default primary color'
//       );
//       assert.strictEqual(
//         palette.accent,
//         pink,
//         'should use pink as the default accent color'
//       );
//       assert.strictEqual(
//         palette.text,
//         darkText,
//         'should use dark text for a light theme by default'
//       );
//     });

//     it('should create a palette with custom colours', () => {
//       const palette = createPalette({primary: deepOrange, accent: green});
//       assert.strictEqual(
//         palette.primary,
//         deepOrange,
//         'should use deepOrange as the primary color'
//       );
//       assert.strictEqual(
//         palette.accent,
//         green,
//         'should use green as the accent color'
//       );
//       assert.strictEqual(
//         palette.text,
//         darkText,
//         'should use dark text'
//       );
//     });

//     it('should create a dark palette', () => {
//       const palette = createPalette({dark: true});
//       assert.strictEqual(
//         palette.primary,
//         indigo,
//         'should use indigo as the default primary color'
//       );
//       assert.strictEqual(
//         palette.accent,
//         pink,
//         'should use pink as the default accent color'
//       );
//       assert.strictEqual(
//         palette.text,
//         lightText,
//         'should use light text for a dark theme by default'
//       );
//     });
//   });
// });
