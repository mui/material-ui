import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    // StrictModeViolation: uses Fade
    mount = createMount({ strict: false });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Backdrop open />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Backdrop open />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a backdrop div', () => {
    const wrapper = shallow(<Backdrop open className="woofBackdrop" />);
    assert.strictEqual(wrapper.childAt(0).hasClass('woofBackdrop'), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.root), true);
  });
});
