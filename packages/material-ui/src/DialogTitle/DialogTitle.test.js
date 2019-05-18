import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import DialogTitle from './DialogTitle';

describe('<DialogTitle />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogTitle>foo</DialogTitle>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<DialogTitle>foo</DialogTitle>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render JSX children', () => {
    const children = <p className="test">Hello</p>;
    const wrapper = shallow(<DialogTitle disableTypography>{children}</DialogTitle>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const wrapper = shallow(<DialogTitle>{children}</DialogTitle>);
    assert.strictEqual(wrapper.childAt(0).props().children, children);
  });
});
