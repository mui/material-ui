import sdk from '@stackblitz/sdk';
import SandboxDependencies from 'docs/src/modules/sandbox/Dependencies';
import getFileExtension from 'docs/src/modules/sandbox/FileExtension';
import flattenRelativeImports from 'docs/src/modules/sandbox/FlattenRelativeImports';
import { CodeStyling, CodeVariant, DemoData } from 'docs/src/modules/sandbox/types';
import * as CRA from 'docs/src/modules/sandbox/CreateReactApp';

/**
 * Open a project in StackBlitz using the SDK
 */
function openStackBlitzSDK({
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
  sdk.openProject(
    {
      title,
      description,
      template: 'node',
      files,
    },
    { openFile: initialFile },
  );
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
  plugins: [react()]
});`,
    'index.html': CRA.getHtml({ ...demoData, main: `/src/index.${ext}` }),
    'package.json': JSON.stringify(
      {
        name: 'mui-demo',
        private: true,
        version: '0.0.0',
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
function createMaterialTemplate(templateData: {
  title: string;
  files: Record<string, string>;
  githubLocation: string;
  codeVariant: CodeVariant;
  codeStyling?: CodeStyling;
}) {
  const ext = getFileExtension(templateData.codeVariant);
  const { title, githubLocation: description } = templateData;

  // Get dependencies
  const { dependencies, devDependencies: baseDevDependencies } = SandboxDependencies(
    {
      codeVariant: templateData.codeVariant,
      raw: Object.entries(templateData.files ?? {}).reduce((prev, curr) => `${prev}\n${curr}`, ''),
    },
    {},
  );

  // Add Vite specific dependencies
  const devDependencies: Record<string, string> = {
    ...baseDevDependencies,
    vite: 'latest',
    '@vitejs/plugin-react': 'latest',
  };

  delete devDependencies['react-scripts'];

  // Create base Vite files with dependencies
  const viteFiles = createViteFiles(templateData, dependencies, devDependencies);

  // Restructure template files to be under src/
  const templateSourceFiles = Object.entries(templateData.files ?? {}).reduce(
    (acc, [key, value]) => {
      const newKey = key.startsWith('App') ? `src/${key}` : key;
      return { ...acc, [newKey]: value };
    },
    {} as Record<string, string>,
  );

  if (!templateSourceFiles[`src/App.${ext}`]) {
    throw new Error(`Missing src/App.${ext} file in template files`);
  }

  // Combine all files
  const files = {
    ...viteFiles,
    [`src/index.${ext}`]: CRA.getRootIndex(demoData),
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
    openSandbox: (initialFile: string = 'src/App') => {
      // Add extension if missing
      const normalizedInitialFile = initialFile.endsWith(ext)
        ? initialFile
        : `${initialFile}.${ext}`;

      openStackBlitzSDK({
        title,
        description,
        files,
        initialFile: normalizedInitialFile,
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
  const { dependencies: baseDependencies, devDependencies: baseDevDependencies } =
    SandboxDependencies(demoData, {});

  const dependencies = { ...baseDependencies };

  // Add Vite specific dependencies
  const devDependencies: Record<string, string> = {
    ...baseDevDependencies,
    vite: 'latest',
    '@vitejs/plugin-react': 'latest',
  };

  // Remove CRA dependencies
  delete devDependencies['react-scripts'];
  delete devDependencies['@types/react-scripts'];

  // Create base Vite files with dependencies
  const viteFiles = createViteFiles(demoData, dependencies, devDependencies);

  // Create demo files just like in the original implementation
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
    openSandbox: (initialFile = `src/Demo.${ext}`) => {
      openStackBlitzSDK({
        title,
        description,
        files,
        initialFile,
      });
    },
  };
}

export default {
  createReactApp,
  createMaterialTemplate,
};
