// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import withTheme from './withTheme';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referential transparency for testing purposes.

describe('withTheme', () => {
  let shallow;
  let context;

  before(() => {
    shallow = createShallow();
    context = { styleManager: { theme: { themeProperty: 'foo' } } };
  });

  it('should use the theme provided by the context', () => {
    const ThemedComponent = withTheme(Empty);
    const wrapper = shallow(<ThemedComponent />, { context });

    assert.property(wrapper.props(), 'theme');
    assert.strictEqual(
      wrapper.props().theme,
      context.styleManager.theme,
      'Should use the theme provided by the context');
  });
});
