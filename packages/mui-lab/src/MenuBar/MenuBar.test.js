import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarPortal,
  MenuBarPositioner,
  MenuBarPopup,
  MenuBarItem,
} from '@mui/lab/MenuBar';

describe('<MenuBar />', () => {
  const { render } = createRenderer();

  it('renders a basic menubar with a trigger', async () => {
    render(
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
      </MenuBar>,
    );

    const menubar = screen.getByRole('menubar');
    expect(menubar).to.not.equal(null);

    const trigger = screen.getByRole('menuitem', { name: 'File' });
    expect(trigger).to.not.equal(null);
  });
});
