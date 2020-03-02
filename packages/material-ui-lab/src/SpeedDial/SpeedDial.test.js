import * as React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  findOutermostIntrinsic,
  getClasses,
  wrapsIntrinsicElement,
} from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
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
    icon,
    ariaLabel: 'mySpeedDial',
  };

  before(() => {
    // StrictModeViolation: uses Zoom
    mount = createMount({ strict: false });
    classes = getClasses(
      <SpeedDial {...defaultProps}>
        <div />
      </SpeedDial>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<SpeedDial {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp', // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  it('should render a Fade transition', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );
    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
  });

  it('should render a Fab', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );
    const buttonWrapper = wrapper.find('[aria-expanded]').first();
    assert.strictEqual(buttonWrapper.type(), Fab);
  });

  it('should render with a null child', () => {
    const wrapper = mount(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction icon={icon} tooltipTitle="One" />
        {null}
        <SpeedDialAction icon={icon} tooltipTitle="Three" />
      </SpeedDial>,
    );
    assert.strictEqual(wrapper.find(SpeedDialAction).length, 2);
  });

  it('should pass the open prop to its children', () => {
    const actionClasses = { fabClosed: 'is-closed' };
    const wrapper = mount(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction1" />
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction2" />
      </SpeedDial>,
    );
    const actions = wrapper.find('[role="menuitem"]').filterWhere(wrapsIntrinsicElement);
    assert.strictEqual(actions.some('.is-closed'), false);
  });

  describe('prop: onKeyDown', () => {
    it('should be called when a key is pressed', () => {
      const handleKeyDown = spy();
      const wrapper = mount(
        <SpeedDial {...defaultProps} onKeyDown={handleKeyDown}>
          <FakeAction />
        </SpeedDial>,
      );
      const buttonWrapper = wrapper.find('[aria-expanded]').first();
      const eventMock = 'something-to-match';
      buttonWrapper.simulate('keyDown', {
        key: ' ',
        eventMock,
      });
      assert.strictEqual(handleKeyDown.callCount, 1);
      assert.strictEqual(handleKeyDown.calledWithMatch({ eventMock }), true);
    });
  });

  describe('prop: direction', () => {
    const testDirection = direction => {
      const className = `direction${direction}`;
      const wrapper = mount(
        <SpeedDial {...defaultProps} direction={direction.toLowerCase()}>
          <SpeedDialAction icon={icon} tooltipTitle="action1" />
          <SpeedDialAction icon={icon} tooltipTitle="action2" />
        </SpeedDial>,
      );
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes[className]), true);
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
          FabProps={{
            ref: ref => {
              dialButtonRef = ref;
            },
          }}
          direction={direction}
          onKeyDown={onkeydown}
        >
          {Array.from({ length: actionCount }, (_, i) => (
            <SpeedDialAction
              key={i}
              FabProps={{
                ref: ref => {
                  actionRefs[i] = ref;
                },
              }}
              icon={icon}
              data-test={i}
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
      return wrapper
        .find(SpeedDialAction)
        .at(actionIndex)
        .find(Fab);
    };
    /**
     * @returns true if the button of the nth action is focused
     */
    const isActionFocused = index => {
      const expectedFocusedElement = index === -1 ? dialButtonRef : actionRefs[index];
      return expectedFocusedElement === window.document.activeElement;
    };

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
      it('considers arrow keys with the same initial orientation', () => {
        resetDialToOpen();
        getDialButton().simulate('keydown', { key: 'left' });
        assert.strictEqual(isActionFocused(0), true);
        getDialButton().simulate('keydown', { key: 'up' });
        assert.strictEqual(isActionFocused(0), true);
        getDialButton().simulate('keydown', { key: 'left' });
        assert.strictEqual(isActionFocused(1), true);
        getDialButton().simulate('keydown', { key: 'right' });
        assert.strictEqual(isActionFocused(0), true);
      });
    });

    // eslint-disable-next-line func-names
    describe('actions navigation', function() {
      this.timeout(5000); // These tests are really slow.

      /**
       * tests a combination of arrow keys on a focused SpeedDial
       */
      const testCombination = async (
        dialDirection,
        [firstKey, ...combination],
        [firstFocusedAction, ...foci],
      ) => {
        resetDialToOpen(dialDirection);

        getDialButton().simulate('keydown', { key: firstKey });
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
            key: arrowKey,
          });
          assert.strictEqual(
            isActionFocused(expectedFocusedAction),
            true,
            `focused action after ${combinationUntilNot.join(
              ',',
            )} should be ${expectedFocusedAction}`,
          );
        });
      };

      it('considers the first arrow key press as forward navigation', async () => {
        await testCombination('up', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);
        await testCombination(
          'up',
          ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'],
          [0, 1, 2, 1],
        );

        await testCombination(
          'right',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
        await testCombination(
          'right',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );

        await testCombination(
          'down',
          ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'],
          [0, 1, 2, 1],
        );
        await testCombination('down', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);

        await testCombination(
          'left',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );
        await testCombination(
          'left',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
      });

      it('ignores array keys orthogonal to the direction', async () => {
        await testCombination(
          'up',
          ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowUp'],
          [0, 0, 0, 1],
        );
        await testCombination(
          'right',
          ['ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowRight'],
          [0, 0, 0, 1],
        );
        await testCombination(
          'down',
          ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowDown'],
          [0, 0, 0, 1],
        );
        await testCombination(
          'left',
          ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowLeft'],
          [0, 0, 0, 1],
        );
      });

      it('does not wrap around', async () => {
        await testCombination(
          'up',
          ['ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowUp'],
          [0, -1, -1, 0],
        );
        await testCombination(
          'right',
          ['ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, -1, -1, 0],
        );
        await testCombination(
          'down',
          ['ArrowDown', 'ArrowUp', 'ArrowUp', 'ArrowDown'],
          [0, -1, -1, 0],
        );
        await testCombination(
          'left',
          ['ArrowLeft', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, -1, -1, 0],
        );
      });
    });
  });
});
