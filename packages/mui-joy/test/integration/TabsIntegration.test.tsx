import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

describe('Joy <Tabs />', () => {
  const { render } = createRenderer();

  it('display first tab', () => {
    render(
      <Tabs>
        <TabList>
          <Tab>1</Tab>
          <Tab>2</Tab>
        </TabList>
        <TabPanel>Panel 1</TabPanel>
        <TabPanel value={1}>Panel 2</TabPanel>
      </Tabs>,
    );

    expect(screen.getByText('Panel 1')).toBeVisible();
    expect(screen.queryByText('Panel 2')).to.equal(null);
  });
});
