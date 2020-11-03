import { expect } from 'chai';
import requirePropFactory from './requirePropFactory';

describe('requirePropFactory', () => {
  const componentNameInError = 'componentNameInError';
  let requireProp;

  before(() => {
    requireProp = requirePropFactory(componentNameInError);
  });

  it('should have the right shape', () => {
    expect(typeof requirePropFactory).to.equal('function');
    expect(typeof requireProp).to.equal('function');
  });

  describe('requireProp()', () => {
    const requiredPropName = 'requiredPropName';

    let requirePropValidator;

    before(() => {
      requirePropValidator = requireProp(requiredPropName);
    });

    it('should return a function', () => {
      expect(typeof requirePropValidator).to.equal('function');
    });

    describe('requirePropValidator', () => {
      let props;
      let propName;

      it('should return null for propName not in props', () => {
        propName = 'propName';
        props = {};
        const result = requirePropValidator(props, propName, undefined, undefined, undefined);
        expect(result).to.equal(null);
      });

      it('should return null for propName and requiredProp in props', () => {
        propName = 'propName';
        props = {};
        props[propName] = true;
        props[requiredPropName] = true;
        const result = requirePropValidator(props, propName, undefined, undefined, undefined);
        expect(result).to.equal(null);
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
          expect(result).to.have.property('name');
          expect(result.name).to.equal('Error');
          expect(result).to.have.property('message');
          expect(result.message.indexOf(propName) > -1).to.equal(true);
          expect(result.message.indexOf(requiredPropName) > -1).to.equal(true);
          expect(result.message.indexOf(componentNameInError) > -1).to.equal(true);
        });

        describe('propFullName given to validator', () => {
          let propFullName;
          before(() => {
            propFullName = 'propFullName';
            result = requirePropValidator(props, propName, undefined, undefined, propFullName);
          });

          it('returned error message should have propFullName', () => {
            expect(result.message.indexOf(propFullName) > -1).to.equal(true);
          });

          it('returned error message should not have propName', () => {
            expect(result.message.indexOf(propName)).to.equal(-1);
          });
        });
      });
    });
  });
});
