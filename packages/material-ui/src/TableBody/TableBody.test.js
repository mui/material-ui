import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import TableBody from './TableBody';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableBody />', () => {
  let mount;
  let classes;

  function mountInTable(node) {
    const wrapper = mount(<table>{node}</table>);
    return wrapper.childAt(0);
  }

  before(() => {
    mount = createMount();

    classes = getClasses(<TableBody />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a tbody', () => {
    const wrapper = mountInTable(<TableBody />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'TBODY');
  });

  it('should render a div', () => {
    const wrapper = mount(<TableBody component="div">foo</TableBody>);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
  });

  it('should render with the user and root class', () => {
    const wrapper = mountInTable(<TableBody className="woofTableBody" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('woofTableBody'), true);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = mountInTable(<TableBody>{children}</TableBody>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table.body in the child context', () => {
    let context;
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
