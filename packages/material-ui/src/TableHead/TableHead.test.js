import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import TableHead from './TableHead';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableHead />', () => {
  let mount;
  let classes;
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
          {value => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableHead>,
    );
    assert.strictEqual(context.variant, 'head');
  });
});
