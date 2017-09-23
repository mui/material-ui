// @flow

import { assert } from 'chai';
import requirePropFalseFactory from './requirePropFalseFactory';

describe('requirePropFalseFactory()', () => {
  const componentNameInError = 'componentNameInError';
  let requirePropFalse;

  before(() => {
    requirePropFalse = requirePropFalseFactory(componentNameInError);
  });

  it('should be a function', () => {
    assert.strictEqual(typeof requirePropFalseFactory, 'function');
  });

  it('should return a function', () => {
    assert.strictEqual(typeof requirePropFalse, 'function');
  });

  describe('requirePropFalse()', () => {
    const requiredToBeFalsePropName = 'requiredToBeFalsePropName';
    let requiredPropFalseValidator;

    before(() => {
      requiredPropFalseValidator = requirePropFalse(requiredToBeFalsePropName);
    });

    it('should return a function', () => {
      assert.strictEqual(typeof requiredPropFalseValidator, 'function');
    });

    describe('requiredPropFalseValidator', () => {
      let props;
      let propName;

      it('should return null for propName not in props', () => {
        propName = 'propName';
        props = {};
        const result = requiredPropFalseValidator(props, propName, undefined, undefined, undefined);
        assert.strictEqual(result, null);
      });

      it('should return null for props requiredToBeFalsePropName true and propName not set', () => {
        propName = 'propName';
        props = {};
        props[requiredToBeFalsePropName] = true;
        const result = requiredPropFalseValidator(props, propName, undefined, undefined, undefined);
        assert.strictEqual(result, null);
      });

      it('should return null for props requiredToBeFalsePropName true and propName false', () => {
        propName = 'propName';
        props = {};
        props[requiredToBeFalsePropName] = true;
        props[propName] = false;
        const result = requiredPropFalseValidator(props, propName, undefined, undefined, undefined);
        assert.strictEqual(result, null);
      });

      it('should return null for props requiredToBeFalsePropName false and propName true', () => {
        propName = 'propName';
        props = {};
        props[requiredToBeFalsePropName] = false;
        props[propName] = true;
        const result = requiredPropFalseValidator(props, propName, undefined, undefined, undefined);
        assert.strictEqual(result, null);
      });

      describe('propName and requiredToBeFalsePropName both true in props', () => {
        let result;

        before(() => {
          props = {};
          propName = 'propName';
          props[propName] = true;
          props[requiredToBeFalsePropName] = true;
          result = requiredPropFalseValidator(props, propName, undefined, undefined, undefined);
        });

        it('returned error should have name property', () => {
          assert.property(result, 'name', 'result should have name property');
        });

        it('should return Error', () => {
          assert.strictEqual(result.name, 'Error');
        });

        it('returned error should have message property', () => {
          assert.property(result, 'message', 'result should have message property');
        });

        it('returned error message should have propName', () => {
          assert.strictEqual(result.message.indexOf(propName) > -1, true);
        });

        it('returned error message should have requiredToBeFalsePropName', () => {
          assert.strictEqual(result.message.indexOf(requiredToBeFalsePropName) > -1, true);
        });

        it('returned error message should have componentNameInError', () => {
          assert.strictEqual(result.message.indexOf(componentNameInError) > -1, true);
        });

        describe('propFullName given to validator', () => {
          let propFullName;
          before(() => {
            propFullName = 'propFullName';
            result = requiredPropFalseValidator(
              props,
              propName,
              undefined,
              undefined,
              propFullName,
            );
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
