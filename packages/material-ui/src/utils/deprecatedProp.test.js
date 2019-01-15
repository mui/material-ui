import { assert } from 'chai';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import deprecated from './deprecatedProp';

describe('deprecatedProp', () => {
  const propName = 'legacy';
  const componentName = 'ComponentName';
  const location = 'prop';

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  it('logs a deprecation warning', () => {
    const propTypes = {
      [propName]: deprecated(PropTypes.string, 'Because reasons.', false),
    };

    PropTypes.checkPropTypes(propTypes, { [propName]: "I'm deprecated" }, location, componentName);

    assert.strictEqual(consoleErrorMock.callCount(), 1);
    assert.include(
      consoleErrorMock.args()[0][0],
      'Material-UI: The prop `legacy` in `ComponentName` is deprecated. Because reasons.',
    );
  });

  it('is the identity function with `suppressDeprecation` ', () => {
    assert.strictEqual(deprecated(PropTypes.string, '', true), PropTypes.string);
  });
});
