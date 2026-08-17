import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { expect } from 'chai';
import precomputeDocsInfraDemo from './precomputeDocsInfraDemo.mjs';

const fixture = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'fixtures/docsInfraDemo/DemoFixture.js',
);

describe('precomputeDocsInfraDemo', () => {
  it('loads the entry source exactly as committed', async () => {
    const result = await precomputeDocsInfraDemo({
      demoName: 'DemoFixture.js',
      moduleFilepath: fixture,
    });

    expect(result.source).to.equal(await fs.readFile(fixture, { encoding: 'utf8' }));
    expect(result.fileName).to.equal('DemoFixture.js');
  });

  it('collects the external imports of the demo', async () => {
    const result = await precomputeDocsInfraDemo({
      demoName: 'DemoFixture.js',
      moduleFilepath: fixture,
    });

    expect(Object.keys(result.externals)).to.deep.equal(['@mui/material/Button']);
  });

  it('reports the entry as a dependency', async () => {
    const result = await precomputeDocsInfraDemo({
      demoName: 'DemoFixture.js',
      moduleFilepath: fixture,
    });

    expect(result.dependencies.map((url) => fileURLToPath(url))).to.deep.equal([fixture]);
  });
});
