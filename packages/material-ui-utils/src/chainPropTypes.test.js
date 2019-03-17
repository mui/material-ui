import { assert } from 'chai';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import chainPropTypes from './chainPropTypes';

describe('chainPropTypes', () => {
  const props = {};
  const propName = 'children';
  const componentName = 'ComponentName';
  const location = 'prop';

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  it('should have the right shape', () => {
    assert.strictEqual(typeof chainPropTypes, 'function');
  });

  it('should return null for supported properties', () => {
    PropTypes.checkPropTypes(
      {
        [propName]: chainPropTypes(PropTypes.string, () => null),
      },
      props,
      location,
      componentName,
    );
    assert.strictEqual(consoleErrorMock.callCount(), 0);
  });

  it('should return an error for unsupported properties', () => {
    PropTypes.checkPropTypes(
      {
        [propName]: chainPropTypes(PropTypes.string, () => new Error('something is wrong')),
      },
      props,
      location,
      componentName,
    );
    assert.strictEqual(consoleErrorMock.callCount(), 1);
    assert.match(consoleErrorMock.args()[0][0], /something is wrong/);
  });
});
