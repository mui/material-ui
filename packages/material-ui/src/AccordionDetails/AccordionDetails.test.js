import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
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
