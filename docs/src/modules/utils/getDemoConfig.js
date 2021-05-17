import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { getDependencies } from './helpers';

function jsDemo(demoData) {
  return {
    dependencies: getDependencies(demoData.raw, {
      muiCommitRef: process.env.PULL_REQUEST ? process.env.COMMIT_REF : undefined,
    }),
    files: {
      'demo.js': demoData.raw,
      'index.js': `
import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@material-ui/core/styles';
import Demo from './demo';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Demo />
  </StyledEngineProvider>,
  document.querySelector("#root")
);
    `.trim(),
    },
  };
}

function tsDemo(demoData) {
  return {
    dependencies: getDependencies(demoData.raw, {
      codeLanguage: CODE_VARIANTS.TS,
      muiCommitRef: process.env.PULL_REQUEST ? process.env.COMMIT_REF : undefined,
    }),
    files: {
      'demo.tsx': demoData.raw,
      'index.tsx': `
import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@material-ui/core/styles';
import Demo from './demo';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Demo />
  </StyledEngineProvider>,
  document.querySelector("#root")
);
    `.trim(),
      'tsconfig.json': `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve"
  },
  "include": [
    "src"
  ]
}
      `,
    },
    main: 'index.tsx',
    scripts: {
      start: 'react-scripts start',
    },
  };
}

function getLanguageConfig(demoData) {
  switch (demoData.codeVariant) {
    case CODE_VARIANTS.TS:
      return tsDemo(demoData);
    case CODE_VARIANTS.JS:
      return jsDemo(demoData);
    default:
      throw new Error(`Unsupported codeVariant: ${demoData.codeVariant}`);
  }
}

export default function getDemoConfig(demoData) {
  const baseConfig = {
    title: demoData.title,
    description: demoData.githubLocation,
    files: {
      'public/index.html': `
<!DOCTYPE html>
<html lang="${demoData.language}">
  <head>
    <title>${demoData.title}</title>
    <!-- Fonts to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <!-- Icons to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`.trim(),
    },
  };
  const languageConfig = getLanguageConfig(demoData);

  return {
    ...baseConfig,
    ...languageConfig,
    files: {
      ...baseConfig.files,
      ...languageConfig.files,
    },
  };
}
