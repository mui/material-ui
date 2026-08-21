import * as React from 'react';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItemIndicator, {
  menu2RadioItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2RadioItemIndicator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

// The item renders its own indicator; this suppresses it so the suite can
// mount one directly.
function NoIndicator() {
  return null;
}

describe('<Menu2RadioItemIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2RadioItemIndicator keepMounted />, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            <Menu2RadioGroup>
              <Menu2RadioItem value="one" slots={{ indicator: NoIndicator }}>
                {node}One
              </Menu2RadioItem>
            </Menu2RadioGroup>
          </Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'i',
    muiName: 'MuiMenu2RadioItemIndicator',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  // A real browser reports the transform as a matrix, jsdom as written.
  function getScale(element: Element) {
    const { transform } = window.getComputedStyle(element);
    return Number(/^(?:matrix|scale)\(([^,)]+)/.exec(transform)?.[1]);
  }

  function renderGroup(indicatorProps: Record<string, any> = {}) {
    return render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2RadioGroup defaultValue="one">
          <Menu2RadioItem
            value="one"
            slotProps={{ indicator: { 'data-testid': 'checked', ...indicatorProps } }}
          >
            One
          </Menu2RadioItem>
          <Menu2RadioItem
            value="two"
            slotProps={{ indicator: { 'data-testid': 'unchecked', ...indicatorProps } }}
          >
            Two
          </Menu2RadioItem>
        </Menu2RadioGroup>
      </Menu2>,
    );
  }

  describe('icons', () => {
    it('renders both Radio layers and scales the dot with the state', () => {
      renderGroup();

      const checked = screen.getByTestId('checked');
      const unchecked = screen.getByTestId('unchecked');

      [checked, unchecked].forEach((indicator) => {
        expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).not.to.equal(
          null,
        );
      });

      expect(getScale(checked.querySelector('[data-testid="RadioButtonCheckedIcon"]')!)).to.equal(
        1,
      );
      expect(getScale(unchecked.querySelector('[data-testid="RadioButtonCheckedIcon"]')!)).to.equal(
        0,
      );
    });

    it.skipIf(isJsdom())('keeps the transition the real Radio animates the dot with', () => {
      renderGroup();

      const dot = screen
        .getByTestId('checked')
        .querySelector('[data-testid="RadioButtonCheckedIcon"]')!;
      expect(window.getComputedStyle(dot).transitionProperty).to.contain('transform');
    });

    it('keeps the highlighted item on the default icons', async () => {
      const { user } = renderGroup();

      await user.hover(screen.getByRole('menuitemradio', { name: 'Two' }));

      const indicator = screen.getByTestId('unchecked');
      expect(indicator).to.have.class(classes.highlighted);
      expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).not.to.equal(
        null,
      );
    });

    it('lets children replace the icon', () => {
      renderGroup({ children: <span data-testid="custom-icon" /> });

      const indicator = screen.getByTestId('checked');
      expect(indicator.querySelector('[data-testid="custom-icon"]')).not.to.equal(null);
      expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).to.equal(null);
    });
  });
});
