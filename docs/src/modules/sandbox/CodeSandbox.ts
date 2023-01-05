import SandboxDependencies from './Dependencies';
import * as CRA from './CreateReactApp';
import getFileExtension from './FileExtension';

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
  const includeXMonorepo = demo.raw.includes("from 'docsx/");
  // cloning to avoid the documentation demo `raw` content change
  const internalDemo = { ...demo };
  if (includeXMonorepo) {
    internalDemo.raw = internalDemo.raw.replace(/from 'docsx/, "from '@mui/x-monorepo/docs");
  }

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml(demo),
    },
    [`index.${ext}`]: {
      content: CRA.getRootIndex(demo.product),
    },
    [`demo.${ext}`]: {
      content: internalDemo.raw,
    },
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(internalDemo, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    xMonorepoPath: includeXMonorepo
      ? `https://github.com/mui/mui-x.git#${
          process.env.PULL_REQUEST_ID
            ? // use branch name when on a PR
              process.env.VERCEL_GIT_COMMIT_REF
            : process.env.DEFAULT_BRANCH ?? 'master'
        }`
      : '',
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

  return { title, description, files, dependencies, devDependencies };
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
import ReactDOM from 'react-dom/client';
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

  return { title, files, dependencies, devDependencies };
};

export default {
  createReactApp,
  createJoyTemplate,
};
