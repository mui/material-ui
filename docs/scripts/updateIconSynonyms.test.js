import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// The script runs `fetch` on import, so assert on its source instead.
const scriptPath = path.join(__dirname, 'updateIconSynonyms.js');
const SYNONYMS_FILE = path.resolve(
  __dirname,
  '../data/material/components/material-icons/demos/search-icons/synonyms.js',
);

describe('updateIconSynonyms', () => {
  const source = fs.readFileSync(scriptPath, 'utf8');

  it('reads the relocated synonyms file', () => {
    const [, specifier] = source.match(/import synonyms from '([^']+)'/);
    const resolved = path.resolve(__dirname, '../..', `${specifier}.js`);

    expect(resolved).to.equal(SYNONYMS_FILE);
    expect(fs.existsSync(resolved)).to.equal(true);
  });

  it('writes to the relocated synonyms file', () => {
    const [, relative] = source.match(/SYNONYMS_FILE = path\.join\(\s*__dirname,\s*'([^']+)'/);

    expect(path.resolve(__dirname, relative)).to.equal(SYNONYMS_FILE);
  });
});
