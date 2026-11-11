import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import type { Menu2RadioItemProps } from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItem, {
  menu2RadioItemClasses as classes,
} from '@mui/material/Unstable_Menu2RadioItem';
import describeConformance from '../../test/describeConformance';

const renderCases: {
  name: string;
  render?: Menu2RadioItemProps['render'];
  slots?: Menu2RadioItemProps['slots'];
  nativeButton?: boolean;
}[] = [
  { name: 'default root' },
  { name: 'render element', render: <div /> },
  { name: 'render callback', render: (props) => <div {...props} /> },
  { name: 'native button', render: <button type="button" /> },
  { name: 'root slot div', slots: { root: 'div' }, render: <button /> },
  { name: 'root slot button', slots: { root: 'button' }, render: <div /> },
  {
    name: 'native button callback',
    render: (props) => <button {...props} type="button" />,
    nativeButton: true,
  },
];

describe('<Menu2RadioItem />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2RadioItem value="one">One</Menu2RadioItem>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2RadioGroup>{node}</Menu2RadioGroup>
          </Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    slots: {
      root: { expectedClassName: classes.root },
      indicator: { expectedClassName: classes.indicator },
      indicatorIcon: { expectedClassName: classes.indicatorIcon },
    },
    muiName: 'MuiMenu2RadioItem',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  it('replaces the styled root and keeps the checked state and indicator slots', async () => {
    const renderItem = vi.fn(() => <div />);
    const slotRef = React.createRef<HTMLDivElement>();
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2RadioGroup defaultValue="one">
            <Menu2RadioItem
              value="two"
              render={renderItem}
              slots={{ root: 'div', indicatorIcon: 'span' }}
              slotProps={{
                root: (state) => ({ ref: slotRef, 'data-slot-checked': String(state.checked) }),
                indicator: { 'data-testid': 'indicator' },
                indicatorIcon: { children: '•', 'data-testid': 'icon' },
              }}
              sx={{ paddingLeft: '31px' }}
            >
              Two
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );
    const item = screen.getByRole('menuitemradio', { name: 'Two' });
    const indicator = screen.getByTestId('indicator');
    expect(slotRef.current).to.equal(item);
    expect(item).to.have.attribute('data-slot-checked', 'false');
    expect(item).not.to.have.class('MuiButtonBase-root');
    expect(getComputedStyle(item).display).not.to.equal('flex');
    expect(getComputedStyle(item).paddingLeft).not.to.equal('31px');
    expect(indicator).to.have.class(classes.indicator);
    expect(screen.getByTestId('icon')).to.have.text('•');
    expect(renderItem).not.toHaveBeenCalled();

    await user.click(item);
    expect(item).to.have.attribute('aria-checked', 'true');
    expect(item).to.have.attribute('data-slot-checked', 'true');
    expect(indicator).to.have.attribute('data-checked');
    expect(screen.getByTestId('indicator')).to.equal(indicator);
    expect(slotRef.current).to.equal(item);
  });

  // The item root is a ButtonBase. Base UI and ButtonBase both emulate keyboard
  // activation on a non-native root, which used to select the item twice.
  renderCases.forEach(({ name, render: renderProp, nativeButton, slots }) => {
    it(`selects once per activation with a ${name} and keeps the menu open by default`, async () => {
      const onValueChange = spy();
      const onOpenChange = spy();
      const { user } = render(
        <Menu2 defaultOpen modal={false} onOpenChange={onOpenChange}>
          <Menu2Popup anchor={document.body}>
            <Menu2RadioGroup defaultValue="one" onValueChange={onValueChange}>
              <Menu2RadioItem
                value="two"
                render={renderProp}
                nativeButton={nativeButton}
                slots={slots}
                slotProps={{ root: (state) => ({ 'data-slot-checked': String(state.checked) }) }}
              >
                Two
              </Menu2RadioItem>
            </Menu2RadioGroup>
          </Menu2Popup>
        </Menu2>,
      );

      const item = screen.getByRole('menuitemradio', { name: 'Two' });
      await act(async () => {
        item.focus();
      });

      await user.keyboard('[Space]');
      expect(onValueChange.callCount).to.equal(1);
      expect(onValueChange.lastCall.args[0]).to.equal('two');
      expect(item).to.have.attribute('aria-checked', 'true');
      expect(item).to.have.attribute('data-slot-checked', 'true');
      expect(onOpenChange.callCount).to.equal(0);

      await user.keyboard('[Enter]');
      expect(onValueChange.callCount).to.equal(2);
      expect(onValueChange.lastCall.args[0]).to.equal('two');
      expect(onOpenChange.callCount).to.equal(0);

      await user.click(item);
      expect(onValueChange.callCount).to.equal(3);
      expect(onValueChange.lastCall.args[0]).to.equal('two');
      expect(item).to.have.attribute('aria-checked', 'true');
      expect(onOpenChange.callCount).to.equal(0);
      expect(screen.getByRole('menu')).not.to.equal(null);
    });
  });
});
