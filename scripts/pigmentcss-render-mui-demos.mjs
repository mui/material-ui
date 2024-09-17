import path from 'path';
import fse from 'fs-extra';
import * as prettier from 'prettier';

function pascalCase(string) {
  if (typeof string !== 'string') {
    throw new Error('`pascalCase(string)` expects a string argument.');
  }

  const result = string.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

  return result.charAt(0).toUpperCase() + result.slice(1);
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
  const prettierConfig = await prettier.resolveConfig(process.cwd(), {
    config: path.join(process.cwd(), 'prettier.config.js'),
  });

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

  const renders = tsFiles.map((filename) => {
    const componentName = filename.replace('.tsx', '');
    return `      <section>
        <h2>${titleCase(componentName)}</h2>
        <div className="demo-container">
          <${componentName} />
        </div>
      </section>`;
  });
  /**
   * Zero-Runtime Next.js App
   */
  // Create import and render statements
  const nextImports = tsFiles.map((filename) => {
    const componentName = filename.replace('.tsx', '');
    return `import ${componentName} from '../../../../../../docs/data/material/components/${dataFolderName}/${componentName}';`;
  });

  const functionName = pascalCase(dataFolderName);

  const nextFileContent = `'use client';
import * as React from 'react';
${nextImports.join('\n')}

export default function ${functionName}() {
  return (
    <React.Fragment>
${renders.join('\n')}
    </React.Fragment>
  );
}
`;

  // Create the page in pigment apps
  const nextFilepath = path.join(
    process.cwd(),
    `apps/pigment-css-next-app/src/app/material-ui/${args[0]}/page.tsx`,
  );
  const prettiedNextFileContent = await prettier.format(nextFileContent, {
    ...prettierConfig,
    filepath: nextFilepath,
  });
  await fse.mkdirp(`apps/pigment-css-next-app/src/app/material-ui/${args[0]}`);
  await fse.writeFile(nextFilepath, prettiedNextFileContent);

  /**
   * Zero-Runtime Vite App
   */
  const viteImports = tsFiles.map((filename) => {
    const componentName = filename.replace('.tsx', '');
    return `import ${componentName} from '../../../../../docs/data/material/components/${dataFolderName}/${componentName}.tsx';`;
  });
  const viteFileContent = `import * as React from 'react';
import MaterialUILayout from '../../Layout';
${viteImports.join('\n')}

export default function ${functionName}() {
  return (
    <MaterialUILayout>
      <h1>${functionName}</h1>
${renders.join('\n')}
    </MaterialUILayout>
  );
}
`;
  // Create the page in pigment apps
  const viteFilepath = path.join(
    process.cwd(),
    `apps/pigment-css-vite-app/src/pages/material-ui/${args[0]}.tsx`,
  );
  const prettiedViteFileContent = await prettier.format(viteFileContent, {
    ...prettierConfig,
    filepath: viteFilepath,
  });
  await fse.mkdirp(`apps/pigment-css-vite-app/src/pages/material-ui`);
  await fse.writeFile(viteFilepath, prettiedViteFileContent);
}

run();
