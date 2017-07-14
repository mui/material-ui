// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import FormGroup, { styleSheet } from './FormGroup';

describe('<FormGroup />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a div with the root and user classes', () => {
    const wrapper = shallow(<FormGroup className="woof" />);

    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woof'), true);
  });

  it('should render a div with a div child', () => {
    const wrapper = shallow(
      <FormGroup>
        <div className="woof" />
      </FormGroup>,
    );

    assert.strictEqual(wrapper.children('span').length, 0);
    assert.strictEqual(wrapper.children('div').length, 1);
    assert.strictEqual(wrapper.children('div').first().hasClass('woof'), true);
  });
});
