import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import Card from './Card';
import Paper from '../Paper';

describe('<Card />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();
  before(() => {
    classes = getClasses(<Card />);
  });

  describeConformance(<Card />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('when raised should render Paper with 8dp', () => {
    const { container } = render(<Card raised />);
    expect(container.firstChild).to.have.class('MuiPaper-elevation8');
  });
});
