// @flow

import { assert } from 'chai';
import requirePropFactory from './requirePropFactory';

describe('requirePropFactory', () => {
  const componentNameInError = 'componentNameInError';
  let requireProp;

  before(() => {
    requireProp = requirePropFactory(componentNameInError);
  });

  it('should have the right shape', () => {
    assert.strictEqual(typeof requirePropFactory, 'function', 'should be a function');
    assert.strictEqual(typeof requireProp, 'function', 'should return a function');
  });

  describe('requireProp()', () => {
    const requiredPropName = 'requiredPropName';

    let requirePropValidator;

    before(() => {
      requirePropValidator = requireProp(requiredPropName);
    });

    it('should return a function', () => {
      assert.strictEqual(typeof requirePropValidator, 'function');
    });

    describe('requirePropValidator', () => {
      let props;
      let propName;

      it('should return null for propName not in props', () => {
        propName = 'propName';
        props = {};
        const result = requirePropValidator(props, propName, undefined, undefined, undefined);
        assert.strictEqual(result, null);
      });

      it('should return null for propName and requiredProp in props', () => {
        propName = 'propName';
        props = {};
        props[propName] = true;
        props[requiredPropName] = true;
        const result = requirePropValidator(props, propName, undefined, undefined, undefined);
        assert.strictEqual(result, null);
      });

      describe('propName is in props and requiredProp not in props', () => {
        let result;

        before(() => {
          props = {};
          propName = 'propName';
          props[propName] = true;
          delete props[requiredPropName];
          result = requirePropValidator(props, propName, undefined, undefined, undefined);
        });

        it('should return Error', () => {
          assert.property(result, 'name', 'result should have name property');
          assert.property(result, 'name', 'result should have name property');
          assert.strictEqual(result.name, 'Error');
          assert.property(result, 'message', 'result should have message property');
          assert.strictEqual(
            result.message.indexOf(propName) > -1,
            true,
            'returned error message should have propName',
          );
          assert.strictEqual(
            result.message.indexOf(requiredPropName) > -1,
            true,
            'returned error message should have requiredPropName',
          );
          assert.strictEqual(
            result.message.indexOf(componentNameInError) > -1,
            true,
            'returned error message should have componentNameInError',
          );
        });

        describe('propFullName given to validator', () => {
          let propFullName;
          before(() => {
            propFullName = 'propFullName';
            result = requirePropValidator(props, propName, undefined, undefined, propFullName);
          });

          it('returned error message should have propFullName', () => {
            assert.strictEqual(result.message.indexOf(propFullName) > -1, true);
          });

          it('returned error message should not have propName', () => {
            assert.strictEqual(result.message.indexOf(propName), -1);
          });
        });
      });
    });
  });
});
