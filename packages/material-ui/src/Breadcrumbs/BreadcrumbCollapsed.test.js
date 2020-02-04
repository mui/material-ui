import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '@material-ui/core/test-utils';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';

describe('<BreadcrumbCollapsed />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount({ strict: true });
    classes = getClasses(<BreadcrumbCollapsed />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render an <SvgIcon>', () => {
    const wrapper = shallow(<BreadcrumbCollapsed />);

    assert.strictEqual(wrapper.find(MoreHorizIcon).length, 1);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should mount', () => {
    mount(<BreadcrumbCollapsed />);
  });
});
