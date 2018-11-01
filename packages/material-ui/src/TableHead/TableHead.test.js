import React from 'react';
import { assert } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import TableHead from './TableHead';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableHead />', () => {
  let mount;
  let classes;
  function mountInTable(node) {
    const wrapper = mount(<table>{node}</table>);
    return wrapper.childAt(0);
  }

  before(() => {
    mount = createMount();
    classes = getClasses(<TableHead>foo</TableHead>);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a thead', () => {
    const wrapper = mountInTable(<TableHead />);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'THEAD');
  });

  it('should render a div', () => {
    const wrapper = mount(<TableHead component="div">foo</TableHead>);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
  });

  it('should render with the user and root class', () => {
    const wrapper = mountInTable(<TableHead className="woofTableHead" />);
    assert.strictEqual(wrapper.find('thead').hasClass('woofTableHead'), true);
    assert.strictEqual(wrapper.find('thead').hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = mountInTable(<TableHead>{children}</TableHead>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table.head in the child context', () => {
    let context;
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
