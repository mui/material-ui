/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import {assert} from 'chai';
import Toggle from 'src/Toggle';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<Toggle />', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  it('renders and uses elementStyle', () => {
    const toggle = mountWithContext(
      <Toggle label="hello" elementStyle={{width: '100px'}} />
    );

    assert.strictEqual(
      toggle.find('label').parent().children('div').prop('style').width,
      '100px',
      'elementStyle should be used on switchElement'
    );
  });
});
