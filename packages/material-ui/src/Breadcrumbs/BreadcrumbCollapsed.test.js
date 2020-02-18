import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
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

  describe('prop: onKeyDown', () => {
    ['Space', 'Enter'].forEach(key => {
      it(`should be called on key press - ${key}`, () => {
        const handleKeyDown = spy();
        const wrapper = mount(<BreadcrumbCollapsed onKeyDown={handleKeyDown} />);
        const listElement = wrapper.find('li');
        listElement.simulate('focus');
        listElement.simulate('keydown', { key });   

        assert.strictEqual(handleKeyDown.callCount, 1);
      });
    });
  });

  it('should mount', () => {
    mount(<BreadcrumbCollapsed />);
  });
});
