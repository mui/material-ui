import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import TableCell from './TableCell';

describe('<TableCell />', () => {
  let mount;
  let classes;
  const render = createClientRender();
  function mountInTable(node) {
    const utils = render(
      <table>
        <tbody>
          <tr>{node}</tr>
        </tbody>
      </table>,
    );
    return {
      cell: utils.container.querySelector('tr').firstChild,
      getByTestId: utils.getByTestId,
    };
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TableCell />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TableCell />, () => ({
    classes,
    inheritComponent: 'td',
    mount: (node) => {
      const wrapper = mount(
        <table>
          <tbody>
            <tr>{node}</tr>
          </tbody>
        </table>,
      );
      return wrapper.find('tr').childAt(0);
    },
    refInstanceof: window.HTMLTableCellElement,
    // invalid nesting otherwise
    testComponentPropWith: 'td',
  }));

  describe('prop: padding', () => {
    it('doesn not have a class for padding by default', () => {
      const { cell } = mountInTable(<TableCell padding="default" />);
      expect(cell).to.not.have.class(classes.paddingDefault);
    });

    it('has a class when `none`', () => {
      const { cell } = mountInTable(<TableCell className="woofTableCell" padding="none" />);
      expect(cell).to.have.class(classes.paddingNone);
    });

    it('has a class when `checkbox`', () => {
      const { cell } = mountInTable(<TableCell className="woofTableCell" padding="checkbox" />);
      expect(cell).to.have.class(classes.paddingCheckbox);
    });
  });

  it('has a class when `size="small"`', () => {
    const { cell } = mountInTable(<TableCell className="woofTableCell" size="small" />);
    expect(cell).to.have.class(classes.sizeSmall);
  });

  it('should render children', () => {
    const children = (
      <p data-testid="hello" className="test">
        Hello
      </p>
    );
    const { getByTestId } = mountInTable(<TableCell>{children}</TableCell>);
    expect(getByTestId('hello')).to.not.equal(null);
  });

  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', () => {
    const { cell } = mountInTable(<TableCell sortDirection="asc" />);
    expect(cell).to.have.attribute('aria-sort', 'ascending');
  });

  it('should render aria-sort="descending" when prop sortDirection="desc" provided', () => {
    const { cell } = mountInTable(<TableCell sortDirection="desc" />);
    expect(cell).to.have.attribute('aria-sort', 'descending');
  });

  it('should center content', () => {
    const { cell } = mountInTable(<TableCell align="center" />);
    expect(cell).to.have.class(classes.alignCenter);
  });
});
