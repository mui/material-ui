import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Table from './Table';
import TableContext from './TableContext';
import findOutermostIntrinsic from '../test-utils/findOutermostIntrinsic';

describe('<Table />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Table>foo</Table>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Table>
      <tbody />
    </Table>,
    () => ({
      classes,
      inheritComponent: 'table',
      mount,
      refInstanceof: window.HTMLTableElement,
      // can't test another component with tbody as a child
      testComponentPropWith: 'table',
    }),
  );

  describe('prop: component', () => {
    it('can render a different component', () => {
      const wrapper = mount(<Table component="div">foo</Table>);
      assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
    });
  });

  it('should render children', () => {
    const children = <tbody className="test" />;
    const wrapper = mount(<Table>{children}</Table>);
    assert.strictEqual(wrapper.contains(children), true);
  });

  it('should define table in the child context', () => {
    let context;

    // TODO test integration with TableCell
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

    assert.deepEqual(context, {
      size: 'medium',
      padding: 'default',
    });
  });
});
