import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses, testRef } from '@material-ui/core/test-utils';
import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<Backdrop open />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a backdrop div', () => {
    const wrapper = shallow(<Backdrop open className="woofBackdrop" />);
    assert.strictEqual(wrapper.childAt(0).hasClass('woofBackdrop'), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.root), true);
  });

  it('does forward refs', () => {
    testRef(<Backdrop open />, mount);
  });
});
