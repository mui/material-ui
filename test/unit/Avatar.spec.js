import React from 'react';
import {Avatar} from 'src';
import {shallow} from 'enzyme';
import {assert} from 'chai';

describe('<Avatar />', () => {

  const testChildren = <div className="unique">Hello World</div>;

  it('renders children', () => {
    const wrapper = shallow(React.createElement(Avatar, {
      children: testChildren,
    }));
    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('does not render children when the src prop is set', () => {
    const wrapper = shallow(React.createElement(Avatar, {
      children: testChildren,
      src: 'face.jpg',
    }));
    assert.notOk(!wrapper.contains(testChildren), 'should not contain the children');
  });

});
