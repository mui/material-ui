import fs from 'fs/promises';
import path from 'path';
import { componentsDirectory, readOptional, readRegions } from './files.mjs';
import { readAxeResults } from './axe.mjs';

/**
 * Reads every `packages/mui-material/src/<Component>/accessibility.json`, the
 * hand-written regions of its `accessibility.md`, and its axe results.
 * A component without a data file has not been assessed yet.
 */
export default async function readReports() {
  const entries = await fs.readdir(componentsDirectory, { withFileTypes: true });

  const reports = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const dataPath = path.join(componentsDirectory, entry.name, 'accessibility.json');
        const source = await readOptional(dataPath);
        if (source === null) {
          return null;
        }
        let data;
        try {
          data = JSON.parse(source);
        } catch (error) {
          throw new Error(`${entry.name}/accessibility.json is not valid JSON: ${error.message}`);
        }
        const reportPath = path.join(componentsDirectory, entry.name, 'accessibility.md');
        return {
          component: entry.name,
          dataPath,
          reportPath,
          data,
          regions: readRegions(await readOptional(reportPath)),
          axe:
            typeof data.axe === 'string' ? await readAxeResults(data.axe).catch(() => null) : null,
        };
      }),
  );

  return reports.filter(Boolean).sort((a, b) => a.component.localeCompare(b.component));
}
