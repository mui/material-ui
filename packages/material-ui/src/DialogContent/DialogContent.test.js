import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import DialogContent from './DialogContent';

describe('<DialogContent />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogContent />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<DialogContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render children', () => {
    const children = <p />;
    const wrapper = shallow(<DialogContent>{children}</DialogContent>);
    assert.strictEqual(wrapper.children().equals(children), true);
  });
});
