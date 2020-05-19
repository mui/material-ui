import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import DialogContent from './DialogContent';

describe('<DialogContent />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogContent />);
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
