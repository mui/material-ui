// @ts-ignore
import LZString from 'lz-string';
import addHiddenInput from 'docs/src/modules/utils/addHiddenInput';
import SandboxDependencies from './Dependencies';
import * as CRA from './CreateReactApp';
import getFileExtension from './FileExtension';

function compress(object: any) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function openSandbox({ files, codeVariant, initialFile = '/App' }: any) {
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

const createReactApp = (demo: {
  title: string;
  language: string;
  raw: string;
  codeVariant: 'TS' | 'JS';
  githubLocation: string;
  product?: 'joy-ui' | 'base';
}) => {
  const ext = getFileExtension(demo.codeVariant);
  const { title, githubLocation: description } = demo;

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml(demo),
    },
    [`index.${ext}`]: {
      content: CRA.getRootIndex(demo.product),
    },
    [`demo.${ext}`]: {
      content: demo.raw,
    },
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(demo, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
  });

  files['package.json'] = {
    content: {
      description,
      dependencies,
      devDependencies,
      ...(demo.codeVariant === 'TS' && {
        main: 'index.tsx',
        scripts: {
          start: 'react-scripts start',
        },
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
     * @description should start with `/`, e.g. `/demo.tsx`. If the extension is not provided,
     * it will be appended based on the code variant.
     */
    openSandbox: (initialFile?: string) =>
      openSandbox({ files, codeVariant: demo.codeVariant, initialFile }),
  };
};

const createJoyTemplate = (demo: {
  title: string;
  files: Record<string, string>;
  githubLocation: string;
  codeVariant: 'TS' | 'JS';
}) => {
  const ext = getFileExtension(demo.codeVariant);
  const { title, githubLocation: description } = demo;

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml({ title: demo.title, language: 'en' }),
    },
    [`index.${ext}`]: {
      content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/joy/styles';
import App from './App';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);`,
    },
    ...Object.entries(demo.files).reduce(
      (prev, curr) => ({
        ...prev,
        [curr[0]]: {
          content: curr[1],
        },
      }),
      {},
    ),
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(
    {
      codeVariant: demo.codeVariant,
      raw: Object.entries(demo.files).reduce((prev, curr) => `${prev}\n${curr}`, ''),
      product: 'joy-ui',
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
      ...(demo.codeVariant === 'TS' && {
        main: 'index.tsx',
        scripts: {
          start: 'react-scripts start',
        },
      }),
    },
  };

  return {
    title,
    files,
    dependencies,
    devDependencies,
    openSandbox: (initialFile?: string) =>
      openSandbox({ files, codeVariant: demo.codeVariant, initialFile }),
  };
};

export default {
  createReactApp,
  createJoyTemplate,
};
