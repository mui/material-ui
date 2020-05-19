import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableRow from './TableRow';

describe('<TableRow />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  function renderInTable(node) {
    return render(
      <table>
        <tbody>{node}</tbody>
      </table>,
    );
  }

  before(() => {
    classes = getClasses(<TableRow />);
  });

  describeConformance(<TableRow />, () => ({
    classes,
    inheritComponent: 'tr',
    mount: (node) => {
      const wrapper = mount(
        <table>
          <tbody>{node}</tbody>
        </table>,
      );
      return wrapper.find('tbody').childAt(0);
    },

    refInstanceof: window.HTMLTableRowElement,
    testComponentPropWith: 'tr',
  }));

  it('should render children', () => {
    const children = <td data-testid="test" />;
    const { getByTestId } = renderInTable(<TableRow>{children}</TableRow>);
    getByTestId('test');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'row');
    });
  });
});
