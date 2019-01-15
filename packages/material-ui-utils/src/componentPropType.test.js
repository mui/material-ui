import { assert } from 'chai';
import PropTypes from 'prop-types';
import React from 'react';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import componentPropType from './componentPropType';

describe('componentPropType', () => {
  function testPropType(value, validator, expectedError) {
    const propName = 'children';
    const componentName = 'ComponentName';
    const location = 'prop';

    PropTypes.checkPropTypes(
      {
        [propName]: validator,
      },
      {
        [propName]: value,
      },
      location,
      componentName,
    );

    if (expectedError != null) {
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(consoleErrorMock.args()[0][0], expectedError);
    } else {
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    }
  }

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describe('describe .isRequired', () => {
    it('rejects null', () => {
      testPropType(
        undefined,
        componentPropType.isRequired,
        'The prop `children` is marked as required in `ComponentName`, ' +
          'but its value is `undefined`.',
      );
    });

    it('rejects undefined', () => {
      testPropType(
        null,
        componentPropType.isRequired,
        'The prop `children` is marked as required in `ComponentName`, but its value is `object`.',
      );
    });
  });

  it('supports optional props', () => {
    testPropType(undefined, componentPropType, null);
    testPropType(null, componentPropType, null);
  });

  it('accepts strings, class and functional components', () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class ClassComponent extends React.Component {
      render() {
        return null;
      }
    }

    testPropType(ClassComponent, componentPropType, null);
    testPropType(() => null, componentPropType, null);
    testPropType('will accept any string though', componentPropType, null);
  });

  it('rejects other types with their type hint', () => {
    testPropType(
      1,
      componentPropType,
      'Invalid prop `children` of type `number` supplied to `ComponentName`, expected a component',
    );
  });

  it('rejects objects', () => {
    testPropType(
      {},
      componentPropType,
      'Invalid prop `children` of type `object` supplied to `ComponentName`, expected a component',
    );
  });
});
