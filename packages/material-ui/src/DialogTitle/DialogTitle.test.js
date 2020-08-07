import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import DialogTitle from './DialogTitle';

describe('<DialogTitle />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogTitle>foo</DialogTitle>);
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
    expect(wrapper.childAt(0).equals(children)).to.equal(true);
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const wrapper = shallow(<DialogTitle>{children}</DialogTitle>);
    expect(wrapper.childAt(0).props().children).to.equal(children);
  });
});
