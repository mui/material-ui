/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import TabTemplate from './TabTemplate';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TabTemplate />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should have different tab template style', () => {
    const wrapper = shallowWithContext(
      <TabTemplate
        style={{backgroundColor: 'red'}}
        selected={true}
      />
    );

    assert.strictEqual(wrapper.props().style.backgroundColor, 'red',
      'should have backgroundColor equal to red');
  });
});
