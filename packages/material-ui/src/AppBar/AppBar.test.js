import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import AppBar from './AppBar';
import classes from './appBarClasses';
import Paper from '../Paper';

describe('<AppBar />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<AppBar>Conformance?</AppBar>, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    muiName: 'MuiAppBar',
    refInstanceof: window.HTMLElement,
    testVariantProps: { position: 'relative' },
    testStateOverrides: { prop: 'color', value: 'secondary', styleKey: 'colorSecondary' },
    skip: ['componentsProp'],
  }));

  it('should render with the root class and primary', () => {
    const { container } = render(<AppBar>Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).to.have.class(classes.colorPrimary);
    expect(appBar).not.to.have.class(classes.colorSecondary);
  });

  it('should render a primary app bar', () => {
    const { container } = render(<AppBar color="primary">Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).to.have.class(classes.colorPrimary);
    expect(appBar).not.to.have.class(classes.colorSecondary);
  });

  it('should render an secondary app bar', () => {
    const { container } = render(<AppBar color="secondary">Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).not.to.have.class(classes.colorPrimary);
    expect(appBar).to.have.class(classes.colorSecondary);
  });

  describe('Dialog', () => {
    it('should add a .mui-fixed class', () => {
      const { container } = render(<AppBar position="fixed">Hello World</AppBar>);
      const appBar = container.firstChild;
      expect(appBar).to.have.class('mui-fixed');
    });
  });
});
