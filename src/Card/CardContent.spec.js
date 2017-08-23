// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import CardContent from './CardContent';

describe('<CardContent />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'CardContent' });
    classes = getClasses(<CardContent />);
  });

  it('should render a div with the root class', () => {
    const wrapper = shallow(<CardContent />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
