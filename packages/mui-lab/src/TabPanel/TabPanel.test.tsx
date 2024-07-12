import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import TabPanel, { tabPanelClasses as classes } from '@mui/lab/TabPanel';
import TabContext from '../TabContext';
import describeConformance from '../../test/describeConformance';

describe('<TabPanel />', () => {
  const { render } = createRenderer();

  describeConformance(<TabPanel value="0" />, () => ({
    classes,
    inheritComponent: 'div',
    render: (node) => render(<TabContext value="0">{node}</TabContext>),
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiTabPanel',
    skip: ['componentProp', 'componentsProp', 'themeDefaultProps', 'themeVariants'],
  }));

  it('renders a [role="tabpanel"] and mounts children', () => {
    const { getByTestId, queryByTestId } = render(
      <TabContext value="0">
        <TabPanel data-testid="tabpanel" value="0">
          <div data-testid="child" />
        </TabPanel>
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).to.have.attribute('role', 'tabpanel');
    expect(queryByTestId('child')).not.to.equal(null);
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

  it('is [hidden] when TabPanel#value !== TabContext#value but does mount children when keepMounted', () => {
    const { getByTestId, queryByTestId } = render(
      <TabContext value="1">
        <TabPanel data-testid="tabpanel" value="0" keepMounted>
          <div data-testid="child" />
        </TabPanel>
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).to.have.property('hidden', true);
    expect(queryByTestId('child')).not.to.equal(null);
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
