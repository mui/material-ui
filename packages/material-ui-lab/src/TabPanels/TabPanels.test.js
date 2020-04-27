import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import TabPanels from './TabPanels';
import TabContext from '../TabContext';

describe('<TabPanels />', () => {
  const render = createClientRender();

  it('does nothing outside of TabContext', () => {
    const { getAllByRole } = render(
      <TabPanels>
        <div role="tabpanel" />
        <div role="tabpanel" />
      </TabPanels>,
    );

    const panels = getAllByRole('tabpanel');
    expect(panels).to.have.length(2);
    expect(panels[0]).to.have.property('id', '');
    expect(panels[0]).not.to.have.attribute('aria-labelledby');
    expect(panels[1]).to.have.property('id', '');
    expect(panels[1]).not.to.have.attribute('aria-labelledby');
  });

  it('injects activeValue and value', () => {
    function TabPanel({ activeValue, value }) {
      return <div role="tabpanel" data-active-value={activeValue} data-value={value} />;
    }

    const { getAllByRole } = render(
      <TabContext value={0}>
        <TabPanels>
          <TabPanel />
          <TabPanel />
        </TabPanels>
      </TabContext>,
    );
    const [panelOne, panelTwo] = getAllByRole('tabpanel');

    expect(panelOne).to.have.attribute('data-active-value', '0');
    expect(panelOne).to.have.attribute('data-value', '0');
    expect(panelTwo).to.have.attribute('data-active-value', '0');
    expect(panelTwo).to.have.attribute('data-value', '1');
  });
});
