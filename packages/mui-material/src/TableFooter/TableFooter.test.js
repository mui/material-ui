import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import TableFooter, { tableFooterClasses as classes } from '@mui/material/TableFooter';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import describeConformance from '../../test/describeConformance';

describe('<TableFooter />', () => {
  const { render } = createRenderer();

  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  describeConformance(<TableFooter />, () => ({
    classes,
    inheritComponent: 'tfoot',
    render: (node) => {
      const { container, ...other } = render(<table>{node}</table>);
      return { container: container.firstChild, ...other };
    },
    muiName: 'MuiTableFooter',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'thead',
    skip: ['componentsProp'],
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    const { getByTestId } = renderInTable(<TableFooter>{children}</TableFooter>);
    getByTestId('test');
  });

  it('should define table.footer in the child context', () => {
    let context;
    // TODO test integration with TableCell
    renderInTable(
      <TableFooter>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableFooter>,
    );
    expect(context.variant).to.equal('footer');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableFooter component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableFooter component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
