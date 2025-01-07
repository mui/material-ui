import addHiddenInput from 'docs/src/modules/utils/addHiddenInput';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import SandboxDependencies from 'docs/src/modules/sandbox/Dependencies';
import * as CRA from 'docs/src/modules/sandbox/CreateReactApp';
import getFileExtension from 'docs/src/modules/sandbox/FileExtension';
import flattenRelativeImports from 'docs/src/modules/sandbox/FlattenRelativeImports';
import { CodeStyling, CodeVariant, DemoData } from 'docs/src/modules/sandbox/types';

function openStackBlitz({
  title,
  description,
  dependencies,
  devDependencies,
  files,
  codeVariant,
  initialFile,
}: {
  title: string;
  description: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  files: Record<string, string>;
  codeVariant: string;
  initialFile: string;
}) {
  const extension = codeVariant === CODE_VARIANTS.TS ? '.tsx' : '.js';
  // ref: https://developer.stackblitz.com/docs/platform/post-api/
  const form = document.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = `https://stackblitz.com/run?file=${initialFile}${
    initialFile.match(/(\.tsx|\.ts|\.js)$/) ? '' : extension
  }`;
  addHiddenInput(form, 'project[template]', 'create-react-app');
  addHiddenInput(form, 'project[title]', title);
  addHiddenInput(form, 'project[description]', `# ${title}\n${description}`);
  addHiddenInput(form, 'project[dependencies]', JSON.stringify(dependencies));
  addHiddenInput(form, 'project[devDependencies]', JSON.stringify(devDependencies));
  Object.keys(files).forEach((key) => {
    const value = files[key];
    addHiddenInput(form, `project[files][${key}]`, value);
  });
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function createReactApp(demoData: DemoData) {
  const ext = getFileExtension(demoData.codeVariant);
  const { title, githubLocation: description } = demoData;

  const files: Record<string, string> = {
    'index.html': CRA.getHtml(demoData),
    [`index.${ext}`]: CRA.getRootIndex(demoData),
    [`Demo.${ext}`]: flattenRelativeImports(demoData.raw),
    // Spread the relative modules
    ...(demoData.relativeModules &&
      // Transform the relative modules array into an object
      demoData.relativeModules.reduce(
        (acc, curr) => ({
          ...acc,
          // Remove the path and keep the filename
          [`${curr.module.replace(/^.*[\\/]/g, '')}`]: flattenRelativeImports(curr.raw),
        }),
        {},
      )),
    ...(demoData.codeVariant === 'TS' && {
      'tsconfig.json': CRA.getTsconfig(),
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    // Waiting for https://github.com/stackblitz/core/issues/437
    // commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
  });

  return {
    title,
    description,
    files,
    dependencies,
    devDependencies,
    openSandbox: (initialFile = `Demo.${ext}`) => {
      openStackBlitz({
        title,
        description,
        dependencies,
        devDependencies,
        files,
        codeVariant: demoData.codeVariant,
        initialFile,
      });
    },
  };
}

function createMaterialTemplate(templateData: {
  title: string;
  files: Record<string, string>;
  githubLocation: string;
  codeVariant: CodeVariant;
  codeStyling?: CodeStyling;
}) {
  const ext = getFileExtension(templateData.codeVariant);
  const { title, githubLocation: description } = templateData;

  // document.querySelector returns 'Element | null' but createRoot expects 'Element | DocumentFragment'.
  const type = templateData.codeVariant === 'TS' ? '!' : '';

  const files: Record<string, string> = {
    'index.html': CRA.getHtml({
      title: templateData.title,
      language: 'en',
      codeStyling: templateData.codeStyling ?? 'MUI System',
    }),
    [`index.${ext}`]: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);`,
    ...templateData.files,
    ...(templateData.codeVariant === 'TS' && {
      'tsconfig.json': CRA.getTsconfig(),
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(
    {
      codeVariant: templateData.codeVariant,
      raw: Object.entries(templateData.files).reduce((prev, curr) => `${prev}\n${curr}`, ''),
    },
    {
      // Waiting for https://github.com/stackblitz/core/issues/437
      // commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    },
  );

  return {
    title,
    files,
    dependencies,
    devDependencies,
    replaceContent(updater: (content: string | Record<string, any>, filePath: string) => string) {
      Object.keys(files).forEach((filePath) => {
        files[filePath] = updater(files[filePath], filePath);
      });
      return this;
    },
    openStackBlitz: (initialFile: string = '/App') =>
      openStackBlitz({
        title: templateData.title,
        files,
        description,
        dependencies,
        devDependencies,
        codeVariant: templateData.codeVariant,
        initialFile,
      }),
  };
}

export default {
  createReactApp,
  createMaterialTemplate,
};
