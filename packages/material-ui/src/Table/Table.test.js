import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import Table from './Table';
import TableContext from './TableContext';

describe('<Table />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(<Table>foo</Table>);
  });

  it('should render a table', () => {
    const wrapper = mount(
      <Table>
        <tbody />
      </Table>,
    );
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'TABLE');
  });

  it('should render a div', () => {
    const wrapper = mount(<Table component="div">foo</Table>);
    assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = mount(
      <Table data-my-prop="woofTable">
        <tbody />
      </Table>,
    );
    assert.strictEqual(
      wrapper.props()['data-my-prop'],
      'woofTable',
      'custom prop should be woofTable',
    );
  });

  it('should render with the user and root classes', () => {
    const wrapper = mount(
      <Table className="woofTable">
        <tbody />
      </Table>,
    );
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('woofTable'), true);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <tbody className="test" />;
    const wrapper = mount(<Table>{children}</Table>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table in the child context', () => {
    let context;

    mount(
      <Table>
        <TableContext.Consumer>
          {value => {
            context = value;
            return <tbody />;
          }}
        </TableContext.Consumer>
      </Table>,
    );

    assert.deepStrictEqual(context, {
      size: 'medium',
      padding: 'default',
    });
  });
});
