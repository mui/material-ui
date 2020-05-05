import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import TableRow from './TableRow';

describe('<TableRow />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  function mountInTable(node) {
    const utils = render(
      <table>
        <tbody>{node}</tbody>
      </table>,
    );
    return {
      table: utils.container.querySelector('tbody'),
      ...utils,
    };
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TableRow />);
  });

  after(() => {
    mount.cleanUp();
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
    const children = <td data-testid="test" className="test" />;
    const { queryByTestId } = mountInTable(<TableRow>{children}</TableRow>);
    expect(queryByTestId('test')).to.not.equal(null);
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
