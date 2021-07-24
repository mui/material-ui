import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { getDependencies } from 'docs/src/modules/utils/helpers';

function jsDemo(demoData, options) {
  return {
    dependencies: getDependencies(demoData.raw, {
      muiCommitRef:
        process.env.PULL_REQUEST && options.previewPackage ? process.env.COMMIT_REF : undefined,
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

function tsDemo(demoData, options) {
  return {
    dependencies: getDependencies(demoData.raw, {
      codeLanguage: CODE_VARIANTS.TS,
      muiCommitRef:
        process.env.PULL_REQUEST && options.previewPackage ? process.env.COMMIT_REF : undefined,
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
    "jsx": "react"
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

function getLanguageConfig(demoData, options) {
  switch (demoData.codeVariant) {
    case CODE_VARIANTS.TS:
      return tsDemo(demoData, options);
    case CODE_VARIANTS.JS:
      return jsDemo(demoData, options);
    default:
      throw new Error(`Unsupported codeVariant: ${demoData.codeVariant}`);
  }
}

export default function getDemoConfig(demoData, options) {
  const { indexPath = 'public/index.html', previewPackage = true } = options;
  const baseConfig = {
    title: demoData.title,
    description: demoData.githubLocation,
    files: {
      [indexPath]: `
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
  const languageConfig = getLanguageConfig(demoData, {
    previewPackage,
  });

  return {
    ...baseConfig,
    ...languageConfig,
    files: {
      ...baseConfig.files,
      ...languageConfig.files,
    },
  };
}
