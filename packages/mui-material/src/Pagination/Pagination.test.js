import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination, { paginationClasses as classes } from '@mui/material/Pagination';
import { paginationItemClasses } from '@mui/material/PaginationItem';
import describeConformance from '../../test/describeConformance';

describe('<Pagination />', () => {
  const { render } = createRenderer();

  describeConformance(<Pagination />, () => ({
    classes,
    inheritComponent: 'nav',
    render,
    muiName: 'MuiPagination',
    refInstanceof: window.HTMLElement,
    testDeepOverrides: { slotName: 'ul', slotClassName: classes.ul },
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'outlined', styleKey: 'outlined' },
    skip: ['componentProp', 'componentsProp'],
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
    expect(container.querySelector('[page]')).to.equal(null);
  });

  it('fires onChange when a different page is clicked', () => {
    const handleChange = spy();
    const { getAllByRole } = render(<Pagination count={3} onChange={handleChange} page={1} />);

    // previous, page 1, page 2
    const [, , page2] = getAllByRole('button');
    page2.click();

    expect(handleChange.callCount).to.equal(1);
  });

  it('should not fire onChange when an ellipsis div is clicked', () => {
    const handleChange = spy();
    const { container } = render(<Pagination count={10} onChange={handleChange} page={1} />);

    const ellipsisDiv = container.querySelector(`.${paginationItemClasses.ellipsis}`);
    ellipsisDiv.click();

    expect(handleChange.callCount).to.equal(0);
  });

  it('renders controls with correct order in rtl theme', () => {
    const { getAllByRole } = render(
      <ThemeProvider
        theme={createTheme({
          direction: 'rtl',
        })}
      >
        <Pagination count={5} page={3} showFirstButton showLastButton />
      </ThemeProvider>,
    );

    const buttons = getAllByRole('button');

    expect(buttons[0].querySelector('svg')).to.have.attribute('data-testid', 'LastPageIcon');
    expect(buttons[1].querySelector('svg')).to.have.attribute('data-testid', 'NavigateNextIcon');
    expect(buttons[2].textContent).to.equal('1');
    expect(buttons[6].textContent).to.equal('5');
    expect(buttons[7].querySelector('svg')).to.have.attribute('data-testid', 'NavigateBeforeIcon');
    expect(buttons[8].querySelector('svg')).to.have.attribute('data-testid', 'FirstPageIcon');
  });

  it('renders correct amount of buttons on correct order when boundaryCount is zero', () => {
    const { getAllByRole } = render(
      <ThemeProvider
        theme={createTheme({
          direction: 'rtl',
        })}
      >
        <Pagination count={11} defaultPage={6} siblingCount={1} boundaryCount={0} />
      </ThemeProvider>,
    );

    const buttons = getAllByRole('button');
    expect(buttons[4].querySelector('svg')).to.have.attribute('data-testid', 'NavigateBeforeIcon');
    expect(buttons[1].textContent).to.equal('5');
    expect(buttons[2].textContent).to.equal('6');
    expect(buttons[3].textContent).to.equal('7');
    expect(buttons[0].querySelector('svg')).to.have.attribute('data-testid', 'NavigateNextIcon');
  });
});
