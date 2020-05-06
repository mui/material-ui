import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TabList from './TabList';
import TabContext from '../TabContext';

describe('<TabList />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<Tabs />);
    mount = createMount({ strict: true });
  });

  describeConformance(<TabList />, () => ({
    classes,
    inheritComponent: Tabs,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [],
    after: () => mount.cleanUp(),
  }));

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
