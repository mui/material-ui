import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

describe('<BreadcrumbCollapsed />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<BreadcrumbCollapsed />);
  });

  it('should render an <SvgIcon>', () => {
    const wrapper = shallow(<BreadcrumbCollapsed />);

    assert.strictEqual(wrapper.find(MoreHorizIcon).length, 1);
  });

  it('should render the root class', () => {
    const wrapper = shallow(<BreadcrumbCollapsed />);

    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
