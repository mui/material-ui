import { expect } from 'chai';
import { shouldUseDocsInfraPipeline, resolveDocsInfraDemoFlags } from './shouldUseDocsInfraPipeline';
import { demoPipelineAllowlist } from './demoPipelineAllowlist';
import type { DemoPipelineAllowlist } from './types';

const PAGE = '/docs/data/material/components/buttons/buttons.md';
const DEMO = 'BasicButtons.js';
const SIBLING_DEMO = 'TextButtons.js';

describe('shouldUseDocsInfraPipeline', () => {
  it('defaults to the legacy pipeline', () => {
    expect(shouldUseDocsInfraPipeline({ pagePath: PAGE, demoName: DEMO }, {})).to.equal('legacy');
  });

  it('selects docs-infra for every demo on an allowlisted page', () => {
    const allowlist: DemoPipelineAllowlist = {
      'docs/data/material/components/buttons/buttons.md': { flags: { source: true } },
    };

    expect(shouldUseDocsInfraPipeline({ pagePath: PAGE, demoName: DEMO }, allowlist)).to.equal(
      'docs-infra',
    );
    expect(shouldUseDocsInfraPipeline({ pagePath: PAGE, demoName: SIBLING_DEMO }, allowlist)).to.equal(
      'docs-infra',
    );
  });

  it('selects docs-infra for one demo while its siblings stay on legacy', () => {
    const allowlist: DemoPipelineAllowlist = {
      'docs/data/material/components/buttons/buttons.md': { demos: { [DEMO]: { source: true } } },
    };

    expect(shouldUseDocsInfraPipeline({ pagePath: PAGE, demoName: DEMO }, allowlist)).to.equal(
      'docs-infra',
    );
    expect(shouldUseDocsInfraPipeline({ pagePath: PAGE, demoName: SIBLING_DEMO }, allowlist)).to.equal(
      'legacy',
    );
  });

  it('keeps other pages on the legacy pipeline', () => {
    const allowlist: DemoPipelineAllowlist = {
      'docs/data/material/components/buttons/buttons.md': { flags: { source: true } },
    };

    expect(
      shouldUseDocsInfraPipeline(
        { pagePath: '/docs/data/material/components/cards/cards.md', demoName: DEMO },
        allowlist,
      ),
    ).to.equal('legacy');
  });

  it('ignores leading and trailing slashes in the page path', () => {
    const allowlist: DemoPipelineAllowlist = {
      'docs/data/material/components/buttons/buttons.md': { flags: { source: true } },
    };

    expect(
      shouldUseDocsInfraPipeline(
        { pagePath: 'docs/data/material/components/buttons/buttons.md', demoName: DEMO },
        allowlist,
      ),
    ).to.equal('docs-infra');
  });

  it('ships an empty allowlist', () => {
    expect(demoPipelineAllowlist).to.deep.equal({});
  });
});

describe('resolveDocsInfraDemoFlags', () => {
  it('disables every capability outside the allowlist', () => {
    expect(resolveDocsInfraDemoFlags({ pagePath: PAGE, demoName: DEMO }, {})).to.deep.equal({
      source: false,
      liveEdit: false,
      languageTransform: false,
    });
  });

  it('enables only the listed capabilities', () => {
    const allowlist: DemoPipelineAllowlist = {
      'docs/data/material/components/buttons/buttons.md': { flags: { source: true } },
    };

    expect(resolveDocsInfraDemoFlags({ pagePath: PAGE, demoName: DEMO }, allowlist)).to.deep.equal({
      source: true,
      liveEdit: false,
      languageTransform: false,
    });
  });

  it('lets a demo entry narrow the page capabilities', () => {
    const allowlist: DemoPipelineAllowlist = {
      'docs/data/material/components/buttons/buttons.md': {
        flags: { source: true, languageTransform: true },
        demos: { [DEMO]: { languageTransform: false } },
      },
    };

    expect(resolveDocsInfraDemoFlags({ pagePath: PAGE, demoName: DEMO }, allowlist)).to.deep.equal({
      source: true,
      liveEdit: false,
      languageTransform: false,
    });
  });
});
