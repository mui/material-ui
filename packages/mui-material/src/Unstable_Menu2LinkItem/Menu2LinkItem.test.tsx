import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2LinkItem, {
  menu2LinkItemClasses as classes,
} from '@mui/material/Unstable_Menu2LinkItem';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2LinkItem />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2LinkItem href="/profile">Profile</Menu2LinkItem>, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            {node}
          </Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLAnchorElement,
    muiName: 'MuiMenu2LinkItem',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  // An anchor without `href` takes the same non-native path as the other items,
  // where Base UI and ButtonBase both emulate the keyboard activation.
  it('fires once per keyboard activation without an href', async () => {
    const onClick = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2LinkItem closeOnClick={false} onClick={onClick}>
          Profile
        </Menu2LinkItem>
      </Menu2>,
    );

    const item = screen.getByRole('menuitem', { name: 'Profile' });
    await act(async () => {
      item.focus();
    });

    await user.keyboard('[Space]');
    expect(onClick.callCount).to.equal(1);

    await user.keyboard('[Enter]');
    expect(onClick.callCount).to.equal(2);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  (['pointer', 'Enter', 'Space'] as const).forEach((activation) => {
    it(`preserves a real link after ${activation} activation without closing by default`, async () => {
      const onClick = spy((event: React.MouseEvent<HTMLAnchorElement>) => {
        expect(event.defaultPrevented).to.equal(false);
        event.preventDefault();
      });
      const onOpenChange = spy();
      const { user } = render(
        <Menu2 defaultOpen modal={false} anchor={document.body} onOpenChange={onOpenChange}>
          <Menu2LinkItem href="/profile" onClick={onClick}>
            Profile
          </Menu2LinkItem>
        </Menu2>,
      );

      const item = screen.getByRole('menuitem', { name: 'Profile' });
      expect(item.tagName).to.equal('A');
      expect(item).to.have.attribute('href', '/profile');

      if (activation === 'pointer') {
        await user.click(item);
      } else {
        await act(async () => {
          item.focus();
        });
        await user.keyboard(`[${activation}]`);
      }

      expect(onClick.callCount).to.equal(1);
      expect(onOpenChange.callCount).to.equal(0);
      expect(screen.getByRole('menu')).not.to.equal(null);
    });
  });

  it('closes with item-press when closeOnClick is true', async () => {
    const onClick = spy((event: React.MouseEvent<HTMLAnchorElement>) => {
      expect(event.defaultPrevented).to.equal(false);
      event.preventDefault();
    });
    const onOpenChange = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body} onOpenChange={onOpenChange}>
        <Menu2LinkItem href="/profile" closeOnClick onClick={onClick}>
          Profile
        </Menu2LinkItem>
      </Menu2>,
    );

    await user.click(screen.getByRole('menuitem', { name: 'Profile' }));

    expect(onClick.callCount).to.equal(1);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });
    expect(onOpenChange.callCount).to.equal(1);
    expect(onOpenChange.args[0][0]).to.equal(false);
    expect(onOpenChange.args[0][1].reason).to.equal('item-press');
  });
});
