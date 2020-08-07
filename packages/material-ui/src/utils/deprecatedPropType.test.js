import { expect } from 'chai';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import deprecatedPropType from './deprecatedPropType';

describe('deprecatedPropType', () => {
  const componentName = 'ComponentName';
  const location = 'prop';

  beforeEach(() => {
    consoleErrorMock.spy();
    PropTypes.resetWarningCache();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  it('should not warn', () => {
    const propName = `children${new Date()}`;
    const props = {};
    PropTypes.checkPropTypes(
      {
        [propName]: deprecatedPropType(PropTypes.string, 'give me a reason'),
      },
      props,
      location,
      componentName,
    );
    expect(consoleErrorMock.callCount()).to.equal(0);
  });

  it('should warn once', () => {
    const propName = `children`;
    const props = {
      [propName]: 'yolo',
    };
    PropTypes.checkPropTypes(
      {
        [propName]: deprecatedPropType(PropTypes.string, 'give me a reason'),
      },
      props,
      location,
      componentName,
    );
    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.messages()[0]).to.match(/give me a reason/);
    PropTypes.checkPropTypes(
      {
        [propName]: deprecatedPropType(PropTypes.string, 'give me a reason'),
      },
      props,
      location,
      componentName,
    );
    expect(consoleErrorMock.callCount()).to.equal(1);
  });
});
