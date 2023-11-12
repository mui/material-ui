export const dependencyVersionMap = {
  // MUI
  '@mui/joy': 'latest',
  '@mui/material': 'latest',
  '@mui/system': 'latest',
  '@emotion/react': 'latest',
  '@emotion/styled': 'latest',
  '@mui/icons-material': 'latest',
  // TailwindCSS
  tailwindcss: '^3.3.3',
  autoprefixer: '^10.4.14',
  postcss: '^8.4.27',
  prettier: '^3.0.0',
  'prettier-plugin-tailwindcss': '^0.5.1',
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;
