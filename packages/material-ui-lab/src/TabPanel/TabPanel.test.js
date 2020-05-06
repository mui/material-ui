import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TabPanel from './TabPanel';
import TabContext from '../TabContext';

describe('<TabPanel />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<TabPanel value={0} />);
    mount = createMount({ strict: true });
  });

  describeConformance(<TabPanel value="0" />, () => ({
    classes,
    inheritComponent: 'div',
    mount: (element) => mount(<TabContext value="0">{element}</TabContext>),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'reactTestRenderer'],
    after: () => mount.cleanUp(),
  }));

  it('renders a [role="tabpanel"]', () => {
    const { getByTestId } = render(
      <TabContext value="0">
        <TabPanel data-testid="tabpanel" value="0" />
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).to.have.attribute('role', 'tabpanel');
  });

  it('is [hidden] when TabPanel#value !== TabContext#value and does not mount children', () => {
    const { getByTestId, queryByTestId } = render(
      <TabContext value="1">
        <TabPanel data-testid="tabpanel" value="0">
          <div data-testid="child" />
        </TabPanel>
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).to.have.property('hidden', true);
    expect(queryByTestId('child')).to.equal(null);
  });

  it('is accessible when TabPanel#value === TabContext#value', () => {
    const { getByTestId } = render(
      <TabContext value="0">
        <TabPanel data-testid="tabpanel" value="0" />
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).not.toBeInaccessible();
  });
});
