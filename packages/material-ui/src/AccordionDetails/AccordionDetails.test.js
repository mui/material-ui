import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses, createMount, describeConformance } from 'test/utils';
import AccordionDetails from './AccordionDetails';

describe('<AccordionDetails />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<AccordionDetails>foo</AccordionDetails>);
  });

  describeConformance(<AccordionDetails>Conformance</AccordionDetails>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a children element', () => {
    const wrapper = shallow(
      <AccordionDetails>
        <div>Hello</div>
      </AccordionDetails>,
    );
    const container = wrapper.childAt(0);
    expect(container.type()).to.equal('div');
  });
});
