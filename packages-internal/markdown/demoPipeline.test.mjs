import { expect } from 'chai';
import {
  docsInfraDemoFlags,
  shouldUseDocsInfraPipeline,
  resolveDocsInfraDemoFlags,
} from './demoPipeline.mjs';

describe('shouldUseDocsInfraPipeline', () => {
  it('defaults to the legacy pipeline', () => {
    expect(shouldUseDocsInfraPipeline({ demo: 'DemoInDocs.js' })).to.equal('legacy');
  });

  it('selects docs-infra for a marker that opted in', () => {
    expect(shouldUseDocsInfraPipeline({ demo: 'DemoInDocs.js', docsInfra: true })).to.equal(
      'docs-infra',
    );
  });

  it('leaves sibling markers on the legacy pipeline', () => {
    expect(shouldUseDocsInfraPipeline({ demo: 'DemoMultiTabs.js', bg: true })).to.equal('legacy');
  });

  it('ignores other marker options', () => {
    expect(
      shouldUseDocsInfraPipeline({ demo: 'DemoInDocs.js', hideToolbar: true, bg: 'outlined' }),
    ).to.equal('legacy');
  });
});

describe('resolveDocsInfraDemoFlags', () => {
  it('disables every capability for a legacy marker', () => {
    expect(resolveDocsInfraDemoFlags({ demo: 'DemoInDocs.js' })).to.deep.equal({
      source: false,
      liveEdit: false,
      languageTransform: false,
    });
  });

  it('applies the shared capability set to an opted-in marker', () => {
    expect(resolveDocsInfraDemoFlags({ demo: 'DemoInDocs.js', docsInfra: true })).to.deep.equal(
      docsInfraDemoFlags,
    );
  });

  it('enables source loading and nothing else so far', () => {
    expect(docsInfraDemoFlags).to.deep.equal({
      source: true,
      liveEdit: false,
      languageTransform: false,
    });
  });
});
