/* eslint-env mocha */
import React from 'react';
import PropTypes from 'prop-types';
import {mount} from 'enzyme';
import {assert} from 'chai';
import EnhancedTextarea from './EnhancedTextarea';
import getMuiTheme from '../styles/getMuiTheme';

describe('<EnhancedTextArea />', () => {
  const muiTheme = getMuiTheme();
  const rowHeight = 24;
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  it('renders with no arguments', () => {
    const wrapper = mountWithContext(
      <EnhancedTextarea />
    );
    assert.isAbove(wrapper.find('div').length, 0);
  });

  it('has one row initial height', () => {
    const wrapper = mountWithContext(
      <EnhancedTextarea />
    );
    assert.strictEqual(wrapper.state().height, rowHeight);
  });

  // This test will not succeed due to
  // jsdom limitations
  // https://github.com/tmpvar/jsdom/issues/1013
  /* eslint mocha/no-skipped-tests: 0 */
  it.skip('has zero initial height', () => {
    const wrapper = mountWithContext(
      <EnhancedTextarea
        value="A really long string that should go over multiple lines and should trigger more rows than one"
      />
    );
    assert.isAbove(wrapper.state().height, rowHeight);
  });
});
