import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, describeJoyColorInversion } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Tooltip, { tooltipClasses as classes } from '@mui/joy/Tooltip';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<Tooltip />', () => {
  const { render } = createRenderer();

  function TestPopper(props) {
    const { children, className, 'data-testid': testId } = props;
    return (
      <div className={className} data-testid={testId ?? 'custom'}>
        {typeof children === 'function' ? children({}) : children}
      </div>
    );
  }

  describeConformance(
    <Tooltip title="Hello World" open arrow>
      <button type="submit">Hello World</button>
    </Tooltip>,
    () => ({
      classes,
      inheritComponent: 'button',
      render,
      ThemeProvider,
      muiName: 'JoyTooltip',
      refInstanceof: window.HTMLButtonElement,
      testComponentPropWith: 'span',
      testRootOverrides: { slotName: 'root', slotClassName: classes.root },
      testVariantProps: { variant: 'solid' },
      testCustomVariant: true,
      slots: {
        root: {
          expectedClassName: classes.root,
          testWithComponent: TestPopper,
          testWithElement: null,
        },
        arrow: { expectedClassName: classes.arrow },
      },
      skip: [
        'rootClass',
        'componentProp',
        'componentsProp',
        'themeVariants',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  describeJoyColorInversion(
    <Tooltip
      title="Hello world"
      open
      disablePortal
      slotProps={{ root: { 'data-testid': 'test-element' } }}
    >
      <button>Hello World</button>
    </Tooltip>,
    { muiName: 'JoyTooltip', classes, portalSlot: 'root' },
  );

  describe('prop: variant', () => {
    it('solid by default', () => {
      const { getByRole } = render(
        <Tooltip title="Add" open>
          <button>button</button>
        </Tooltip>,
      );
      expect(getByRole('tooltip')).to.have.class(classes.variantSolid);
    });

    ['outlined', 'soft', 'plain', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" variant={variant} open>
            <button>button</button>
          </Tooltip>,
        );
        expect(getByRole('tooltip')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByRole } = render(
        <Tooltip title="Add" open>
          <button>button</button>
        </Tooltip>,
      );

      expect(getByRole('tooltip')).to.have.class(classes.colorNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" color={color} open>
            <button>button</button>
          </Tooltip>,
        );

        expect(getByRole('tooltip')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByRole } = render(
        <Tooltip title="Add" open>
          <button>button</button>
        </Tooltip>,
      );

      expect(getByRole('tooltip')).to.have.class(classes.sizeMd);
    });

    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" size={size} open>
            <button>button</button>
          </Tooltip>,
        );

        expect(getByRole('tooltip')).to.have.class(classes[`size${capitalize(size)}`]);
      });
    });
  });
});
