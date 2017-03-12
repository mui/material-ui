// @flow weak

import { assert } from 'chai';
import { stub } from 'sinon';
import transitions, { easing, duration } from './transitions';

describe('transitions', () => {
  let consoleErrorStub;

  beforeEach(() => {
    consoleErrorStub = stub(console, 'error');
  });

  afterEach(() => {
    consoleErrorStub.restore();
  });

  describe('create() function', () => {
    it('should create default transition withnout arguments', () => {
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
  });
});
