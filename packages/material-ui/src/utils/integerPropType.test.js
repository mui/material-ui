import React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { getTypeByValue } from './integerPropType';
import { integerPropType } from '.';

describe('integerPropType', () => {
  const location = '';
  const componentName = 'DummyComponent';

  function checkPropType(props, propName, required) {
    PropTypes.checkPropTypes(
      {
        [propName]: required ? integerPropType.isRequired : integerPropType,
      },
      props,
      '',
      'DummyComponent',
    );
  }

  function assertPasses({ props }, propName, required = false) {
    expect(() => {
      checkPropType(props, propName, required);
    }).not.toErrorDev();
  }

  function assertFails({ props }, propName, required = false) {
    const propType = getTypeByValue(props[propName]);
    const errorMessage = `Warning: Failed  type: Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`;

    expect(() => {
      checkPropType(props, propName, required);
    }).toErrorDev(errorMessage);
  }

  describe('passes on undefined but failes on null value', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('passes on undefined', () => {
      assertPasses(<div a={undefined} />, 'a');
    });

    it('fails on null', () => {
      assertFails(<div a={null} />, 'a');
    });
  });

  it('passes on zero', () => assertPasses(<div a={0} />, 'a'));

  it('passes on positive numbers', () => {
    assertPasses(<div a={42} />, 'a');
  });

  describe('passes with the conversion before passing', () => {
    it('passes with conversion - parseInt', () => {
      assertPasses(<div a={parseInt(1.1, 10)} />, 'a');
    });

    it('passes with the conversion - Math.floor', () => {
      assertPasses(<div a={Math.floor(1.1)} />, 'a');
    });

    it('passes with the boolean conversion', () => {
      // eslint-disable-next-line no-bitwise
      assertPasses(<div a={1.1 | 0} />, 'a');
    });
  });

  it('passes on negative numbers', () => {
    assertPasses(<div a={-42} />, 'a');
  });

  describe('fails on non-integers', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('fails when we pass float number', () => assertFails(<div a={1.5} />, 'a'));

    it('fails when have been made computation which results in float number', () =>
      assertFails(<div a={(0.1 + 0.2) * 10} />, 'a'));
    it('fails on  string', () => assertFails(<div a={'a message'} />, 'a'));
    it('fails on boolean', () => assertFails(<div a={false} />, 'a'));
    it('fails on  array', () => assertFails(<div a={[]} />, 'a'));
  });

  describe('fails on number edge cases', () => {
    it('fails on infinity', () => assertFails(<div a={Infinity} />, 'a'));
    it('fails on NaN', () => assertFails(<div a={NaN} />, 'a'));
  });

  describe('isRequired', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('passes when not required', () => assertPasses(<div />, 'a'));

    it('fails when required', () => assertFails(<div />, 'a', true));
  });
});
