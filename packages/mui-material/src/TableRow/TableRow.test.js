import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import TableRow, { tableRowClasses as classes } from '@mui/material/TableRow';

describe('<TableRow />', () => {
  const { render } = createRenderer();

  function renderInTable(node) {
    return render(
      <table>
        <tbody>{node}</tbody>
      </table>,
    );
  }

  describeConformance(<TableRow />, () => ({
    classes,
    inheritComponent: 'tr',
    render: (node) => {
      const { container, ...other } = render(
        <table>
          <tbody>{node}</tbody>
        </table>,
      );
      return { container: container.firstChild.firstChild, ...other };
    },
    wrapMount: (mount) => (node) => {
      const wrapper = mount(
        <table>
          <tbody>{node}</tbody>
        </table>,
      );
      return wrapper.find('tbody').childAt(0);
    },
    muiName: 'MuiTableRow',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableRowElement,
    testComponentPropWith: 'tr',
    skip: ['componentsProp'],
  }));

  it('should render children', () => {
    const children = <td data-testid="test" />;
    const { getByTestId } = renderInTable(<TableRow>{children}</TableRow>);
    getByTestId('test');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'row');
    });
  });
});
