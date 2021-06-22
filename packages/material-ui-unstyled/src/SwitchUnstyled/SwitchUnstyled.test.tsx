import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import SwitchUnstyled, { switchUnstyledClasses } from '@material-ui/unstyled/SwitchUnstyled';
import { expect } from 'chai';

interface WithClassName {
  className: string;
}

describe('<SwitchUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();
  const classes = switchUnstyledClasses as unknown as Record<string, string>;

  describeConformanceV5(<SwitchUnstyled />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSwitch',
    skip: ['rootClass', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
  }));

  describe('prop: components', () => {
    it('allows overriding the Thumb slot with a component', () => {
      const CustomThumb = ({ className }: WithClassName) => (
        <i className={className} data-testid="customThumb" />
      );

      const { getByTestId } = render(<SwitchUnstyled components={{ Thumb: CustomThumb }} />);
      const thumb = getByTestId('customThumb');
      expect(thumb).to.have.class(switchUnstyledClasses.thumb);
    });

    it('allows overriding the Thumb slot with an element', () => {
      const { container } = render(<SwitchUnstyled components={{ Thumb: 'i' }} />);
      const thumb = container.querySelector('i');
      expect(thumb).to.have.class(switchUnstyledClasses.thumb);
    });

    it('allows overriding the Input slot with a component', () => {
      const CustomInput = React.forwardRef(({ className }: WithClassName, ref: React.Ref<any>) => (
        <input type="checkbox" ref={ref} className={className} data-testid="customInput" />
      ));

      const { getByTestId } = render(<SwitchUnstyled components={{ Input: CustomInput }} />);
      const input = getByTestId('customInput');
      expect(input).to.have.class(switchUnstyledClasses.input);
    });
  });

  describe('prop: componentsProps', () => {
    it("sets custom properties on slots' elements", () => {
      const componentsProps = {
        root: {
          'data-testid': 'root',
        },
        input: {
          'data-testid': 'input',
        },
        thumb: {
          'data-testid': 'thumb',
        },
      };

      const { getByTestId } = render(<SwitchUnstyled componentsProps={componentsProps} />);

      expect(getByTestId('root')).to.have.class(switchUnstyledClasses.root);
      expect(getByTestId('input')).to.have.class(switchUnstyledClasses.input);
      expect(getByTestId('thumb')).to.have.class(switchUnstyledClasses.thumb);
    });

    it('merges the provided class names with the built-in ones', () => {
      const componentsProps = {
        root: {
          'data-testid': 'root',
          className: 'my-root',
        },
        input: {
          'data-testid': 'input',
          className: 'my-input',
        },
        thumb: {
          'data-testid': 'thumb',
          className: 'my-thumb',
        },
      };

      const { getByTestId } = render(<SwitchUnstyled componentsProps={componentsProps} />);

      expect(getByTestId('root')).to.have.class(switchUnstyledClasses.root);
      expect(getByTestId('root')).to.have.class('my-root');
      expect(getByTestId('input')).to.have.class(switchUnstyledClasses.input);
      expect(getByTestId('input')).to.have.class('my-input');
      expect(getByTestId('thumb')).to.have.class(switchUnstyledClasses.thumb);
      expect(getByTestId('thumb')).to.have.class('my-thumb');
    });
  });
});
