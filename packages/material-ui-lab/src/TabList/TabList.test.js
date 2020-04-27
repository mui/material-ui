import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import Tab from '@material-ui/core/Tab';
import TabList from './TabList';
import TabContext from '../TabContext';

describe('<TabList />', () => {
  const render = createClientRender();

  // outside of TabContext pass every test in Tabs

  it('provides the active value to Tab so that they can be indicated as active', () => {
    const { getAllByRole } = render(
      <TabContext value={0}>
        <TabList>
          <Tab />
          <Tab />
        </TabList>
      </TabContext>,
    );
    const [tabOne, tabTwo] = getAllByRole('tab');

    expect(tabOne).to.have.attribute('aria-selected', 'true');
    expect(tabTwo).to.have.attribute('aria-selected', 'false');
  });
});
