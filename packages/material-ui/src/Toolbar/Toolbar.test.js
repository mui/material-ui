import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Toolbar>foo</Toolbar>);
  });

  describeConformance(<Toolbar />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    after: () => mount.cleanUp(),
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
