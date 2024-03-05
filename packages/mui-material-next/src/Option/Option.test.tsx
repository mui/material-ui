import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui-internal/test-utils';
import { MenuProvider } from '@mui/base/useMenu';
import Option, { optionClasses as classes } from '@mui/material-next/Option';
import Menu from '@mui/material-next/Menu';
import ButtonBase from '@mui/material-next/ButtonBase';
import describeConformance from '../../test/describeConformance';

const dummyGetItemState = () => ({
  disabled: false,
  highlighted: false,
  selected: false,
  index: 0,
  focusable: true,
});

const testContext = {
  dispatch: () => {},
  getItemIndex: () => 0,
  getItemProps: () => ({}),
  getItemState: dummyGetItemState,
  open: false,
  registerHighlightChangeHandler: () => () => {},
  registerItem: () => ({ id: '', deregister: () => {} }),
  registerSelectionChangeHandler: () => () => {},
  totalSubitemCount: 0,
};

describe('<Option />', () => {
  const { render } = createRenderer({ clock: 'fake' });

  // afterEach(() => {
  //   document.getElementsByTagName('html')[0].innerHTML = '';
  // });

  describeConformance(<Option data-testid="option">1</Option>, () => ({
    render: (node) => {
      return render(<MenuProvider value={testContext}>{node}</MenuProvider>);
    },
    wrapMount: (mount) => (node) => mount(<MenuProvider value={testContext}>{node}</MenuProvider>),
    classes,
    inheritComponent: ButtonBase,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
    muiName: 'MuiOption',
    testVariantProps: { dense: true },
    skip: ['componentsProp', 'reactTestRenderer'],
  }));

  const renderWithMenu = (node: React.ReactNode) => {
    function Test() {
      return (
        <Menu anchorEl={document.createElement('div')} open>
          {node}
        </Menu>
      );
    }

    return render(<Test />);
  };

  it('should render a focusable option', () => {
    renderWithMenu(<Option />);
    const option = screen.getByRole('option');

    expect(option).to.have.property('tabIndex', 0);
  });

  it('has a ripple when clicked', () => {
    renderWithMenu(<Option TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }} />);
    const option = screen.getByRole('option');

    // ripple starts on mousedown
    fireEvent.mouseDown(option);

    expect(option.querySelectorAll('.ripple-visible')).to.have.length(1);
  });

  it('should render with the selected class but not aria-selected when `selected`', () => {
    renderWithMenu(<Option selected />);
    const option = screen.getByRole('option');

    expect(option).to.have.class(classes.selected);
    expect(option).not.to.have.attribute('aria-selected');
  });

  it('can have a role of option', () => {
    renderWithMenu(<Option role="option" aria-selected={false} />);

    expect(screen.queryByRole('option')).not.to.equal(null);
  });

  describe('event callbacks', () => {
    const events: Array<keyof typeof fireEvent> = [
      'click',
      'mouseDown',
      'mouseEnter',
      'mouseLeave',
      'mouseUp',
      'touchEnd',
    ];

    events.forEach((eventName) => {
      it(`should fire ${eventName}`, () => {
        const handlerName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
        const handler = spy();
        renderWithMenu(<Option {...{ [handlerName]: handler }} />);

        fireEvent[eventName](screen.getByRole('option'));

        expect(handler.callCount).to.equal(1);
      });
    });

    it(`should fire focus, keydown, keyup and blur`, () => {
      const handleFocus = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const handleBlur = spy();
      renderWithMenu(
        <Option
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />,
      );
      const option = screen.getByRole('option');

      act(() => {
        option.focus();
      });

      expect(handleFocus.callCount).to.equal(1);

      fireEvent.keyDown(option);

      expect(handleKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(option);

      expect(handleKeyUp.callCount).to.equal(1);

      expect(handleKeyDown.callCount).to.equal(1);
    });

    it('should fire onTouchStart', function touchStartTest() {
      // only run in supported browsers
      if (typeof Touch === 'undefined') {
        this.skip();
      }

      const handleTouchStart = spy();
      renderWithMenu(<Option onTouchStart={handleTouchStart} />);
      const option = screen.getByRole('option');

      const touch = new Touch({ identifier: 0, target: option, clientX: 0, clientY: 0 });
      fireEvent.touchStart(option, { touches: [touch] });

      expect(handleTouchStart.callCount).to.equal(1);
    });
  });

  it('can be disabled', () => {
    renderWithMenu(<Option disabled />);
    const option = screen.getByRole('option');

    expect(option).to.have.attribute('aria-disabled', 'true');
  });

  it('can be selected', () => {
    renderWithMenu(<Option selected />);
    const option = screen.getByRole('option');

    expect(option).to.have.class(classes.selected);
  });

  it('prop: disableGutters', () => {
    const { rerender } = render(
      <Menu anchorEl={document.createElement('div')} open>
        <Option />
      </Menu>,
    );
    const option = screen.getByRole('option');

    expect(option).to.have.class(classes.gutters);

    rerender(
      <Menu anchorEl={document.createElement('div')} open>
        <Option disableGutters />
      </Menu>,
    );

    expect(option).not.to.have.class(classes.gutters);
  });

  // TODO v6: Need to be re-structured now that we don't use the List component internally
  // describe('context: dense', () => {
  //   it.skip('should forward the context', () => {
  //     let context = null;
  //     const { setProps } = render(
  //       <Option>
  //         <ListContext.Consumer>
  //           {(options) => {
  //             context = options;
  //           }}
  //         </ListContext.Consumer>
  //       </Option>,
  //     );
  //     expect(context).to.have.property('dense', false);
  //     setProps({ dense: true });
  //     expect(context).to.have.property('dense', true);
  //   });
  // });
});
