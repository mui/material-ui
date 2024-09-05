import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { Tab } from '@mui/base/Tab';
import { Tabs, tabsClasses as classes, TabsProps } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Tabs />', () => {
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
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
    skip: ['componentProp'],
  }));

  it('can be named via `aria-label`', () => {
    render(
      <Tabs>
        <TabsList aria-label="string label">
          <Tab value={0} />
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
            <Tab value={0} />
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
          <TabsList>
            <Tab value={1} />
          </TabsList>
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
            <Tab value={0} />
            <Tab value={1} />
          </TabsList>
        </Tabs>,
      );

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([-1, 0]);

      setProps({ value: 0 });

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([0, -1]);
    });

    it('sets the aria-labelledby attribute on tab panels to the corresponding tab id', () => {
      const { getAllByRole } = render(
        <Tabs>
          <TabsList>
            <Tab value="tab-0" />
            <Tab value="tab-1" id="explicit-tab-id-1" />
            <Tab />
            <Tab id="explicit-tab-id-3" />
          </TabsList>
          <TabPanel value="tab-1" />
          <TabPanel value="tab-0" />
          <TabPanel />
          <TabPanel />
        </Tabs>,
      );

      const tabs = getAllByRole('tab');
      const tabPanels = getAllByRole('tabpanel', { hidden: true });

      expect(tabPanels[0]).to.have.attribute('aria-labelledby', tabs[1].id);
      expect(tabPanels[1]).to.have.attribute('aria-labelledby', tabs[0].id);
      expect(tabPanels[2]).to.have.attribute('aria-labelledby', tabs[2].id);
      expect(tabPanels[3]).to.have.attribute('aria-labelledby', tabs[3].id);
    });

    it('sets the aria-controls attribute on tabs to the corresponding tab panel id', () => {
      const { getAllByRole } = render(
        <Tabs>
          <TabsList>
            <Tab value="tab-0" />
            <Tab value="tab-1" id="explicit-tab-id-1" />
            <Tab />
            <Tab id="explicit-tab-id-3" />
          </TabsList>
          <TabPanel value="tab-1" />
          <TabPanel value="tab-0" />
          <TabPanel />
          <TabPanel />
        </Tabs>,
      );

      const tabs = getAllByRole('tab');
      const tabPanels = getAllByRole('tabpanel', { hidden: true });

      expect(tabs[0]).to.have.attribute('aria-controls', tabPanels[1].id);
      expect(tabs[1]).to.have.attribute('aria-controls', tabPanels[0].id);
      expect(tabs[2]).to.have.attribute('aria-controls', tabPanels[2].id);
      expect(tabs[3]).to.have.attribute('aria-controls', tabPanels[3].id);
    });
  });

  describe('prop: value', () => {
    const tabs = (
      <Tabs value={1}>
        <TabsList>
          <Tab value={0} />
          <Tab value={1} />
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
            <Tab value={0} />
            <Tab value={1} />
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
            <Tab value={0} />
            <Tab value={1} />
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
            <Tab value={0} />
            <Tab value={1} />
          </TabsList>
        </Tabs>,
      );
      const [firstTab] = getAllByRole('tab');

      act(() => {
        firstTab.focus();
      });

      fireEvent.keyDown(firstTab, { key: 'ArrowRight' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.args[1]).to.equal(1);
    });

    it('when `selectionFollowsFocus` should not call if an selected tab gets focused', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <TabsList>
            <Tab value={0} />
            <Tab value={1} />
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
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                value={0}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                selectionFollowsFocus
                value={0}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                value={1}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                selectionFollowsFocus
                value={1}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                selectionFollowsFocus
                value={2}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} disabled />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                value={2}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                selectionFollowsFocus
                value={2}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                value={1}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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

          it('when `selectionFollowsFocus` moves focus to the next tab while activating it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                direction={direction as TabsProps['direction']}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                selectionFollowsFocus
                value={1}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} />
                  <Tab value={2} />
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
                direction={direction as TabsProps['direction']}
                onKeyDown={handleKeyDown}
                orientation={orientation as TabsProps['orientation']}
                selectionFollowsFocus
                value={0}
              >
                <TabsList>
                  <Tab value={0} />
                  <Tab value={1} disabled />
                  <Tab value={2} />
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
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={2}>
              <TabsList>
                <Tab value={0} />
                <Tab value={1} />
                <Tab value={2} />
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
                <Tab value={0} />
                <Tab value={1} />
                <Tab value={2} />
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
                <Tab value={0} disabled />
                <Tab value={1} />
                <Tab value={2} />
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
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={0}>
              <TabsList>
                <Tab value={0} />
                <Tab value={1} />
                <Tab value={2} />
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
                <Tab value={0} />
                <Tab value={1} />
                <Tab value={2} />
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
            <Tabs onKeyDown={handleKeyDown} selectionFollowsFocus value={0}>
              <TabsList>
                <Tab value={0} />
                <Tab value={1} />
                <Tab value={2} disabled />
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
        <Tabs>
          <TabsList>
            <Tab value={0} />
            <Tab value={1} />
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
