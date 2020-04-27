import { expect } from 'chai';
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
    PropTypes.resetWarningCache();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  it('should have the right shape', () => {
    expect(typeof chainPropTypes).to.equal('function');
  });

  it('should return null for supported props', () => {
    PropTypes.checkPropTypes(
      {
        [propName]: chainPropTypes(PropTypes.string, () => null),
      },
      props,
      location,
      componentName,
    );
    expect(consoleErrorMock.callCount()).to.equal(0);
  });

  it('should return an error for unsupported props', () => {
    PropTypes.checkPropTypes(
      {
        [propName]: chainPropTypes(PropTypes.string, () => new Error('something is wrong')),
      },
      props,
      location,
      componentName,
    );
    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.messages()[0]).to.match(/something is wrong/);
  });
});
