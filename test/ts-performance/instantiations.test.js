import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

describe('TypeScript Performance', () => {
  it('should have Instantiations < 200', function testInstantiations() {
    this.timeout(60000);

    const testDir = path.join(dirname);

    try {
      const output = execSync('pnpm tsc --noEmit --diagnostics', {
        cwd: testDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      const instantiationsMatch = output.match(/Instantiations:\s+(\d+)/);

      if (!instantiationsMatch) {
        throw new Error('Could not find Instantiations in TypeScript diagnostics output');
      }

      const instantiations = parseInt(instantiationsMatch[1], 10);

      // eslint-disable-next-line no-console
      console.info(`TypeScript Instantiations: ${instantiations}`);

      if (instantiations >= 200) {
        throw new Error(
          `TypeScript Instantiations (${instantiations}) exceeded the limit of 200. ` +
            'This may indicate performance issues with type definitions.',
        );
      }
    } catch (error) {
      if (error.stdout) {
        const instantiationsMatch = error.stdout.match(/Instantiations:\s+(\d+)/);

        if (instantiationsMatch) {
          const instantiations = parseInt(instantiationsMatch[1], 10);
          // eslint-disable-next-line no-console -- Useful for debugging test output
          console.info(`TypeScript Instantiations: ${instantiations}`);

          if (instantiations >= 200) {
            throw new Error(
              `TypeScript Instantiations (${instantiations}) exceeded the limit of 200. ` +
                'This may indicate performance issues with type definitions.',
            );
          }
          return;
        }
      }

      throw error;
    }
  });
});
