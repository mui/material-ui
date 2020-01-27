import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: false });

  before(() => {
    mount = createMount();
    classes = getClasses(<Pagination />);
  });

  describeConformance(<Pagination />, () => ({
    classes,
    inheritComponent: 'ul',
    mount,
    refInstanceof: window.HTMLUListElement,
    after: () => mount.cleanUp(),
  }));

  it('should render', () => {
    const { container } = render(<Pagination />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should call onClick when clicked', () => {
    const handleClick = spy();
    const { getByText } = render(<Pagination page={1} onClick={handleClick} />);

    fireEvent.click(getByText('1'));
    expect(handleClick.callCount).to.equal(1);
  });
});
