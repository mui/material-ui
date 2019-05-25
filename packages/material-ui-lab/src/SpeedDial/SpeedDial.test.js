import { codes as keycodes } from 'keycode';
import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  findOutermostIntrinsic,
  getClasses,
  wrapsIntrinsicElement,
} from '@material-ui/core/test-utils';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import SpeedDial from './SpeedDial';
import SpeedDialAction from '../SpeedDialAction';

describe('<SpeedDial />', () => {
  let mount;
  let classes;

  const icon = <Icon>font_icon</Icon>;
  const FakeAction = () => <div />;
  const defaultProps = {
    open: true,
    ariaLabel: 'mySpeedDial',
  };

  function findActionsWrapper(wrapper) {
    const control = wrapper.find('[aria-expanded]').first();
    return wrapper.find(`#${control.props()['aria-controls']}`).first();
  }

  before(() => {
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(
      <SpeedDial {...defaultProps} icon={icon}>
        <div />
      </SpeedDial>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with a minimal setup', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} icon={icon}>
        <SpeedDialAction icon={<Icon>save_icon</Icon>} tooltipTitle="Save" />
      </SpeedDial>,
    );
    wrapper.unmount();
  });

  it('should render a Fade transition', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} icon={icon}>
        <FakeAction />
      </SpeedDial>,
    );
    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
  });

  it('should render a Fab', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} icon={icon}>
        <FakeAction />
      </SpeedDial>,
    );
    const buttonWrapper = wrapper.find('[aria-expanded]').first();
    assert.strictEqual(buttonWrapper.type(), Fab);
  });

  it('should render with a null child', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} icon={icon}>
        <SpeedDialAction icon={icon} tooltipTitle="One" />
        {null}
        <SpeedDialAction icon={icon} tooltipTitle="Three" />
      </SpeedDial>,
    );
    assert.strictEqual(wrapper.find(SpeedDialAction).length, 2);
  });

  it('should render with the root class', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} icon={icon}>
        <FakeAction />
      </SpeedDial>,
    );
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} className="mySpeedDialClass" icon={icon}>
        <FakeAction />
      </SpeedDial>,
    );
    assert.strictEqual(
      wrapper
        .find(`.${classes.root}`)
        .first()
        .hasClass('mySpeedDialClass'),
      true,
    );
  });

  it('should render the actions with the actions class', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} className="mySpeedDial" icon={icon}>
        <SpeedDialAction icon={icon} tooltipTitle="SpeedDialAction" />
      </SpeedDial>,
    );
    const actionsWrapper = findActionsWrapper(wrapper);
    assert.strictEqual(actionsWrapper.hasClass(classes.actions), true);
    assert.strictEqual(actionsWrapper.hasClass(classes.actionsClosed), false);
  });

  it('should render the actions with the actions and actionsClosed classes', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps} open={false} className="mySpeedDial" icon={icon}>
        <SpeedDialAction icon={icon} tooltipTitle="SpeedDialAction" />
      </SpeedDial>,
    );
    const actionsWrapper = findActionsWrapper(wrapper);
    assert.strictEqual(actionsWrapper.hasClass(classes.actions), true);
    assert.strictEqual(actionsWrapper.hasClass(classes.actionsClosed), true);
  });

  it('should pass the open prop to its children', () => {
    const actionClasses = { buttonClosed: 'is-closed' };
    const wrapper = mount(
      <SpeedDial {...defaultProps} icon={icon}>
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction1" />
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction2" />
      </SpeedDial>,
    );
    const actions = wrapper.find('[role="menuitem"]').filterWhere(wrapsIntrinsicElement);
    assert.strictEqual(actions.some(`.is-closed`), false);
  });

  describe('prop: onClick', () => {
    it('should be set as the onClick prop of the Fab', () => {
      const onClick = spy();
      const wrapper = mount(
        <SpeedDial {...defaultProps} icon={icon} onClick={onClick}>
          <FakeAction />
        </SpeedDial>,
      );
      const buttonWrapper = wrapper.find(Fab);
      assert.strictEqual(buttonWrapper.props().onClick, onClick);
    });

    describe('for touch devices', () => {
      before(() => {
        document.documentElement.ontouchstart = () => {};
      });

      it('should be set as the onTouchEnd prop of the button if touch device', () => {
        const onClick = spy();

        const wrapper = mount(
          <SpeedDial {...defaultProps} icon={icon} onClick={onClick}>
            <FakeAction />
          </SpeedDial>,
        );
        const buttonWrapper = wrapper.find(Fab);
        assert.strictEqual(buttonWrapper.props().onTouchEnd, onClick);
      });

      after(() => {
        delete document.documentElement.ontouchstart;
      });
    });
  });

  describe('prop: onKeyDown', () => {
    it('should be called when a key is pressed', () => {
      const handleKeyDown = spy();
      const wrapper = mount(
        <SpeedDial {...defaultProps} icon={icon} onKeyDown={handleKeyDown}>
          <FakeAction />
        </SpeedDial>,
      );
      const buttonWrapper = wrapper.find('[aria-expanded]').first();
      const eventMock = 'something-to-match';
      buttonWrapper.simulate('keyDown', { eventMock });
      assert.strictEqual(handleKeyDown.callCount, 1);
      assert.strictEqual(handleKeyDown.calledWithMatch({ eventMock }), true);
    });
  });

  describe('prop: direction', () => {
    const testDirection = direction => {
      const className = `direction${direction}`;
      const wrapper = mount(
        <SpeedDial {...defaultProps} direction={direction.toLowerCase()} icon={icon}>
          <SpeedDialAction icon={icon} tooltipTitle="action1" />
          <SpeedDialAction icon={icon} tooltipTitle="action2" />
        </SpeedDial>,
      );

      const root = wrapper.find(`.${classes.root}`).first();
      const actionContainer = findActionsWrapper(wrapper);

      assert.strictEqual(root.hasClass(classes[className]), true);
      assert.strictEqual(actionContainer.hasClass(classes[className]), true);
    };

    it('should place actions in correct position', () => {
      testDirection('Up');
      testDirection('Down');
      testDirection('Left');
      testDirection('Right');
    });
  });

  describe('dial focus', () => {
    let actionRefs;
    let dialButtonRef;
    let onkeydown;
    let wrapper;

    const mountSpeedDial = (direction = 'up', actionCount = 4) => {
      actionRefs = [];
      dialButtonRef = undefined;
      onkeydown = spy();

      wrapper = mount(
        <SpeedDial
          {...defaultProps}
          ButtonProps={{
            ref: ref => {
              dialButtonRef = ref;
            },
          }}
          direction={direction}
          icon={icon}
          onKeyDown={onkeydown}
        >
          {Array.from({ length: actionCount }, (_, i) => (
            <SpeedDialAction
              key={i}
              ButtonProps={{
                ref: ref => {
                  actionRefs[i] = ref;
                },
              }}
              icon={icon}
              tooltipTitle={`action${i}`}
            />
          ))}
        </SpeedDial>,
      );
    };

    /**
     * @returns the button of SpeedDial
     */
    const getDialButton = () => wrapper.find('[aria-controls]').first();
    /**
     *
     * @param actionIndex
     * @returns the button of the nth SpeedDialAction or the Fab if -1
     */
    const getActionButton = actionIndex => {
      if (actionIndex === -1) {
        return getDialButton();
      }
      return wrapper.find(SpeedDialAction).at(actionIndex);
    };
    /**
     * @returns true if the button of the nth action is focused
     */
    const isActionFocused = index => {
      const expectedFocusedElement = index === -1 ? dialButtonRef : actionRefs[index];
      return expectedFocusedElement === window.document.activeElement;
    };
    /**
     * promisified setImmediate
     */
    const immediate = () => new Promise(resolve => setImmediate(resolve));

    const resetDialToOpen = direction => {
      if (wrapper && wrapper.exists()) {
        wrapper.unmount();
      }

      mountSpeedDial(direction);
      dialButtonRef.focus();
    };

    it('displays the actions on focus gain', () => {
      resetDialToOpen();
      assert.strictEqual(wrapper.find(SpeedDial).props().open, true);
    });

    describe('first item selection', () => {
      const createShouldAssertFirst = assertFn => (dialDirection, arrowKey) => {
        resetDialToOpen(dialDirection);
        getDialButton().simulate('keydown', { keyCode: keycodes[arrowKey] });
        assertFn(isActionFocused(0));
      };

      const shouldFocusFirst = createShouldAssertFirst(assert.isTrue);
      const shouldNotFocusFirst = createShouldAssertFirst(assert.isFalse);

      it('considers arrow keys with the same orientation', () => {
        shouldFocusFirst('up', 'up');
        shouldFocusFirst('up', 'down');

        shouldFocusFirst('down', 'up');
        shouldFocusFirst('down', 'down');

        shouldFocusFirst('right', 'right');
        shouldFocusFirst('right', 'left');

        shouldFocusFirst('left', 'right');
        shouldFocusFirst('left', 'left');
      });

      it('ignores arrow keys orthogonal to the direction', () => {
        shouldNotFocusFirst('up', 'left');
        shouldNotFocusFirst('up', 'right');

        shouldNotFocusFirst('down', 'left');
        shouldNotFocusFirst('down', 'right');

        shouldNotFocusFirst('right', 'up');
        shouldNotFocusFirst('right', 'up');

        shouldNotFocusFirst('left', 'down');
        shouldNotFocusFirst('left', 'down');
      });
    });

    // eslint-disable-next-line func-names
    describe('actions navigation', function() {
      this.timeout(5000); // This tests are really slow.

      /**
       * tests a combination of arrow keys on a focused SpeedDial
       */
      const testCombination = async (
        dialDirection,
        [firstKey, ...combination],
        [firstFocusedAction, ...foci],
      ) => {
        resetDialToOpen(dialDirection);

        getDialButton().simulate('keydown', { keyCode: keycodes[firstKey] });
        assert.strictEqual(
          isActionFocused(firstFocusedAction),
          true,
          `focused action initial ${firstKey} should be ${firstFocusedAction}`,
        );

        combination.forEach((arrowKey, i) => {
          const previousFocusedAction = foci[i - 1] || firstFocusedAction;
          const expectedFocusedAction = foci[i];
          const combinationUntilNot = [firstKey, ...combination.slice(0, i + 1)];

          getActionButton(previousFocusedAction).simulate('keydown', {
            keyCode: keycodes[arrowKey],
          });
          assert.strictEqual(
            isActionFocused(expectedFocusedAction),
            true,
            `focused action after ${combinationUntilNot.join(
              ',',
            )} should be ${expectedFocusedAction}`,
          );
        });

        /**
         * Tooltip still fires onFocus after unmount ("Warning: setState unmounted").
         * Could not fix this issue so we are using this workaround
         */
        await immediate();
      };

      it('considers the first arrow key press as forward navigation', async () => {
        await testCombination('up', ['up', 'up', 'up', 'down'], [0, 1, 2, 1]);
        await testCombination('up', ['down', 'down', 'down', 'up'], [0, 1, 2, 1]);

        await testCombination('right', ['right', 'right', 'right', 'left'], [0, 1, 2, 1]);
        await testCombination('right', ['left', 'left', 'left', 'right'], [0, 1, 2, 1]);

        await testCombination('down', ['down', 'down', 'down', 'up'], [0, 1, 2, 1]);
        await testCombination('down', ['up', 'up', 'up', 'down'], [0, 1, 2, 1]);

        await testCombination('left', ['left', 'left', 'left', 'right'], [0, 1, 2, 1]);
        await testCombination('left', ['right', 'right', 'right', 'left'], [0, 1, 2, 1]);
      });

      it('ignores array keys orthogonal to the direction', async () => {
        await testCombination('up', ['up', 'left', 'right', 'up'], [0, 0, 0, 1]);
        await testCombination('right', ['right', 'up', 'down', 'right'], [0, 0, 0, 1]);
        await testCombination('down', ['down', 'left', 'right', 'down'], [0, 0, 0, 1]);
        await testCombination('left', ['left', 'up', 'down', 'left'], [0, 0, 0, 1]);
      });

      it('does not wrap around', async () => {
        await testCombination('up', ['up', 'down', 'down', 'up'], [0, -1, -1, 0]);
        await testCombination('right', ['right', 'left', 'left', 'right'], [0, -1, -1, 0]);
        await testCombination('down', ['down', 'up', 'up', 'down'], [0, -1, -1, 0]);
        await testCombination('left', ['left', 'right', 'right', 'left'], [0, -1, -1, 0]);
      });
    });
  });
});
