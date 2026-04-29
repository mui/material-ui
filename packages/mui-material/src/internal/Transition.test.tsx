/// <reference path="./react-transition-group.d.ts" />
import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import TransitionGroupContext from 'react-transition-group/TransitionGroupContext';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import Transition from './Transition';

describe('<Transition />', () => {
  const { clock, render } = createRenderer();

  type TestHandlers = {
    onEnter?: sinon.SinonSpy;
    onEntering?: sinon.SinonSpy;
    onEntered?: sinon.SinonSpy;
    onExit?: sinon.SinonSpy;
    onExiting?: sinon.SinonSpy;
    onExited?: sinon.SinonSpy;
  };

  function TestHarness(props: {
    in?: boolean;
    appear?: boolean;
    enter?: boolean;
    exit?: boolean;
    timeout?: number | null | { enter?: number; exit?: number; appear?: number };
    addEndListener?: ((done: () => void) => void) | ((node: HTMLElement, done: () => void) => void);
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    handlers?: TestHandlers;
  }) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    return (
      <Transition
        in={props.in}
        appear={props.appear}
        enter={props.enter}
        exit={props.exit}
        timeout={props.timeout}
        addEndListener={props.addEndListener}
        mountOnEnter={props.mountOnEnter}
        unmountOnExit={props.unmountOnExit}
        nodeRef={nodeRef}
        onEnter={props.handlers?.onEnter}
        onEntering={props.handlers?.onEntering}
        onEntered={props.handlers?.onEntered}
        onExit={props.handlers?.onExit}
        onExiting={props.handlers?.onExiting}
        onExited={props.handlers?.onExited}
      >
        {(status) => (
          <div ref={nodeRef} data-testid="target" data-status={status}>
            content
          </div>
        )}
      </Transition>
    );
  }

  describe('initial status', () => {
    it('starts at "entered" with in=true and appear=false', () => {
      render(<TestHarness in appear={false} timeout={100} />);
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');
    });

    it('starts at "exited" then transitions to entering with in=true and appear=true', () => {
      clock.withFakeTimers();
      const handlers = { onEnter: spy(), onEntering: spy(), onEntered: spy() };
      render(<TestHarness in appear timeout={100} handlers={handlers} />);
      // The mount effect starts the appear transition immediately.
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entering');
      // Enter callbacks receive isAppearing=true during the first mount.
      expect(handlers.onEnter!.args[0][0]).to.equal(true);
    });

    it('starts at "exited" with in=false', () => {
      render(<TestHarness in={false} timeout={100} />);
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exited');
    });

    it('renders null with mountOnEnter + in=false', () => {
      render(<TestHarness in={false} mountOnEnter timeout={100} />);
      expect(screen.queryByTestId('target')).to.equal(null);
    });

    it('renders null with unmountOnExit + in=false', () => {
      render(<TestHarness in={false} unmountOnExit timeout={100} />);
      expect(screen.queryByTestId('target')).to.equal(null);
    });
  });

  describe('transitions', () => {
    clock.withFakeTimers();

    it('progresses from exited to entering to entered on in=true', () => {
      const handlers = { onEnter: spy(), onEntering: spy(), onEntered: spy() };
      const { setProps } = render(<TestHarness in={false} timeout={100} handlers={handlers} />);
      setProps({ in: true });
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entering');
      expect(handlers.onEnter!.callCount).to.be.greaterThanOrEqual(1);
      expect(handlers.onEntering!.callCount).to.be.greaterThanOrEqual(1);
      clock.tick(100);
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');
      expect(handlers.onEntered!.callCount).to.be.greaterThanOrEqual(1);
    });

    it('progresses from entered to exiting to exited on in=false', () => {
      const handlers = { onExit: spy(), onExiting: spy(), onExited: spy() };
      const { setProps } = render(
        <TestHarness in appear={false} timeout={100} handlers={handlers} />,
      );
      setProps({ in: false });
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exiting');
      expect(handlers.onExit!.callCount).to.equal(1);
      expect(handlers.onExiting!.callCount).to.equal(1);
      clock.tick(100);
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exited');
      expect(handlers.onExited!.callCount).to.equal(1);
    });

    it('skips entering when enter=false', () => {
      const handlers = { onEnter: spy(), onEntering: spy(), onEntered: spy() };
      const { setProps } = render(
        <TestHarness in={false} enter={false} timeout={100} handlers={handlers} />,
      );
      setProps({ in: true });
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');
      // The skip path calls only the final entered callback.
      expect(handlers.onEnter!.callCount).to.equal(0);
      expect(handlers.onEntering!.callCount).to.equal(0);
      expect(handlers.onEntered!.callCount).to.equal(1);
    });

    it('skips exiting when exit=false', () => {
      const handlers = { onExit: spy(), onExiting: spy(), onExited: spy() };
      const { setProps } = render(
        <TestHarness in exit={false} appear={false} timeout={100} handlers={handlers} />,
      );
      setProps({ in: false });
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exited');
      expect(handlers.onExit!.callCount).to.equal(0);
      expect(handlers.onExiting!.callCount).to.equal(0);
      expect(handlers.onExited!.callCount).to.equal(1);
    });

    it('skips exiting and unmounts when exit=false with unmountOnExit', () => {
      const handlers = { onExit: spy(), onExiting: spy(), onExited: spy() };
      const { setProps } = render(
        <TestHarness
          in
          exit={false}
          appear={false}
          unmountOnExit
          timeout={100}
          handlers={handlers}
        />,
      );
      setProps({ in: false });
      expect(handlers.onExit!.callCount).to.equal(0);
      expect(handlers.onExiting!.callCount).to.equal(0);
      expect(handlers.onExited!.callCount).to.equal(1);
      expect(screen.queryByTestId('target')).to.equal(null);
    });

    it('unmounts after exit with unmountOnExit', () => {
      const { setProps } = render(<TestHarness in appear={false} unmountOnExit timeout={100} />);
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');
      setProps({ in: false });
      clock.tick(100);
      expect(screen.queryByTestId('target')).to.equal(null);
    });
  });

  describe('timeout semantics', () => {
    clock.withFakeTimers();

    it('resolves timeout object with enter and exit', () => {
      const onEntered = spy();
      const onExited = spy();
      const { setProps } = render(
        <TestHarness
          in={false}
          timeout={{ enter: 50, exit: 200 }}
          handlers={{ onEntered, onExited }}
        />,
      );
      setProps({ in: true });
      clock.tick(49);
      expect(onEntered.callCount).to.equal(0);
      clock.tick(1);
      expect(onEntered.callCount).to.equal(1);

      setProps({ in: false });
      clock.tick(199);
      expect(onExited.callCount).to.equal(0);
      clock.tick(1);
      expect(onExited.callCount).to.equal(1);
    });

    it('timeout.appear falls back to enter when unset', () => {
      const onEntered = spy();
      render(<TestHarness in appear timeout={{ enter: 75 }} handlers={{ onEntered }} />);
      clock.tick(74);
      expect(onEntered.callCount).to.equal(0);
      clock.tick(1);
      expect(onEntered.callCount).to.equal(1);
    });

    it('uses timeout.appear when provided', () => {
      const onEntered = spy();
      render(
        <TestHarness in appear timeout={{ appear: 125, enter: 50 }} handlers={{ onEntered }} />,
      );
      clock.tick(124);
      expect(onEntered.callCount).to.equal(0);
      clock.tick(1);
      expect(onEntered.callCount).to.equal(1);
    });

    it('timeout=null with addEndListener relies entirely on the listener', () => {
      const onEntered = spy();
      let done: (() => void) | null = null;
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        done = next;
      };
      const { setProps } = render(
        <TestHarness
          in={false}
          timeout={null}
          addEndListener={addEndListener}
          handlers={{ onEntered }}
        />,
      );
      setProps({ in: true });
      // When timeout is null, the listener must call done before enter completes.
      clock.tick(10000);
      expect(onEntered.callCount).to.equal(0);
      // Calling done completes enter.
      expect(done).to.be.a('function');
      act(() => {
        done!();
      });
      expect(onEntered.callCount).to.equal(1);
    });

    it('supports the one-argument addEndListener(done) shape', () => {
      const onEntered = spy();
      let done: (() => void) | null = null;
      const addEndListener = (next: () => void) => {
        done = next;
      };
      const { setProps } = render(
        <TestHarness
          in={false}
          timeout={null}
          addEndListener={addEndListener}
          handlers={{ onEntered }}
        />,
      );

      setProps({ in: true });
      expect(done).to.be.a('function');
      expect(onEntered.callCount).to.equal(0);

      act(() => {
        done!();
      });
      expect(onEntered.callCount).to.equal(1);
    });

    it('timeout=null without addEndListener falls back to 0ms timer', () => {
      const onEntered = spy();
      const { setProps } = render(
        <TestHarness in={false} timeout={null} handlers={{ onEntered }} />,
      );
      setProps({ in: true });
      expect(onEntered.callCount).to.equal(0);
      clock.tick(0);
      expect(onEntered.callCount).to.equal(1);
    });

    it('addEndListener and timeout race: first completion wins, second is no-op', () => {
      const onEntered = spy();
      let done: (() => void) | null = null;
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        done = next;
      };
      const { setProps } = render(
        <TestHarness
          in={false}
          timeout={200}
          addEndListener={addEndListener}
          handlers={{ onEntered }}
        />,
      );
      setProps({ in: true });
      // Calling done before the timeout should complete enter once.
      act(() => {
        done!();
      });
      expect(onEntered.callCount).to.equal(1);
      // The later timeout should be ignored.
      clock.tick(200);
      expect(onEntered.callCount).to.equal(1);
    });
  });

  describe('interrupted transitions', () => {
    clock.withFakeTimers();

    it('cancels entering when in flips to false mid-transition', () => {
      const handlers = {
        onEntered: spy(),
        onExit: spy(),
        onExiting: spy(),
        onExited: spy(),
      };
      const { setProps } = render(<TestHarness in={false} timeout={200} handlers={handlers} />);
      setProps({ in: true });
      clock.tick(50); // Enter is still running.
      setProps({ in: false });
      // The cancelled enter must not call onEntered.
      expect(handlers.onEntered!.callCount).to.equal(0);
      // Closing starts exit.
      expect(handlers.onExit!.callCount).to.equal(1);
      clock.tick(200);
      expect(handlers.onExited!.callCount).to.equal(1);
    });

    it('cancels exiting when in flips to true mid-transition', () => {
      const handlers = { onExited: spy(), onEnter: spy(), onEntered: spy() };
      const { setProps } = render(
        <TestHarness in appear={false} timeout={200} handlers={handlers} />,
      );
      setProps({ in: false });
      clock.tick(50); // Exit is still running.
      setProps({ in: true });
      expect(handlers.onExited!.callCount).to.equal(0);
      expect(handlers.onEnter!.callCount).to.equal(1);
      clock.tick(200);
      expect(handlers.onEntered!.callCount).to.equal(1);
    });
  });

  describe('latest prop callbacks', () => {
    it('uses the latest onEntered callback when the enter listener completes', () => {
      const firstOnEntered = spy();
      const secondOnEntered = spy();
      let done: (() => void) | null = null;
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        done = next;
      };
      const { setProps } = render(
        <TestHarness
          in={false}
          timeout={null}
          addEndListener={addEndListener}
          handlers={{ onEntered: firstOnEntered }}
        />,
      );

      setProps({ in: true });
      setProps({
        in: true,
        timeout: null,
        addEndListener,
        handlers: { onEntered: secondOnEntered },
      });
      expect(done).to.be.a('function');

      act(() => {
        done!();
      });

      expect(firstOnEntered.callCount).to.equal(0);
      expect(secondOnEntered.callCount).to.equal(1);
    });

    it('uses the latest onExited callback when the exit listener completes', () => {
      const firstOnExited = spy();
      const secondOnExited = spy();
      let done: (() => void) | null = null;
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        done = next;
      };
      const { setProps } = render(
        <TestHarness
          in
          appear={false}
          timeout={null}
          addEndListener={addEndListener}
          handlers={{ onExited: firstOnExited }}
        />,
      );

      setProps({ in: false });
      setProps({
        in: false,
        appear: false,
        timeout: null,
        addEndListener,
        handlers: { onExited: secondOnExited },
      });
      expect(done).to.be.a('function');

      act(() => {
        done!();
      });

      expect(firstOnExited.callCount).to.equal(0);
      expect(secondOnExited.callCount).to.equal(1);
    });
  });

  describe('user interactions', () => {
    it('enters and exits from a user-controlled toggle', async () => {
      let done: (() => void) | null = null;
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        done = next;
      };

      function ToggleHarness() {
        const [open, setOpen] = React.useState(false);
        return (
          <React.Fragment>
            <button type="button" onClick={() => setOpen((value) => !value)}>
              toggle
            </button>
            <TestHarness
              in={open}
              mountOnEnter
              unmountOnExit
              timeout={null}
              addEndListener={addEndListener}
            />
          </React.Fragment>
        );
      }

      const { user } = render(<ToggleHarness />);
      expect(screen.queryByTestId('target')).to.equal(null);

      await user.click(screen.getByRole('button', { name: 'toggle' }));
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entering');

      act(() => {
        done!();
      });
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');

      await user.click(screen.getByRole('button', { name: 'toggle' }));
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exiting');

      act(() => {
        done!();
      });
      expect(screen.queryByTestId('target')).to.equal(null);
    });

    it('cancels a pending enter when the user closes before completion', async () => {
      const handlers = {
        onEntered: spy(),
        onExit: spy(),
        onExited: spy(),
      };
      const completions: Array<() => void> = [];
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        completions.push(next);
      };

      function ToggleHarness() {
        const [open, setOpen] = React.useState(false);
        return (
          <React.Fragment>
            <button type="button" onClick={() => setOpen((value) => !value)}>
              toggle
            </button>
            <TestHarness
              in={open}
              timeout={null}
              addEndListener={addEndListener}
              handlers={handlers}
            />
          </React.Fragment>
        );
      }

      const { user } = render(<ToggleHarness />);
      await user.click(screen.getByRole('button', { name: 'toggle' }));
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entering');

      await user.click(screen.getByRole('button', { name: 'toggle' }));
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exiting');
      expect(handlers.onExit!.callCount).to.equal(1);

      act(() => {
        completions[0]();
      });
      expect(handlers.onEntered!.callCount).to.equal(0);

      act(() => {
        completions[1]();
      });
      expect(handlers.onExited!.callCount).to.equal(1);
    });

    it('unmounts when unmountOnExit is enabled after the user closes', async () => {
      let done: (() => void) | null = null;
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        done = next;
      };

      function ToggleHarness() {
        const [open, setOpen] = React.useState(true);
        const [unmountOnExit, setUnmountOnExit] = React.useState(false);
        return (
          <React.Fragment>
            <button type="button" onClick={() => setOpen(false)}>
              close
            </button>
            <button type="button" onClick={() => setUnmountOnExit(true)}>
              enable unmount
            </button>
            <TestHarness
              in={open}
              appear={false}
              unmountOnExit={unmountOnExit}
              timeout={null}
              addEndListener={addEndListener}
            />
          </React.Fragment>
        );
      }

      const { user } = render(<ToggleHarness />);
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');

      await user.click(screen.getByRole('button', { name: 'close' }));
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exiting');

      act(() => {
        done!();
      });
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exited');

      await user.click(screen.getByRole('button', { name: 'enable unmount' }));
      expect(screen.queryByTestId('target')).to.equal(null);
    });
  });

  describe('unmount safety', () => {
    clock.withFakeTimers();

    it('does not fire callbacks after component unmounts', () => {
      const onEntered = spy();
      const { setProps, unmount } = render(
        <TestHarness in={false} timeout={100} handlers={{ onEntered }} />,
      );
      setProps({ in: true });
      unmount();
      clock.tick(200);
      expect(onEntered.callCount).to.equal(0);
    });
  });

  describe('mountOnEnter / unmountOnExit', () => {
    clock.withFakeTimers();

    it('mounts on first in=true then stays mounted (mountOnEnter)', () => {
      const { setProps } = render(<TestHarness in={false} mountOnEnter timeout={100} />);
      expect(screen.queryByTestId('target')).to.equal(null);
      setProps({ in: true });
      clock.tick(100);
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');
      setProps({ in: false });
      clock.tick(100);
      // Without unmountOnExit, the child stays mounted after exit.
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'exited');
    });

    it('does not fire onExited during the setup render before the first open', () => {
      // Opening from unmounted first renders the child as exited so refs exist.
      // That setup render must not look like a completed exit.
      const handlers = {
        onEnter: spy(),
        onEntering: spy(),
        onEntered: spy(),
        onExit: spy(),
        onExiting: spy(),
        onExited: spy(),
      };
      const { setProps } = render(
        <TestHarness in={false} mountOnEnter unmountOnExit timeout={100} handlers={handlers} />,
      );
      setProps({ in: true });
      clock.tick(100);
      expect(handlers.onExit!.callCount).to.equal(0);
      expect(handlers.onExiting!.callCount).to.equal(0);
      expect(handlers.onExited!.callCount).to.equal(0);
      expect(handlers.onEnter!.callCount).to.be.greaterThanOrEqual(1);
      expect(handlers.onEntering!.callCount).to.equal(1);
      expect(handlers.onEntered!.callCount).to.equal(1);
    });
  });

  describe('nested transitions', () => {
    clock.withFakeTimers();

    it('clears TransitionGroupContext for descendants so nested transitions see a null parent', () => {
      // The outer transition may read a parent TransitionGroup context, but a
      // nested transition should start from its own mount state.
      const mountedGroup = { isMounting: false };
      const nestedOnEnter = spy();

      function NestedTree() {
        const outerRef = React.useRef<HTMLDivElement>(null);
        const innerRef = React.useRef<HTMLSpanElement>(null);
        return (
          <Transition in appear timeout={100} nodeRef={outerRef}>
            {(outerStatus) => (
              <div ref={outerRef} data-status={outerStatus}>
                <Transition in appear timeout={50} nodeRef={innerRef} onEnter={nestedOnEnter}>
                  {(innerStatus) => (
                    <span ref={innerRef} data-testid="inner" data-status={innerStatus} />
                  )}
                </Transition>
              </div>
            )}
          </Transition>
        );
      }

      render(
        <TransitionGroupContext.Provider value={mountedGroup}>
          <NestedTree />
        </TransitionGroupContext.Provider>,
      );

      // Clearing the context lets the nested transition receive
      // isAppearing=true for its own first mount.
      expect(nestedOnEnter.callCount).to.be.greaterThanOrEqual(1);
      expect(nestedOnEnter.args[0][0]).to.equal(true);
    });
  });

  describe('react-transition-group TransitionGroupContext interop', () => {
    clock.withFakeTimers();

    // Keep context objects stable across renders.
    const mountedGroup = { isMounting: false };
    const mountingGroup = { isMounting: true };

    it('child added to an already-mounted TransitionGroup enters with isAppearing=false even if appear=false', () => {
      const handlers = {
        onEnter: spy(),
        onEntering: spy(),
        onEntered: spy(),
      };

      function ChildWrapper({ shouldRender }: { shouldRender: boolean }) {
        // The parent group has already finished mounting.
        return (
          <TransitionGroupContext.Provider value={mountedGroup}>
            {shouldRender ? (
              <TestHarness in appear={false} timeout={100} handlers={handlers} />
            ) : null}
          </TransitionGroupContext.Provider>
        );
      }

      const { setProps } = render(<ChildWrapper shouldRender={false} />);
      setProps({ shouldRender: true });

      // A child added after group mount should still run enter.
      expect(handlers.onEnter!.callCount).to.be.greaterThanOrEqual(1);
      // But enter callbacks should receive isAppearing=false.
      expect(handlers.onEnter!.args[0][0]).to.equal(false);

      clock.tick(100);
      expect(handlers.onEntered!.callCount).to.be.greaterThanOrEqual(1);
      expect(handlers.onEntered!.args[0][0]).to.equal(false);
    });

    it('child present at TransitionGroup mount receives isAppearing=true when appear=true', () => {
      const onEnter = spy();
      function Wrapper() {
        return (
          <TransitionGroupContext.Provider value={mountingGroup}>
            <TestHarness in appear timeout={100} handlers={{ onEnter }} />
          </TransitionGroupContext.Provider>
        );
      }
      render(<Wrapper />);
      expect(onEnter.args[0][0]).to.equal(true);
    });

    it('child present at TransitionGroup mount does not enter when appear=false', () => {
      const handlers = { onEnter: spy(), onEntering: spy(), onEntered: spy() };
      render(
        <TransitionGroupContext.Provider value={mountingGroup}>
          <TestHarness in appear={false} timeout={100} handlers={handlers} />
        </TransitionGroupContext.Provider>,
      );

      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');
      expect(handlers.onEnter!.callCount).to.equal(0);
      expect(handlers.onEntering!.callCount).to.equal(0);
      expect(handlers.onEntered!.callCount).to.equal(0);
    });

    it('child added post-mount with enter=false does not re-enter', () => {
      const handlers = { onEnter: spy(), onEntered: spy() };
      function ChildWrapper({ shouldRender }: { shouldRender: boolean }) {
        return (
          <TransitionGroupContext.Provider value={mountedGroup}>
            {shouldRender ? (
              <TestHarness in appear={false} enter={false} timeout={100} handlers={handlers} />
            ) : null}
          </TransitionGroupContext.Provider>
        );
      }
      const { setProps } = render(<ChildWrapper shouldRender={false} />);
      setProps({ shouldRender: true });
      // enter=false still skips the late-mount enter animation.
      expect(handlers.onEnter!.callCount).to.equal(0);
      // The child moves straight to entered.
      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entered');
    });
  });

  describe('react-transition-group TransitionGroupContext user interactions', () => {
    const mountedGroup = { isMounting: false };

    it('child added by user to an already-mounted TransitionGroup enters', async () => {
      const handlers = { onEnter: spy(), onEntered: spy() };
      let done: (() => void) | null = null;
      const addEndListener = (_node: HTMLElement, next: () => void) => {
        done = next;
      };

      function ChildWrapper() {
        const [shouldRender, setShouldRender] = React.useState(false);
        return (
          <TransitionGroupContext.Provider value={mountedGroup}>
            <button type="button" onClick={() => setShouldRender(true)}>
              add
            </button>
            {shouldRender ? (
              <TestHarness
                in
                appear={false}
                timeout={null}
                addEndListener={addEndListener}
                handlers={handlers}
              />
            ) : null}
          </TransitionGroupContext.Provider>
        );
      }

      const { user } = render(<ChildWrapper />);
      await user.click(screen.getByRole('button', { name: 'add' }));

      expect(screen.getByTestId('target')).to.have.attribute('data-status', 'entering');
      expect(handlers.onEnter!.callCount).to.be.greaterThanOrEqual(1);
      expect(handlers.onEnter!.args[0][0]).to.equal(false);

      act(() => {
        done!();
      });
      expect(handlers.onEntered!.callCount).to.equal(1);
      expect(handlers.onEntered!.args[0][0]).to.equal(false);
    });
  });
});
