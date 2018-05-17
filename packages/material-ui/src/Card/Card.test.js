import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Card from './Card';
import Paper from '../Paper';

describe('<Card />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Card />);
  });

  it('should render Paper with the root class & with 2dp', () => {
    const wrapper = shallow(<Card />);
    assert.strictEqual(wrapper.type(), Paper);
    assert.strictEqual(wrapper.props().elevation, 2);
  });

  it('should have the root and custom class', () => {
    const wrapper = shallow(<Card className="card" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('card'), true);
  });

  it('should render Paper with 8dp', () => {
    const wrapper = shallow(<Card raised />);
    assert.strictEqual(wrapper.props().elevation, 8);
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Card data-my-prop="woofCard" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofCard', 'custom prop should be woofCard');
  });
});
