import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import ListSubheader from './ListSubheader';

describe('<ListSubheader />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<ListSubheader />);
  });

  describeConformance(<ListSubheader />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
  }));

  it('should display primary color', () => {
    const { container } = render(<ListSubheader color="primary" />);

    expect(container.firstChild).to.have.class(classes.colorPrimary);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should display inset class', () => {
    const { container } = render(<ListSubheader inset />);

    expect(container.firstChild).to.have.class(classes.inset);
    expect(container.firstChild).to.have.class(classes.root);
  });

  describe('prop: disableSticky', () => {
    it('should display sticky class', () => {
      const { container } = render(<ListSubheader />);

      expect(container.firstChild).to.have.class(classes.sticky);
    });

    it('should not display sticky class', () => {
      const { container } = render(<ListSubheader disableSticky />);

      expect(container.firstChild).to.not.have.class(classes.sticky);
    });
  });

  describe('prop: disableGutters', () => {
    it('should not display gutters class', () => {
      const { container } = render(<ListSubheader disableGutters />);

      expect(container.firstChild).to.not.have.class(classes.gutters);
    });

    it('should display gutters class', () => {
      const { container } = render(<ListSubheader />);

      expect(container.firstChild).to.have.class(classes.gutters);
    });
  });
});
