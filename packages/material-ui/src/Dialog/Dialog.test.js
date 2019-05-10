import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Paper from '../Paper';
import Fade from '../Fade';
import Modal from '../Modal';
import Dialog from './Dialog';

const findBackdrop = wrapper => wrapper.find('[data-mui-test="FakeBackdrop"]');
const clickBackdrop = wrapper => {
  const currentTarget = {};
  const backdrop = findBackdrop(wrapper);

  // simulate would not allow mocking of currentTarget
  backdrop.props().onMouseDown({ currentTarget, target: currentTarget });
  backdrop.props().onClick({ currentTarget, target: currentTarget });
};

describe('<Dialog />', () => {
  let mount;
  let classes;
  const defaultProps = {
    open: false,
  };

  before(() => {
    // StrictModeViolation: uses Fade
    mount = createMount({ strict: false });
    classes = getClasses(<Dialog {...defaultProps}>foo</Dialog>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Dialog {...defaultProps} open>
      foo
    </Dialog>,
    () => ({
      classes,
      inheritComponent: Modal,
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );

  it('should render a Modal with TransitionComponent', () => {
    const Transition = React.forwardRef(() => <div tabIndex={-1} />);
    const wrapper = mount(
      <Dialog {...defaultProps} open TransitionComponent={Transition}>
        foo
      </Dialog>,
    );
    assert.strictEqual(wrapper.find(Transition).length, 1);
  });

  it('should put Modal specific props on the root Modal node', () => {
    const onEscapeKeyDown = () => {};
    const onClose = () => {};
    const wrapper = mount(
      <Dialog
        open
        transitionDuration={100}
        onEscapeKeyDown={onEscapeKeyDown}
        onClose={onClose}
        disableBackdropClick
        disableEscapeKeyDown
      >
        foo
      </Dialog>,
    );

    const modal = wrapper.find(Modal);
    assert.strictEqual(modal.props().open, true);
    assert.strictEqual(modal.props().BackdropProps.transitionDuration, 100);
    assert.strictEqual(modal.props().onEscapeKeyDown, onEscapeKeyDown);
    assert.strictEqual(modal.props().onClose, onClose);
    assert.strictEqual(modal.props().disableBackdropClick, true);
    assert.strictEqual(modal.props().disableEscapeKeyDown, true);
  });

  it('should spread custom props on the paper (dialog "root") node', () => {
    const wrapper = mount(
      <Dialog {...defaultProps} data-my-prop="woofDialog">
        foo
      </Dialog>,
    );
    const modal = wrapper.find(Modal);
    assert.strictEqual(modal.props()['data-my-prop'], 'woofDialog');
  });

  it('should fade down and make the transition appear on first mount', () => {
    const wrapper = mount(
      <Dialog {...defaultProps} open>
        foo
      </Dialog>,
    );
    // the first one is from the Backdrop, if the Backdrop impl changes this breaks
    assert.strictEqual(
      wrapper
        .find(Fade)
        .at(1)
        .props().appear,
      true,
    );
  });

  describe('backdrop', () => {
    it('should attach a handler to the backdrop that fires onClose', () => {
      const onClose = spy();
      const wrapper = mount(
        <Dialog onClose={onClose} open>
          foo
        </Dialog>,
      );

      clickBackdrop(wrapper);

      assert.strictEqual(onClose.callCount, 1);
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      const onClose = spy();
      const wrapper = mount(
        <Dialog disableBackdropClick onClose={onClose} open>
          foo
        </Dialog>,
      );

      clickBackdrop(wrapper);

      assert.strictEqual(onClose.callCount, 0);
    });

    it('should call through to the user specified onBackdropClick callback', () => {
      const onBackdropClick = spy();
      const wrapper = mount(
        <Dialog onBackdropClick={onBackdropClick} open>
          foo
        </Dialog>,
      );

      clickBackdrop(wrapper);

      assert.strictEqual(onBackdropClick.callCount, 1);
    });

    it('should ignore the backdrop click if the event did not come from the backdrop', () => {
      const onBackdropClick = spy();
      const wrapper = mount(
        <Dialog onBackdropClick={onBackdropClick} open>
          foo
        </Dialog>,
      );

      const backdrop = findBackdrop(wrapper);
      backdrop.props().onClick({
        target: {
          /* a dom node */
        },
        currentTarget: {
          /* another dom node */
        },
      });

      assert.strictEqual(onBackdropClick.callCount, 0);
    });

    it('should not close if the target changes between the mousedown and the click', () => {
      const onBackdropClick = spy();
      const wrapper = mount(
        <Dialog onBackdropClick={onBackdropClick} open>
          foo
        </Dialog>,
      );

      const backdrop = findBackdrop(wrapper);

      // mousedown dialog, release backdrop
      backdrop.props().onMouseDown({ target: 'dialog' });
      backdrop.props().onClick({ target: 'backdrop', currentTarget: 'backdrop' });
      assert.strictEqual(onBackdropClick.callCount, 0);
    });
  });

  describe('prop: classes', () => {
    it('should add the class on the Paper element', () => {
      const className = 'foo';
      const wrapper = mount(
        <Dialog {...defaultProps} open classes={{ paper: className }}>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(className), true);
    });
  });

  describe('prop: maxWidth', () => {
    it('should use the right className', () => {
      const wrapper = mount(
        <Dialog {...defaultProps} open maxWidth="xs">
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperWidthXs), true);
    });
  });

  describe('prop: fullWidth', () => {
    it('should set `fullWidth` class if specified', () => {
      const wrapper = mount(
        <Dialog {...defaultProps} open fullWidth>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), true);
    });

    it('should not set `fullWidth` class if not specified', () => {
      const wrapper = mount(
        <Dialog {...defaultProps} open>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), false);
    });
  });

  describe('prop: fullScreen', () => {
    it('true should render fullScreen', () => {
      const wrapper = mount(
        <Dialog {...defaultProps} fullScreen open>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), true);
    });

    it('false should not render fullScreen', () => {
      const wrapper = mount(
        <Dialog {...defaultProps} fullScreen={false} open>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), false);
    });
  });

  describe('prop: PaperProps.className', () => {
    it('should merge the className', () => {
      const wrapper = mount(
        <Dialog open PaperProps={{ className: 'custom-paper-class' }}>
          foo
        </Dialog>,
      );

      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paper), true);
      assert.strictEqual(wrapper.find(Paper).hasClass('custom-paper-class'), true);
    });
  });
});
