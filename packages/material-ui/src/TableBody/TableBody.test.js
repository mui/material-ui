import * as React from 'react';
import { assert, expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableBody from './TableBody';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableBody />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  function mountInTable(node) {
    const wrapper = mount(<table>{node}</table>);
    return wrapper.find('table').childAt(0);
  }

  before(() => {
    mount = createMount({ strict: true });

    classes = getClasses(<TableBody />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TableBody />, () => ({
    classes,
    inheritComponent: 'tbody',
    mount: mountInTable,
    refInstanceof: window.HTMLTableSectionElement,
    // can't test with custom `component` with `mountInTable`
    testComponentPropWith: 'tbody',
  }));

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = mountInTable(<TableBody>{children}</TableBody>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table.body in the child context', () => {
    let context;
    // TODO test integration with TableCell
    mountInTable(
      <TableBody>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableBody>,
    );
    assert.strictEqual(context.variant, 'body');
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
