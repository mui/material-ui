import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import TableBody, { tableBodyClasses as classes } from '@mui/material/TableBody';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import describeConformance from '../../test/describeConformance';

describe('<TableBody />', () => {
  const { render } = createRenderer();

  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  describeConformance(<TableBody />, () => ({
    classes,
    inheritComponent: 'tbody',
    render: (node) => {
      const { container, ...other } = render(<table>{node}</table>);
      return { container: container.firstChild, ...other };
    },
    muiName: 'MuiTableBody',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableSectionElement,
    // can't test with custom `component` with `renderInTable`
    testComponentPropWith: 'tbody',
    skip: ['componentsProp'],
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    const { getByTestId } = renderInTable(<TableBody>{children}</TableBody>);
    getByTestId('test');
  });

  it('should define table.body in the child context', () => {
    let context;
    // TODO test integration with TableCell
    renderInTable(
      <TableBody>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableBody>,
    );
    expect(context.variant).to.equal('body');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableBody component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableBody component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
