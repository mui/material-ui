/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Snackbar from './Snackbar';

describe('<Snackbar />', () => {
  it('renders hidden by default', () => {
    const wrapper = shallow(
      <Snackbar open={false} message="Message" autoHideDuration={4000} />
    );

    assert.equal(
      wrapper.find('div').at(0).node.props.style.visibility,
      'hidden',
      'visibility should be hidden'
    );
  });
});
