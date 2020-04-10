import * as React from 'react';
import { assert, expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableFooter from './TableFooter';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableFooter />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  function mountInTable(node) {
    const wrapper = mount(<table>{node}</table>);
    return wrapper.find('table').childAt(0);
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TableFooter />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TableFooter />, () => ({
    classes,
    inheritComponent: 'tfoot',
    mount: mountInTable,
    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'thead',
  }));

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = mountInTable(<TableFooter>{children}</TableFooter>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table.footer in the child context', () => {
    let context;
    // TODO test integration with TableCell
    mountInTable(
      <TableFooter>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableFooter>,
    );
    assert.strictEqual(context.variant, 'footer');
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
