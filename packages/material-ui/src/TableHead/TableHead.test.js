import * as React from 'react';
import { assert, expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableHead from './TableHead';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableHead />', () => {
  let mount;
  let classes;
  const render = createClientRender();
  function mountInTable(node) {
    const wrapper = mount(<table>{node}</table>);
    return wrapper.find('table').childAt(0);
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TableHead>foo</TableHead>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TableHead />, () => ({
    classes,
    inheritComponent: 'thead',
    mount: mountInTable,
    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'tbody',
  }));

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = mountInTable(<TableHead>{children}</TableHead>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table.head in the child context', () => {
    let context;
    // TODO: test integration with TableCell
    mountInTable(
      <TableHead>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableHead>,
    );
    assert.strictEqual(context.variant, 'head');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableHead component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableHead component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
