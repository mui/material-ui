import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableBody from './TableBody';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableBody />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  before(() => {
    classes = getClasses(<TableBody />);
  });

  describeConformance(<TableBody />, () => ({
    classes,
    inheritComponent: 'tbody',
    mount: (node) => {
      const wrapper = mount(<table>{node}</table>);
      return wrapper.find('table').childAt(0);
    },

    refInstanceof: window.HTMLTableSectionElement,
    // can't test with custom `component` with `renderInTable`
    testComponentPropWith: 'tbody',
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    const { getByTestId } = renderInTable(<TableBody>{children}</TableBody>);
    getByTestId('test');
  });

  it('should define table.body in the child context', () => {
    let context;
    // TODO test integration with TableCell
    renderInTable(
      <TableBody>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableBody>,
    );
    expect(context.variant).to.equal('body');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableBody component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableBody component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
