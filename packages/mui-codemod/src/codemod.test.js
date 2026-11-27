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

    it('should keep the line endings of each file', () => {
      const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-codemod-'));
      const files = {
        'changed-lf.js': "import Button from '@mui/material/Button';\n\nexport default Button;\n",
        'changed-crlf.js':
          "import Button from '@mui/material/Button';\r\n\r\nexport default Button;\r\n",
        'unchanged-lf.js': 'export default 1;\n',
        'unchanged-crlf.js': 'export default 1;\r\n',
      };
      Object.entries(files).forEach(([name, contents]) => {
        fs.writeFileSync(path.join(directory, name), contents);
      });
      const read = (name) => fs.readFileSync(path.join(directory, name), 'utf8');

      try {
        const { stdout } = spawnSync(
          process.execPath,
          [path.join(__dirname, 'codemod.js'), 'v5.0.0/top-level-imports', directory],
          {
            cwd: os.tmpdir(),
            env: { ...process.env, NODE_PATH: '' },
            encoding: 'utf8',
          },
        );

        expect(stdout).to.include('2 ok');
        expect(stdout).to.include('2 unmodified');
        expect(read('changed-lf.js')).to.equal(
          "import { Button } from '@mui/material';\n\nexport default Button;\n",
        );
        expect(read('changed-crlf.js')).to.equal(
          "import { Button } from '@mui/material';\r\n\r\nexport default Button;\r\n",
        );
        expect(read('unchanged-lf.js')).to.equal(files['unchanged-lf.js']);
        expect(read('unchanged-crlf.js')).to.equal(files['unchanged-crlf.js']);
      } finally {
        fs.rmSync(directory, { recursive: true });
      }
    });
  });
});
