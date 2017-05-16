// @flow

import { assert } from 'chai';
import requirePropFactory from './requirePropFactory';

describe('requirePropFactory()', () => {
  const componentNameInError = 'componentNameInError';
  let requireProp;

  before(() => {
    requireProp = requirePropFactory(componentNameInError);
  });

  it('should be a function', () => {
    assert.strictEqual(typeof requirePropFactory, 'function');
  });

  it('should return a function', () => {
    assert.strictEqual(typeof requireProp, 'function');
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

        it('returned error should have name property', () => {
          assert.property(result, 'name', 'result should have name property');
        });

        it('should return Error', () => {
          assert.property(result, 'name', 'result should have name property');
          assert.strictEqual(result.name, 'Error');
        });

        it('returned error should have message property', () => {
          assert.property(result, 'message', 'result should have message property');
        });

        it('returned error message should have propName', () => {
          assert.strictEqual(result.message.indexOf(propName) > -1, true);
        });

        it('returned error message should have requiredPropName', () => {
          assert.strictEqual(result.message.indexOf(requiredPropName) > -1, true);
        });

        it('returned error message should have componentNameInError', () => {
          assert.strictEqual(result.message.indexOf(componentNameInError) > -1, true);
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
