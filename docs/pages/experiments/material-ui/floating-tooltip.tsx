import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import FloatingPopup from '@mui/material/FloatingPopup';
import { offset, flip, shift, autoPlacement } from '@floating-ui/react-dom';
import type { Placement } from '@floating-ui/react-dom';

const PLACEMENTS: Placement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

function PlacementDemo() {
  const [placement, setPlacement] = React.useState<Placement>('top');

  return (
    <section>
      <h3>Placement</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {PLACEMENTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlacement(p)}
            style={{ fontWeight: placement === p ? 'bold' : 'normal' }}
          >
            {p}
          </button>
        ))}
      </div>
      <Tooltip
        title={`placement: "${placement}"`}
        placement={placement}
        arrow
        slots={{ popper: FloatingPopup }}
      >
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
    </section>
  );
}

function ArrowDemo() {
  return (
    <section>
      <h3>Arrow</h3>
      <div style={{ display: 'flex', gap: 16 }}>
        <Tooltip title="With arrow" arrow slots={{ popper: FloatingPopup }}>
          <Button variant="outlined">Arrow</Button>
        </Tooltip>
        <Tooltip title="No arrow" slots={{ popper: FloatingPopup }}>
          <Button variant="outlined">No arrow</Button>
        </Tooltip>
      </div>
    </section>
  );
}

function FollowCursorDemo() {
  return (
    <section>
      <h3>Follow cursor</h3>
      <Tooltip title="I follow the cursor" followCursor slots={{ popper: FloatingPopup }}>
        <div
          style={{
            padding: 32,
            border: '1px dashed #999',
            textAlign: 'center',
            cursor: 'default',
          }}
        >
          Move cursor here
        </div>
      </Tooltip>
    </section>
  );
}

function OffsetDemo() {
  const [offsetVal, setOffsetVal] = React.useState(8);

  return (
    <section>
      <h3>Custom middleware (offset)</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <label htmlFor="offset-slider">offset: {offsetVal}px</label>
        <input
          id="offset-slider"
          type="range"
          min={0}
          max={40}
          value={offsetVal}
          onChange={(event) => setOffsetVal(Number(event.target.value))}
        />
      </div>
      <Tooltip
        title={`offset: ${offsetVal}px`}
        arrow
        slots={{ popper: FloatingPopup }}
        slotProps={{
          popper: {
            middleware: [offset(offsetVal), flip(), shift()],
          },
        }}
      >
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
    </section>
  );
}

function AutoPlacementDemo() {
  const [boundary, setBoundary] = React.useState<HTMLElement | null>(null);

  const middleware = React.useMemo(
    () => [
      offset(8),
      autoPlacement({
        allowedPlacements: ['top', 'bottom'],
        ...(boundary && { boundary }),
      }),
      shift(),
    ],
    [boundary],
  );

  return (
    <section>
      <h3>Auto placement (middleware)</h3>
      <p style={{ margin: '0 0 8px', fontSize: 14, color: '#666' }}>
        Uses <code>autoPlacement()</code> middleware. Scroll the button near an edge, then hover.
      </p>
      <div
        ref={setBoundary}
        style={{
          height: 200,
          overflow: 'auto',
          border: '1px solid #ccc',
          position: 'relative',
        }}
      >
        <div style={{ padding: '200px 16px', display: 'flex', justifyContent: 'center' }}>
          <Tooltip
            title="Auto-placed tooltip"
            slots={{ popper: FloatingPopup }}
            slotProps={{
              popper: {
                middleware,
                disablePortal: true,
              },
            }}
          >
            <Button variant="outlined">Hover after scrolling</Button>
          </Tooltip>
        </div>
      </div>
    </section>
  );
}

function StrategyDemo() {
  const [strategy, setStrategy] = React.useState<'absolute' | 'fixed'>('absolute');

  return (
    <section>
      <h3>Strategy</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['absolute', 'fixed'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStrategy(s)}
            style={{ fontWeight: strategy === s ? 'bold' : 'normal' }}
          >
            {s}
          </button>
        ))}
      </div>
      <Tooltip
        title={`strategy: "${strategy}"`}
        arrow
        slots={{ popper: FloatingPopup }}
        slotProps={{
          popper: { strategy },
        }}
      >
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
    </section>
  );
}

function CSSVariablesDemo() {
  return (
    <section>
      <h3>CSS variables</h3>
      <p style={{ margin: '0 0 8px', fontSize: 14, color: '#666' }}>
        FloatingPopup sets <code>--anchor-width</code>, <code>--anchor-height</code>,{' '}
        <code>--available-width</code>, <code>--available-height</code> on the floating element.
      </p>
      <Tooltip
        title="Width matches anchor via --anchor-width"
        arrow
        slots={{ popper: FloatingPopup }}
        slotProps={{
          tooltip: {
            sx: {
              width: 'var(--anchor-width)',
              maxWidth: 'none',
              textAlign: 'center',
            },
          },
        }}
      >
        <Button variant="outlined" sx={{ width: 300 }}>
          Tooltip matches this button width
        </Button>
      </Tooltip>
    </section>
  );
}

function ComparisonDemo() {
  return (
    <section>
      <h3>Side-by-side: Popper.js vs FloatingPopup</h3>
      <div style={{ display: 'flex', gap: 32 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14 }}>Default (Popper.js)</p>
          <Tooltip title="Popper.js" arrow placement="top">
            <Button variant="contained">Popper.js</Button>
          </Tooltip>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14 }}>FloatingPopup</p>
          <Tooltip title="Floating UI" arrow placement="top" slots={{ popper: FloatingPopup }}>
            <Button variant="contained">Floating UI</Button>
          </Tooltip>
        </div>
      </div>
    </section>
  );
}

export default function MaterialUIFloatingPopup() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ padding: 32, maxWidth: 800 }}>
        <h1>FloatingPopup experiment</h1>
        <p>
          <code>{'<Tooltip slots={{ popper: FloatingPopup }} />'}</code>
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <ComparisonDemo />
          <PlacementDemo />
          <ArrowDemo />
          <FollowCursorDemo />
          <OffsetDemo />
          <AutoPlacementDemo />
          <StrategyDemo />
          <CSSVariablesDemo />
        </div>
      </div>
    </React.Fragment>
  );
}
