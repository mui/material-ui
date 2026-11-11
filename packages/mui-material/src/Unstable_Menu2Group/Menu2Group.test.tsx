import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Group, { menu2GroupClasses as classes } from '@mui/material/Unstable_Menu2Group';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Group />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Group>Group</Menu2Group>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>{node}</Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    slots: { root: { expectedClassName: classes.root } },
    muiName: 'MuiMenu2Group',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  it('preserves labels, props, refs, and handlers on a custom render element', async () => {
    const groupRef = React.createRef<HTMLElement>();
    const renderRef = React.createRef<HTMLElement>();
    const slotRef = React.createRef<HTMLDivElement>();
    const onClick = vi.fn();
    const onRenderClick = vi.fn();
    const onSlotClick = vi.fn();
    let received: string[] = [];
    const CustomRoot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
      function CustomRoot(props, ref) {
        received = Object.keys(props);
        return <section {...props} ref={ref} />;
      },
    );
    const { user, unmount } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Group
            ref={groupRef}
            onClick={onClick}
            className="external-group"
            title="Account actions"
            slotProps={{ root: { ref: slotRef, onClick: onSlotClick, className: 'slot-group' } }}
            render={
              <CustomRoot
                ref={renderRef}
                onClick={onRenderClick}
                className="custom-group"
                data-custom="value"
              />
            }
          >
            <Menu2GroupLabel>Account</Menu2GroupLabel>
            <Menu2Item closeOnClick={false}>Profile</Menu2Item>
          </Menu2Group>
        </Menu2Popup>
      </Menu2>,
    );
    const group = screen.getByRole('group', { name: 'Account' });
    const label = screen.getByText('Account');
    const item = screen.getByRole('menuitem', { name: 'Profile' });
    expect(group.tagName).to.equal('SECTION');
    expect(groupRef.current).to.equal(group);
    expect(renderRef.current).to.equal(group);
    expect(slotRef.current).to.equal(group);
    expect(group).to.have.attribute('aria-labelledby', label.id);
    expect(group).to.have.attribute('title', 'Account actions');
    expect(group).to.have.attribute('data-custom', 'value');
    [classes.root, 'external-group', 'custom-group', 'slot-group'].forEach((className) =>
      expect(group).to.have.class(className),
    );
    expect(label.parentElement).to.equal(group);
    expect(item.parentElement).to.equal(group);
    ['ownerState', 'sx', 'classes', 'internalRender', 'internalRenderState'].forEach((prop) =>
      expect(received).not.to.include(prop),
    );

    await user.click(item);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onRenderClick).toHaveBeenCalledTimes(1);
    expect(onSlotClick).toHaveBeenCalledTimes(1);
    unmount();
    expect(groupRef.current).to.equal(null);
    expect(renderRef.current).to.equal(null);
    expect(slotRef.current).to.equal(null);
  });

  it('keeps theme defaults, variants, and sx with an empty render state', () => {
    const states: object[] = [];
    const theme = createTheme({
      spacing: 10,
      components: {
        MuiMenu2Group: {
          defaultProps: {
            render: (props, state) => {
              states.push(state);
              return <section {...props} />;
            },
          },
          styleOverrides: { root: { paddingLeft: '13px' } },
          variants: [{ props: { title: 'Actions' }, style: { paddingBottom: '19px' } }],
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Group
              title="Actions"
              sx={[false, (t) => ({ paddingRight: t.spacing(3), paddingTop: '7px' })]}
              slotProps={{ root: { sx: { paddingRight: '41px' } } }}
            >
              <Menu2GroupLabel>Account</Menu2GroupLabel>
              <Menu2Item>Profile</Menu2Item>
            </Menu2Group>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );
    const group = screen.getByRole('group', { name: 'Account' });
    expect(group.tagName).to.equal('SECTION');
    expect(group).to.have.class(classes.root);
    const styles = getComputedStyle(group);
    expect(styles.paddingLeft).to.equal('13px');
    expect(styles.paddingBottom).to.equal('19px');
    expect(styles.paddingRight).to.equal('41px');
    expect(styles.paddingTop).to.equal('7px');
    expect(states.length).to.be.greaterThan(0);
    states.forEach((state) => expect(state).to.deep.equal({}));
    expect(group).not.to.have.attribute('ownerState');
    expect(group).not.to.have.attribute('sx');
  });

  ['host', 'custom'].forEach((rootType) => {
    it(`replaces the styled root with a ${rootType} slot and keeps the group label`, async () => {
      const renderGroup = vi.fn(() => <section />);
      const groupRef = React.createRef<HTMLElement>();
      const slotRef = React.createRef<HTMLDivElement>();
      let received: string[] = [];
      const CustomRoot = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement> & { ownerState?: object; sx?: unknown }
      >(function CustomRoot({ ownerState, sx, ...props }, ref) {
        received = Object.keys(props);
        return <div {...props} ref={ref} />;
      });
      const theme = createTheme({
        components: {
          MuiMenu2Group: {
            styleOverrides: { root: { paddingLeft: '13px' } },
            variants: [{ props: { title: 'Actions' }, style: { paddingBottom: '19px' } }],
          },
        },
      });
      const { user, unmount } = render(
        <ThemeProvider theme={theme}>
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body}>
              <Menu2Group
                ref={groupRef}
                title="Actions"
                render={renderGroup}
                slots={{ root: rootType === 'host' ? 'div' : CustomRoot }}
                slotProps={{ root: () => ({ ref: slotRef, 'data-slot': 'root' }) }}
                sx={{ paddingRight: '31px' }}
              >
                <Menu2GroupLabel>Account</Menu2GroupLabel>
                <Menu2Item closeOnClick={false}>Profile</Menu2Item>
              </Menu2Group>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );
      const group = screen.getByRole('group', { name: 'Account' });
      const item = screen.getByRole('menuitem', { name: 'Profile' });
      expect(group.tagName).to.equal('DIV');
      expect(groupRef.current).to.equal(group);
      expect(slotRef.current).to.equal(group);
      expect(group).to.have.attribute('aria-labelledby', screen.getByText('Account').id);
      expect(group).to.have.attribute('data-slot', 'root');
      expect(group).to.have.class(classes.root);
      expect(item.parentElement).to.equal(group);
      expect(renderGroup).not.toHaveBeenCalled();
      const styles = getComputedStyle(group);
      expect(styles.paddingLeft).not.to.equal('13px');
      expect(styles.paddingBottom).not.to.equal('19px');
      expect(styles.paddingRight).not.to.equal('31px');
      ['as', 'component', 'classes', 'internalRender', 'internalRenderState'].forEach((prop) =>
        expect(received).not.to.include(prop),
      );
      ['ownerState', 'sx', 'internalRender', 'internalRenderState'].forEach((prop) =>
        expect(group).not.to.have.attribute(prop),
      );
      await user.click(item);
      expect(screen.getByRole('group', { name: 'Account' })).to.equal(group);
      unmount();
      expect(groupRef.current).to.equal(null);
      expect(slotRef.current).to.equal(null);
    });
  });

  [false, true].forEach((replaceRoot) => {
    it(`keeps keyboard navigation and typeahead across a custom group root, slot=${replaceRoot}`, async () => {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup transitionDuration={0}>
            <Menu2Item>Before</Menu2Item>
            <Menu2Group
              render={(props) => <section {...props} />}
              slots={replaceRoot ? { root: 'section' } : undefined}
            >
              <Menu2GroupLabel>Actions</Menu2GroupLabel>
              <Menu2Item>Account</Menu2Item>
              <Menu2Item>Zebra</Menu2Item>
            </Menu2Group>
            <Menu2Item>After</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Before' })).toHaveFocus();
      await user.keyboard('z');
      const zebra = screen.getByRole('menuitem', { name: 'Zebra' });
      expect(zebra).toHaveFocus();
      expect(zebra.parentElement).to.equal(screen.getByRole('group', { name: 'Actions' }));
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'After' })).toHaveFocus();
      await user.keyboard('{ArrowUp}');
      expect(zebra).toHaveFocus();
    });
  });
});
