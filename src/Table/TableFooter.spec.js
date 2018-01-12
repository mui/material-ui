import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import TableFooter from './TableFooter';

describe('<TableFooter />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should render a tfoot', () => {
    const wrapper = shallow(<TableFooter />);
    assert.strictEqual(wrapper.name(), 'tfoot');
  });

  it('should render a div', () => {
    const wrapper = shallow(<TableFooter component="div" />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the user class', () => {
    const wrapper = shallow(<TableFooter className="woofTableHead" />);
    assert.strictEqual(wrapper.hasClass('woofTableHead'), true);
  });

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = shallow(<TableFooter>{children}</TableFooter>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});
