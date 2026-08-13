import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import loader from './loader.mjs';

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const pageDirectory = path.join(packageRoot, 'fixtures/docsInfraDemo/page');

/**
 * Runs the loader against the fixture page and returns its `demos` export.
 */
async function loadDemos(demoPipelineAllowlist) {
  const resourcePath = path.join(pageDirectory, 'demos.md');
  const context = {
    resourcePath,
    rootContext: pageDirectory,
    context: pageDirectory,
    mode: 'development',
    addDependency() {},
    getOptions: () => ({
      workspaceRoot: packageRoot,
      languagesInProgress: [],
      packages: [],
      env: { SOURCE_CODE_REPO: 'https://example.com', LIB_VERSION: '0.0.0' },
      demoPipelineAllowlist,
    }),
  };

  const output = await loader.call(context);
  return JSON.parse(output.match(/export const demos = ([\s\S]*?);\n\ndemos\.scope/)[1]);
}

describe('demoLoader docs-infra selection', () => {
  it('keeps every demo on the legacy pipeline by default', async () => {
    const demos = await loadDemos({});

    expect(demos['SelectedDemo.js'].docsInfra).to.equal(undefined);
    expect(demos['SiblingDemo.js'].docsInfra).to.equal(undefined);
  });

  it('emits docs-infra data only for the selected demo', async () => {
    const demos = await loadDemos({
      'fixtures/docsInfraDemo/page/demos.md': { demos: { 'SelectedDemo.js': { source: true } } },
    });

    expect(demos['SelectedDemo.js'].docsInfra).to.not.equal(undefined);
    expect(demos['SiblingDemo.js'].docsInfra).to.equal(undefined);
  });

  it('loads the same source as the legacy pipeline', async () => {
    const demos = await loadDemos({
      'fixtures/docsInfraDemo/page/demos.md': { demos: { 'SelectedDemo.js': { source: true } } },
    });

    const demo = demos['SelectedDemo.js'];
    expect(demo.docsInfra.source).to.equal(demo.raw);
    expect(demo.docsInfra.fileName).to.equal('SelectedDemo.js');
  });

  it('leaves the legacy data of the selected demo untouched', async () => {
    const [legacy, selected] = await Promise.all([
      loadDemos({}),
      loadDemos({
        'fixtures/docsInfraDemo/page/demos.md': { demos: { 'SelectedDemo.js': { source: true } } },
      }),
    ]);

    const { docsInfra, ...rest } = selected['SelectedDemo.js'];
    expect(rest).to.deep.equal(legacy['SelectedDemo.js']);
  });
});
