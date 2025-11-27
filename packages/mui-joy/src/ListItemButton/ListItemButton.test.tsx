import { expect } from 'chai';
import { createRenderer, fireEvent, screen, act } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListItemButton, { listItemButtonClasses as classes } from '@mui/joy/ListItemButton';
import describeConformance from '../../test/describeConformance';

describe('Joy <ListItemButton />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemButton />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyListItemButton',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { color: 'primary' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should render with the selected class', () => {
    render(<ListItemButton selected />);
    expect(screen.getByRole('button')).to.have.class(classes.selected);
  });

  it('should render with the variant class', () => {
    render(<ListItemButton variant="outlined" />);
    expect(screen.getByRole('button')).to.have.class(classes.variantOutlined);
  });

  it('should render with primary color class', () => {
    render(<ListItemButton color="primary" />);
    expect(screen.getByRole('button')).to.have.class(classes.colorPrimary);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItemButton className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should be disabled', () => {
    const { container } = render(<ListItemButton disabled />);
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should accept custom role', () => {
    render(<ListItemButton role="menuitem" />);
    expect(screen.getByRole('menuitem')).toBeVisible();
  });

  describe('prop: focusVisibleClassName', () => {
    // JSDOM doesn't support :focus-visible
    it.skipIf(window.navigator.userAgent.includes('jsdom'))(
      'should have focusVisible classes',
      async function test() {
        render(<ListItemButton />);
        const button = screen.getByRole('button');

        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
        await act(() => {
          button.focus();
        });

        expect(button).to.have.class(classes.focusVisible);
      },
    );
  });
});
