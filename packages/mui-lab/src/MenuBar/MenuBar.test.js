import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { MenuBar, MenuBarMenu, MenuBarTrigger, MenuBarPortal, MenuBarPositioner, MenuBarPopup, MenuBarItem } from '@mui/lab/MenuBar';

describe('<MenuBar />', () => {
  const { render } = createRenderer();

  it('renders a basic menubar with a trigger', async () => {
    const { getByRole } = render(
      <MenuBar>
        <MenuBarMenu>
          <MenuBarTrigger>File</MenuBarTrigger>
          <MenuBarPortal>
            <MenuBarPositioner>
              <MenuBarPopup>
                <MenuBarItem>New Tab</MenuBarItem>
              </MenuBarPopup>
            </MenuBarPositioner>
          </MenuBarPortal>
        </MenuBarMenu>
      </MenuBar>
    );

    const menubar = getByRole('menubar');
    expect(menubar).to.not.equal(null);

    const trigger = getByRole('menuitem', { name: 'File' });
    expect(trigger).to.not.equal(null);
  });
});
