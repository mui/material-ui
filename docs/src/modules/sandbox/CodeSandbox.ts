// @ts-ignore
import LZString from 'lz-string';
import addHiddenInput from 'docs/src/modules/utils/addHiddenInput';
import SandboxDependencies from 'docs/src/modules/sandbox/Dependencies';
import * as CRA from 'docs/src/modules/sandbox/CreateReactApp';
import getFileExtension from 'docs/src/modules/sandbox/FileExtension';
import flattenRelativeImports from 'docs/src/modules/sandbox/FlattenRelativeImports';
import { DemoData, CodeVariant, CodeStyling } from 'docs/src/modules/sandbox/types';

function compress(object: any) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function openSandbox({ files, codeVariant, initialFile }: any) {
  const extension = codeVariant === 'TS' ? '.tsx' : '.js';
  const parameters = compress({ files });

  // ref: https://codesandbox.io/docs/api/#define-api
  const form = document.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
  addHiddenInput(form, 'parameters', parameters);
  addHiddenInput(
    form,
    'query',
    `file=${initialFile}${initialFile.match(/(\.tsx|\.ts|\.js)$/) ? '' : extension}`,
  );
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function createReactApp(demoData: DemoData) {
  const ext = getFileExtension(demoData.codeVariant);
  const { title, githubLocation: description } = demoData;

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml(demoData),
    },
    [`src/index.${ext}`]: {
      content: CRA.getRootIndex(demoData),
    },
    [`src/Demo.${ext}`]: {
      content: flattenRelativeImports(
        demoData.raw,
        demoData.relativeModules?.map((file) => file.module),
      ),
    },
    // Spread the relative modules
    ...(demoData.relativeModules &&
      // Transform the relative modules array into an object
      demoData.relativeModules.reduce(
        (acc, curr) => ({
          ...acc,
          // Remove the path and keep the filename
          [`src/${curr.module.replace(/^.*[\\/]/g, '')}`]: {
            content: curr.raw,
          },
        }),
        {},
      )),
    ...(demoData.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
  });

  files['package.json'] = {
    content: {
      description,
      dependencies,
      devDependencies,
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test',
        eject: 'react-scripts eject',
      },
      ...(demoData.codeVariant === 'TS' && {
        main: 'index.tsx',
      }),
    },
  };

  return {
    title,
    description,
    files,
    dependencies,
    devDependencies,
    /**
     * @param {string} initialFile
     * @description should start with `/`, for example `/Demo.tsx`. If the extension is not provided,
     * it will be appended based on the code variant.
     */
    openSandbox: (initialFile: string = `/src/Demo.${ext}`) =>
      openSandbox({ files, codeVariant: demoData.codeVariant, initialFile }),
  };
}

function createJoyTemplate(templateData: {
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

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml({
        title: templateData.title,
        language: 'en',
        codeStyling: templateData.codeStyling ?? 'MUI System',
      }),
    },
    [`index.${ext}`]: {
      content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/joy/styles';
import App from './App';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);`,
    },
    ...Object.entries(templateData.files).reduce(
      (prev, curr) => ({
        ...prev,
        [curr[0]]: {
          content: curr[1],
        },
      }),
      {},
    ),
    ...(templateData.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(
    {
      codeVariant: templateData.codeVariant,
      raw: Object.entries(templateData.files).reduce((prev, curr) => `${prev}\n${curr}`, ''),
      productId: 'joy-ui',
    },
    {
      commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    },
  );

  files['package.json'] = {
    content: {
      description,
      dependencies,
      devDependencies,
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test',
        eject: 'react-scripts eject',
      },
      ...(templateData.codeVariant === 'TS' && {
        main: 'index.tsx',
      }),
    },
  };

  return {
    title,
    files,
    dependencies,
    devDependencies,
    openSandbox: (initialFile: string = '/App') =>
      openSandbox({ files, codeVariant: templateData.codeVariant, initialFile }),
  };
}

export default {
  createReactApp,
  createJoyTemplate,
};
