import React from 'react';
import { expect } from 'chai';

import { integerPropType }  from '.';

function callValidator(
  validator,
  { props },
  propName = '',
  componentName = '',
  location = '',
  propFullName = '',
) {
  return validator(props, propName, componentName, location, propFullName);
}

describe('integer', () => {
  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, 'integer test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, 'integer test')).to.be.instanceOf(Error);
  }

  it('Passes on undefined but failes on null value', () => {
    assertPasses(integerPropType, <div a={undefined} />, 'a');
    assertFails(integerPropType, <div a={null} />, 'a');
  });

  it('Passes on zero', () => assertPasses(integerPropType, <div a={0} />, 'a'));

  it('Passes on positive numbers', () => {
    assertPasses(integerPropType, <div a={1} />, 'a');
    assertPasses(integerPropType, <div a={42} />, 'a');
  });

  it('Passes with coversion before passing', () => {
      assertPasses(integerPropType, <div a={parseInt(1.1, 10)} />, "a");
      assertPasses(integerPropType, <div a={Math.floor(1.1)} />, "a");
      // eslint-disable-next-line no-bitwise
      assertPasses(integerPropType, <div a={1.1 | 0}/>, "a")
  })

  it('Passes on negative numbers', () => {
    assertPasses(integerPropType, <div a={-1} />, 'a');
    assertPasses(integerPropType, <div a={-42} />, 'a');
  });

  it('Fails on non-integers', () => {
    assertFails(integerPropType, <div a={1.5} />, 'a');
    assertFails(integerPropType, <div a={1.999999} />, 'a');
    assertFails(integerPropType, <div a={(0.1 + 0.2) * 10} />, 'a');
    assertFails(integerPropType, <div a={'a message'} />, 'a');
    assertFails(integerPropType, <div a={false} />, 'a');
    assertFails(integerPropType, <div a={null} />, 'a');
    assertFails(integerPropType, <div a={[]} />, 'a');
  });

  it('Fails on number edge cases', () => {
    assertFails(integerPropType, <div a={-Infinity} />, 'a');
    assertFails(integerPropType, <div a={Infinity} />, 'a');
    assertFails(integerPropType, <div a={NaN} />, 'a');
  });

  describe('isRequired', () => {
    it('Passes when not required', () => assertPasses(integerPropType, <div />, 'a'));

    it('Fails when required', () => assertFails(integerPropType.isRequired, <div />, 'a'));
  });
});
