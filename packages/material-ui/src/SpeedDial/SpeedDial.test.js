import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import {
  getClasses,
  cleanup,
  createMount,
  createClientRender,
  act,
  fireEvent,
  describeConformance,
  screen,
} from 'test/utils';
import Icon from '@material-ui/core/Icon';
import SpeedDial from './SpeedDial';
import SpeedDialAction from '../SpeedDialAction';

describe('<SpeedDial />', () => {
  // StrictModeViolation: not using act(), prefer test/utils/createClientRender
  const mount = createMount({ strict: false });
  const render = createClientRender({ strict: false });
  let classes;

  const icon = <Icon>font_icon</Icon>;
  const FakeAction = () => <div />;
  const defaultProps = {
    open: true,
    icon,
    ariaLabel: 'mySpeedDial',
  };

  before(() => {
    classes = getClasses(
      <SpeedDial {...defaultProps}>
        <div />
      </SpeedDial>,
    );
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
    const { container } = render(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );
    expect(container.firstChild.localName).to.equal('div');
  });

  it('should render a Fab', () => {
    render(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );

    expect(screen.getByLabelText('mySpeedDial')).to.have.class('MuiSpeedDial-fab');
  });

  it('should render with a null child', () => {
    const { container } = render(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction icon={icon} tooltipTitle="One" />
        {null}
        <SpeedDialAction icon={icon} tooltipTitle="Three" />
      </SpeedDial>,
    );
    expect(container.querySelectorAll('.MuiSpeedDial-actions')).to.have.lengthOf(1);
  });

  it('should pass the open prop to its children', () => {
    const actionClasses = { fabClosed: 'is-closed' };
    const { getAllByRole } = render(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction1" />
        <SpeedDialAction classes={actionClasses} icon={icon} tooltipTitle="SpeedDialAction2" />
      </SpeedDial>,
    );
    const actions = getAllByRole('menuitem');
    const actionClassNames = actions.map((action) => action.className);
    expect(actionClassNames).to.not.contain('is-closed');
  });

  describe('prop: onKeyDown', () => {
    it('should be called when a key is pressed', () => {
      const handleKeyDown = spy();
      const { getByRole } = render(
        <SpeedDial {...defaultProps} onKeyDown={handleKeyDown}>
          <FakeAction />
        </SpeedDial>,
      );
      const button = getByRole('button');
      button.focus();
      fireEvent.keyDown(button, {
        key: ' ',
      });
      expect(handleKeyDown.callCount).to.equal(1);
    });
  });

  describe('prop: direction', () => {
    [
      ['up', 'directionUp'],
      ['down', 'directionDown'],
      ['left', 'directionLeft'],
      ['right', 'directionRight'],
    ].forEach(([direction, className]) => {
      it(`should place actions in the correct position when direction=${direction}`, () => {
        const { container } = render(
          <SpeedDial {...defaultProps} direction={direction.toLowerCase()}>
            <SpeedDialAction icon={icon} tooltipTitle="action1" />
            <SpeedDialAction icon={icon} tooltipTitle="action2" />
          </SpeedDial>,
        );
        expect(container.firstChild).to.have.class(classes[className]);
      });
    });
  });

  describe('keyboard', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should open the speed dial and move to the first action without closing', () => {
      const handleOpen = spy();
      const { getByRole, getAllByRole } = render(
        <SpeedDial ariaLabel="mySpeedDial" onOpen={handleOpen}>
          <SpeedDialAction tooltipTitle="action1" />
          <SpeedDialAction tooltipTitle="action2" />
        </SpeedDial>,
      );
      const fab = getByRole('button');
      fab.focus();
      act(() => {
        clock.tick();
      });
      expect(handleOpen.callCount).to.equal(1);
      const actions = getAllByRole('menuitem');
      expect(actions.length).to.equal(2);
      fireEvent.keyDown(fab, { key: 'ArrowUp' });
      expect(document.activeElement).to.equal(actions[0]);
      expect(fab).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('dial focus', () => {
    let actionRefs;
    let dialButtonRef;
    let onkeydown;

    const mountSpeedDial = (direction = 'up', actionCount = 4) => {
      actionRefs = [];
      dialButtonRef = undefined;
      onkeydown = spy();

      render(
        <SpeedDial
          {...defaultProps}
          FabProps={{
            ref: (ref) => {
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
                ref: (ref) => {
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
    const getDialButton = () => window.document.body.querySelector('[aria-controls]');
    /**
     *
     * @param actionIndex
     * @returns the button of the nth SpeedDialAction or the Fab if -1
     */
    const getActionButton = (actionIndex) => {
      if (actionIndex === -1) {
        return getDialButton();
      }
      const actions = screen.getAllByRole('menuitem');
      return actions[actionIndex];
    };
    /**
     * @returns true if the button of the nth action is focused
     */
    const isActionFocused = (index) => {
      const expectedFocusedElement = index === -1 ? dialButtonRef : actionRefs[index];
      return expectedFocusedElement === window.document.activeElement;
    };

    const resetDialToOpen = (direction) => {
      cleanup();

      mountSpeedDial(direction);
      dialButtonRef.focus();
    };

    it('displays the actions on focus gain', () => {
      resetDialToOpen();
      expect(screen.getByRole('menu')).to.not.have.class('MuiSpeedDial-actionsClosed');
    });

    describe('first item selection', () => {
      it('considers arrow keys with the same initial orientation', () => {
        resetDialToOpen();
        fireEvent.keyDown(dialButtonRef, {
          key: 'left',
        });
        expect(isActionFocused(0)).to.equal(true);
        fireEvent.keyDown(window.document.activeElement, {
          key: 'up',
        });
        expect(isActionFocused(0)).to.equal(true);
        fireEvent.keyDown(window.document.activeElement, {
          key: 'left',
        });
        expect(isActionFocused(1)).to.equal(true);
        fireEvent.keyDown(window.document.activeElement, {
          key: 'right',
        });
        expect(isActionFocused(0)).to.equal(true);
      });
    });

    // eslint-disable-next-line func-names
    describe('actions navigation', function () {
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

        fireEvent.keyDown(dialButtonRef, {
          key: firstKey,
        });
        expect(isActionFocused(firstFocusedAction)).to.equal(
          true,
          `focused action initial ${firstKey} should be ${firstFocusedAction}`,
        );

        combination.forEach((arrowKey, i) => {
          const previousFocusedAction = foci[i - 1] || firstFocusedAction;
          const expectedFocusedAction = foci[i];
          const combinationUntilNot = [firstKey, ...combination.slice(0, i + 1)];

          const actionButton = getActionButton(previousFocusedAction);
          actionButton.focus();
          fireEvent.keyDown(actionButton, {
            key: arrowKey,
          });
          expect(isActionFocused(expectedFocusedAction)).to.equal(
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
