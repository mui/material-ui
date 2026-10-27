import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { createRenderer, ignoreActWarnings, isJsdom } from '@mui/internal-test-utils';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider,
  unstable_enhanceDensity as enhanceDensity,
} from '@mui/material/styles';
import {
  Annotate,
  DENSITY_SCALE,
  DENSITY_TARGETS,
  useClaims,
} from 'docs/data/material/experimental-api/enhance-density/densityAnnotations';
import {
  DENSITY_COMPONENTS,
  type ControlValue,
} from 'docs/data/material/experimental-api/enhance-density/densityComponents';
import {
  DENSITY_ANNOTATIONS,
  annotationsFor,
} from 'docs/data/material/experimental-api/enhance-density/densityAnnotationSpecs';

type State = Record<string, ControlValue>;

const SCALE: Record<string, number> = { ...DENSITY_SCALE, ...DENSITY_TARGETS };
const THEME = enhanceDensity(createTheme({ colorSchemes: { light: true, dark: true } }));
const LABEL = /^(.*?)\s*\(([\d.]+)px\)$/;

function evaluateToken(token: string, lineHeight: number): number | null {
  const arithmetic = token
    .replace(/×/g, '*')
    .replace(/([\d.]+)lh/g, (_, multiple) => String(parseFloat(multiple) * lineHeight))
    .replace(/\b([a-zA-Z][a-zA-Z0-9]*)\b/g, (name) => String(SCALE[name] ?? name))
    .replace(/px/g, '');
  if (!/^[\d\s.+\-*/()]+$/.test(arithmetic)) {
    return null;
  }
  try {
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict";return (${arithmetic});`)() as number;
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function toolbarStates(family: string): State[] {
  return (DENSITY_COMPONENTS[family].controls ?? []).reduce<State[]>(
    (states, control) =>
      states.flatMap((state) =>
        (control.type === 'select' ? control.options! : [false, true]).map((option) => ({
          ...state,
          [control.prop]: option,
        })),
      ),
    [{}],
  );
}

function Stage({ family, state }: { family: string; state: State }) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const demoRef = React.useRef<HTMLDivElement>(null);
  const claims = React.useMemo(() => annotationsFor(family, state), [family, state]);
  const resolved = useClaims(stageRef, demoRef, claims, [family, state, claims]);
  return (
    <div
      ref={stageRef}
      style={{
        position: 'relative',
        minWidth: 620,
        minHeight: 300,
        padding: '64px 88px',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div ref={demoRef} style={{ display: 'contents' }}>
        <ThemeProvider theme={THEME}>{DENSITY_COMPONENTS[family].render(state)}</ThemeProvider>
      </div>
      {resolved ? <Annotate items={resolved.items} bounds={resolved.bounds} /> : null}
    </div>
  );
}

async function settledLabels(): Promise<string[]> {
  const read = () =>
    Array.from(document.querySelectorAll('[data-annotations] text')).map(
      (node) => node.textContent ?? '',
    );
  let previous = '';
  let held = 0;
  for (let frame = 0; frame < 90; frame += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise(requestAnimationFrame);
    const current = read();
    const key = current.join('|');
    held = key === previous && current.length > 0 ? held + 1 : 0;
    previous = key;
    if (held >= 3) {
      return current;
    }
  }
  throw new Error('annotations never settled');
}

describe.skipIf(isJsdom())('density annotation parity', () => {
  const { render } = createRenderer();

  test('every demo family carries annotations', () => {
    expect(
      Object.keys(DENSITY_COMPONENTS).filter((family) => DENSITY_ANNOTATIONS[family] === undefined),
    ).to.deep.equal([]);
  });

  Object.keys(DENSITY_COMPONENTS).forEach((family) => {
    test(`${family} tokens equal the values they label`, async () => {
      ignoreActWarnings();
      const mismatches: string[] = [];
      let checked = 0;
      const states = toolbarStates(family);
      const view = (state: State) => (
        <React.Fragment>
          <CssBaseline />
          <Stage family={family} state={state} />
        </React.Fragment>
      );
      const { setProps } = render(view(states[0]));

      for (const state of states) {
        setProps({ children: view(state).props.children });
        // eslint-disable-next-line no-await-in-loop
        const labels = await settledLabels();
        const claims = annotationsFor(family, state);
        const lineHeightFor = (token: string) => {
          const claim = claims.find((candidate) => candidate.token === token);
          const target = claim ? (document.querySelector(claim.on) as HTMLElement | null) : null;
          if (!target) {
            return 16;
          }
          const source = claim?.aspect === 'icon' ? (target.parentElement ?? target) : target;
          return parseFloat(getComputedStyle(source).lineHeight) || 16;
        };

        const evaluated = labels
          .map((label) => LABEL.exec(label.trim()))
          .filter((match) => match !== null)
          .map(([, token, px]) => ({
            token,
            px: parseFloat(px),
            expected: evaluateToken(token, /lh/.test(token) ? lineHeightFor(token) : 0),
          }))
          .filter(({ expected }) => expected !== null);
        checked += evaluated.length;
        const where =
          Object.entries(state)
            .map(([prop, value]) => `${prop}=${value}`)
            .join(' ') || 'default';
        evaluated
          .filter(({ expected, px }) => Math.abs(expected! - px) > 1.1)
          .forEach(({ token, px, expected }) => {
            mismatches.push(`${where}: "${token}" labels ${px}px but evaluates to ${expected}px`);
          });
      }

      expect(mismatches).to.deep.equal([]);
      expect(checked, 'no evaluable token was checked').to.be.greaterThan(0);
    });
  });
});
