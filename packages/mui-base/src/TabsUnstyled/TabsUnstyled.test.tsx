import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  describeConformanceUnstyled,
  act,
  createRenderer,
  fireEvent,
  screen,
  createMount,
} from 'test/utils';
import Tab from '@mui/base/TabUnstyled';
import Tabs, { tabsUnstyledClasses as classes, TabsUnstyledProps } from '@mui/base/TabsUnstyled';
import TabsList from '@mui/base/TabsListUnstyled';

describe('<TabsUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  before(function beforeHook() {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // The test fails on Safari with just:
    //
    // container.scrollLeft = 200;
    // expect(container.scrollLeft).to.equal(200); 💥
    if (isSafari) {
      this.skip();
    }
  });

  describeConformanceUnstyled(<Tabs value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiTabs',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
    skip: ['componentsPropsCallbacks'], // not implemented yet
  }));

  it('can be named via `aria-label`', () => {
    render(
      <Tabs>
        <TabsList aria-label="string label">
          <Tab />
        </TabsList>
      </Tabs>,
    );

    expect(screen.getByRole('tablist')).toHaveAccessibleName('string label');
  });

  it('can be named via `aria-labelledby`', () => {
    render(
      <React.Fragment>
        <h3 id="label-id">complex name</h3>
        <Tabs>
          <TabsList aria-labelledby="label-id">
            <Tab />
          </TabsList>
        </Tabs>
      </React.Fragment>,
    );

    expect(screen.getByRole('tablist')).toHaveAccessibleName('complex name');
  });

  describe('prop: children', () => {
    it('should accept a null child', () => {
      const { getAllByRole } = render(
        <Tabs value={0}>
          {null}
          <Tab />
        </Tabs>,
      );
      expect(getAllByRole('tab')).to.have.lengthOf(1);
    });

    it('should support empty children', () => {
      render(<Tabs value={1} />);
    });

    it('puts the selected child in tab order', () => {
      const { getAllByRole, setProps } = render(
        <Tabs value={1}>
          <TabsList>
            <Tab />
            <Tab />
          </TabsList>
        </Tabs>,
      );

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([-1, 0]);

      setProps({ value: 0 });

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([0, -1]);
    });
  });

  describe('prop: value', () => {
    const tabs = (
      <Tabs value={1}>
        <TabsList>
          <Tab />
          <Tab />
        </TabsList>
      </Tabs>
    );

    it('should pass selected prop to children', () => {
      const { getAllByRole } = render(tabs);
      const tabElements = getAllByRole('tab');
      expect(tabElements[0]).to.have.attribute('aria-selected', 'false');
      expect(tabElements[1]).to.have.attribute('aria-selected', 'true');
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange when clicking', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange}>
          <TabsList>
            <Tab />
            <Tab />
          </TabsList>
        </Tabs>,
      );

      fireEvent.click(getAllByRole('tab')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(1);
    });

    it('should not call onChange when already selected', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange}>
          <TabsList>
            <Tab />
            <Tab />
          </TabsList>
        </Tabs>,
      );

      fireEvent.click(getAllByRole('tab')[0]);
      expect(handleChange.callCount).to.equal(0);
    });

    it('when `selectionFollowsFocus` should call if an unselected tab gets focused', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <TabsList>
            <Tab />
            <Tab />
          </TabsList>
        </Tabs>,
      );
      const [, lastTab] = getAllByRole('tab');

      act(() => {
        lastTab.focus();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.args[1]).to.equal(1);
    });

    it('when `selectionFollowsFocus` should not call if an selected tab gets focused', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <TabsList>
            <Tab />
            <Tab />
          </TabsList>
        </Tabs>,
      );
      const [firstTab] = getAllByRole('tab');

      act(() => {
        firstTab.focus();
      });

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: orientation', () => {
    it('does not add aria-orientation by default', () => {
      render(
        <Tabs value={0}>
          <TabsList>
            <Tabs />
          </TabsList>
        </Tabs>,
      );

      expect(screen.getByRole('tablist')).not.to.have.attribute('aria-orientation');
    });

    it('adds the proper aria-orientation when vertical', () => {
      render(
        <Tabs value={0} orientation="vertical">
          <TabsList>
            <Tabs />
          </TabsList>
        </Tabs>,
      );

      expect(screen.getByRole('tablist')).to.have.attribute('aria-orientation', 'vertical');
    });
  });

  describe('keyboard navigation when focus is on a tab', () => {
    [
      ['horizontal', 'ltr', 'ArrowLeft', 'ArrowRight'],
      ['horizontal', 'rtl', 'ArrowRight', 'ArrowLeft'],
      ['vertical', undefined, 'ArrowUp', 'ArrowDown'],
    ].forEach((entry) => {
      const [orientation, direction, previousItemKey, nextItemKey] = entry;

      describe(`when focus is on a tab element in a ${orientation} ${direction} tablist`, () => {
        describe(previousItemKey ?? '', () => {
          it('moves focus to the last tab without activating it if focus is on the first tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              firstTab.focus();
            });

            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the last tab while activating it if focus is on the first tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                selectionFollowsFocus
                value={0}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              firstTab.focus();
            });

            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(2);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('moves focus to the previous tab without activating it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, secondTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the previous tab while activating it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                selectionFollowsFocus
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, secondTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('skips over disabled tabs', () => {
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                selectionFollowsFocus
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab disabled />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              lastTab.focus();
            });

            fireEvent.keyDown(lastTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });
        });

        describe(nextItemKey ?? '', () => {
          it('moves focus to the first tab without activating it if focus is on the last tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              lastTab.focus();
            });

            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the first tab while activating it if focus is on the last tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                selectionFollowsFocus
                value={2}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              lastTab.focus();
            });

            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('moves focus to the next tab without activating it it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [, secondTab, lastTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the next tab while activating it it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                selectionFollowsFocus
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [, secondTab, lastTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(2);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('skips over disabled tabs', () => {
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsUnstyledProps['direction']}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsUnstyledProps['orientation']}
                selectionFollowsFocus
                value={1}
              >
                <TabsList>
                  <Tab />
                  <Tab disabled />
                  <Tab />
                </TabsList>
              </Tabs>,
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              firstTab.focus();
            });

            fireEvent.keyDown(firstTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });
        });
      });
    });

    describe('when focus is on a tab regardless of orientation', () => {
      describe('Home', () => {
        it('moves focus to the first tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <TabsList>
                <Tab />
                <Tab />
                <Tab />
              </TabsList>
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('when `selectionFollowsFocus` moves focus to the first tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <TabsList>
                <Tab />
                <Tab />
                <Tab />
              </TabsList>
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.args[1]).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('moves focus to first non-disabled tab', () => {
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <TabsList>
                <Tab disabled />
                <Tab />
                <Tab />
              </TabsList>
            </Tabs>,
          );
          const [, secondTab, lastTab] = getAllByRole('tab');
          act(() => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(secondTab).toHaveFocus();
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });
      });

      describe('End', () => {
        it('moves focus to the last tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <TabsList>
                <Tab />
                <Tab />
                <Tab />
              </TabsList>
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('when `selectionFollowsFocus` moves focus to the last tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={0}>
              <TabsList>
                <Tab />
                <Tab />
                <Tab />
              </TabsList>
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.args[1]).to.equal(2);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('moves focus to first non-disabled tab', () => {
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <TabsList>
                <Tab />
                <Tab />
                <Tab disabled />
              </TabsList>
            </Tabs>,
          );
          const [firstTab, secondTab] = getAllByRole('tab');
          act(() => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(secondTab).toHaveFocus();
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });
      });
    });

    it('should allow to focus first tab when there are no active tabs', () => {
      const { getAllByRole } = render(
        <Tabs value={false}>
          <TabsList>
            <Tab />
            <Tab />
          </TabsList>
        </Tabs>,
      );

      expect(getAllByRole('tab').map((tab) => tab.getAttribute('tabIndex'))).to.deep.equal([
        '0',
        '-1',
      ]);
    });
  });
});
