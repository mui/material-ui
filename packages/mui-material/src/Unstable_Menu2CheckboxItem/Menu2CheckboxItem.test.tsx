import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem, {
  menu2CheckboxItemClasses as classes,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import describeConformance from '../../test/describeConformance';

describe('<Menu2CheckboxItem />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2CheckboxItem>Ruler</Menu2CheckboxItem>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          {node}
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2CheckboxItem',
    testVariantProps: { checked: true },
  }));

  // The item root is a ButtonBase. Base UI and ButtonBase both emulate keyboard
  // activation on a non-native root, which used to toggle the item twice.
  it('toggles once per activation and keeps the menu open by default', async () => {
    const onCheckedChange = spy();
    const onOpenChange = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body} onOpenChange={onOpenChange}>
        <Menu2CheckboxItem onCheckedChange={onCheckedChange}>Ruler</Menu2CheckboxItem>
      </Menu2>,
    );

    const item = screen.getByRole('menuitemcheckbox', { name: 'Ruler' });
    await act(async () => {
      item.focus();
    });

    await user.keyboard('[Space]');
    expect(onCheckedChange.callCount).to.equal(1);
    expect(onCheckedChange.lastCall.args[0]).to.equal(true);
    expect(item).to.have.attribute('aria-checked', 'true');
    expect(onOpenChange.callCount).to.equal(0);

    await user.keyboard('[Enter]');
    expect(onCheckedChange.callCount).to.equal(2);
    expect(onCheckedChange.lastCall.args[0]).to.equal(false);
    expect(item).to.have.attribute('aria-checked', 'false');
    expect(onOpenChange.callCount).to.equal(0);

    await user.click(item);
    expect(onCheckedChange.callCount).to.equal(3);
    expect(onCheckedChange.lastCall.args[0]).to.equal(true);
    expect(item).to.have.attribute('aria-checked', 'true');
    expect(onOpenChange.callCount).to.equal(0);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });
});
