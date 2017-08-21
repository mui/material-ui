// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Backdrop />);
  });

  it('should render a backdrop div', () => {
    const wrapper = shallow(<Backdrop className="woofBackdrop" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofBackdrop'), true);
  });
});
