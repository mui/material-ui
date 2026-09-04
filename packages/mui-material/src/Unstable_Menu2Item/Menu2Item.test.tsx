import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item, { menu2ItemClasses as classes } from '@mui/material/Unstable_Menu2Item';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Item />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Item>Item</Menu2Item>, () => ({
    classes,
    render: (node) => {
      const { container, ...other } = render(
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          {node}
        </Menu2>,
      );
      // The popup renders in a portal; hand the harness a container whose
      // firstChild is the item root (the conformance contract).
      const item = document.querySelector('[role="menuitem"]')!;
      return { ...other, container: { firstChild: item } as unknown as HTMLElement };
    },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2Item',
    testVariantProps: { dense: true },
  }));

  // `disableRipple` is internal to `ButtonBase`. A custom root slot does not
  // reach it, so React warns if the slot spreads it onto the DOM.
  it('does not forward the internal ButtonBase props to a custom root slot', async () => {
    let received: string[] = [];
    const CustomRoot = React.forwardRef(function CustomRoot(
      { ownerState, ...other }: any,
      ref: React.Ref<HTMLDivElement>,
    ) {
      received = Object.keys(other);
      return <div ref={ref} {...other} />;
    });

    render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2Item slots={{ root: CustomRoot }}>Item</Menu2Item>
      </Menu2>,
    );

    await screen.findByRole('menuitem', { name: 'Item' });
    // The slot is in use, so the assertion below is not vacuous.
    expect(received).to.include('className');
    expect(received).not.to.include('disableRipple');
  });

  // The item root is a ButtonBase. Base UI and ButtonBase both emulate keyboard
  // activation on a non-native root, which used to fire the item twice.
  it('fires once per activation without closing when closeOnClick is false', async () => {
    const onClick = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2Item closeOnClick={false} onClick={onClick}>
          Item
        </Menu2Item>
      </Menu2>,
    );

    const item = screen.getByRole('menuitem', { name: 'Item' });
    await act(async () => {
      item.focus();
    });

    await user.keyboard('[Space]');
    expect(onClick.callCount).to.equal(1);

    await user.keyboard('[Enter]');
    expect(onClick.callCount).to.equal(2);

    await user.click(item);
    expect(onClick.callCount).to.equal(3);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  (['pointer', 'Enter', 'Space'] as const).forEach((activation) => {
    it(`closes by default after ${activation} activation`, async () => {
      const onClick = spy();
      const onOpenChange = spy();
      const { user } = render(
        <Menu2 defaultOpen modal={false} anchor={document.body} onOpenChange={onOpenChange}>
          <Menu2Item onClick={onClick}>Item</Menu2Item>
        </Menu2>,
      );

      const item = screen.getByRole('menuitem', { name: 'Item' });
      onOpenChange.resetHistory();

      if (activation === 'pointer') {
        await user.click(item);
      } else {
        await act(async () => {
          item.focus();
        });
        await user.keyboard(`[${activation}]`);
      }

      expect(onClick.callCount).to.equal(1);
      await waitFor(() => {
        expect(screen.queryByRole('menu')).to.equal(null);
      });
      expect(onOpenChange.callCount).to.equal(1);
      expect(onOpenChange.args[0][0]).to.equal(false);
      expect(onOpenChange.args[0][1].reason).to.equal('item-press');
    });
  });
});
