// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import FormLabel from './FormLabel';

describe('<FormLabel />', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
  });

  it('should render a LabelBase', () => {
    const wrapper = shallow(<FormLabel />);
    assert.strictEqual(wrapper.is('LabelBase'), true, 'should be a LabelBase');
  });
});
