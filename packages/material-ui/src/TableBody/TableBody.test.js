import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import TableBody from './TableBody';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableBody />', () => {
  let mount;
  let classes;

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
          {value => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableBody>,
    );
    assert.strictEqual(context.variant, 'body');
  });
});
