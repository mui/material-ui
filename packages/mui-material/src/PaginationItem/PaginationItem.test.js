import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import PaginationItem, { paginationItemClasses as classes } from '@mui/material/PaginationItem';
import describeConformance from '../../test/describeConformance';

describe('<PaginationItem />', () => {
  const { render } = createRenderer();

  describeConformance(<PaginationItem />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    muiName: 'MuiPaginationItem',
    refInstanceof: window.HTMLButtonElement,
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'outlined', styleKey: 'outlined' },
    testLegacyComponentsProp: true,
    slots: {
      first: {},
      last: {},
      previous: {},
      next: {},
    },
    skip: [
      'componentProp',
      'componentsProp',
      // uses non-standard camel-case fields in `components`
      'slotsProp',
      'slotPropsProp',
      'slotPropsCallback', // not supported yet
    ],
  }));

  it('should render', () => {
    const { container } = render(<PaginationItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should add the `selected` class to the root element if `selected={true}`', () => {
    const { getByRole } = render(<PaginationItem selected />);

    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should add the `colorPrimary` class to the root element if `color="primary"`', () => {
    const { getByRole } = render(<PaginationItem color="primary" />);

    expect(getByRole('button')).to.have.class(classes.colorPrimary);
  });

  it('should add the `colorSecondary` class to the root element if `color="secondary"`', () => {
    const { getByRole } = render(<PaginationItem color="secondary" />);

    expect(getByRole('button')).to.have.class(classes.colorSecondary);
  });

  describe('prop: disabled', () => {
    it('should add the `disabled` class to the root element if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.class(classes.disabled);
    });

    it('should render a disabled button if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.property('disabled', true);
    });
  });

  it('should render a small button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="small" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="large" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });

  it('should render a first-last button', () => {
    const { getByRole } = render(
      <PaginationItem data-testid="root" page={1} type={'first'}>
        Hello World
      </PaginationItem>,
    );

    expect(getByRole('button')).to.have.class(classes.firstLast);
  });

  it('should render a previous-next button', () => {
    const { getByRole } = render(
      <PaginationItem data-testid="root" page={1} type={'previous'}>
        Hello World
      </PaginationItem>,
    );

    expect(getByRole('button')).to.have.class(classes.previousNext);
  });
});
