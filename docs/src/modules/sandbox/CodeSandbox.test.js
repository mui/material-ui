import { expect } from 'chai';
import CodeSandbox from './CodeSandbox';

const testCase = `import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
`;

describe('CodeSandbox', () => {
  it('generate the correct JavaScript result', () => {
    const result = CodeSandbox.createReactApp({
      title: 'BasicButtons Material Demo',
      githubLocation:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js',
      codeVariant: 'JS',
      language: 'en',
      raw: testCase,
    });
    expect(result.files).to.deep.equal({
      'package.json': {
        content: {
          description:
            'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js',
          dependencies: {
            react: 'latest',
            '@mui/material': 'latest',
            'react-dom': 'latest',
            '@emotion/react': 'latest',
            '@emotion/styled': 'latest',
          },
          devDependencies: {
            'react-scripts': 'latest',
          },
        },
      },
      'public/index.html': {
        content:
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>BasicButtons Material Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
      },
      'demo.js': {
        content:
          'import * as React from \'react\';\nimport Stack from \'@mui/material/Stack\';\nimport Button from \'@mui/material/Button\';\n\nexport default function BasicButtons() {\n  return (\n    <Stack spacing={2} direction="row">\n      <Button variant="text">Text</Button>\n      <Button variant="contained">Contained</Button>\n      <Button variant="outlined">Outlined</Button>\n    </Stack>\n  );\n}\n',
      },
      'index.js': {
        content:
          "import * as React from 'react';\nimport * as ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <Demo />\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
      },
    });
  });

  it('generate the correct TypeScript result', () => {
    const result = CodeSandbox.createReactApp({
      title: 'BasicButtons Material Demo',
      githubLocation:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.tsx',
      codeVariant: 'TS',
      language: 'en',
      raw: testCase,
    });
    expect(result.files).to.deep.equal({
      'package.json': {
        content: {
          description:
            'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.tsx',
          dependencies: {
            react: 'latest',
            '@mui/material': 'latest',
            'react-dom': 'latest',
            '@emotion/react': 'latest',
            '@emotion/styled': 'latest',
            '@types/react': 'latest',
            '@types/react-dom': 'latest',
            typescript: 'latest',
          },
          devDependencies: {
            'react-scripts': 'latest',
          },
          main: 'index.tsx',
          scripts: {
            start: 'react-scripts start',
          },
        },
      },
      'public/index.html': {
        content:
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>BasicButtons Material Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
      },
      'demo.tsx': {
        content:
          'import * as React from \'react\';\nimport Stack from \'@mui/material/Stack\';\nimport Button from \'@mui/material/Button\';\n\nexport default function BasicButtons() {\n  return (\n    <Stack spacing={2} direction="row">\n      <Button variant="text">Text</Button>\n      <Button variant="contained">Contained</Button>\n      <Button variant="outlined">Outlined</Button>\n    </Stack>\n  );\n}\n',
      },
      'index.tsx': {
        content:
          "import * as React from 'react';\nimport * as ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <Demo />\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
      },
      'tsconfig.json': {
        content:
          '{\n  "compilerOptions": {\n    "target": "es5",\n    "lib": [\n      "dom",\n      "dom.iterable",\n      "esnext"\n    ],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "esModuleInterop": true,\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "module": "esnext",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "noEmit": true,\n    "jsx": "react"\n  },\n  "include": [\n    "src"\n  ]\n}\n',
      },
    });
    expect(result.dependencies).to.deep.equal({
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'latest',
      '@types/react': 'latest',
      '@types/react-dom': 'latest',
      react: 'latest',
      'react-dom': 'latest',
      typescript: 'latest',
    });
    expect(result.devDependencies).to.deep.equal({
      'react-scripts': 'latest',
    });
  });
});
