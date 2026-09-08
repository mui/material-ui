import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';

describe('Menu2 live checked ownerState', () => {
  const { render } = createRenderer();

  ['checkbox', 'radio'].forEach((kind) => {
    describe(`${kind} item`, () => {
      const role = kind === 'checkbox' ? 'menuitemcheckbox' : 'menuitemradio';
      const slotProps = {
        root: (state: { checked?: boolean }) => ({
          'data-checked': String(state.checked),
          sx: { paddingLeft: state.checked ? '19px' : '11px' },
        }),
        indicator: (state: { checked?: boolean }) => ({ 'data-checked': String(state.checked) }),
      };
      const theme = createTheme({
        components: {
          [kind === 'checkbox' ? 'MuiMenu2CheckboxItem' : 'MuiMenu2RadioItem']: {
            variants: [{ props: { checked: true }, style: { paddingRight: '23px' } }],
          },
        },
      });

      function Fixture({ controlled = false, cancel = false, reject = false }) {
        const [checked, setChecked] = React.useState(true);
        return (
          <ThemeProvider theme={theme}>
            <Menu2
              defaultOpen
              modal={false}
              anchor={document.body}
              onKeyDown={(event) => {
                if (event.key === 'F2') {
                  setChecked((current) => !current);
                }
              }}
            >
              {kind === 'checkbox' ? (
                <Menu2CheckboxItem
                  {...(controlled ? { checked } : { defaultChecked: true })}
                  onChange={(_event, next, details) => {
                    if (cancel) {
                      details.cancel();
                    }
                    if (controlled && !cancel && !reject) {
                      setChecked(next);
                    }
                  }}
                  slotProps={slotProps}
                >
                  One
                </Menu2CheckboxItem>
              ) : (
                <Menu2RadioGroup
                  {...(controlled ? { value: checked ? 'one' : 'two' } : { defaultValue: 'one' })}
                  onChange={(_event, next, details) => {
                    if (cancel) {
                      details.cancel();
                    }
                    if (controlled && !cancel && !reject) {
                      setChecked(next === 'one');
                    }
                  }}
                >
                  <Menu2RadioItem value="one" slotProps={slotProps}>
                    One
                  </Menu2RadioItem>
                  <Menu2RadioItem value="two" slotProps={slotProps}>
                    Two
                  </Menu2RadioItem>
                </Menu2RadioGroup>
              )}
            </Menu2>
          </ThemeProvider>
        );
      }

      function expectState(item: HTMLElement, checked: boolean) {
        expect(item).to.have.attribute('aria-checked', String(checked));
        expect(item).to.have.attribute('data-checked', String(checked));
        expect(item.firstElementChild).to.have.attribute('data-checked', String(checked));
        expect(getComputedStyle(item).paddingLeft).to.equal(checked ? '19px' : '11px');
        expect(getComputedStyle(item).paddingRight).to.equal(checked ? '23px' : '16px');
      }

      [false, true].forEach((controlled) => {
        it(`updates root, indicator and variants for ${controlled ? 'controlled' : 'uncontrolled'} selection`, async () => {
          const { user } = render(<Fixture controlled={controlled} />);
          const one = screen.getByRole(role, { name: 'One' });
          const target = kind === 'checkbox' ? one : screen.getByRole(role, { name: 'Two' });
          expectState(one, true);
          if (kind === 'radio') {
            expectState(target, false);
          }

          await user.click(target);
          expectState(one, false);
          if (kind === 'radio') {
            expectState(target, true);
          }

          await user.click(one);
          expectState(one, true);
          if (kind === 'radio') {
            expectState(target, false);
          }
        });
      });

      ['cancel', 'reject'].forEach((mode) => {
        it(`does not style a ${mode === 'cancel' ? 'canceled' : 'rejected controlled'} selection`, async () => {
          const { user } = render(<Fixture controlled={mode === 'reject'} {...{ [mode]: true }} />);
          const one = screen.getByRole(role, { name: 'One' });
          await user.click(kind === 'checkbox' ? one : screen.getByRole(role, { name: 'Two' }));
          expectState(one, true);
        });
      });

      it('reflects externally changed controlled selection', async () => {
        const { user } = render(<Fixture controlled />);
        const one = screen.getByRole(role, { name: 'One' });
        await act(async () => one.focus());
        expectState(one, true);
        await user.keyboard('{F2}');
        expectState(one, false);
        await user.keyboard('{F2}');
        expectState(one, true);
      });

      it('composes root refs and click handlers without replacing the item after selection', async () => {
        const itemRef = React.createRef<HTMLDivElement>();
        const slotRef = React.createRef<HTMLDivElement>();
        const onClick = vi.fn();
        const onSlotClick = vi.fn();
        const rootProps = { ref: slotRef, onClick: onSlotClick };
        const { user, unmount } = render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            {kind === 'checkbox' ? (
              <Menu2CheckboxItem ref={itemRef} onClick={onClick} slotProps={{ root: rootProps }}>
                One
              </Menu2CheckboxItem>
            ) : (
              <Menu2RadioGroup>
                <Menu2RadioItem
                  value="one"
                  ref={itemRef}
                  onClick={onClick}
                  slotProps={{ root: rootProps }}
                >
                  One
                </Menu2RadioItem>
              </Menu2RadioGroup>
            )}
          </Menu2>,
        );
        const item = screen.getByRole(role, { name: 'One' });
        expect(itemRef.current).to.equal(item);
        expect(slotRef.current).to.equal(item);

        await user.click(item);
        expect(item).to.have.attribute('aria-checked', 'true');
        expect(itemRef.current).to.equal(item);
        expect(slotRef.current).to.equal(item);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onSlotClick).toHaveBeenCalledTimes(1);

        unmount();
        expect(itemRef.current).to.equal(null);
        expect(slotRef.current).to.equal(null);
      });
    });
  });
});
