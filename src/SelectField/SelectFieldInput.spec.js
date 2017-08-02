// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import SelectFieldInput, { styleSheet } from './SelectFieldInput';

describe('<SelectFieldInput />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a <div />', () => {
    const wrapper = shallow(<SelectFieldInput />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.prop('aria-required'), undefined);
  });

  it('should render a SelectFieldInput with select having 3 children', () => {
    const options = [<div value={0}>test 1</div>, <div value={1}>test 2</div>];
    const wrapper = shallow(<SelectFieldInput label="test" options={options} />);
    const select = wrapper.find('select');
    assert.strictEqual(select.childAt(0).name(), 'option');
    assert.strictEqual(select.children().length, 3);
  });
});
