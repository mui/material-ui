import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';

interface FixtureProps {
  kind: 'checkbox' | 'radio';
  dense?: boolean | undefined;
  direction?: 'ltr' | 'rtl' | undefined;
  spacing?: number | undefined;
  width?: number | undefined;
  iconWidth?: number | undefined;
  mode?: 'light' | 'dark' | undefined;
  palette?: ThemeOptions['palette'];
}

const label = 'A long menu label that must not reduce the space for the icon';
const labelStyle: React.CSSProperties = {
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

function IndicatorFixture({
  kind,
  dense = false,
  direction = 'ltr',
  spacing = 8,
  width = 180,
  iconWidth,
  mode = 'light',
  palette,
}: FixtureProps) {
  const theme = createTheme({ direction, spacing, palette: { mode, ...palette } });
  function item(checked: boolean) {
    const id = checked ? 'checked' : 'unchecked';
    const itemProps = {
      dense,
      'data-testid': `${id}-item`,
      slotProps: {
        indicator: {
          'data-testid': `${id}-indicator`,
          children: iconWidth ? (
            <svg width={iconWidth} height={20} style={{ flexShrink: 0 }} aria-hidden="true">
              <rect width={iconWidth} height={20} fill="currentColor" />
            </svg>
          ) : undefined,
        },
      },
      children: (
        <span data-testid={`${id}-label`} style={labelStyle}>
          {label}
        </span>
      ),
    };
    return kind === 'checkbox' ? (
      <Menu2CheckboxItem {...itemProps} defaultChecked={checked} />
    ) : (
      <Menu2RadioItem {...itemProps} value={id} />
    );
  }
  const items = (
    <React.Fragment>
      {item(true)}
      {item(false)}
    </React.Fragment>
  );
  return (
    <ThemeProvider theme={theme}>
      <Menu2
        defaultOpen
        modal={false}
        anchor={document.body}
        slots={{ transition: null }}
        slotProps={{ paper: { dir: direction, sx: { width } } }}
      >
        {kind === 'radio' ? (
          <Menu2RadioGroup defaultValue="checked">{items}</Menu2RadioGroup>
        ) : (
          items
        )}
        <Menu2Item dense>
          <ListItemIcon data-testid="reference-icon">
            <svg width={20} height={20} aria-hidden="true" />
          </ListItemIcon>
          <span data-testid="reference-label" style={labelStyle}>
            {label}
          </span>
        </Menu2Item>
        <Menu2Item dense>
          <ListItemText inset data-testid="inset-label" primary={label} />
        </Menu2Item>
      </Menu2>
    </ThemeProvider>
  );
}

describe.skipIf(isJsdom())('Menu2 indicator layout', () => {
  const { render } = createRenderer();
  const cases = [
    { dense: false, direction: 'ltr', spacing: 8, width: 320 },
    { dense: false, direction: 'ltr', spacing: 12, width: 180 },
    { dense: true, direction: 'ltr', spacing: 12, width: 180 },
    { dense: false, direction: 'rtl', spacing: 12, width: 180 },
    { dense: true, direction: 'rtl', spacing: 8, width: 180 },
  ] as const;

  (['checkbox', 'radio'] as const).forEach((kind) => {
    describe(`${kind} indicators`, () => {
      cases.forEach((options) => {
        it(`keeps the default column aligned: ${JSON.stringify(options)}`, () => {
          render(<IndicatorFixture kind={kind} {...options} />);

          const reference = screen.getByTestId('reference-label').getBoundingClientRect();
          expect(screen.getByTestId('reference-icon').getBoundingClientRect().width).to.equal(36);
          expect(getComputedStyle(screen.getByTestId('inset-label')).paddingLeft).to.equal('36px');
          ['checked', 'unchecked'].forEach((id) => {
            const indicator = screen.getByTestId(`${id}-indicator`);
            const text = screen.getByTestId(`${id}-label`);
            const icon = indicator.querySelector('svg')!;
            const row = screen.getByTestId(`${id}-item`);
            const iconRect = icon.getBoundingClientRect();
            const rowRect = row.getBoundingClientRect();
            expect(getComputedStyle(row).direction).to.equal(options.direction);
            expect(indicator.getBoundingClientRect().width).to.equal(36);
            expect(iconRect.width).to.equal(20);
            expect((iconRect.top + iconRect.bottom) / 2).to.be.closeTo(
              (rowRect.top + rowRect.bottom) / 2,
              0.1,
            );
            const edge = options.direction === 'ltr' ? 'left' : 'right';
            expect(text.getBoundingClientRect()[edge]).to.be.closeTo(reference[edge], 0.1);
            expect(text.scrollWidth).to.be.greaterThan(text.clientWidth);
          });
        });
      });

      (['ltr', 'rtl'] as const).forEach((direction) => {
        it(`keeps a wide custom icon clear of the label in ${direction}`, () => {
          render(<IndicatorFixture kind={kind} direction={direction} iconWidth={56} />);

          ['checked', 'unchecked'].forEach((id) => {
            const indicator = screen.getByTestId(`${id}-indicator`).getBoundingClientRect();
            const icon = screen
              .getByTestId(`${id}-indicator`)
              .querySelector('svg')!
              .getBoundingClientRect();
            const text = screen.getByTestId(`${id}-label`).getBoundingClientRect();
            expect(indicator.width).to.equal(56);
            expect(icon.width).to.equal(56);
            expect(icon.left).to.be.at.least(indicator.left);
            expect(icon.right).to.be.at.most(indicator.right);
            if (direction === 'ltr') {
              expect(icon.right).to.be.at.most(text.left);
            } else {
              expect(icon.left).to.be.at.least(text.right);
            }
          });
        });
      });

      (['light', 'dark'] as const).forEach((mode) => {
        it(`keeps the checked and unchecked colors in ${mode} mode`, () => {
          render(<IndicatorFixture kind={kind} mode={mode} />);

          const checked = screen.getByTestId('checked-indicator');
          const unchecked = screen.getByTestId('unchecked-indicator');
          expect(checked).to.have.attribute('data-checked');
          expect(unchecked).not.to.have.attribute('data-checked');
          expect(getComputedStyle(checked).color).to.equal(
            mode === 'light' ? 'rgb(25, 118, 210)' : 'rgb(144, 202, 249)',
          );
          expect(getComputedStyle(unchecked).color).to.equal(
            mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
          );
        });
      });

      it('uses selection-control colors when the theme changes decorative icon colors', () => {
        render(
          <IndicatorFixture
            kind={kind}
            palette={{
              text: { secondary: 'rgb(12, 34, 56)' },
              action: { active: 'rgb(98, 76, 54)' },
              primary: { main: 'rgb(65, 43, 21)' },
            }}
          />,
        );

        expect(getComputedStyle(screen.getByTestId('reference-icon')).color).to.equal(
          'rgb(98, 76, 54)',
        );
        expect(getComputedStyle(screen.getByTestId('unchecked-indicator')).color).to.equal(
          'rgb(12, 34, 56)',
        );
        expect(getComputedStyle(screen.getByTestId('checked-indicator')).color).to.equal(
          'rgb(65, 43, 21)',
        );
      });
    });
  });
});
