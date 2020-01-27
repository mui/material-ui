import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import PaginationItem from './PaginationItem';

describe('<PaginationItem />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: false });

  before(() => {
    mount = createMount();
    classes = getClasses(<PaginationItem />);
  });

  describeConformance(<PaginationItem />, () => ({
    classes,
    inheritComponent: 'button',
    mount,
    refInstanceof: window.HTMLButtonElement,
    after: () => mount.cleanUp(),
  }));

  it('should render', () => {
    const { container } = render(<PaginationItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should call onClick when clicked', () => {
    const handleClick = spy();
    const { getByText } = render(<PaginationItem page={1} onClick={handleClick} />);

    fireEvent.click(getByText('1'));
    expect(handleClick.callCount).to.equal(1);
  });

  it('should render a disabled button if `disabled={true}`', () => {
    const { getByRole } = render(<PaginationItem page={1} disabled />);

    expect(getByRole('button')).to.have.property('disabled', true);
  });
});
