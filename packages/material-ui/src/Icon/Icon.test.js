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
    const { getByTestId } = render(<Icon data-testid="root">account_circle</Icon>);

    expect(getByTestId('root')).to.have.text('account_circle');
  });

  describe('optional classes', () => {
    it('should render with the secondary color', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="secondary">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorSecondary);
    });

    it('should render with the action color', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="action">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorAction);
    });

    it('should render with the error color', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="error">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorError);
    });

    it('should render with the primary class', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="primary">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorPrimary);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" fontSize="inherit">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.fontSizeInherit);
    });
  });
});
