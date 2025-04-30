import addHiddenInput from 'docs/src/modules/utils/addHiddenInput';
import SandboxDependencies from 'docs/src/modules/sandbox/Dependencies';
import getFileExtension from 'docs/src/modules/sandbox/FileExtension';
import flattenRelativeImports from 'docs/src/modules/sandbox/FlattenRelativeImports';
import { CodeVariant, DemoData } from 'docs/src/modules/sandbox/types';
import * as CRA from 'docs/src/modules/sandbox/CreateReactApp';

function ensureExtension(file: string, extension: string): string {
  return file.endsWith(`.${extension}`) ? file : `${file}.${extension}`;
}

const VITE_DEV_DEPENDENCIES = {
  '@vitejs/plugin-react': 'latest',
  vite: 'latest',
};

function openStackBlitz({
  title,
  description,
  files,
  initialFile,
}: {
  title: string;
  description: string;
  files: Record<string, string>;
  initialFile: string;
}) {
  // ref: https://developer.stackblitz.com/docs/platform/post-api/
  const form = document.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = `https://stackblitz.com/run?file=${initialFile}`;
  addHiddenInput(form, 'project[template]', 'node');
  addHiddenInput(form, 'project[title]', title);
  addHiddenInput(form, 'project[description]', `# ${title}\n${description}`);
  Object.keys(files).forEach((key) => {
    const value = files[key];
    addHiddenInput(form, `project[files][${key}]`, value);
  });
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

/**
 * Create a Vite project config for StackBlitz
 */
function createViteFiles(
  demoData: DemoData,
  dependencies: Record<string, string> = {},
  devDependencies: Record<string, string> = {},
): Record<string, string> {
  const ext = getFileExtension(demoData.codeVariant);
  return {
    [`vite.config.${demoData.codeVariant === 'TS' ? 'ts' : 'js'}`]: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'process.env': {} },
});`,
    'index.html': CRA.getHtml({ ...demoData, main: `/src/index.${ext}` }),
    'package.json': JSON.stringify(
      {
        name: 'mui-demo',
        private: true,
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies,
        devDependencies,
      },
      null,
      2,
    ),
    ...(demoData.codeVariant === 'TS' && {
      'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
      'tsconfig.node.json': `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`,
    }),
  };
}

/**
 * Create a Material Template for StackBlitz using the SDK and Vite
 */
function createJoyTemplate(templateData: {
  title: string;
  files: Record<string, string>;
  githubLocation: string;
  codeVariant: CodeVariant;
}) {
  const ext = getFileExtension(templateData.codeVariant);
  const { title, githubLocation: description } = templateData;
  const raw = Object.entries(templateData.files ?? {}).reduce(
    (prev, curr) => `${prev}\n${curr}`,
    '',
  );

  const demoData: DemoData = { ...templateData, raw, language: 'en' };

  // Get dependencies
  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    devDeps: VITE_DEV_DEPENDENCIES,
  });

  // Create base Vite files with dependencies
  const viteFiles = createViteFiles(demoData, dependencies, devDependencies);

  // Restructure template files to be under src/
  const templateSourceFiles = templateData.files
    ? Object.fromEntries(
        Object.entries(templateData.files).map(([key, value]) => [`src/${key}`, value]),
      )
    : {};

  // document.querySelector returns 'Element | null' but createRoot expects 'Element | DocumentFragment'.
  const type = templateData.codeVariant === 'TS' ? '!' : '';

  // Create a proper React 18 index file for Vite
  const indexContent = `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/joy/styles';
import App from './App';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);`;

  // Combine all files
  const files = {
    ...viteFiles,
    [`src/index.${ext}`]: indexContent,
    ...templateSourceFiles,
  };

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
    openStackBlitz: (initialFile: string = `src/App`) => {
      openStackBlitz({
        title,
        description,
        files,
        initialFile: ensureExtension(initialFile, ext),
      });
    },
  };
}
/**
 * Create a Material Template for StackBlitz using the SDK and Vite
 */
function createMaterialTemplate(templateData: {
  title: string;
  files: Record<string, string>;
  githubLocation: string;
  codeVariant: CodeVariant;
}) {
  const ext = getFileExtension(templateData.codeVariant);
  const { title, githubLocation: description } = templateData;
  const raw = Object.entries(templateData.files ?? {}).reduce(
    (prev, curr) => `${prev}\n${curr}`,
    '',
  );

  const demoData: DemoData = { ...templateData, raw, language: 'en' };

  // Get dependencies
  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    devDeps: VITE_DEV_DEPENDENCIES,
  });

  // Create base Vite files with dependencies
  const viteFiles = createViteFiles(demoData, dependencies, devDependencies);

  // Restructure template files to be under src/
  const templateSourceFiles = templateData.files
    ? Object.fromEntries(
        Object.entries(templateData.files).map(([key, value]) => [`src/${key}`, value]),
      )
    : {};

  // Create a proper React 18 index file for Vite
  const indexContent = `
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')${templateData.codeVariant === 'TS' ? '!' : ''}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);`;

  // Combine all files
  const files = {
    ...viteFiles,
    [`src/index.${ext}`]: indexContent,
    ...templateSourceFiles,
  };

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
    openStackBlitz: (initialFile: string = `src/App`) => {
      openStackBlitz({
        title,
        description,
        files,
        initialFile: ensureExtension(initialFile, ext),
      });
    },
  };
}

/**
 * Create a React App for StackBlitz using the SDK and Vite
 * This maintains similar structure to the original createReactApp but uses Vite
 */
function createReactApp(demoData: DemoData) {
  const ext = getFileExtension(demoData.codeVariant);
  const { title, githubLocation: description } = demoData;

  // Get dependencies
  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    devDeps: VITE_DEV_DEPENDENCIES,
  });

  const viteFiles = createViteFiles(demoData, dependencies, devDependencies);

  const demoFiles: Record<string, string> = {
    [`src/Demo.${ext}`]: flattenRelativeImports(demoData.raw),
  };

  // Add relative modules if any
  const relativeModuleFiles = demoData.relativeModules
    ? demoData.relativeModules.reduce(
        (acc, curr) => ({
          ...acc,
          // Add files to src directory but preserve original names
          [`src/${curr.module.replace(/^.*[\\/]/g, '')}`]: flattenRelativeImports(curr.raw),
        }),
        {},
      )
    : {};

  // Combine all files
  const files = {
    ...viteFiles,
    [`src/index.${ext}`]: CRA.getRootIndex(demoData),
    ...demoFiles,
    ...relativeModuleFiles,
  };

  return {
    title,
    description,
    files,
    dependencies,
    devDependencies,
    openSandbox: (initialFile = 'src/Demo') => {
      openStackBlitz({
        title,
        description,
        files,
        initialFile: ensureExtension(initialFile, ext),
      });
    },
  };
}

export default {
  createJoyTemplate,
  createReactApp,
  createMaterialTemplate,
};
