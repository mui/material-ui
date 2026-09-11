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
  it('toggles once per activation, with the keyboard and with the pointer', async () => {
    const onChange = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2CheckboxItem closeOnClick={false} onChange={onChange}>
          Ruler
        </Menu2CheckboxItem>
      </Menu2>,
    );

    const item = screen.getByRole('menuitemcheckbox', { name: 'Ruler' });
    await act(async () => {
      item.focus();
    });

    await user.keyboard('[Space]');
    expect(onChange.callCount).to.equal(1);
    expect(item).to.have.attribute('aria-checked', 'true');

    await user.keyboard('[Enter]');
    expect(onChange.callCount).to.equal(2);
    expect(item).to.have.attribute('aria-checked', 'false');

    await user.click(item);
    expect(onChange.callCount).to.equal(3);
    expect(item).to.have.attribute('aria-checked', 'true');
  });
});
