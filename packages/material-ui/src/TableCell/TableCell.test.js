import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import TableCell from './TableCell';

describe('<TableCell />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();
  function renderInTable(node) {
    return render(
      <table>
        <tbody>
          <tr>{node}</tr>
        </tbody>
      </table>,
    );
  }

  before(() => {
    classes = getClasses(<TableCell />);
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
      const { container } = renderInTable(<TableCell padding="default" />);
      expect(container.querySelector('td')).to.not.have.class(classes.paddingDefault);
    });

    it('has a class when `none`', () => {
      const { container } = renderInTable(<TableCell padding="none" />);
      expect(container.querySelector('td')).to.have.class(classes.paddingNone);
    });

    it('has a class when `checkbox`', () => {
      const { container } = renderInTable(<TableCell padding="checkbox" />);
      expect(container.querySelector('td')).to.have.class(classes.paddingCheckbox);
    });
  });

  it('has a class when `size="small"`', () => {
    const { container } = renderInTable(<TableCell size="small" />);
    expect(container.querySelector('td')).to.have.class(classes.sizeSmall);
  });

  it('should render children', () => {
    const children = <p data-testid="hello">Hello</p>;
    const { getByTestId } = renderInTable(<TableCell>{children}</TableCell>);
    expect(getByTestId('hello')).to.not.equal(null);
  });

  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', () => {
    const { container } = renderInTable(<TableCell sortDirection="asc" />);
    expect(container.querySelector('td')).to.have.attribute('aria-sort', 'ascending');
  });

  it('should render aria-sort="descending" when prop sortDirection="desc" provided', () => {
    const { container } = renderInTable(<TableCell sortDirection="desc" />);
    expect(container.querySelector('td')).to.have.attribute('aria-sort', 'descending');
  });

  it('should center content', () => {
    const { container } = renderInTable(<TableCell align="center" />);
    expect(container.querySelector('td')).to.have.class(classes.alignCenter);
  });
});
