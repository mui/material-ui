import * as React from 'react';
import { spy, useFakeTimers } from 'sinon';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5, screen, fireEvent } from 'test/utils';
import Menu, { menuClasses as classes } from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import Button from '../Button';
import SubMenu from '../SubMenu';
import MenuItem from '../MenuItem';
import MenuList from '../MenuList';

describe('<Menu />', () => {
  /**
   * @type {ReturnType<typeof useFakeTimers>}
   */
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });

  const render = createClientRender();

  describeConformanceV5(<Menu anchorEl={() => document.createElement('div')} open />, () => ({
    classes,
    inheritComponent: Popover,
    render,
    muiName: 'MuiMenu',
    refInstanceof: window.HTMLDivElement,
    testDeepOverrides: { slotName: 'list', slotClassName: classes.list },
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    testVariantProps: { variant: 'menu' },
    skip: [
      'rootClass', // portal, can't determin the root
      'componentProp',
      'componentsProp',
      'reactTestRenderer', // react-transition-group issue
      'themeDefaultProps', // portal, can't determin the root
    ],
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', () => {
        const handleEnter = spy();
        const handleEntering = spy();
        render(
          <Menu
            anchorEl={document.createElement('div')}
            open
            TransitionProps={{
              onEnter: handleEnter,
              onEntering: handleEntering,
            }}
          />,
        );

        expect(handleEnter.callCount).to.equal(
          // onEnter is called on mount which is run twice with Strict Effects
          React.version.startsWith('18') ? 2 : 1,
        );
        expect(handleEnter.args[0].length).to.equal(2);
        expect(handleEntering.callCount).to.equal(1);
        expect(handleEntering.args[0].length).to.equal(2);
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', () => {
        const handleExit = spy();
        const handleExiting = spy();

        const { setProps } = render(
          <Menu
            TransitionProps={{
              onExit: handleExit,
              onExiting: handleExiting,
            }}
            anchorEl={document.createElement('div')}
            open
          />,
        );

        setProps({
          open: false,
        });

        expect(handleExit.callCount).to.equal(1);
        expect(handleExit.args[0].length).to.equal(1);
        expect(handleExiting.callCount).to.equal(1);
        expect(handleExiting.args[0].length).to.equal(1);
      });
    });
  });

  it('should pass `classes.paper` to the Paper', () => {
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        PaperProps={{ 'data-testid': 'paper' }}
      />,
    );

    expect(screen.getByTestId('paper')).to.have.class(classes.paper);
  });

  describe('prop: PopoverClasses', () => {
    it('should be able to change the Popover style', () => {
      render(
        <Menu
          anchorEl={document.createElement('div')}
          open
          PaperProps={{ 'data-testid': 'paper' }}
          PopoverClasses={{ paper: 'bar' }}
        />,
      );

      expect(screen.getByTestId('paper')).to.have.class('bar');
    });
  });

  it('should pass onClose prop to Popover', () => {
    const handleClose = spy();
    render(<Menu anchorEl={document.createElement('div')} open onClose={handleClose} />);

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    expect(handleClose.callCount).to.equal(1);
  });

  it('renders its children only when open', () => {
    const { setProps } = render(
      <Menu anchorEl={document.createElement('div')} open={false}>
        <div data-testid="children" />
      </Menu>,
    );

    expect(screen.queryByTestId('children')).to.equal(null);

    setProps({ open: true });

    expect(screen.getByTestId('children')).not.to.equal(null);
  });

  describe('list node', () => {
    it('should render a menu inside the Popover', () => {
      render(<Menu anchorEl={document.createElement('div')} open data-testid="popover" />);

      expect(screen.getByTestId('popover').querySelector('[role="menu"]')).not.to.equal(null);
    });
  });

  it('should open during the initial mount', () => {
    function MenuItem(props) {
      const { autoFocus, children } = props;
      return (
        <div role="menuitem" tabIndex={-1} data-autofocus={autoFocus}>
          {children}
        </div>
      );
    }
    render(
      <Menu anchorEl={document.createElement('div')} open>
        <MenuItem>one</MenuItem>
      </Menu>,
    );

    expect(screen.getByRole('menuitem')).to.have.attribute('data-autofocus', 'true');
  });

  it('should not focus list if autoFocus=false', () => {
    render(
      <Menu anchorEl={document.createElement('div')} autoFocus={false} open>
        <div tabIndex={-1} />
      </Menu>,
    );

    expect(screen.getByRole('menu')).not.toHaveFocus();
  });

  it('should call TransitionProps.onEntering', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        TransitionProps={{ onEntering: onEnteringSpy }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('should call TransitionProps.onEntering, disableAutoFocusItem', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        disableAutoFocusItem
        open
        TransitionProps={{ onEntering: onEnteringSpy }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('should call onClose on tab', () => {
    function MenuItem(props) {
      const { autoFocus, children } = props;

      const ref = React.useRef(null);
      React.useEffect(() => {
        if (autoFocus) {
          ref.current.focus();
        }
      }, [autoFocus]);

      return (
        <div ref={ref} role="menuitem" tabIndex={-1}>
          {children}
        </div>
      );
    }
    const onCloseSpy = spy();
    render(
      <Menu anchorEl={document.createElement('div')} open onClose={onCloseSpy}>
        <MenuItem>hello</MenuItem>
      </Menu>,
    );

    fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Tab' });

    expect(onCloseSpy.callCount).to.equal(1);
    expect(onCloseSpy.args[0][1]).to.equal('tabKeyDown');
  });

  it('ignores invalid children', () => {
    render(
      <Menu anchorEl={document.createElement('div')} open>
        {null}
        <span role="menuitem">hello</span>
        {/* testing conditional rendering */}
        {false && <span role="menuitem">hello</span>}
        {undefined}
        foo
      </Menu>,
    );

    expect(screen.getAllByRole('menuitem')).to.have.length(1);
  });

  describe('warnings', () => {
    it('warns a Fragment is passed as a child', () => {
      expect(() => {
        render(
          <Menu anchorEl={document.createElement('div')} open>
            <React.Fragment />
          </Menu>,
        );
      }).toErrorDev([
        "Material-UI: The Menu component doesn't accept a Fragment as a child.",
        // twice in StrictMode
        "Material-UI: The Menu component doesn't accept a Fragment as a child.",
      ]);
    });
  });

  describe('cascading menu', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    const CascadingMenu = (props) => {
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleItemClick = () => {
        setAnchorEl(null);
      };

      return (
        <div>
          <Button onClick={handleButtonClick}>Open Menu</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleItemClick}
            transitionDuration={0}
            {...props}
          >
            <MenuItem
              id="settings-item"
              subMenu={
                <SubMenu>
                  <MenuItem id="regular-item" onClick={handleItemClick}>
                    Regular item
                  </MenuItem>
                  <MenuItem
                    id="go-deeper-1"
                    subMenu={
                      <SubMenu>
                        <MenuItem key="deeper2" id="go-deeper-2">
                          Bottom depth
                        </MenuItem>
                      </SubMenu>
                    }
                  >
                    Go deeper
                  </MenuItem>
                </SubMenu>
              }
            >
              Settings
            </MenuItem>
            <MenuItem
              id="account-item"
              subMenu={
                <SubMenu>
                  <MenuItem id="reset-password" onClick={handleItemClick}>
                    Reset password
                  </MenuItem>
                  <MenuItem id="change-username" onClick={handleItemClick}>
                    Change username
                  </MenuItem>
                  <MenuItem onClick={handleItemClick}>Delete account</MenuItem>
                </SubMenu>
              }
            >
              My account
            </MenuItem>
          </Menu>
        </div>
      );
    };

    it('displays a sub menu level 1', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
    });

    it('displays a sub menu level 2', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Go deeper' }));
      });

      clock.tick(500);

      expect(queryByRole('menuitem', { name: 'Bottom depth' })).to.not.equal(null);
    });

    it('sub menus collapse when active parent item is changed', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'My account' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Change username' })).to.not.equal(null);
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Change username' })).to.equal(null);
    });

    it('sub menu stays open when mouse is outside of menu', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Regular item' }));
      });
      act(() => {
        fireEvent.mouseOut(getByRole('menuitem', { name: 'Regular item' }));
      });
      act(() => {
        fireEvent.mouseEnter(getByRole('button'));
      });

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
    });

    it('opens a sub Menu on RightArrow keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
    });

    it('closes current sub Menu on LeftArrow keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'ArrowLeft' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.equal(null);
    });

    it('closes all menus on Tab keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'Tab' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.equal(null);
      expect(queryByRole('menuitem', { name: 'Settings' })).to.equal(null);
    });

    it('closes all menus on Escape keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'Escape' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.equal(null);
      expect(queryByRole('menuitem', { name: 'Settings' })).to.equal(null);
    });

    it('changes focus with up and down arrow buttons', () => {
      const { getByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(getByRole('menuitem', { name: 'Regular item' })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: 'Regular item' }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'ArrowDown' });
      });

      clock.tick(0);

      expect(getByRole('menuitem', { name: 'Go deeper' })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: 'Go deeper' }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Go deeper' }), { key: 'ArrowUp' });
      });

      clock.tick(0);

      expect(getByRole('menuitem', { name: 'Regular item' })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: 'Regular item' }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('changes focus with left and right arrow buttons', () => {
      const { getByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      let regularItem = getByRole('menuitem', { name: 'Regular item' });
      expect(regularItem).to.equal(document.activeElement); // is focused
      expect(Array.from(regularItem.classList)).to.include('Mui-focusVisible'); // looks focused
      act(() => {
        fireEvent.keyDown(regularItem, { key: 'ArrowLeft' });
      });

      clock.tick(0);

      const settings = getByRole('menuitem', { name: 'Settings' });
      expect(settings).to.equal(document.activeElement); // is focused
      expect(Array.from(settings.classList)).to.include('Mui-focusVisible'); // looks focused

      act(() => {
        fireEvent.keyDown(settings, { key: 'ArrowRight' });
      });

      clock.tick(0);

      regularItem = getByRole('menuitem', { name: 'Regular item' });
      expect(regularItem).to.equal(document.activeElement); // is focused
      expect(Array.from(regularItem.classList)).to.include('Mui-focusVisible'); // looks focused
    });
  });
});
