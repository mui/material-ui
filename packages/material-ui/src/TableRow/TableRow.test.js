import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import TableRow from './TableRow';

describe('<TableRow />', () => {
  let mount;
  let classes;
  function mountInTable(node) {
    const wrapper = mount(
      <table>
        <tbody>{node}</tbody>
      </table>,
    );
    return wrapper.find('tbody').childAt(0);
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TableRow />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TableRow />, () => ({
    classes,
    inheritComponent: 'tr',
    mount: mountInTable,
    refInstanceof: window.HTMLTableRowElement,
    testComponentPropWith: 'tr',
  }));

  it('should render children', () => {
    const children = <td className="test" />;
    const wrapper = mountInTable(<TableRow>{children}</TableRow>);
    assert.strictEqual(wrapper.contains(children), true);
  });
});
