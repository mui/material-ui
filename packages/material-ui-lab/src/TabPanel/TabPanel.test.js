import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TabPanel from './TabPanel';

describe('<TabPanel />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<TabPanel activeValue={0} value={0} />);
    mount = createMount({ strict: true });
  });

  describeConformance(<TabPanel activeValue={0} value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  it('renders a [role="tabpanel"]', () => {
    const { getByTestId } = render(<TabPanel data-testid="tabpanel" activeValue={0} value={0} />);

    expect(getByTestId('tabpanel')).to.have.attribute('role', 'tabpanel');
  });

  it('is [hidden] when value !== activeValue and does not mount children', () => {
    const { getByTestId, queryByTestId } = render(
      <TabPanel data-testid="tabpanel" activeValue={1} value={0}>
        <div data-testid="child" />
      </TabPanel>,
    );

    expect(getByTestId('tabpanel')).to.have.property('hidden', true);
    expect(queryByTestId('child')).to.equal(null);
  });

  it('is accessible when value === activeValue', () => {
    const { getByTestId } = render(<TabPanel data-testid="tabpanel" activeValue={0} value={0} />);

    expect(getByTestId('tabpanel')).not.toBeInaccessible();
  });
});
