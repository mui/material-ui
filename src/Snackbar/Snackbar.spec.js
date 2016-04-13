/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Snackbar from './Snackbar';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Snackbar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('renders hidden by default', () => {
    const wrapper = shallowWithContext(
      <Snackbar open={false} message="Message" autoHideDuration={4000} />
    );

    assert.equal(
      wrapper.find('div').at(0).node.props.style.visibility,
      'hidden',
      'visibility should be hidden'
    );
  });
});
