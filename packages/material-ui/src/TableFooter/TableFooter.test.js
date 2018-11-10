import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '../test-utils';
import TableFooter from './TableFooter';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableFooter />', () => {
  let mount;
  let classes;

  function mountInTable(node) {
    const wrapper = mount(<table>{node}</table>);
    return wrapper.childAt(0);
  }

  before(() => {
    mount = createMount();
    classes = getClasses(<TableFooter />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a tfoot', () => {
    const wrapper = mountInTable(<TableFooter />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'TFOOT');
  });

  it('should render a div', () => {
    const wrapper = mount(<TableFooter component="div" />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
  });

  it('should render with the user and root class', () => {
    const wrapper = mountInTable(<TableFooter className="woofTableHead" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('woofTableHead'), true);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = mountInTable(<TableFooter>{children}</TableFooter>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table.footer in the child context', () => {
    let context;
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
