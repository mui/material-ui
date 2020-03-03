import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Pagination from './Pagination';
import { fireEvent } from '@testing-library/dom';

describe('<Pagination />', () => {
  let classes;
  let mount;
  const render = createClientRender();

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Pagination />);
  });

  describeConformance(<Pagination />, () => ({
    classes,
    inheritComponent: 'nav',
    mount,
    refInstanceof: window.HTMLElement,
    after: () => mount.cleanUp(),
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<Pagination />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('moves aria-current to the specified page', () => {
    const { container, getAllByRole } = render(<Pagination count={3} page={1} />);

    // previous, page 1
    const [, page1] = getAllByRole('button');
    expect(page1).to.have.attribute('aria-current', 'true');
    // verifying no regression from previous bug where `page` wasn't intercepted
    expect(container.querySelector('[page]')).to.be.null;
  });

  it('fires onChange when a different page is clicked', () => {
    const handleChange = spy();
    const { getAllByRole } = render(<Pagination count={3} onChange={handleChange} page={1} />);

    // previous, page 1, page 2
    const [, , page2] = getAllByRole('button');
    page2.click();

    expect(handleChange.callCount).to.equal(1);
  });

  it('does not attach onChange to the root element', () => {
    const handleChange = spy();
    const { getByRole } = render(
      <Pagination count={3} onChange={handleChange} page={1}>
        <input defaultValue={1} type="text" />
      </Pagination>,
    );

    fireEvent.change(getByRole('textbox'), { target: { value: '2' } });

    expect(handleChange.callCount).to.equal(0);
  });
});
