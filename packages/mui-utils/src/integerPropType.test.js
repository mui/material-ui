/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { integerPropType } from '@mui/utils';
import { getTypeByValue } from './integerPropType';

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

  function assertPass({ props }, propName, required = false) {
    expect(() => {
      checkPropType(props, propName, required);
    }).not.toErrorDev();
  }

  function assertFail({ props }, propName, required = false) {
    const propType = getTypeByValue(props[propName]);
    const errorMessage = `Warning: Failed  type: Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`;

    expect(() => {
      checkPropType(props, propName, required);
    }).toErrorDev(errorMessage);
  }

  describe('passes on undefined but fails on null value', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('passes on undefined', () => {
      assertPass(<div a={undefined} />, 'a');
    });

    it('fails on null', () => {
      assertFail(<div a={null} />, 'a');
    });
  });

  it('passes on zero', () => assertPass(<div a={0} />, 'a'));

  it('passes on positive numbers', () => {
    assertPass(<div a={42} />, 'a');
  });

  describe('passes with the conversion before passing', () => {
    it('passes with conversion - parseInt', () => {
      assertPass(<div a={parseInt(1.1, 10)} />, 'a');
    });

    it('passes with the conversion - Math.floor', () => {
      assertPass(<div a={Math.floor(1.1)} />, 'a');
    });

    it('passes with the boolean conversion', () => {
      // eslint-disable-next-line no-bitwise
      assertPass(<div a={1.1 | 0} />, 'a');
    });
  });

  it('passes on negative numbers', () => {
    assertPass(<div a={-42} />, 'a');
  });

  describe('fails on non-integers', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('fails when we pass float number', () => {
      assertFail(<div a={1.5} />, 'a');
    });

    it('fails when have been made computation which results in float number', () => {
      assertFail(<div a={(0.1 + 0.2) * 10} />, 'a');
    });

    it('fails on string', () => {
      assertFail(<div a={'a message'} />, 'a');
    });

    it('fails on boolean', () => {
      assertFail(<div a={false} />, 'a');
    });

    it('fails on array', () => {
      assertFail(<div a={[]} />, 'a');
    });
  });

  describe('fails on number edge cases', () => {
    it('fails on infinity', () => {
      assertFail(<div a={Infinity} />, 'a');
    });

    it('fails on NaN', () => {
      assertFail(<div a={NaN} />, 'a');
    });
  });

  describe('isRequired', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('passes when not required', () => {
      assertPass(<div />, 'a');
    });

    it('fails when required', () => {
      assertFail(<div />, 'a', true);
    });
  });
});
