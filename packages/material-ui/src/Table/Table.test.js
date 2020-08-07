import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Table from './Table';
import TableContext from './TableContext';

describe('<Table />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<Table>foo</Table>);
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
      const { container } = render(<Table component="div">foo</Table>);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="table"', () => {
      const { container } = render(<Table component="div">foo</Table>);
      expect(container.firstChild).to.have.attribute('role', 'table');
    });
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Table>
        <tbody data-testid="children" />
      </Table>,
    );

    expect(getByTestId('children')).not.to.equal(null);
  });

  it('should define table in the child context', () => {
    let context;

    // TODO test integration with TableCell
    render(
      <Table>
        <TableContext.Consumer>
          {(value) => {
            context = value;
            return <tbody />;
          }}
        </TableContext.Consumer>
      </Table>,
    );

    expect(context).to.deep.equal({
      size: 'medium',
      padding: 'default',
      stickyHeader: false,
    });
  });
});
