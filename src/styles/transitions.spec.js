// @flow weak
/* eslint-env mocha */

import { assert } from 'chai';
import transitions, { easing, duration } from './transitions';

describe('transitions', () => {
  describe('create() function', () => {
    it('should create default transition withnout arguments', () => {
      const transition = transitions.create();
      assert.strictEqual(transition, `all ${duration.standard}ms ${easing.easeInOut} 0ms`);
    });

    it('should take string props as a first argument', () => {
      const transition = transitions.create('color');
      assert.strictEqual(transition, `color ${duration.standard}ms ${easing.easeInOut} 0ms`);
    });

    it('should also take array of props as first argument', () => {
      const options = { delay: 20 };
      const multiple = transitions.create(['color', 'size'], options);
      const single1 = transitions.create('color', options);
      const single2 = transitions.create('size', options);
      const expected = `${single1},${single2}`;
      assert.strictEqual(multiple, expected);
    });

    it('should optionally accept number "duration" option in second argument', () => {
      const transition = transitions.create('font', { duration: 500 });
      assert.strictEqual(transition, `font 500ms ${easing.easeInOut} 0ms`);
      assert.throw(() => transitions.create('font', { duration: 'string' }));
      assert.throw(() => transitions.create('font', { duration: {} }));
    });

    it('should optionally accept string "easing" option in second argument', () => {
      const transition = transitions.create('transform', { easing: easing.sharp });
      assert.strictEqual(transition, `transform ${duration.standard}ms ${easing.sharp} 0ms`);
      assert.throw(() => transitions.create('transform', { easing: 123 }));
      assert.throw(() => transitions.create('transform', { easing: {} }));
    });

    it('should optionally accept number "delay" option in second argument', () => {
      const transition = transitions.create('size', { delay: 150 });
      assert.strictEqual(transition, `size ${duration.standard}ms ${easing.easeInOut} 150ms`);
      assert.throw(() => transitions.create('size', { delay: 'string' }));
      assert.throw(() => transitions.create('size', { delay: {} }));
    });

    it('should throw error when unrecognized option passed in second argument', () => {
      assert.throw(() => transitions.create('all', { something: 'something' }));
    });
  });
});
