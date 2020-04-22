import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import AppBar from './AppBar';
import Paper from '../Paper';

describe('<AppBar />', () => {
  let mount;
  let classes;
  const render = createClientRender();
  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<AppBar>Hello World</AppBar>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<AppBar>Conformance?</AppBar>, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLElement,
    skip: ['componentProp'],
  }));

  it('should render with the root class and primary', () => {
    const { container } = render(<AppBar>Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).to.have.class(classes.colorPrimary);
    expect(appBar).to.not.have.class(classes.colorSecondary);
  });

  it('should render a primary app bar', () => {
    const { container } = render(<AppBar color="primary">Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).to.have.class(classes.colorPrimary);
    expect(appBar).to.not.have.class(classes.colorSecondary);
  });

  it('should render an secondary app bar', () => {
    const { container } = render(<AppBar color="secondary">Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).to.not.have.class(classes.colorPrimary);
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
