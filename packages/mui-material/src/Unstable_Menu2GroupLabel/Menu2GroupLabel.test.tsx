import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2GroupLabel, {
  menu2GroupLabelClasses as classes,
} from '@mui/material/Unstable_Menu2GroupLabel';
import describeConformance from '../../test/describeConformance';

const groupCases = [
  { name: 'Group', Group: Menu2Group, item: <Menu2Item>Profile</Menu2Item> },
  {
    name: 'RadioGroup',
    Group: Menu2RadioGroup,
    item: <Menu2RadioItem value="profile">Profile</Menu2RadioItem>,
  },
];

describe('<Menu2GroupLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2GroupLabel>Section</Menu2GroupLabel>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Group>{node}</Menu2Group>
          </Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    muiName: 'MuiMenu2GroupLabel',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  groupCases.forEach(({ name, Group, item }) => {
    it(`keeps the ${name} label association, refs, and handlers on a custom render element`, async () => {
      const labelRef = React.createRef<HTMLElement>();
      const renderRef = React.createRef<HTMLHeadingElement>();
      const onClick = vi.fn();
      const onRenderClick = vi.fn();
      let received: string[] = [];
      const CustomLabel = React.forwardRef<
        HTMLHeadingElement,
        React.HTMLAttributes<HTMLHeadingElement>
      >(function CustomLabel(props, ref) {
        received = Object.keys(props);
        return (
          <h3 {...props} ref={ref}>
            {props.children}
          </h3>
        );
      });
      const { user, unmount } = render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Group>
              <Menu2GroupLabel
                ref={labelRef}
                onClick={onClick}
                className="external-label"
                title="Account actions"
                render={
                  <CustomLabel
                    ref={renderRef}
                    onClick={onRenderClick}
                    className="custom-label"
                    data-custom="value"
                  />
                }
              >
                Account
              </Menu2GroupLabel>
              {item}
            </Group>
          </Menu2Popup>
        </Menu2>,
      );
      const group = screen.getByRole('group', { name: 'Account' });
      const label = screen.getByText('Account');
      expect(label.tagName).to.equal('H3');
      expect(labelRef.current).to.equal(label);
      expect(renderRef.current).to.equal(label);
      expect(label.parentElement).to.equal(group);
      expect(label.id).not.to.equal('');
      expect(group).to.have.attribute('aria-labelledby', label.id);
      expect(label).to.have.attribute('aria-hidden', 'true');
      expect(label).to.have.attribute('title', 'Account actions');
      expect(label).to.have.attribute('data-custom', 'value');
      [classes.root, 'MuiListSubheader-root', 'external-label', 'custom-label'].forEach(
        (className) => expect(label).to.have.class(className),
      );
      expect(getComputedStyle(label).lineHeight).to.equal('48px');
      expect(getComputedStyle(label).paddingLeft).to.equal('16px');
      expect(label).not.to.have.class('MuiListSubheader-sticky');
      expect(getComputedStyle(label).position).not.to.equal('sticky');
      [
        'color',
        'component',
        'disableSticky',
        'disableGutters',
        'inset',
        'ownerState',
        'sx',
        'internalRender',
        'internalRenderState',
      ].forEach((prop) => expect(received).not.to.include(prop));

      await user.click(label);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onRenderClick).toHaveBeenCalledTimes(1);
      unmount();
      expect(labelRef.current).to.equal(null);
      expect(renderRef.current).to.equal(null);
    });
  });

  groupCases.forEach(({ name, Group, item }) => {
    it(`keeps the ${name} label association and Material styles with a render callback`, () => {
      const states: object[] = [];
      const theme = createTheme({
        spacing: 10,
        components: {
          MuiMenu2GroupLabel: {
            defaultProps: {
              render: (props, state) => {
                states.push(state);
                return <h3 {...props}>{props.children}</h3>;
              },
            },
            styleOverrides: { root: { paddingTop: '13px' } },
            variants: [{ props: { title: 'Actions' }, style: { paddingBottom: '19px' } }],
          },
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <Menu2 defaultOpen modal={false}>
            <Menu2Popup anchor={document.body}>
              <Group>
                <Menu2GroupLabel
                  title="Actions"
                  sx={[false, (t) => ({ paddingRight: t.spacing(3) })]}
                >
                  Account
                </Menu2GroupLabel>
                {item}
              </Group>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );
      const group = screen.getByRole('group', { name: 'Account' });
      const label = screen.getByText('Account');
      expect(label.tagName).to.equal('H3');
      expect(label.id).not.to.equal('');
      expect(group).to.have.attribute('aria-labelledby', label.id);
      expect(label).to.have.attribute('aria-hidden', 'true');
      const styles = getComputedStyle(label);
      expect(label).to.have.class('MuiListSubheader-root');
      expect(styles.lineHeight).to.equal('48px');
      expect(styles.paddingLeft).to.equal('16px');
      expect(label).not.to.have.class('MuiListSubheader-sticky');
      expect(styles.position).not.to.equal('sticky');
      expect(styles.paddingTop).to.equal('13px');
      expect(styles.paddingBottom).to.equal('19px');
      expect(styles.paddingRight).to.equal('30px');
      expect(states.length).to.be.greaterThan(0);
      states.forEach((state) => expect(state).to.deep.equal({}));
      expect(label).not.to.have.attribute('ownerState');
      expect(label).not.to.have.attribute('sx');
    });
  });

  it('applies top-level visual props to default, element, and callback roots', () => {
    const theme = createTheme({ palette: { primary: { main: 'rgb(1, 2, 3)' } } });
    const renderCases = [
      { name: 'Default', render: undefined },
      { name: 'Element', render: <span /> },
      {
        name: 'Callback',
        render: (props: React.HTMLAttributes<HTMLElement>, state: object) => {
          expect(state).to.deep.equal({});
          expect(props).not.to.have.property('color');
          expect(props).not.to.have.property('disableGutters');
          expect(props).not.to.have.property('inset');
          return <span {...props} />;
        },
      },
    ];
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            {renderCases.map(({ name, render: renderProp }) => (
              <Menu2Group key={name}>
                <Menu2GroupLabel
                  color="primary"
                  disableGutters
                  inset
                  sx={{ paddingRight: '30px', paddingTop: '23px' }}
                  render={renderProp}
                >
                  {name}
                </Menu2GroupLabel>
              </Menu2Group>
            ))}
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );
    renderCases.forEach(({ name }) => {
      const label = screen.getByText(name);
      expect(label.tagName).to.equal(name === 'Default' ? 'DIV' : 'SPAN');
      expect(label).to.have.class('MuiListSubheader-colorPrimary');
      expect(label).to.have.class('MuiListSubheader-inset');
      expect(label).not.to.have.class('MuiListSubheader-gutters');
      expect(label).not.to.have.class('MuiListSubheader-sticky');
      expect(getComputedStyle(label).position).not.to.equal('sticky');
      expect(getComputedStyle(label).paddingLeft).to.equal('72px');
      expect(getComputedStyle(label).paddingRight).to.equal('30px');
      expect(getComputedStyle(label).paddingTop).to.equal('23px');
      expect(getComputedStyle(label).color).to.equal('rgb(1, 2, 3)');
      ['color', 'disableGutters', 'disableSticky', 'inset', 'ownerState', 'sx'].forEach((prop) =>
        expect(label).not.to.have.attribute(prop),
      );
      expect(
        label.className.split(/\s+/).filter((className) => className === 'MuiListSubheader-root'),
      ).to.have.length(1);
    });
  });

  it('keeps ListSubheader theme defaults and overrides with custom roots', () => {
    const theme = createTheme({
      components: {
        MuiListSubheader: {
          defaultProps: {
            color: 'primary',
            disableGutters: true,
            inset: true,
            disableSticky: false,
          },
          styleOverrides: { root: { backgroundColor: 'rgb(9, 8, 7)' } },
          variants: [{ props: { inset: true }, style: { paddingTop: '11px' } }],
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Group>
              <Menu2GroupLabel>Default</Menu2GroupLabel>
            </Menu2Group>
            <Menu2Group>
              <Menu2GroupLabel
                color="inherit"
                disableGutters={false}
                inset={false}
                render={<span />}
              >
                Override
              </Menu2GroupLabel>
            </Menu2Group>
            <Menu2Group>
              <Menu2GroupLabel render={<span />}>Element</Menu2GroupLabel>
            </Menu2Group>
            <Menu2Group>
              <Menu2GroupLabel render={(props) => <span {...props} />}>Callback</Menu2GroupLabel>
            </Menu2Group>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );
    ['Default', 'Element', 'Callback'].forEach((name) => {
      const label = screen.getByText(name);
      expect(label.tagName).to.equal(name === 'Default' ? 'DIV' : 'SPAN');
      expect(label).to.have.class(classes.root);
      expect(label).to.have.class('MuiListSubheader-root');
      expect(label).to.have.class('MuiListSubheader-colorPrimary');
      expect(label).to.have.class('MuiListSubheader-inset');
      expect(label).not.to.have.class('MuiListSubheader-gutters');
      expect(label).not.to.have.class('MuiListSubheader-sticky');
      expect(getComputedStyle(label).position).not.to.equal('sticky');
      expect(getComputedStyle(label).paddingLeft).to.equal('72px');
      expect(getComputedStyle(label).paddingTop).to.equal('11px');
      expect(getComputedStyle(label).backgroundColor).to.equal('rgb(9, 8, 7)');
    });

    const overrideLabel = screen.getByText('Override');
    expect(overrideLabel).to.have.class('MuiListSubheader-colorInherit');
    expect(overrideLabel).to.have.class('MuiListSubheader-gutters');
    expect(overrideLabel).not.to.have.class('MuiListSubheader-colorPrimary');
    expect(overrideLabel).not.to.have.class('MuiListSubheader-inset');
    expect(getComputedStyle(overrideLabel).paddingLeft).to.equal('16px');
    expect(getComputedStyle(overrideLabel).paddingRight).to.equal('16px');
    expect(getComputedStyle(overrideLabel).backgroundColor).to.equal('rgb(9, 8, 7)');
    expect(overrideLabel).not.to.have.class('MuiListSubheader-sticky');
    expect(getComputedStyle(overrideLabel).position).not.to.equal('sticky');
    expect(getComputedStyle(overrideLabel).paddingTop).not.to.equal('11px');
  });

  it('prefers GroupLabel theme defaults over ListSubheader defaults and explicit props over both', () => {
    const theme = createTheme({
      components: {
        MuiListSubheader: {
          defaultProps: { color: 'primary', disableGutters: true, inset: true },
        },
        MuiMenu2GroupLabel: {
          defaultProps: { color: 'inherit', disableGutters: false, inset: false },
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Group>
              <Menu2GroupLabel render={<span />}>Theme</Menu2GroupLabel>
            </Menu2Group>
            <Menu2Group>
              <Menu2GroupLabel color="primary" disableGutters inset render={<span />}>
                Explicit
              </Menu2GroupLabel>
            </Menu2Group>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    const themeLabel = screen.getByText('Theme');
    expect(themeLabel).to.have.class('MuiListSubheader-colorInherit');
    expect(themeLabel).to.have.class('MuiListSubheader-gutters');
    expect(themeLabel).not.to.have.class('MuiListSubheader-inset');
    expect(getComputedStyle(themeLabel).paddingLeft).to.equal('16px');
    expect(getComputedStyle(themeLabel).paddingRight).to.equal('16px');

    const explicitLabel = screen.getByText('Explicit');
    expect(explicitLabel).to.have.class('MuiListSubheader-colorPrimary');
    expect(explicitLabel).not.to.have.class('MuiListSubheader-gutters');
    expect(explicitLabel).to.have.class('MuiListSubheader-inset');
    expect(getComputedStyle(explicitLabel).paddingLeft).to.equal('72px');
  });
});
