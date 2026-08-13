import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import loader from './loader.mjs';

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Runs the loader against a fixture page and returns its `demos` export.
 */
async function loadDemos(pageDirectory) {
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
    }),
  };

  const output = await loader.call(context);
  return JSON.parse(output.match(/export const demos = ([\s\S]*?);\n\ndemos\.scope/)[1]);
}

const selectedPage = path.join(packageRoot, 'fixtures/docsInfraDemo/page');
const legacyPage = path.join(packageRoot, 'fixtures/docsInfraDemo/legacyPage');

describe('demoLoader docs-infra selection', () => {
  it('keeps every demo on the legacy pipeline without the marker option', async () => {
    const demos = await loadDemos(legacyPage);

    expect(demos['SelectedDemo.js'].docsInfra).to.equal(undefined);
    expect(demos['SiblingDemo.js'].docsInfra).to.equal(undefined);
  });

  it('emits docs-infra data only for the marker that opted in', async () => {
    const demos = await loadDemos(selectedPage);

    expect(demos['SelectedDemo.js'].docsInfra).to.not.equal(undefined);
    expect(demos['SiblingDemo.js'].docsInfra).to.equal(undefined);
  });

  it('loads the same source as the legacy pipeline', async () => {
    const demos = await loadDemos(selectedPage);

    const demo = demos['SelectedDemo.js'];
    expect(demo.docsInfra.source).to.equal(demo.raw);
    expect(demo.docsInfra.fileName).to.equal('SelectedDemo.js');
    expect(demo.docsInfra.html).to.contain('class="pl-k"');
  });

  it('leaves the legacy data of the selected demo untouched', async () => {
    const [legacy, selected] = await Promise.all([loadDemos(legacyPage), loadDemos(selectedPage)]);

    const { docsInfra, ...rest } = selected['SelectedDemo.js'];
    expect(rest).to.deep.equal(legacy['SelectedDemo.js']);
  });

  it('rejects a redundant "docsInfra": false marker', async () => {
    const rejectingPage = path.join(packageRoot, 'fixtures/docsInfraDemo/invalidPage');

    let error;
    try {
      await loadDemos(rejectingPage);
    } catch (caught) {
      error = caught;
    }

    expect(error?.message).to.contain('"docsInfra": false is already the default.');
  });
});
