import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import TableCell from './TableCell';

describe('<TableCell />', () => {
  let mount;
  let classes;
  function mountInTable(node) {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>{node}</tr>
        </tbody>
      </table>,
    );
    return wrapper.find('tr').childAt(0);
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TableCell />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TableCell />, () => ({
    classes,
    inheritComponent: 'td',
    mount: mountInTable,
    refInstanceof: window.HTMLTableCellElement,
    // invalid nesting otherwise
    testComponentPropWith: 'td',
  }));

  describe('prop: padding', () => {
    it('doesn not have a class for padding by default', () => {
      const wrapper = mountInTable(<TableCell padding="default" />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.paddingDefault), false);
    });

    it('has a class when `none`', () => {
      const wrapper = mountInTable(<TableCell className="woofTableCell" padding="none" />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.paddingNone), true);
    });

    it('has a class when `checkbox`', () => {
      const wrapper = mountInTable(<TableCell className="woofTableCell" padding="checkbox" />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.paddingCheckbox), true);
    });
  });

  it('has a class when `size="small"`', () => {
    const wrapper = mountInTable(<TableCell className="woofTableCell" size="small" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.sizeSmall), true);
  });

  it('should render children', () => {
    const children = <p className="test">Hello</p>;
    const wrapper = mountInTable(<TableCell>{children}</TableCell>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', () => {
    const wrapper = mountInTable(<TableCell sortDirection="asc" />);
    assert.strictEqual(wrapper.find('td').props()['aria-sort'], 'ascending');
  });

  it('should render aria-sort="descending" when prop sortDirection="desc" provided', () => {
    const wrapper = mountInTable(<TableCell sortDirection="desc" />);
    assert.strictEqual(wrapper.find('td').props()['aria-sort'], 'descending');
  });

  it('should center content', () => {
    const wrapper = mountInTable(<TableCell align="center" />);
    assert.strictEqual(wrapper.find('td').hasClass(classes.alignCenter), true);
  });
});
