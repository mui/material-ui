import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, act } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { PopperProps } from '@mui/base';
import { ThemeProvider } from '@mui/joy/styles';
import Tooltip, { tooltipClasses as classes, TooltipClassKey } from '@mui/joy/Tooltip';
import describeConformance from '../../test/describeConformance';

describe('<Tooltip />', () => {
  const { render } = createRenderer();

  function TestPopper(
    props: Omit<PopperProps, 'children'> & { 'data-testid': string; children: any },
  ) {
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
          testWithComponent: TestPopper as React.ComponentType,
          testWithElement: null,
        },
        arrow: { expectedClassName: classes.arrow },
      },
      skip: [
        'rootClass',
        'componentProp',
        'componentsProp',
        'themeVariants',
        // Props are spread to root and children
        // We cannot use the standard propsSpread test which relies on data-testid only on the root
        'propsSpread',
        // Props are spread to root and children
        // We cannot use the standard mergeClassName test which relies on data-testid only on the root
        'mergeClassName',
      ],
    }),
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

    (['outlined', 'soft', 'plain', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" variant={variant} open>
            <button>button</button>
          </Tooltip>,
        );
        expect(getByRole('tooltip')).to.have.class(
          classes[`variant${capitalize(variant)}` as TooltipClassKey],
        );
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

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" color={color} open>
            <button>button</button>
          </Tooltip>,
        );

        expect(getByRole('tooltip')).to.have.class(
          classes[`color${capitalize(color)}` as TooltipClassKey],
        );
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

    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" size={size} open>
            <button>button</button>
          </Tooltip>,
        );

        expect(getByRole('tooltip')).to.have.class(
          classes[`size${capitalize(size)}` as TooltipClassKey],
        );
      });
    });
  });

  describe('focus', () => {
    // https://github.com/mui/mui-x/issues/12248
    it('should support event handlers with extra parameters', () => {
      const handleFocus = spy((event, extra) => extra);
      const handleBlur = spy((event, ...params) => params);

      const TextField = React.forwardRef<
        HTMLDivElement,
        {
          onFocus: (event: React.FocusEvent, ...params: any[]) => void;
          onBlur: (event: React.FocusEvent, ...params: any[]) => void;
        }
      >(function TextField(props, ref) {
        const { onFocus, onBlur, ...other } = props;
        return (
          <div ref={ref} {...other}>
            <input
              type="text"
              onFocus={(event) => onFocus(event, 'focus')}
              onBlur={(event) => onBlur(event, 'blur', 1)}
            />
          </div>
        );
      });
      const { getByRole } = render(
        <Tooltip open title="test">
          <TextField onFocus={handleFocus} onBlur={handleBlur} />
        </Tooltip>,
      );
      const input = getByRole('textbox');

      act(() => {
        input.focus();
      });

      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocus.returnValues[0]).to.equal('focus');

      act(() => {
        input.blur();
      });

      expect(handleBlur.callCount).to.equal(1);
      expect(handleBlur.returnValues[0]).to.deep.equal(['blur', 1]);
    });
  });
});
