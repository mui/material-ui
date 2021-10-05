import * as React from 'react';
import { spy, useFakeTimers } from 'sinon';
import { expect } from 'chai';
import {
  act,
  createClientRender,
  describeConformance,
  screen,
  fireEvent,
  strictModeDoubleLoggingSupressed,
} from 'test/utils';
import Menu, { menuClasses as classes } from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import Button from '../Button';
import SubMenu from '../SubMenu';
import MenuItem from '../MenuItem';

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

  describeConformance(<Menu anchorEl={() => document.createElement('div')} open />, () => ({
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
    function MenuItemMock(props) {
      const { autoFocus, children } = props;
      return (
        <div role="menuitem" tabIndex={-1} data-autofocus={autoFocus}>
          {children}
        </div>
      );
    }
    render(
      <Menu anchorEl={document.createElement('div')} open>
        <MenuItemMock>one</MenuItemMock>
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
    function MenuItemMock(props) {
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
        <MenuItemMock>hello</MenuItemMock>
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
          <Menu anchorEl={document.createElement('div')} open={false}>
            <React.Fragment />
          </Menu>,
        );
      }).toErrorDev([
        "MUI: The Menu component doesn't accept a Fragment as a child.",
        !strictModeDoubleLoggingSupressed &&
          "MUI: The Menu component doesn't accept a Fragment as a child.",
      ]);
    });
  });

  describe('cascading menu', () => {
    it('renders a subMenu', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });
      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('renders a nested subMenu', () => {
      const expected = 'NestedSubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu transitionDuration={0}>
                    <MenuItem
                      subMenu={
                        <SubMenu>
                          <MenuItem>{expected}</MenuItem>
                        </SubMenu>
                      }
                    >
                      Test2
                    </MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test2' }));
      });

      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('collapses the subMenu when active parent item is changed', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
              <MenuItem>Other</MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Other', hidden: true }));
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.equal(null);
    });

    it('keeps subMenus open when mousing outside of menus', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseOut(getByRole('menuitem', { name: 'Test', hidden: true }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseEnter(getByRole('button', { hidden: true }));
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('opens a subMenu on right arrow keydown', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('closes a subMenu on left arrow keydown', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: expected }), { key: 'ArrowLeft' });
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.equal(null);
    });

    it('closes all menus on tab keydown', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
              transitionDuration={0}
            >
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: expected }), { key: 'Tab' });
      });

      act(() => {
        clock.tick(0);
      });
      clock.restore();

      expect(queryByRole('menuitem', { name: expected })).to.equal(null);
      expect(queryByRole('menuitem', { name: 'Test' })).to.equal(null);
    });

    it('closes all menus on escape keydown', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
              transitionDuration={0}
            >
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: expected }), { key: 'Escape' });
      });

      act(() => {
        clock.tick(0);
      });

      clock.restore();

      expect(queryByRole('menuitem', { name: expected })).to.equal(null);
      expect(queryByRole('menuitem', { name: 'Test' })).to.equal(null);
    });

    it('changes subMenu item focus with down arrow', () => {
      const expected = 'Second';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>First</MenuItem>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'First' }), { key: 'ArrowDown' });
      });

      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: expected }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('changes subMenu item focus with up arrow', () => {
      const expected = 'Second';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>First</MenuItem>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'First' }), { key: 'ArrowUp' });
      });

      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: expected }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('focuses first item when it opens a subMenu', () => {
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                    <MenuItem>Other</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: expected }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('changes focus with right and left arrow keys', () => {
      const firstFocus = 'MenuItem';
      const secondFocus = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{secondFocus}</MenuItem>
                  </SubMenu>
                }
              >
                {firstFocus}
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      // ensure focus is on first item in root menu
      expect(getByRole('menuitem', { name: firstFocus })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: firstFocus }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused

      // arrow right
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: firstFocus }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      // ensure focus moved to first item in submenu
      expect(getByRole('menuitem', { name: secondFocus })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: secondFocus }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused

      // arrow back left
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: secondFocus }), { key: 'ArrowLeft' });
      });

      act(() => {
        clock.tick(0);
      });

      // ensure focus moved back to first item in root menu
      expect(getByRole('menuitem', { name: firstFocus })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: firstFocus }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('keeps parent items of open sub menus highlighted', () => {
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>SubMenuItem</MenuItem>
                  </SubMenu>
                }
              >
                MenuItem
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(queryByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(queryByRole('menuitem', { name: 'MenuItem' }), { key: 'ArrowRight' });
      });

      clock.restore();

      const classList = Array.from(
        queryByRole('menuitem', { name: 'MenuItem', hidden: true }).classList,
      );
      const findClassLike = (matchString, list) => {
        const matches = list.filter((c) => c.indexOf(matchString) > -1);
        return matches.length > 0;
      };

      expect(findClassLike('openSubMenuParent', classList)).to.equal(true);
    });
  });
});
