import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { fireEvent, createClientRender } from 'test/utils/createClientRender';
import DataGrid from './DataGrid';

describe.only('<DataGrid />', () => {
  let mount;
  const render = createClientRender();
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<DataGrid />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<DataGrid />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<DataGrid />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  describe('prop: sorting', () => {
    const getRows = container =>
      Array.from(container.querySelectorAll('div[role="row"]')).map(x => x.textContent);

    it('should be controllable', () => {
      const { container } = render(
        <DataGrid
          columns={[{ field: 'foo' }]}
          rowsData={[
            { foo: 'd' },
            { foo: 'a' },
            { foo: 'c' },
            { foo: 'e' },
            { foo: 'f' },
            { foo: 'b' },
          ]}
          sorting={[{ sort: 'asc', field: 'foo' }]}
        />,
      );

      expect(getRows(container)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('should handle sort clicks', () => {
      const handleSortingChange = spy();
      const { container } = render(
        <DataGrid
          defaultColumnOptions={{ sortable: true }}
          columns={[{ field: 'foo' }]}
          rowsData={[
            { foo: 'd' },
            { foo: 'a' },
            { foo: 'c' },
            { foo: 'e' },
            { foo: 'f' },
            { foo: 'b' },
          ]}
          defaultSorting={[{ sort: 'asc', field: 'foo' }]}
          onSortingChange={handleSortingChange}
        />,
      );

      expect(getRows(container)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f']);
      const sortButton = container.querySelector('[data-mui-test="TableSortLabel"]');

      fireEvent.click(sortButton);
      expect(getRows(container)).to.deep.equal(['f', 'e', 'd', 'c', 'b', 'a']);
      expect(handleSortingChange.args[0][1]).to.deep.equal([{ sort: 'desc', field: 'foo' }]);

      fireEvent.click(sortButton);
      expect(getRows(container)).to.deep.equal(['d', 'a', 'c', 'e', 'f', 'b']);
      expect(handleSortingChange.args[1][1]).to.deep.equal([]);
    });
  });
});
