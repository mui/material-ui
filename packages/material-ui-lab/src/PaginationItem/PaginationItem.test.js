import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import PaginationItem from './PaginationItem';

describe('<PaginationItem />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<PaginationItem />);
  });

  describeConformance(<PaginationItem />, () => ({
    classes,
    inheritComponent: 'button',
    mount,
    refInstanceof: window.HTMLButtonElement,
  }));

  it('should render', () => {
    const { container } = render(<PaginationItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should add the `selected` class to the root element if `selected={true}`', () => {
    const { getByRole } = render(<PaginationItem selected />);

    expect(getByRole('button')).to.have.class(classes.selected);
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
});
