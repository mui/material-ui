// @flow

import { assert } from 'chai';
import createPalette, { dark, light } from './createPalette';
import { indigo, pink, deepOrange, green, common } from '../colors';
import consoleErrorMock from '../../test/utils/consoleErrorMock';

describe('createPalette()', () => {
  before(() => {
    consoleErrorMock.spy();
  });

  after(() => {
    consoleErrorMock.reset();
  });

  it('should create a material design palette according to spec', () => {
    const palette = createPalette({});
    assert.strictEqual(palette.primary, indigo, 'should use indigo as the default primary color');
    assert.strictEqual(palette.secondary, pink, 'should use pink as the default secondary color');
    assert.strictEqual(
      palette.text,
      light.text,
      'should use light theme text for a light theme by default',
    );
  });

  it('should create a palette with custom colors', () => {
    const palette = createPalette({ primary: deepOrange, secondary: green });
    assert.strictEqual(palette.primary, deepOrange, 'should use deepOrange as the primary color');
    assert.strictEqual(palette.secondary, green, 'should use green as the secondary color');
    assert.strictEqual(palette.text, light.text, 'should use light theme text');
  });

  it('should create a dark palette', () => {
    const palette = createPalette({ type: 'dark' });
    assert.strictEqual(palette.primary, indigo, 'should use indigo as the default primary color');
    assert.strictEqual(palette.secondary, pink, 'should use pink as the default secondary color');
    assert.strictEqual(palette.text, dark.text, 'should use dark theme text');
    assert.strictEqual(consoleErrorMock.callCount(), 0);
  });

  it('should throw an exception when an invalid type is specified', () => {
    assert.throw(() => {
      createPalette({ type: 'foo' });
    });
    assert.strictEqual(consoleErrorMock.callCount(), 1);
    assert.match(
      consoleErrorMock.args()[0][0],
      /Material-UI: the palette type `foo` is not supported/,
    );
  });

  it('should throw an exception when a non-palette primary color is specified', () => {
    createPalette({ primary: null });
    assert.strictEqual(consoleErrorMock.callCount(), 2);
    assert.match(
      consoleErrorMock.args()[1][0],
      /Material-UI: primary color is missing the following hues: 50,100,200,300,400/,
    );
  });

  it('should throw an exception when a non-palette secondary color is specified', () => {
    createPalette({ secondary: common.fullBlack });
    assert.strictEqual(consoleErrorMock.callCount(), 3);
    assert.match(
      consoleErrorMock.args()[2][0],
      /Material-UI: secondary color is missing the following hues: 50,100,200,300,400/,
    );
  });

  it('should throw an exception when a non-palette error color is specified', () => {
    createPalette({ error: common.fullBlack });
    assert.strictEqual(consoleErrorMock.callCount(), 4);
    assert.match(
      consoleErrorMock.args()[3][0],
      /Material-UI: error color is missing the following hues: 50,100,200,300,400/,
    );
  });
});
