import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

describe('<TabContext /> integration', () => {
  const render = createClientRender();

  it('wires up aria attributes', () => {
    const { getAllByRole, setProps } = render(
      <TabContext value="0">
        <TabList>
          <Tab label="label one" value="0" />
          <Tab label="label two" value="1" />
        </TabList>
        <TabPanel value="0" />
        <TabPanel value="1" />
      </TabContext>,
    );

    const [tabOne, tabTwo] = getAllByRole('tab');

    expect(tabOne).to.have.attribute('aria-selected', 'true');
    expect(tabTwo).to.have.attribute('aria-selected', 'false');
    let activePanel = document.getElementById(tabOne.getAttribute('aria-controls'));
    expect(activePanel).not.toBeInaccessible();
    expect(activePanel).toHaveAccessibleName('label one');

    setProps({ value: '1' });

    expect(tabOne).to.have.attribute('aria-selected', 'false');
    expect(tabTwo).to.have.attribute('aria-selected', 'true');
    activePanel = document.getElementById(tabTwo.getAttribute('aria-controls'));
    expect(activePanel).not.toBeInaccessible();
    expect(activePanel).toHaveAccessibleName('label two');
  });
});
