import path from 'path';
import fse from 'fs-extra';

function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error('`capitalize(string)` expects a string argument.');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

function titleCase(str) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const args = process.argv.slice(2);

async function run() {
  if (!args[0]) {
    throw new Error(
      'Please provide a string of `react-<component>` from the `docs/pages/material-ui/*` directory.',
    );
  }

  // Find the demos of the component
  const docSource = await fse.readFile(
    path.join(process.cwd(), `docs/pages/material-ui/${args[0]}.js`),
    'utf8',
  );
  const matches = docSource.match(/\/([a-z-]+)\.md\?/);
  const dataFolderName = matches[1];

  const filenames = await fse.readdir(
    path.join(process.cwd(), `docs/data/material/components/${dataFolderName}`),
  );
  const tsFiles = filenames.filter((filename) => filename.endsWith('.tsx'));

  // Create import and render statements
  const imports = tsFiles.map((filename) => {
    const componentName = filename.replace('.tsx', '');
    return `import ${componentName} from '../../../../../../docs/data/material/components/${dataFolderName}/${componentName}';`;
  });
  const renders = tsFiles.map((filename) => {
    const componentName = filename.replace('.tsx', '');
    return `      <section>
        <h2>${titleCase(componentName)}</h2>
        <div className="demo-container">
          <${componentName} />
        </div>
      </section>`;
  });
  const fileContent = `'use client';
import * as React from 'react';
${imports.join('\n')}

export default function ${capitalize(dataFolderName)}() {
  return (
    <React.Fragment>
${renders.join('\n')}
    </React.Fragment>
  )
}`;

  // Create the page in zero-runtime apps
  await fse.mkdirp(`apps/zero-runtime-next-app/src/app/material-ui/${args[0]}`);
  await fse.writeFile(
    path.join(process.cwd(), `apps/zero-runtime-next-app/src/app/material-ui/${args[0]}/page.tsx`),
    fileContent,
  );

  // TODO: do the same for vite-app
}

run();
