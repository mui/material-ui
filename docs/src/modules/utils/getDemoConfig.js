import { getDependencies } from './helpers';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

function jsDemo(demoData) {
  return {
    dependencies: getDependencies(demoData.raw),
    files: {
      'demo.js': demoData.raw,
      'index.js': `
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';

ReactDOM.render(<Demo />, document.querySelector('#root'));
    `,
    },
  };
}

function tsDemo(demoData) {
  return {
    dependencies: getDependencies(demoData.raw, { codeLanguage: CODE_VARIANTS.TS }),
    files: {
      'demo.tsx': demoData.raw,
      'index.tsx': `
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';

ReactDOM.render(<Demo />, document.querySelector('#root'));
    `,
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

export default function getDemo(demoData) {
  const baseConfig = {
    title: 'Material demo',
    description: demoData.githubLocation,
    files: {
      'index.html': `
<body>
  <!-- Fonts to support Material Design -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" />
  <!-- Icons to support Material Design -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <div id="root"></div>
</body>
      `,
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
