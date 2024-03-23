import { DemoData } from 'docs/src/modules/sandbox/types';

export const getHtml = ({
  title,
  language,
  codeStyling,
  raw,
}: {
  title: string;
  language: string;
  codeStyling?: 'Tailwind' | 'MUI System';
  raw?: string;
}) => {
  return `<!DOCTYPE html>
<html lang="${language}">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
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
      href="https://fonts.googleapis.com/icon?family=Material+Icons${
        raw?.includes('material-icons-two-tone') ? '+Two+Tone' : ''
      }"
    />${
      codeStyling === 'Tailwind'
        ? `
    <!-- Check the Tailwind CSS's installation guide for setting up tailwind: https://tailwindcss.com/docs/installation -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            animation: {
              appear: 'in-right 200ms',
            },
            border: {
              3: '3px',
            },
            boxShadow: {
              'outline-purple': '0 0 0 4px rgba(192, 132, 252, 0.25)',
              'outline-purple-light': '0 0 0 4px rgba(245, 208, 254, 0.25)',
              'outline-purple-xs': '0 0 0 1px rgba(192, 132, 252, 0.25)',
              'outline-switch': '0 0 1px 3px rgba(168, 85, 247, 0.35)',
            },
            cursor: {
              inherit: 'inherit',
            },
            keyframes: {
              'in-right': {
                from: { transform: 'translateX(100%)' },
                to: { transform: 'translateX(0)' },
              },
            },
            lineHeight: {
              '5.5': '1.375rem',
            },
            maxWidth: {
              snackbar: '560px',
            },
            minHeight: {
              badge: '22px',
            },
            minWidth: {
              badge: '22px',
              listbox: '200px',
              snackbar: '300px',
              'tabs-list': '400px',
            },
          },
        },
      }
    </script>`
        : ''
    }
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
};

export function getRootIndex(demoData: DemoData) {
  // document.querySelector returns 'Element | null' but createRoot expects 'Element | DocumentFragment'.
  const type = demoData.codeVariant === 'TS' ? '!' : '';

  if (demoData.productId === 'joy-ui') {
    return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <Demo />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);`;
  }
  if (demoData.productId === 'base-ui') {
    return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);`;
  }
  return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`;
}

export const getTsconfig = () => `{
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
`;
