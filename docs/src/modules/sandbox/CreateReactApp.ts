export const getHtml = ({
  title,
  language,
  codeStyling,
}: {
  title: string;
  language: string;
  codeStyling?: 'Tailwind' | 'MUI System';
}) => {
  return `<!DOCTYPE html>
<html lang="${language}">
  <head>
    <title>${title}</title>
    <!-- Fonts to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <!-- Icons to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />${
      codeStyling === 'Tailwind'
        ? `
    <!-- Check the Tailwind CSS's installation guide for setting up tailwind: https://tailwindcss.com/docs/installation -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            boxShadow: {
              'outline-purple': '0 0 0 4px rgba(192, 132, 252, 0.25)',
              'outline-purple-light': '0 0 0 4px rgba(245, 208, 254, 0.25)',
              'outline-switch': '0 0 1px 8px rgba(168, 85, 247, 0.35)',
            },
            cursor: {
              inherit: 'inherit',
            },
            border: {
              3: '3px',
            },
            minWidth: {
              badge: '22px',
              'tabs-list': '400px',
            },
            minHeight: {
              badge: '22px',
            },
            lineHeight: {
              '5.5': '1.375rem',
            }
          }
        }
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

export const getRootIndex = (productId?: 'joy-ui' | 'base-ui') => {
  if (productId === 'joy-ui') {
    return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import Demo from './demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <Demo />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);`;
  }
  if (productId === 'base-ui') {
    return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Demo from './demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);`;
  }
  return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`;
};

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
