import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItemIndicator, {
  menu2CheckboxItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

// The item renders its own indicator; this suppresses it so the suite can
// mount one directly.
function NoIndicator() {
  return null;
}

describe('<Menu2CheckboxItemIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2CheckboxItemIndicator keepMounted />, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            <Menu2CheckboxItem slots={{ indicator: NoIndicator }}>{node}Ruler</Menu2CheckboxItem>
          </Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'i',
    muiName: 'MuiMenu2CheckboxItemIndicator',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  function renderItem(
    indicatorProps: Record<string, any> = {},
    itemProps: Record<string, any> = {},
  ) {
    return render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2CheckboxItem
          {...itemProps}
          slotProps={{ indicator: { 'data-testid': 'indicator', ...indicatorProps } }}
        >
          Ruler
        </Menu2CheckboxItem>
      </Menu2>,
    );
  }

  describe('icons', () => {
    it('renders the outlined box when unchecked', () => {
      renderItem();

      const indicator = screen.getByTestId('indicator');
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).not.to.equal(
        null,
      );
      expect(indicator.querySelector('[data-testid="CheckBoxIcon"]')).to.equal(null);
    });

    it('renders the filled box when checked', () => {
      renderItem({}, { defaultChecked: true });

      const indicator = screen.getByTestId('indicator');
      expect(indicator.querySelector('[data-testid="CheckBoxIcon"]')).not.to.equal(null);
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).to.equal(null);
    });

    it('keeps the default icons on a disabled item', () => {
      renderItem({}, { disabled: true });

      const indicator = screen.getByTestId('indicator');
      expect(indicator).to.have.attribute('data-disabled', '');
      expect(indicator).to.have.class(classes.disabled);
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).not.to.equal(
        null,
      );
    });

    it('lets children replace the icon', () => {
      renderItem({ children: <span data-testid="custom-icon" /> });

      const indicator = screen.getByTestId('indicator');
      expect(indicator.querySelector('[data-testid="custom-icon"]')).not.to.equal(null);
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).to.equal(null);
    });
  });
});
