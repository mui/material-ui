import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Modal from '@mui/material/Modal';
import Dialog, { dialogClasses as classes } from '@mui/material/Dialog';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import describeConformance from '../../test/describeConformance';

/**
 * more comprehensive simulation of a user click (mousedown + click)
 * @param {HTMLElement} element
 */
function userClick(element) {
  act(() => {
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
    element.click();
  });
}

/**
 * @param {typeof import('@mui/internal-test-utils').screen} view
 */
function findBackdrop(view) {
  return view.getByRole('dialog').parentElement;
}

/**
 * @param {typeof import('@mui/internal-test-utils').screen} view
 */
function clickBackdrop(view) {
  userClick(findBackdrop(view));
}

const CustomFade = React.forwardRef(function CustomFade(props, ref) {
  return <Fade {...props} ref={ref} data-testid="custom" />;
});

describe('<Dialog />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describeConformance(
    <Dialog open disablePortal>
      foo
    </Dialog>,
    () => ({
      classes,
      inheritComponent: Modal,
      muiName: 'MuiDialog',
      render,
      testVariantProps: { variant: 'foo' },
      testDeepOverrides: { slotName: 'paper', slotClassName: classes.paper },
      refInstanceof: window.HTMLDivElement,
      slots: {
        transition: {
          expectedClassName: classes.transition,
          testWithComponent: CustomFade,
          testWithElement: null,
        },
        root: {
          expectedClassName: classes.root,
          testWithElement: null,
        },
        backdrop: {
          expectedClassName: classes.backdrop,
          testWithElement: null,
        },
        container: {
          expectedClassName: classes.container,
          testWithElement: null,
          testWithComponent: CustomFade,
        },
        paper: {
          expectedClassName: classes.paper,
          testWithElement: null,
        },
      },
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );

  it('should work correctly when using css selectors for scroll="body"', () => {
    render(
      <Dialog open scroll="body">
        foo
      </Dialog>,
    );

    expect(document.querySelector(`.${classes.scrollBody} > .${classes.paper}`)).to.not.equal(null);
    expect(classes.paperScrollBody).to.not.equal(null);
  });

  it('should work correctly when using css selectors for scroll="paper"', () => {
    render(
      <Dialog open scroll="paper">
        foo
      </Dialog>,
    );

    expect(document.querySelector(`.${classes.scrollPaper} > .${classes.paper}`)).to.not.equal(
      null,
    );
    expect(classes.paperScrollPaper).to.not.equal(null);
  });

  it('should render with a TransitionComponent', () => {
    const Transition = React.forwardRef(() => <div data-testid="Transition" tabIndex={-1} />);
    const { getAllByTestId } = render(
      <Dialog open TransitionComponent={Transition}>
        foo
      </Dialog>,
    );

    expect(getAllByTestId('Transition')).to.have.lengthOf(1);
  });

  it('calls onClose when pressing Esc and removes the content after the specified duration', () => {
    const onClose = spy();
    function TestCase() {
      const [open, close] = React.useReducer(() => false, true);
      const handleClose = (...args) => {
        close();
        onClose(...args);
      };

      return (
        <Dialog open={open} transitionDuration={100} onClose={handleClose}>
          foo
        </Dialog>
      );
    }
    const { getByRole, queryByRole } = render(<TestCase />);
    const dialog = getByRole('dialog');
    expect(dialog).not.to.equal(null);

    act(() => {
      dialog.click();
    });

    // keyDown not targetted at anything specific
    // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    expect(onClose.calledOnce).to.equal(true);

    clock.tick(100);

    expect(queryByRole('dialog')).to.equal(null);
  });

  it('should not close until the IME is cancelled', () => {
    const onClose = spy();
    const { getByRole } = render(
      <Dialog open transitionDuration={0} onClose={onClose}>
        <input type="text" autoFocus />
      </Dialog>,
    );
    const textbox = getByRole('textbox');

    // Actual Behavior when "あ" (Japanese) is entered and press the Esc for IME cancellation.
    fireEvent.change(textbox, { target: { value: 'あ' } });
    fireEvent.keyDown(textbox, { key: 'Escape', keyCode: 229 });
    expect(onClose.callCount).to.equal(0);

    fireEvent.keyDown(textbox, { key: 'Escape' });
    expect(onClose.callCount).to.equal(1);
  });

  it('can ignore backdrop click and Esc keydown', () => {
    function DialogWithBackdropClickDisabled(props) {
      const { onClose, ...other } = props;
      function handleClose(event, reason) {
        if (reason !== 'backdropClick') {
          onClose(event, reason);
        }
      }

      return <Dialog onClose={handleClose} {...other} />;
    }
    const onClose = spy();
    const { getByRole } = render(
      <DialogWithBackdropClickDisabled
        open
        disableEscapeKeyDown
        onClose={onClose}
        transitionDuration={0}
      >
        foo
      </DialogWithBackdropClickDisabled>,
    );
    const dialog = getByRole('dialog');
    expect(dialog).not.to.equal(null);

    act(() => {
      dialog.click();
      // keyDown is not targetted at anything specific.
      // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    });

    expect(onClose.callCount).to.equal(0);

    clickBackdrop(screen);
    expect(onClose.callCount).to.equal(0);
  });

  describe('backdrop', () => {
    it('does have `role` `presentation`', () => {
      render(<Dialog open>foo</Dialog>);

      expect(findBackdrop(screen)).to.have.attribute('role', 'presentation');
    });

    it('calls onClose when clicked', () => {
      const onClose = spy();
      render(
        <Dialog onClose={onClose} open>
          foo
        </Dialog>,
      );

      clickBackdrop(screen);
      expect(onClose.callCount).to.equal(1);
    });

    it('should not close if the target changes between the mousedown and the click', () => {
      const { getByRole } = render(
        <Dialog open>
          <h2>my dialog</h2>
        </Dialog>,
      );

      fireEvent.mouseDown(getByRole('heading'));
      findBackdrop(screen).click();
      expect(getByRole('dialog')).not.to.equal(null);
    });
  });

  describe('prop: classes', () => {
    it('should add the class on the Paper element', () => {
      const { getByTestId } = render(
        <Dialog open classes={{ paper: 'my-paperclass' }} PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );
      expect(getByTestId('paper')).to.have.class('my-paperclass');
    });
  });

  describe('prop: maxWidth', () => {
    it('should use the right className', () => {
      const { getByTestId } = render(
        <Dialog open maxWidth="xs" PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );
      expect(getByTestId('paper')).to.have.class(classes.paperWidthXs);
    });

    it('should use the right className when maxWidth={false}', () => {
      render(
        <Dialog open maxWidth={false} PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );
      expect(screen.getByTestId('paper')).to.have.class(classes.paperWidthFalse);
    });

    it('should apply the correct max-width styles when maxWidth={false}', () => {
      render(
        <Dialog open maxWidth={false} PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).toHaveComputedStyle({
        maxWidth: 'calc(100% - 64px)',
      });
    });
  });

  describe('prop: fullWidth', () => {
    it('should set `fullWidth` class if specified', () => {
      const { getByTestId } = render(
        <Dialog open fullWidth PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );
      expect(getByTestId('paper')).to.have.class(classes.paperFullWidth);
    });

    it('should not set `fullWidth` class if not specified', () => {
      const { getByTestId } = render(
        <Dialog open PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );
      expect(getByTestId('paper')).not.to.have.class(classes.paperFullWidth);
    });
  });

  describe('prop: fullScreen', () => {
    it('can render fullScreen if true', () => {
      const { getByTestId } = render(
        <Dialog open fullScreen PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );
      expect(getByTestId('paper')).to.have.class(classes.paperFullScreen);
    });

    it('does not render fullScreen by default', () => {
      const { getByTestId } = render(
        <Dialog open PaperProps={{ 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );
      expect(getByTestId('paper')).not.to.have.class(classes.paperFullScreen);
    });

    it('scrolls if overflown on the Y axis', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const ITEM_HEIGHT = 100;
      const ITEM_COUNT = 10;

      const { getByTestId } = render(
        <Dialog
          open
          fullScreen
          PaperProps={{ 'data-testid': 'paper', sx: { height: ITEM_HEIGHT } }}
        >
          {Array.from(Array(ITEM_COUNT).keys()).map((item) => (
            <div key={item} style={{ flexShrink: 0, height: ITEM_HEIGHT }}>
              {item}
            </div>
          ))}
        </Dialog>,
      );
      const paperElement = getByTestId('paper');
      expect(paperElement.scrollTop).to.equal(0);
      expect(paperElement.clientHeight).to.equal(ITEM_HEIGHT);
      expect(paperElement.scrollHeight).to.equal(ITEM_HEIGHT * ITEM_COUNT);
      fireEvent.scroll(paperElement, { target: { scrollTop: ITEM_HEIGHT } });
      expect(paperElement.scrollTop).to.equal(ITEM_HEIGHT);
    });
  });

  describe('prop: PaperProps.className', () => {
    it('should merge the className', () => {
      const { getByTestId } = render(
        <Dialog open PaperProps={{ className: 'custom-paper-class', 'data-testid': 'paper' }}>
          foo
        </Dialog>,
      );

      expect(getByTestId('paper')).to.have.class(classes.paper);
      expect(getByTestId('paper')).to.have.class('custom-paper-class');
    });
  });

  describe('a11y', () => {
    it('can be labelled by another element', () => {
      const { getByRole } = render(
        <Dialog open aria-labelledby="dialog-title">
          <h1 id="dialog-title">Choose either one</h1>
          <div>Actually you cant</div>
        </Dialog>,
      );

      const dialog = getByRole('dialog');
      expect(dialog).to.have.attr('aria-labelledby', 'dialog-title');
      const label = document.getElementById(dialog.getAttribute('aria-labelledby'));
      expect(label).to.have.text('Choose either one');
    });

    it('should add the aria-modal="true" by default', function test() {
      const { getByRole } = render(<Dialog open />);

      const dialog = getByRole('dialog');
      expect(dialog).to.have.attr('aria-modal', 'true');
    });

    it('should render the custom aria-modal prop if provided', function test() {
      const { getByRole } = render(<Dialog aria-modal="false" open />);

      const dialog = getByRole('dialog');
      expect(dialog).to.have.attr('aria-modal', 'false');
    });
  });

  describe('prop: transitionDuration', () => {
    it('should render the default theme values by default', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const theme = createTheme();
      const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;
      render(<Dialog open />);

      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveComputedStyle({
        transitionDuration: `${enteringScreenDurationInSeconds}s`,
      });
    });

    it('should render the custom theme values', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const theme = createTheme({
        transitions: {
          duration: {
            enteringScreen: 1,
          },
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <Dialog open />
        </ThemeProvider>,
      );

      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });

    it('should render the values provided via prop', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      render(<Dialog open transitionDuration={{ enter: 1 }} />);

      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveComputedStyle({
        transitionDuration: '0.001s',
      });
    });
  });
});
