import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses, createMount, describeConformance } from 'test/utils';
import FormGroup from './FormGroup';

describe('<FormGroup />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<FormGroup />);
  });

  describeConformance(<FormGroup />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a div with a div child', () => {
    const wrapper = shallow(
      <FormGroup>
        <div className="woofFormGroup" />
      </FormGroup>,
    );

    expect(wrapper.children('span').length).to.equal(0);
    expect(wrapper.children('div').length).to.equal(1);
    expect(wrapper.children('div').first().hasClass('woofFormGroup')).to.equal(true);
  });
});
