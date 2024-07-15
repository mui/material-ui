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
            '@mui/material': 'next',
            'react-dom': 'latest',
            '@emotion/react': 'latest',
            '@emotion/styled': 'latest',
          },
          devDependencies: {
            'react-scripts': 'latest',
          },
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test',
            eject: 'react-scripts eject',
          },
        },
      },
      'public/index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BasicButtons Material Demo</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <!-- Fonts to support Material Design -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
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
</html>`,
      },
      'src/Demo.js': {
        content: `import * as React from 'react';
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
`,
      },
      'src/index.js': {
        content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`,
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
            '@mui/material': 'next',
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
            build: 'react-scripts build',
            eject: 'react-scripts eject',
            start: 'react-scripts start',
            test: 'react-scripts test',
          },
        },
      },
      'public/index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BasicButtons Material Demo</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <!-- Fonts to support Material Design -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
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
</html>`,
      },
      'src/Demo.tsx': {
        content: `import * as React from 'react';
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
`,
      },
      'src/index.tsx': {
        content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`,
      },
      'tsconfig.json': {
        content: `{
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
    });
    expect(result.dependencies).to.deep.equal({
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
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

  it('generate the correct index.html result when Tailwind is used', () => {
    const result = CodeSandbox.createReactApp({
      title: 'BasicButtons Material Demo',
      githubLocation:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js',
      codeVariant: 'JS',
      language: 'en',
      raw: testCase,
      codeStyling: 'Tailwind',
    });
    expect(result.files['public/index.html'].content).to.contain(
      '<script src="https://cdn.tailwindcss.com"></script>',
    );
  });

  it('should generate the correct stylesheet font link in index.html for Material Two Tones icons', () => {
    const raw = `import * as React from 'react';
    import Icon from '@mui/material/Icon';

    export default function TwoToneIcons() {
      return <Icon baseClassName="material-icons-two-tone">add_circle</Icon>;
    }
    `;

    const result = CodeSandbox.createReactApp({
      raw,
      codeVariant: 'JS',
    });

    expect(result.files['public/index.html'].content).to.contain(
      'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone',
    );
  });
});
