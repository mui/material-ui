import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableFooter from './TableFooter';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableFooter />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  before(() => {
    classes = getClasses(<TableFooter />);
  });

  describeConformance(<TableFooter />, () => ({
    classes,
    inheritComponent: 'tfoot',
    mount: (node) => {
      const wrapper = mount(<table>{node}</table>);
      return wrapper.find('table').childAt(0);
    },

    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'thead',
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
