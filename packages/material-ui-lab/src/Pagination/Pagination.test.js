import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: false });

  before(() => {
    mount = createMount();
    classes = getClasses(<Pagination />);
  });

  describeConformance(<Pagination />, () => ({
    classes,
    inheritComponent: 'ul',
    mount,
    refInstanceof: window.HTMLUListElement,
    after: () => mount.cleanUp(),
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<Pagination />);

    expect(container.firstChild).to.have.class(classes.root);
  });
});
