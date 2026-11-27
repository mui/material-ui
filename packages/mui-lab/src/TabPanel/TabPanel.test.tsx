import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TabPanel, { tabPanelClasses as classes } from '@mui/lab/TabPanel';
import TabContext from '../TabContext';
import describeConformance from '../../test/describeConformance';

describe('<TabPanel />', () => {
  const { render } = createRenderer();

  describeConformance(<TabPanel value="0" />, () => ({
    classes,
    inheritComponent: 'div',
    render: (node) => render(<TabContext value="0">{node}</TabContext>),
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiTabPanel',
    skip: ['componentProp', 'themeDefaultProps', 'themeVariants'],
  }));

  it('renders a [role="tabpanel"] and mounts children', () => {
    render(
      <TabContext value="0">
        <TabPanel data-testid="tabpanel" value="0">
          <div data-testid="child" />
        </TabPanel>
      </TabContext>,
    );

    expect(screen.getByTestId('tabpanel')).to.have.attribute('role', 'tabpanel');
    expect(screen.queryByTestId('child')).not.to.equal(null);
  });

  it('is [hidden] when TabPanel#value !== TabContext#value and does not mount children', () => {
    render(
      <TabContext value="1">
        <TabPanel data-testid="tabpanel" value="0">
          <div data-testid="child" />
        </TabPanel>
      </TabContext>,
    );

    expect(screen.getByTestId('tabpanel')).to.have.property('hidden', true);
    expect(screen.queryByTestId('child')).to.equal(null);
  });

  it('is [hidden] when TabPanel#value !== TabContext#value but does mount children when keepMounted', () => {
    render(
      <TabContext value="1">
        <TabPanel data-testid="tabpanel" value="0" keepMounted>
          <div data-testid="child" />
        </TabPanel>
      </TabContext>,
    );

    expect(screen.getByTestId('tabpanel')).to.have.property('hidden', true);
    expect(screen.queryByTestId('child')).not.to.equal(null);
  });

  describe.each([false, true])('hidden classes with keepMounted=%s', (keepMounted) => {
    it('follows the active context value', () => {
      const { setProps } = render(
        <TabContext value="0">
          <TabPanel
            data-testid="tabpanel"
            value="0"
            keepMounted={keepMounted}
            classes={{ hidden: 'custom-hidden' }}
          />
        </TabContext>,
      );

      const tabPanel = screen.getByTestId('tabpanel');

      expect(tabPanel).to.have.property('hidden', false);
      expect(tabPanel).not.to.have.class(classes.hidden);
      expect(tabPanel).not.to.have.class('custom-hidden');

      setProps({ value: '1' });

      expect(tabPanel).to.have.property('hidden', true);
      expect(tabPanel).to.have.class(classes.hidden);
      expect(tabPanel).to.have.class('custom-hidden');

      setProps({ value: '0' });

      expect(tabPanel).to.have.property('hidden', false);
      expect(tabPanel).not.to.have.class(classes.hidden);
      expect(tabPanel).not.to.have.class('custom-hidden');
    });

    it.each([true, false, undefined])('respects an explicit hidden=%s', (hidden) => {
      const { setProps } = render(
        <TabContext value="0">
          <TabPanel
            data-testid="tabpanel"
            value="0"
            keepMounted={keepMounted}
            hidden={hidden}
            classes={{ hidden: 'custom-hidden' }}
          />
        </TabContext>,
      );

      const tabPanel = screen.getByTestId('tabpanel');

      expect(tabPanel).to.have.property('hidden', hidden === true);
      expect(tabPanel.classList.contains(classes.hidden)).to.equal(hidden === true);
      expect(tabPanel.classList.contains('custom-hidden')).to.equal(hidden === true);

      setProps({ value: '1' });

      expect(tabPanel).to.have.property('hidden', hidden === true);
      expect(tabPanel.classList.contains(classes.hidden)).to.equal(hidden === true);
      expect(tabPanel.classList.contains('custom-hidden')).to.equal(hidden === true);
    });
  });

  it('throws when no TabContext is provided', () => {
    expect(() => render(<TabPanel value="0" />)).to.throw(
      TypeError,
      'MUI: No TabContext provided.',
    );
  });

  it('is accessible when TabPanel#value === TabContext#value', () => {
    render(
      <TabContext value="0">
        <TabPanel data-testid="tabpanel" value="0" />
      </TabContext>,
    );

    expect(screen.getByTestId('tabpanel')).not.toBeInaccessible();
  });

  it('allows flow content', () => {
    render(
      <TabContext value="0">
        <TabPanel value="0">
          <h2>Panel 0</h2>
          <p>The content of panel 0</p>
        </TabPanel>
      </TabContext>,
    );
  });
});
