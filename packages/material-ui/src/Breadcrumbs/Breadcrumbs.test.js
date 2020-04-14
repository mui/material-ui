import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import Breadcrumbs from './Breadcrumbs';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender } from 'test/utils/createClientRender';

describe('<Breadcrumbs />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(
      <Breadcrumbs>
        <span>Hello World</span>
      </Breadcrumbs>,
    );
  });

  describeConformance(<Breadcrumbs>Conformance?</Breadcrumbs>, () => ({
    classes,
    inheritComponent: 'nav',
    mount,
    refInstanceof: window.HTMLElement,
    testComponentPropWith: 'div',
    after: () => mount.cleanUp(),
  }));

  it('should render inaccessible seperators between each listitem', () => {
    const { getAllByRole, getByRole } = render(
      <Breadcrumbs>
        <span>first</span>
        <span>second</span>
      </Breadcrumbs>,
    );

    expect(getAllByRole('listitem', { hidden: false })).to.have.length(2);
    expect(getByRole('list')).to.have.text('first/second');
  });

  it('should render an ellipsis between `itemsAfterCollapse` and `itemsBeforeCollapse`', () => {
    const { getAllByRole, getByRole } = render(
      <Breadcrumbs>
        <span>first</span>
        <span>second</span>
        <span>third</span>
        <span>fourth</span>
        <span>fifth</span>
        <span>sixth</span>
        <span>seventh</span>
        <span>eighth</span>
        <span>ninth</span>
      </Breadcrumbs>,
    );

    const listitems = getAllByRole('listitem', { hidden: false });

    expect(listitems).to.have.length(2);
    expect(getByRole('list')).to.have.text('first//ninth');
    expect(getByRole('button').querySelector('[data-mui-test="MoreHorizIcon"]')).not.to.equal(null);
  });

  it('should expand when `BreadcrumbCollapsed` is clicked', () => {
    const { getAllByRole, getByRole, getByText } = render(
      <Breadcrumbs>
        <span tabIndex="-1">first</span>
        <span>second</span>
        <span>third</span>
        <span>fourth</span>
        <span>fifth</span>
        <span>sixth</span>
        <span>seventh</span>
        <span>eighth</span>
        <span>ninth</span>
      </Breadcrumbs>,
    );

    getByRole('button').click();
    expect(document.activeElement).to.equal(getByText('first'));
    expect(getAllByRole('listitem', { hidden: false })).to.have.length(9);
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn about invalid input', () => {
      const { getAllByRole, getByRole } = render(
        <Breadcrumbs maxItems={3} itemsAfterCollapse={2} itemsBeforeCollapse={2}>
          <span>first</span>
          <span>second</span>
          <span>third</span>
          <span>fourth</span>
        </Breadcrumbs>,
      );
      expect(getAllByRole('listitem', { hidden: false })).to.have.length(4);
      expect(getByRole('list')).to.have.text('first/second/third/fourth');
      expect(consoleErrorMock.callCount()).to.equal(2); // strict mode renders twice
      expect(consoleErrorMock.messages()[0]).to.include(
        'you have provided an invalid combination of props to the Breadcrumbs.\nitemsAfterCollapse={2} + itemsBeforeCollapse={2} >= maxItems={3}',
      );
    });
  });
});
