import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import Paper from '../Paper';
import Fade from '../Fade';
import Modal from '../Modal';
import Dialog from './Dialog';

describe('<Dialog />', () => {
  let mount;
  let shallow;
  let classes;
  const defaultProps = {
    open: false,
  };

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<Dialog {...defaultProps}>foo</Dialog>);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Modal', () => {
    const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
    assert.strictEqual(wrapper.type(), Modal);
  });

  it('should render a Modal with TransitionComponent', () => {
    const Transition = props => <div className="cloned-element-class" {...props} />;
    const wrapper = shallow(
      <Dialog {...defaultProps} TransitionComponent={Transition}>
        foo
      </Dialog>,
    );
    assert.strictEqual(wrapper.find(Transition).length, 1);
  });

  it('should put Modal specific props on the root Modal node', () => {
    const onBackdropClick = () => {};
    const onEscapeKeyDown = () => {};
    const onClose = () => {};
    const wrapper = shallow(
      <Dialog
        open
        transitionDuration={100}
        onBackdropClick={onBackdropClick}
        onEscapeKeyDown={onEscapeKeyDown}
        onClose={onClose}
        hideOnBackdropClick={false}
        hideOnEscapeKeyUp={false}
      >
        foo
      </Dialog>,
    );
    assert.strictEqual(wrapper.props().open, true);
    assert.strictEqual(wrapper.props().BackdropProps.transitionDuration, 100);
    assert.strictEqual(wrapper.props().onBackdropClick, onBackdropClick);
    assert.strictEqual(wrapper.props().onEscapeKeyDown, onEscapeKeyDown);
    assert.strictEqual(wrapper.props().onClose, onClose);
    assert.strictEqual(wrapper.props().hideOnBackdropClick, false);
    assert.strictEqual(wrapper.props().hideOnEscapeKeyUp, false);
  });

  it('should spread custom props on the paper (dialog "root") node', () => {
    const wrapper = shallow(
      <Dialog {...defaultProps} data-my-prop="woofDialog">
        foo
      </Dialog>,
    );
    assert.strictEqual(wrapper.props()['data-my-prop'], 'woofDialog');
  });

  it('should render with the user classes on the root node', () => {
    const wrapper = shallow(
      <Dialog {...defaultProps} className="woofDialog">
        foo
      </Dialog>,
    );
    assert.strictEqual(wrapper.hasClass('woofDialog'), true);
  });

  it('should render Fade > div > Paper > children inside the Modal', () => {
    const children = <p>Hello</p>;
    const wrapper = shallow(<Dialog {...defaultProps}>{children}</Dialog>);

    const fade = wrapper.childAt(0);
    assert.strictEqual(fade.type(), Fade);

    const div = fade.childAt(0);
    assert.strictEqual(div.type(), 'div');

    const paper = div.childAt(0);
    assert.strictEqual(paper.length === 1 && paper.type(), Paper);

    assert.strictEqual(paper.hasClass(classes.paper), true);
  });

  it('should not be open by default', () => {
    const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
    assert.strictEqual(wrapper.props().open, false);
    assert.strictEqual(wrapper.find(Fade).props().in, false);
  });

  it('should be open by default', () => {
    const wrapper = shallow(<Dialog open>foo</Dialog>);
    assert.strictEqual(wrapper.props().open, true);
    assert.strictEqual(wrapper.find(Fade).props().in, true);
  });

  it('should fade down and make the transition appear on first mount', () => {
    const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
    assert.strictEqual(wrapper.find(Fade).props().appear, true);
  });

  describe('backdrop', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Dialog open>foo</Dialog>);
    });

    it('should attach a handler to the backdrop that fires onClose', () => {
      const onClose = spy();
      wrapper.setProps({ onClose });

      const handler = wrapper.instance().handleBackdropClick;
      const backdrop = wrapper.find('[role="document"]');
      assert.strictEqual(backdrop.props().onClick, handler);

      handler({});
      assert.strictEqual(onClose.callCount, 1);
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      const onClose = spy();
      wrapper.setProps({ onClose, disableBackdropClick: true });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onClose.callCount, 0);
    });

    it('should call through to the user specified onBackdropClick callback', () => {
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const handler = wrapper.instance().handleBackdropClick;

      handler({});
      assert.strictEqual(onBackdropClick.callCount, 1);
    });

    it('should ignore the backdrop click if the event did not come from the backdrop', () => {
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const handler = wrapper.instance().handleBackdropClick;

      handler({
        target: {
          /* a dom node */
        },
        currentTarget: {
          /* another dom node */
        },
      });
      assert.strictEqual(onBackdropClick.callCount, 0);
    });

    it('should store the click target on mousedown', () => {
      const mouseDownTarget = 'clicked element';
      const backdrop = wrapper.find('[role="document"]');
      backdrop.simulate('mousedown', { target: mouseDownTarget });
      assert.strictEqual(wrapper.instance().mouseDownTarget, mouseDownTarget);
    });

    it('should clear click target on successful backdrop click', () => {
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const mouseDownTarget = 'backdrop';

      const backdrop = wrapper.find('[role="document"]');
      backdrop.simulate('mousedown', { target: mouseDownTarget });
      assert.strictEqual(wrapper.instance().mouseDownTarget, mouseDownTarget);
      backdrop.simulate('click', { target: mouseDownTarget, currentTarget: mouseDownTarget });
      assert.strictEqual(onBackdropClick.callCount, 1);
      assert.strictEqual(wrapper.instance().mouseDownTarget, null);
    });

    it('should not close if the target changes between the mousedown and the click', () => {
      const onBackdropClick = spy();
      wrapper.setProps({ onBackdropClick });

      const backdrop = wrapper.find('[role="document"]');

      backdrop.simulate('mousedown', { target: 'backdrop' });
      backdrop.simulate('click', { target: 'dialog', currentTarget: 'dialog' });
      assert.strictEqual(onBackdropClick.callCount, 0);
    });
  });

  describe('prop: classes', () => {
    it('should add the class on the Paper element', () => {
      const className = 'foo';
      const wrapper = shallow(
        <Dialog {...defaultProps} classes={{ paper: className }}>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(className), true);
    });
  });

  describe('prop: maxWidth', () => {
    it('should use the right className', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} maxWidth="xs">
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperWidthXs), true);
    });
  });

  describe('prop: fullWidth', () => {
    it('should set `fullWidth` class if specified', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} fullWidth>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), true);
    });

    it('should not set `fullWidth` class if not specified', () => {
      const wrapper = shallow(<Dialog {...defaultProps}>foo</Dialog>);
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), false);
    });
  });

  describe('prop: fullScreen', () => {
    it('true should render fullScreen', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} fullScreen>
          foo
        </Dialog>,
      );
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), true);
    });

    it('false should not render fullScreen', () => {
      const wrapper = shallow(
        <Dialog {...defaultProps} fullScreen={false}>
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
