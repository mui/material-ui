// @flow

import * as React from 'react';
import { assert } from 'chai';
import createBroadcast from 'brcast';
import { createShallow, createMount } from '../test-utils';
import { CHANNEL } from './themeListener';
import withTheme from './withTheme';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referential transparency for testing purposes.

describe('withTheme', () => {
  let shallow;
  let context;
  let mount;
  let broadcast;

  before(() => {
    shallow = createShallow();
    mount = createMount();
    broadcast = createBroadcast();
    context = { [CHANNEL]: broadcast };
  });

  after(() => {
    mount.cleanUp();
  });

  it('should use the theme provided by the context', () => {
    const theme = { themeProperty: 'foo' };
    broadcast.setState(theme);
    const ThemedComponent = withTheme(Empty);
    const wrapper = shallow(<ThemedComponent />, { context });

    assert.strictEqual(wrapper.props().theme, theme);
  });

  it('should rerender when the theme is updated', () => {
    const theme = { themeProperty: 'foo' };
    broadcast.setState(theme);
    const ThemedComponent = withTheme(Empty);
    const wrapper = mount(<ThemedComponent />, { context });

    assert.strictEqual(wrapper.instance().state.theme, theme);
    const newTheme = { themeProperty: 'bar' };
    broadcast.setState(newTheme);
    assert.strictEqual(wrapper.instance().state.theme, newTheme);
  });
});
