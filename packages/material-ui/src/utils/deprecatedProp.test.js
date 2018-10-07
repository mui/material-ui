import { assert } from 'chai';
import PropTypes from 'prop-types';
import { mock } from 'sinon';
import deprecated from './deprecatedProp';

describe('deprecatedProp', () => {
  const propName = 'legacy';
  const componentName = 'ComponentName';
  const location = 'prop';

  let warning;
  beforeEach(() => {
    warning = mock(console).expects('error');
  });

  afterEach(() => {
    warning.restore();
  });

  it('logs a deprecation warning', () => {
    const propTypes = {
      [propName]: deprecated(PropTypes.string, 'Because reasons', false),
    };

    PropTypes.checkPropTypes(propTypes, { [propName]: "I'm deprecated" }, location, componentName);

    assert.ok(warning.calledOnce);
    assert.include(
      warning.firstCall.args[0],
      'Warning: The prop `legacy` of `ComponentName` is deprecated. Because reasons.',
    );
  });
  it('is the identity function with MUI_SUPPRESS_DEPRECATION_WARNINGS ', () => {
    assert.strictEqual(deprecated(PropTypes.string), PropTypes.string);
  });
});
