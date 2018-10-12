import { assert } from 'chai';
import PropTypes from 'prop-types';
import { mock } from 'sinon';
import chainPropType from './chainPropType';

describe('chainPropType', () => {
  const propName = 'children';
  const props = { [propName]: 'some string' };
  const componentName = 'ComponentName';
  const location = 'prop';
  let warning;

  beforeEach(() => {
    warning = mock(console).expects('error');
  });

  afterEach(() => {
    warning.restore();
  });

  it('should have the right shape', () => {
    assert.strictEqual(typeof chainPropType, 'function');
  });

  it('should not warn for supported types', () => {
    PropTypes.checkPropTypes(
      { [propName]: chainPropType(PropTypes.string, () => null) },
      props,
      location,
      componentName,
    );
    assert.strictEqual(warning.called, false);
  });

  it('should warn for unsupported properties', () => {
    PropTypes.checkPropTypes(
      { [propName]: chainPropType(PropTypes.string, () => new Error('something is wrong')) },
      props,
      location,
      componentName,
    );
    assert.strictEqual(warning.calledOnce, true);
    assert.match(warning.firstCall.args[0], /something is wrong/);
  });
});
