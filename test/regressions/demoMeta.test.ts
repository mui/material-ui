import { describe, it } from 'vitest';
import { expect } from 'chai';
import { A11Y_RULES, SCREENSHOT_RULES, getConfig, parseRoute } from './demoMeta';

describe('parseRoute', () => {
  it('returns null for non-component routes (regression fixtures)', () => {
    expect(parseRoute('/regression-Rating/FocusVisibleRating')).to.equal(null);
  });

  it('parses a docs-components route into path/slug/demo', () => {
    expect(parseRoute('/docs-components-buttons/BasicButtons')).to.deep.equal({
      path: 'docs/data/material/components/buttons/BasicButtons',
      slug: 'buttons',
      demo: 'BasicButtons',
    });
  });
});

describe('getConfig', () => {
  it('returns undefined when no rule matches', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/accordion/BasicAccordion'),
    ).to.equal(undefined);
  });

  it('returns a screenshot opt-out rule for an excluded demo', () => {
    expect(
      getConfig(SCREENSHOT_RULES, 'docs/data/material/components/autocomplete/Asynchronous'),
    ).to.deep.include({ enabled: false });
  });

  it('returns the a11y rule for a brace-glob enrolment', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/buttons/BasicButtons'),
    ).to.deep.include({ enabled: true });
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/buttons/ColorButtons'),
    ).to.deep.include({ enabled: true });
  });

  it('returns undefined for a demo outside a brace-glob enrolment', () => {
    // `buttons` enrols only {BasicButtons,ColorButtons}.
    expect(getConfig(A11Y_RULES, 'docs/data/material/components/buttons/DisabledButtons')).to.equal(
      undefined,
    );
  });

  it('honours last-match-wins when multiple rules apply', () => {
    const rules = [
      { test: 'docs/data/material/components/foo/*', enabled: true },
      { test: 'docs/data/material/components/foo/Bar', enabled: false },
    ];
    expect(getConfig(rules, 'docs/data/material/components/foo/Bar')).to.deep.equal({
      test: 'docs/data/material/components/foo/Bar',
      enabled: false,
    });
    expect(getConfig(rules, 'docs/data/material/components/foo/Baz')).to.deep.equal({
      test: 'docs/data/material/components/foo/*',
      enabled: true,
    });
  });
});

describe('rule data sanity', () => {
  it('rule arrays are non-empty (catches accidental import regression)', () => {
    expect(SCREENSHOT_RULES.length).to.be.greaterThan(0);
    expect(A11Y_RULES.length).to.be.greaterThan(0);
  });
});
