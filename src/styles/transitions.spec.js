// @flow

import { assert } from 'chai';
import { stub } from 'sinon';
import transitions, { easing, duration, formatMs, isString, isNumber } from './transitions';

describe('transitions', () => {
  let consoleErrorStub;

  beforeEach(() => {
    consoleErrorStub = stub(console, 'error');
  });

  afterEach(() => {
    consoleErrorStub.restore();
  });

  describe('formatMs() function', () => {
    it('should round decimal digits and return formatted value', () => {
      const formattedValue = formatMs(12.125);
      assert.strictEqual(formattedValue, '12ms');
    });
  });

  describe('isString() function', () => {
    it('should return false when passed undefined', () => {
      const value = isString();
      assert.strictEqual(value, false);
    });

    it('should return false when not passed a string', () => {
      let value = isString(1);
      assert.strictEqual(value, false);
      value = isString({});
      assert.strictEqual(value, false);
      value = isString([]);
      assert.strictEqual(value, false);
    });

    it('should return true when passed a string', () => {
      let value = isString('');
      assert.strictEqual(value, true);
      value = isString('test');
      assert.strictEqual(value, true);
    });
  });

  describe('isNumber() function', () => {
    it('should return false when passed undefined', () => {
      const value = isNumber();
      assert.strictEqual(value, false);
    });

    it('should return false when not passed a number', () => {
      let value = isNumber('');
      assert.strictEqual(value, false);
      value = isNumber('test');
      assert.strictEqual(value, false);
      value = isNumber({});
      assert.strictEqual(value, false);
      value = isNumber([]);
      assert.strictEqual(value, false);
    });

    it('should return true when passed a number', () => {
      let value = isNumber(1);
      assert.strictEqual(value, true);
      value = isNumber(1.5);
      assert.strictEqual(value, true);
    });
  });

  describe('create() function', () => {
    it('should create default transition without arguments', () => {
      const transition = transitions.create();
      assert.strictEqual(transition, `all ${duration.standard}ms ${easing.easeInOut} 0ms`);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should take string props as a first argument', () => {
      const transition = transitions.create('color');
      assert.strictEqual(transition, `color ${duration.standard}ms ${easing.easeInOut} 0ms`);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should also take array of props as first argument', () => {
      const options = { delay: 20 };
      const multiple = transitions.create(['color', 'size'], options);
      const single1 = transitions.create('color', options);
      const single2 = transitions.create('size', options);
      const expected = `${single1},${single2}`;
      assert.strictEqual(multiple, expected);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should warn when first argument is of bad type', () => {
      transitions.create(5554);
      transitions.create({});
      assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });

    it('should optionally accept number "duration" option in second argument', () => {
      const transition = transitions.create('font', { duration: 500 });
      assert.strictEqual(transition, `font 500ms ${easing.easeInOut} 0ms`);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should round decimal digits of "duration" prop to whole numbers', () => {
      const transition = transitions.create('font', { duration: 12.125 });
      assert.strictEqual(transition, `font 12ms ${easing.easeInOut} 0ms`);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should warn when bad "duration" option type', () => {
      transitions.create('font', { duration: '' });
      transitions.create('font', { duration: {} });
      assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });

    it('should optionally accept string "easing" option in second argument', () => {
      const transition = transitions.create('transform', { easing: easing.sharp });
      assert.strictEqual(transition, `transform ${duration.standard}ms ${easing.sharp} 0ms`);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should warn when bad "easing" option type', () => {
      transitions.create('transform', { easing: 123 });
      transitions.create('transform', { easing: {} });
      assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });

    it('should optionally accept number "delay" option in second argument', () => {
      const transition = transitions.create('size', { delay: 150 });
      assert.strictEqual(transition, `size ${duration.standard}ms ${easing.easeInOut} 150ms`);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should round decimal digits of "delay" prop to whole numbers', () => {
      const transition = transitions.create('size', { delay: 1.547 });
      assert.strictEqual(transition, `size ${duration.standard}ms ${easing.easeInOut} 2ms`);
      assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });

    it('should warn when bad "delay" option type', () => {
      transitions.create('size', { delay: '' });
      transitions.create('size', { delay: {} });
      assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });

    it('should warn when passed unrecognized option', () => {
      transitions.create('size', { fffds: 'value' });
      assert.strictEqual(consoleErrorStub.callCount, 1, 'Wrong number of calls of warning()');
    });

    it('should return zero when not passed arguments', () => {
      const zeroHeightDuration = transitions.getAutoHeightDuration();
      assert.strictEqual(zeroHeightDuration, 0);
    });

    it('should return zero when passed undefined', () => {
      const zeroHeightDuration = transitions.getAutoHeightDuration(undefined);
      assert.strictEqual(zeroHeightDuration, 0);
    });

    it('should return zero when passed null', () => {
      const zeroHeightDuration = transitions.getAutoHeightDuration(null);
      assert.strictEqual(zeroHeightDuration, 0);
    });

    it('should return NaN when passed a negative number', () => {
      const zeroHeightDurationNegativeOne = transitions.getAutoHeightDuration(-1);
      assert.strictEqual(isNaN(zeroHeightDurationNegativeOne), true);
      const zeroHeightDurationSmallNegative = transitions.getAutoHeightDuration(-0.000001);
      assert.strictEqual(isNaN(zeroHeightDurationSmallNegative), true);
      const zeroHeightDurationBigNegative = transitions.getAutoHeightDuration(-100000);
      assert.strictEqual(isNaN(zeroHeightDurationBigNegative), true);
    });

    it('should return values for pre-calculated positive examples', () => {
      let zeroHeightDuration = transitions.getAutoHeightDuration(14);
      assert.strictEqual(zeroHeightDuration, 159);
      zeroHeightDuration = transitions.getAutoHeightDuration(100);
      assert.strictEqual(zeroHeightDuration, 239);
      zeroHeightDuration = transitions.getAutoHeightDuration(0.0001);
      assert.strictEqual(zeroHeightDuration, 46);
      zeroHeightDuration = transitions.getAutoHeightDuration(100000);
      assert.strictEqual(zeroHeightDuration, 6685);
    });
  });
});
