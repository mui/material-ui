import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TabPanel from './TabPanel';
import TabContext from '../TabContext';

describe('<TabPanel />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<TabPanel value={0} />);
  });

  describeConformance(<TabPanel value="0" />, () => ({
    classes,
    inheritComponent: 'div',
    mount: (element) => mount(<TabContext value="0">{element}</TabContext>),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'reactTestRenderer'],
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

  it('allows flow content', () => {
    render(
      <TabContext value="0">
        <TabPanel value="0">
          <h2>Panel 0</h2>
          <p>The content of panel 0</p>
        </TabPanel>
      </TabContext>,
    );
  });
});
