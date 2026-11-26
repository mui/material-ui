import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { useIdleEditor } from './useIdleEditor';

function Source({ name, mode = 'idle' }: { name: string; mode?: 'idle' | 'disabled' }) {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const prepare = React.useCallback(() => setReady(true), []);
  useIdleEditor(element, prepare, mode);

  return (
    <div ref={setElement}>
      {name}: {ready ? 'ready' : 'cold'}
    </div>
  );
}

describe.skipIf(isJsdom())('useIdleEditor', () => {
  const { render } = createRenderer();

  it('prepares visible source without moving focus and skips hidden or disabled source', async () => {
    render(
      <React.Fragment>
        <button autoFocus>Keep focus</button>
        <Source name="Visible" />
        <div hidden>
          <Source name="Hidden" />
        </div>
        <div style={{ position: 'absolute', top: 10000 }}>
          <Source name="Offscreen" />
        </div>
        <Source name="Disabled" mode="disabled" />
      </React.Fragment>,
    );

    expect(screen.getByText('Visible: cold')).not.toBeNull();
    await screen.findByText('Visible: ready', {}, { timeout: 10000 });

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Keep focus' }));
    expect(screen.getByText('Hidden: cold')).not.toBeNull();
    expect(screen.getByText('Offscreen: cold')).not.toBeNull();
    expect(screen.getByText('Disabled: cold')).not.toBeNull();
  });

  it('cancels pending work when hidden and resumes when shown', async () => {
    function Toggle() {
      const [visible, setVisible] = React.useState(true);

      return (
        <React.Fragment>
          <button onClick={() => setVisible((value) => !value)}>Toggle</button>
          <div hidden={!visible}>
            <Source name="Source" />
          </div>
        </React.Fragment>
      );
    }

    const { user } = render(<Toggle />);
    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

    try {
      await act(async () => vi.advanceTimersByTimeAsync(7000));
      expect(screen.getByText('Source: cold')).not.toBeNull();
    } finally {
      vi.useRealTimers();
    }

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    await screen.findByText('Source: ready', {}, { timeout: 10000 });
  });
});
