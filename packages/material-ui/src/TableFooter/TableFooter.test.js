import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import TableFooter from './TableFooter';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableFooter />', () => {
  let mount;
  let classes;

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
          {value => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableFooter>,
    );
    assert.strictEqual(context.variant, 'footer');
  });
});
