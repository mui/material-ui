import React from 'react';
// test
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
// this package
import createScreen from './test-utils/createScreen';
import createSSRMatchMedia from './test-utils/createSSRMatchMedia';
import createTheme from './test-utils/createTheme';
import useWidth from './useWidth';

const screenMock = createScreen();
const ssrMatchMedia = createSSRMatchMedia(screenMock);

describe('useWidth', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('initial screensize of 640px should render size key "sm"', () => {
    const themeMock = createTheme();
    themeMock.props = { MuiUseMediaQuery: { ssrMatchMedia } };
    function Test() {
      const width = useWidth(themeMock);
      return <span>{width}</span>;
    }
    const wrapper = mount(<Test />);
    assert.strictEqual(wrapper.text(), 'sm');
  });
});
