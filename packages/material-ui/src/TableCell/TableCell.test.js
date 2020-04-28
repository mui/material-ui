import * as React from 'react';
import { expect } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
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
      expect(findOutermostIntrinsic(wrapper).hasClass(classes.paddingDefault)).to.equal(false);
    });

    it('has a class when `none`', () => {
      const wrapper = mountInTable(<TableCell className="woofTableCell" padding="none" />);
      expect(findOutermostIntrinsic(wrapper).hasClass(classes.paddingNone)).to.equal(true);
    });

    it('has a class when `checkbox`', () => {
      const wrapper = mountInTable(<TableCell className="woofTableCell" padding="checkbox" />);
      expect(findOutermostIntrinsic(wrapper).hasClass(classes.paddingCheckbox)).to.equal(true);
    });
  });

  it('has a class when `size="small"`', () => {
    const wrapper = mountInTable(<TableCell className="woofTableCell" size="small" />);
    expect(findOutermostIntrinsic(wrapper).hasClass(classes.sizeSmall)).to.equal(true);
  });

  it('should render children', () => {
    const children = <p className="test">Hello</p>;
    const wrapper = mountInTable(<TableCell>{children}</TableCell>);
    expect(wrapper.contains(children)).to.equal(true);
  });

  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', () => {
    const wrapper = mountInTable(<TableCell sortDirection="asc" />);
    expect(wrapper.find('td').props()['aria-sort']).to.equal('ascending');
  });

  it('should render aria-sort="descending" when prop sortDirection="desc" provided', () => {
    const wrapper = mountInTable(<TableCell sortDirection="desc" />);
    expect(wrapper.find('td').props()['aria-sort']).to.equal('descending');
  });

  it('should center content', () => {
    const wrapper = mountInTable(<TableCell align="center" />);
    expect(wrapper.find('td').hasClass(classes.alignCenter)).to.equal(true);
  });
});
