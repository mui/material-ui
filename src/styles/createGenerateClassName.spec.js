// @flow

import { assert } from 'chai';
import createGenerateClassName from './createGenerateClassName';

describe('createGenerateClassName', () => {
  describe('counter', () => {
    it('should increment a scoped counter', () => {
      const rule = {
        key: 'root',
      };
      const generateClassName1 = createGenerateClassName();
      assert.strictEqual(generateClassName1(rule), 'root-1');
      assert.strictEqual(generateClassName1(rule), 'root-2');
      const generateClassName2 = createGenerateClassName();
      assert.strictEqual(generateClassName2(rule), 'root-1');
    });
  });

  describe('formating', () => {
    it('should take the sheet meta in development if available', () => {
      const rule = {
        key: 'root',
      };
      const sheet = {
        options: {
          meta: 'Button',
        },
      };
      const generateClassName = createGenerateClassName();
      assert.strictEqual(generateClassName(rule, sheet), 'Button-root-1');
    });

    it('should use a base 36 representation', () => {
      const rule = {
        key: 'root',
      };
      const generateClassName = createGenerateClassName();
      assert.strictEqual(generateClassName(rule), 'root-1');
      assert.strictEqual(generateClassName(rule), 'root-2');
      assert.strictEqual(generateClassName(rule), 'root-3');
      assert.strictEqual(generateClassName(rule), 'root-4');
      assert.strictEqual(generateClassName(rule), 'root-5');
      assert.strictEqual(generateClassName(rule), 'root-6');
      assert.strictEqual(generateClassName(rule), 'root-7');
      assert.strictEqual(generateClassName(rule), 'root-8');
      assert.strictEqual(generateClassName(rule), 'root-9');
      assert.strictEqual(generateClassName(rule), 'root-a');
      assert.strictEqual(generateClassName(rule), 'root-b');
      assert.strictEqual(generateClassName(rule), 'root-c');
      assert.strictEqual(generateClassName(rule), 'root-d');
    });

    describe('production', () => {
      let nodeEnv;

      before(() => {
        nodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';
      });

      after(() => {
        process.env.NODE_ENV = nodeEnv;
      });

      it('should us a short representation', () => {
        const rule = {
          key: 'root',
        };
        const generateClassName = createGenerateClassName();
        assert.strictEqual(generateClassName(rule), 'c1');
      });
    });
  });
});
