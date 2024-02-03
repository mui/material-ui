/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

interface ExportData {
  name: string;
  hasExportAll: boolean;
  hasDefaultExport: boolean;
}

function generateIndex() {
  const [, , extension, packageName, additionalPackagesStr] = process.argv;

  if (!extension || !packageName) {
    console.error(
      'Please specify an extension and a package name, e.g. `tsx scripts/generateIndex.mts ts mui-joy`',
    );
    return;
  }

  const basePath = `./packages/${packageName}/src`;
  const fileName = `index.${extension}`;

  const additionalPackages = (
    additionalPackagesStr ? JSON.parse(additionalPackagesStr) : []
  ) as Array<string>;

  fs.readdir(basePath, { recursive: false }, (readDirError, files) => {
    if (readDirError) {
      console.error(readDirError);
      return;
    }

    try {
      let indexContent = `// This file is auto-generated
// Please use \`pnpm generate-index:${packageName}\` instead of changing it manually

'use client';
`;

      const componentFolderRe = /^([Uu]nstable_)?([A-Z]|use)[^.]+/;
      const defaultExportRe = /^export \{ (\w+ as )?default(,| \})/gm;
      const exportRe = /^export /gm;
      const inlinedMultiExportsRe = /^export .+,/gm;

      const res: Array<ExportData> = [];

      for (let i = 0; i < files.length; i += 1) {
        const name = files[i].toString();
        if (name.match(componentFolderRe) || additionalPackages.includes(name)) {
          try {
            const componentIndex = fs.readFileSync(path.join(basePath, name, 'index.ts'), 'utf8');

            const hasDefaultExport = !!componentIndex.match(defaultExportRe);

            const hasExportAll =
              !hasDefaultExport ||
              (componentIndex.match(exportRe) ?? []).length > 1 ||
              !!componentIndex.match(inlinedMultiExportsRe);

            res.push({ name, hasExportAll, hasDefaultExport });
          } catch {
            console.warn(`No index.ts file for ${name}`);
          }
        }
      }

      res.sort((a, b) => {
        const aInAdditionals = additionalPackages.findIndex((x) => x === a.name);
        const bInAdditionals = additionalPackages.findIndex((x) => x === b.name);

        if (aInAdditionals >= 0) {
          return bInAdditionals >= 0 ? aInAdditionals - bInAdditionals : -1;
        }

        if (bInAdditionals >= 0) {
          return 1;
        }

        return a.name.localeCompare(b.name);
      });

      for (let i = 0; i < res.length; i += 1) {
        if (res[i].hasDefaultExport) {
          indexContent += `
export { default as ${res[i].name} } from './${res[i].name}';`;
        }

        if (res[i].hasExportAll) {
          indexContent += `
export * from './${res[i].name}';`;
        }

        indexContent += `\r\n`;
      }

      const indexPath = path.join(basePath, fileName);
      fs.unlinkSync(indexPath);

      fs.writeFileSync(indexPath, indexContent);
      console.log(`${indexPath} was created successfully`);
    } catch (error) {
      console.error(error);
    }
  });
}

generateIndex();
