import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { menu2TriggerClasses } from '@mui/material/Unstable_Menu2';
import Menu2Popup from '@mui/material/Unstable_Menu2/Menu2Popup';
import { resetMenu2WarningFlags } from '@mui/material/Unstable_Menu2/menu2Utils';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Trigger />', () => {
  const { render } = createRenderer();

  beforeEach(() => {
    resetMenu2WarningFlags();
  });

  describeConformance(
    <Menu2Trigger>
      <button type="button">Actions</button>
    </Menu2Trigger>,
    () => ({
      classes: menu2TriggerClasses,
      inheritComponent: 'button',
      render: (node) => render(node, { wrapper: BaseMenu.Root }),
      refInstanceof: window.HTMLButtonElement,
      muiName: 'MuiMenu2Trigger',
      // This behavioral wrapper styles its child through className, not a
      // classes/component prop or styled slots. Theme default props still apply.
      skip: ['classesRoot', 'componentProp', 'themeStyleOverrides', 'themeVariants'],
    }),
  );

  it('warns once for a fragment without a secondary missing-ref warning', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { setProps } = render(
        <Menu2Trigger>
          <React.Fragment>
            <button type="button">First</button>
            <button type="button">Second</button>
          </React.Fragment>
        </Menu2Trigger>,
        { wrapper: BaseMenu.Root },
      );
      setProps({ 'aria-label': 'Updated actions' });

      const warnings = error.mock.calls.filter(([message]) => String(message).startsWith('MUI:'));
      expect(warnings).to.have.length(1);
      expect(warnings[0][0]).to.contain(
        'The `children` prop of `Menu2Trigger` cannot be a fragment',
      );
    } finally {
      error.mockRestore();
    }
  });

  it('warns once when a forwardRef child drops the ref', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const RefDroppingChild = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
      function RefDroppingChild(props, _ref) {
        return <button type="button" {...props} />;
      },
    );

    try {
      const { setProps } = render(
        <Menu2Trigger>
          <RefDroppingChild>Actions</RefDroppingChild>
        </Menu2Trigger>,
        { wrapper: BaseMenu.Root },
      );
      setProps({ 'aria-label': 'Updated actions' });

      const warnings = error.mock.calls.filter(([message]) => String(message).startsWith('MUI:'));
      expect(warnings).to.have.length(1);
      expect(warnings[0][0]).to.contain(
        'The `children` element of `Menu2Trigger` did not receive a ref',
      );
    } finally {
      error.mockRestore();
    }
  });

  it('forwards props and merges child refs and handlers without a wrapping element', async () => {
    const childRef = React.createRef<HTMLButtonElement>();
    const triggerRef = React.createRef<HTMLElement>();
    const childClick = vi.fn();
    const triggerClick = vi.fn();
    const { user, unmount } = render(
      <BaseMenu.Root>
        <div data-testid="container">
          <Menu2Trigger
            ref={triggerRef}
            className="trigger-class"
            data-testid="trigger"
            title="Open actions"
            onClick={triggerClick}
          >
            <Button ref={childRef} className="child-class" onClick={childClick} disableRipple>
              Actions
            </Button>
          </Menu2Trigger>
        </div>
        <Menu2Popup ownerState={{}} transitionDuration={0}>
          <Menu2Item>Item</Menu2Item>
        </Menu2Popup>
      </BaseMenu.Root>,
    );
    const button = screen.getByRole('button', { name: 'Actions' });
    const container = screen.getByTestId('container');

    expect(container.children).to.have.length(1);
    expect(button.parentElement).to.equal(container);
    expect(screen.getByTestId('trigger')).to.equal(button);
    expect(button).to.have.attribute('title', 'Open actions');
    expect(button).to.have.class('child-class');
    expect(button).to.have.class('trigger-class');
    expect(button).to.have.class(menu2TriggerClasses.root);
    expect(childRef.current).to.equal(button);
    expect(triggerRef.current).to.equal(button);

    await user.click(button);

    expect(await screen.findByRole('menu')).not.to.equal(null);
    expect(childClick).toHaveBeenCalledTimes(1);
    expect(triggerClick).toHaveBeenCalledTimes(1);
    expect(button.parentElement).to.equal(container);
    unmount();
    expect(childRef.current).to.equal(null);
    expect(triggerRef.current).to.equal(null);
  });

  it('forwards Tooltip props and its ref to the child', async () => {
    const { user } = render(
      <BaseMenu.Root>
        <Tooltip title="Document actions" describeChild enterDelay={0} leaveDelay={0}>
          <Menu2Trigger>
            <Button disableRipple>Actions</Button>
          </Menu2Trigger>
        </Tooltip>
        <Menu2Popup ownerState={{}} transitionDuration={0}>
          <Menu2Item>Rename</Menu2Item>
        </Menu2Popup>
      </BaseMenu.Root>,
    );
    const button = screen.getByRole('button', { name: 'Actions' });

    await user.hover(button);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).to.have.text('Document actions');
    expect(button).to.have.attribute('aria-describedby', tooltip.id);
    await user.unhover(button);
    await waitFor(() => expect(screen.queryByRole('tooltip')).to.equal(null));
    await user.click(button);

    expect(await screen.findByRole('menu', { name: 'Actions' })).not.to.equal(null);
  });

  it('supports a non-native button child', async () => {
    const { user } = render(
      <BaseMenu.Root>
        <Menu2Trigger nativeButton={false}>
          <span role="button" tabIndex={0}>
            Actions
          </span>
        </Menu2Trigger>
        <Menu2Popup ownerState={{}} transitionDuration={0}>
          <Menu2Item>Item</Menu2Item>
        </Menu2Popup>
      </BaseMenu.Root>,
    );
    const button = screen.getByRole('button', { name: 'Actions' });

    expect(button.tagName).to.equal('SPAN');
    expect(button).not.to.have.attribute('nativebutton');
    await act(async () => button.focus());
    await user.keyboard('{Enter}');

    expect(await screen.findByRole('menu', { name: 'Actions' })).not.to.equal(null);
    await waitFor(() =>
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Item' })),
    );
  });

  it('does not open the menu from a disabled trigger', async () => {
    const changed = vi.fn();
    const { user } = render(
      <BaseMenu.Root onOpenChange={changed}>
        <Menu2Trigger disabled>
          <button type="button">Disabled</button>
        </Menu2Trigger>
        <Menu2Popup ownerState={{}} transitionDuration={0}>
          <Menu2Item>Item</Menu2Item>
        </Menu2Popup>
      </BaseMenu.Root>,
    );
    const disabled = screen.getByRole('button', { name: 'Disabled' });

    expect(disabled).to.have.attribute('disabled');
    expect(disabled).to.have.class(menu2TriggerClasses.disabled);
    await user.click(disabled);
    expect(changed).not.toHaveBeenCalled();
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('inherits and updates the disabled state from the menu', async () => {
    function Test() {
      const [disabled, setDisabled] = React.useState(true);
      return (
        <React.Fragment>
          <button type="button" onClick={() => setDisabled(false)}>
            Enable menu
          </button>
          <BaseMenu.Root disabled={disabled}>
            <Menu2Trigger>
              <button type="button">Actions</button>
            </Menu2Trigger>
            <Menu2Popup ownerState={{}} transitionDuration={0}>
              <Menu2Item>Item</Menu2Item>
            </Menu2Popup>
          </BaseMenu.Root>
        </React.Fragment>
      );
    }
    const { user } = render(<Test />);
    const button = screen.getByRole('button', { name: 'Actions' });

    expect(button).to.have.attribute('disabled');
    expect(button).to.have.class(menu2TriggerClasses.disabled);
    await user.click(button);
    expect(screen.queryByRole('menu')).to.equal(null);
    await user.click(screen.getByRole('button', { name: 'Enable menu' }));

    expect(button).not.to.have.attribute('disabled');
    expect(button).not.to.have.class(menu2TriggerClasses.disabled);
    await user.click(button);
    expect(await screen.findByRole('menu', { name: 'Actions' })).not.to.equal(null);
  });

  [false, true].forEach((openOnHover) => {
    it.skipIf(isJsdom())(`respects openOnHover=${openOnHover}`, async () => {
      const { user } = render(
        <BaseMenu.Root>
          <Menu2Trigger openOnHover={openOnHover} delay={0} closeDelay={0}>
            <Button disableRipple>Actions</Button>
          </Menu2Trigger>
          <Menu2Popup ownerState={{}} transitionDuration={0}>
            <Menu2Item>Item</Menu2Item>
          </Menu2Popup>
        </BaseMenu.Root>,
      );
      const trigger = screen.getByRole('button', { name: 'Actions' });

      await user.hover(trigger);

      if (openOnHover) {
        expect(await screen.findByRole('menu', { name: 'Actions' })).not.to.equal(null);
        expect(trigger).to.have.class(menu2TriggerClasses.open);
      } else {
        expect(screen.queryByRole('menu')).to.equal(null);
        expect(trigger).not.to.have.class(menu2TriggerClasses.open);
      }
      await user.unhover(trigger);
    });
  });
});
