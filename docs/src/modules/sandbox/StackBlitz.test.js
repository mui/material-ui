import { expect } from 'chai';
import StackBlitz from './StackBlitz';

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

describe('StackBlitz', () => {
  it('generate the correct javascript result', () => {
    const { openSandbox, ...result } = StackBlitz.createReactApp({
      title: 'BasicButtons Material Demo',
      githubLocation:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js',
      codeVariant: 'JS',
      language: 'en',
      raw: testCase,
    });
    expect(result).to.deep.equal({
      title: 'BasicButtons Material Demo',
      description:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js',
      files: {
        'index.html':
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>BasicButtons Material Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
        'demo.js':
          'import * as React from \'react\';\nimport Stack from \'@mui/material/Stack\';\nimport Button from \'@mui/material/Button\';\n\nexport default function BasicButtons() {\n  return (\n    <Stack spacing={2} direction="row">\n      <Button variant="text">Text</Button>\n      <Button variant="contained">Contained</Button>\n      <Button variant="outlined">Outlined</Button>\n    </Stack>\n  );\n}\n',
        'index.js':
          "import * as React from 'react';\nimport * as ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <Demo />\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
      },
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
    });
  });

  it('generate the correct typescript result', () => {
    const { openSandbox, ...result } = StackBlitz.createReactApp({
      title: 'BasicButtons Material Demo',
      githubLocation:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.tsx',
      codeVariant: 'TS',
      language: 'en',
      raw: testCase,
    });
    expect(result).to.deep.equal({
      title: 'BasicButtons Material Demo',
      description:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.tsx',
      files: {
        'index.html':
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>BasicButtons Material Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
        'demo.tsx':
          'import * as React from \'react\';\nimport Stack from \'@mui/material/Stack\';\nimport Button from \'@mui/material/Button\';\n\nexport default function BasicButtons() {\n  return (\n    <Stack spacing={2} direction="row">\n      <Button variant="text">Text</Button>\n      <Button variant="contained">Contained</Button>\n      <Button variant="outlined">Outlined</Button>\n    </Stack>\n  );\n}\n',
        'index.tsx':
          "import * as React from 'react';\nimport * as ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <Demo />\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
        'tsconfig.json':
          '{\n  "compilerOptions": {\n    "target": "es5",\n    "lib": [\n      "dom",\n      "dom.iterable",\n      "esnext"\n    ],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "esModuleInterop": true,\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "module": "esnext",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "noEmit": true,\n    "jsx": "react"\n  },\n  "include": [\n    "src"\n  ]\n}\n',
      },
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
    });
  });
});
