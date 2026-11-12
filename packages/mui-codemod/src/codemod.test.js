import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

describe('@mui/codemod', () => {
  describe('CLI', { timeout: 60000 }, () => {
    it.each(['v5.0.0/top-level-imports', 'v5.0.0/path-imports'])(
      'should run %s on files outside the package',
      (codemod) => {
        const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-codemod-'));
        // Each codemod rewrites one of these imports.
        fs.writeFileSync(
          path.join(directory, 'index.js'),
          "import Button from '@mui/material/Button';\nimport { Card } from '@mui/material';\n",
        );

        try {
          const { stdout } = spawnSync(
            process.execPath,
            [path.join(__dirname, 'codemod.js'), codemod, directory, '--dry'],
            {
              // Run like a user: outside the repo, where the root Babel config does not apply,
              // and without the NODE_PATH that pnpm sets, which finds packages a user does not have.
              cwd: os.tmpdir(),
              env: { ...process.env, NODE_PATH: '' },
              encoding: 'utf8',
            },
          );

          expect(stdout).to.include('1 ok');
        } finally {
          fs.rmSync(directory, { recursive: true });
        }
      },
    );
  });
});
