import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import Modal from '../Modal';
import Dialog from './Dialog';

/**
 * more comprehensive simulation of a user click (mousedown + click)
 * @param {HTMLElement} element
 */
function userClick(element) {
  fireEvent.mouseDown(element);
  fireEvent.mouseUp(element);
  element.click();
}

/**
 * @param {HTMLElement} container
 */
function findBackdrop(container) {
  return container.querySelector('[data-mui-test="FakeBackdrop"]');
}

/**
 * @param {HTMLElement} container
 */
function clickBackdrop(container) {
  userClick(findBackdrop(container));
}

describe('<Dialog />', () => {
  let clock;
  // StrictModeViolation: uses Fade
  const mount = createMount({ strict: false });
  let classes;
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<Dialog>foo</Dialog>);
  });

  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  describeConformance(<Dialog open>foo</Dialog>, () => ({
    classes,
    inheritComponent: Modal,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  it('should render with a TransitionComponent', () => {
    const Transition = React.forwardRef(() => <div data-testid="Transition" tabIndex={-1} />);
    const { getAllByTestId } = render(
      <Dialog open TransitionComponent={Transition}>
        foo
      </Dialog>,
    );

    expect(getAllByTestId('Transition')).to.have.lengthOf(1);
  });

  it('calls onEscapeKeydown when pressing Esc followed by onClose and removes the content after the specified duration', () => {
    const onEscapeKeyDown = spy();
    const onClose = spy();
    function TestCase() {
      const [open, close] = React.useReducer(() => false, true);
      const handleClose = (...args) => {
        close();
        onClose(...args);
      };

      return (
        <Dialog
          open={open}
          transitionDuration={100}
          onEscapeKeyDown={onEscapeKeyDown}
          onClose={handleClose}
        >
          foo
        </Dialog>
      );
    }
    const { getByRole, queryByRole } = render(<TestCase />);
    const dialog = getByRole('dialog');
    expect(dialog).not.to.equal(null);

    dialog.click();
    fireEvent.keyDown(document.querySelector('[data-mui-test="FakeBackdrop"]'), { key: 'Esc' });
    expect(onEscapeKeyDown.calledOnce).to.equal(true);
    expect(onClose.calledOnce).to.equal(true);

    clock.tick(100);
    expect(queryByRole('dialog')).to.equal(null);
  });

  it('can ignore backdrop click and Esc keydown', () => {
    const onClose = spy();
    const { getByRole } = render(
      <Dialog
        open
        disableBackdropClick
        disableEscapeKeyDown
        onClose={onClose}
        transitionDuration={0}
      >
        foo
      </Dialog>,
    );
    const dialog = getByRole('dialog');
    expect(dialog).not.to.equal(null);

    dialog.click();
    fireEvent.keyDown(document.querySelector('[data-mui-test="FakeBackdrop"]'), { key: 'Esc' });
    expect(onClose.callCount).to.equal(0);

    clickBackdrop(document.body);
    expect(onClose.callCount).to.equal(0);
  });

  it('should spread custom props on the modal root node', () => {
    render(
      <Dialog data-my-prop="woofDialog" open>
        foo
      </Dialog>,
    );
    const modal = document.querySelector('[data-mui-test="Modal"]');
    expect(modal).to.have.attribute('data-my-prop', 'woofDialog');
  });

  describe('backdrop', () => {
    it('does have `role` `none presentation`', () => {
      render(<Dialog open>foo</Dialog>);

      expect(findBackdrop(document.body)).to.have.attribute('role', 'none presentation');
    });

    it('calls onBackdropClick and onClose when clicked', () => {
      const onBackdropClick = spy();
      const onClose = spy();
      render(
        <Dialog onBackdropClick={onBackdropClick} onClose={onClose} open>
          foo
        </Dialog>,
      );

      clickBackdrop(document);
      expect(onBackdropClick.callCount).to.equal(1);
      expect(onClose.callCount).to.equal(1);
    });

    it('should ignore the backdrop click if the event did not come from the backdrop', () => {
      const onBackdropClick = spy();
      const { getByRole } = render(
        <Dialog onBackdropClick={onBackdropClick} open>
          <div tabIndex={-1}>
            <h2>my dialog</h2>
          </div>
        </Dialog>,
      );

      userClick(getByRole('heading'));
      expect(onBackdropClick.callCount).to.equal(0);
    });

    it('should not close if the target changes between the mousedown and the click', () => {
      const { getByRole } = render(
        <Dialog open>
          <h2>my dialog</h2>
        </Dialog>,
      );

      fireEvent.mouseDown(getByRole('heading'));
      findBackdrop(document.body).click();
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
  });
});
