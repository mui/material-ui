import * as React from 'react';
import { expect } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
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
    expect(wrapper.children().equals(children)).to.equal(true);
  });
});
