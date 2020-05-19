import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableHead from './TableHead';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableHead />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();
  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  before(() => {
    classes = getClasses(<TableHead>foo</TableHead>);
  });

  describeConformance(<TableHead />, () => ({
    classes,
    inheritComponent: 'thead',
    mount: (node) => {
      const wrapper = mount(<table>{node}</table>);
      return wrapper.find('table').childAt(0);
    },

    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'tbody',
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    const { getByTestId } = renderInTable(<TableHead>{children}</TableHead>);
    getByTestId('test');
  });

  it('should define table.head in the child context', () => {
    let context;
    // TODO: test integration with TableCell
    renderInTable(
      <TableHead>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableHead>,
    );
    expect(context.variant).to.equal('head');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableHead component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableHead component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
