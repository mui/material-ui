import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<Toolbar>foo</Toolbar>);
  });

  describeConformance(<Toolbar />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
  }));

  it('should render with gutters class', () => {
    const { container } = render(<Toolbar className="woofToolbar">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.gutters);
  });

  it('can disable the gutters', () => {
    const { container } = render(<Toolbar disableGutters>foo</Toolbar>);

    expect(container.firstChild).not.to.have.class(classes.gutters);
  });

  it('can condense itself', () => {
    const { container } = render(<Toolbar variant="dense">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.dense);
  });
});
