import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import Icon from './Icon';

describe('<Icon />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<Icon />);
  });

  describeConformance(<Icon>account_circle</Icon>, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'div',
  }));

  it('renders children by default', () => {
    const { getByText } = render(<Icon>account_circle</Icon>);

    getByText('account_circle');
  });

  describe('optional classes', () => {
    it('should render with the secondary color', () => {
      const { container } = render(<Icon color="secondary">account_circle</Icon>);
      const node = container.querySelector(`.${classes.colorSecondary}`);

      expect(node).to.not.equal(null);
    });

    it('should render with the action color', () => {
      const { container } = render(<Icon color="action">account_circle</Icon>);
      const node = container.querySelector(`.${classes.colorAction}`);

      expect(node).to.not.equal(null);
    });

    it('should render with the error color', () => {
      const { container } = render(<Icon color="error">account_circle</Icon>);
      const node = container.querySelector(`.${classes.colorError}`);

      expect(node).to.not.equal(null);
    });

    it('should render with the primary class', () => {
      const { container } = render(<Icon color="primary">account_circle</Icon>);
      const node = container.querySelector(`.${classes.colorPrimary}`);

      expect(node).to.not.equal(null);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const { container } = render(<Icon fontSize="inherit">account_circle</Icon>);
      const node = container.querySelector(`.${classes.fontSizeInherit}`);

      expect(node).to.not.equal(null);
    });
  });
});
