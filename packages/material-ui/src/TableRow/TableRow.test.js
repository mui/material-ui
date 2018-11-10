import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '../test-utils';
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
    return wrapper.childAt(0).childAt(0);
  }

  before(() => {
    mount = createMount();
    classes = getClasses(<TableRow />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a tr', () => {
    const wrapper = mountInTable(<TableRow />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'TR');
  });

  it('should render a div', () => {
    const wrapper = mount(<TableRow component="div" />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = mountInTable(<TableRow data-my-prop="woofTableRow" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).props()['data-my-prop'], 'woofTableRow');
  });

  it('should render with the user and root classes', () => {
    const wrapper = mountInTable(<TableRow className="woofTableRow" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('woofTableRow'), true);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <td className="test" />;
    const wrapper = mountInTable(<TableRow>{children}</TableRow>);
    assert.strictEqual(wrapper.contains(children), true);
  });
});
