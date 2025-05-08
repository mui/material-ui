/**
 * @file Configuration file for bundle-size-checker
 *
 * This file determines which packages and components will have their bundle sizes measured.
 */
import path from 'path';
import glob from 'fast-glob';
import { defineConfig } from '@mui/internal-bundle-size-checker';

const rootDir = path.resolve(import.meta.dirname, '..');

/**
 * Generates the entrypoints configuration by scanning the project structure.
 */
export default defineConfig(async () => {
  // Discover Material UI components
  const materialPackagePath = path.join(rootDir, 'packages/mui-material/build');
  const materialFiles = await glob(path.join(materialPackagePath, '([A-Z])*/index.js'));
  const materialComponents = materialFiles.map((componentPath) => {
    const componentName = path.basename(path.dirname(componentPath));
    return `@mui/material/${componentName}`;
  });

  // Discover Lab components
  const labPackagePath = path.join(rootDir, 'packages/mui-lab/build');
  const labFiles = await glob(path.join(labPackagePath, '([A-Z])*/index.js'));
  const labComponents = labFiles.map((componentPath) => {
    const componentName = path.basename(path.dirname(componentPath));
    return `@mui/lab/${componentName}`;
  });

  const isPullRequest = !!process.env.CIRCLE_PULL_REQUEST;

  // Return the complete entrypoints configuration
  return {
    entrypoints: [
      '@mui/material',
      ...materialComponents,
      '@mui/lab',
      ...labComponents,
      '@mui/private-theming',
      '@mui/system',
      '@mui/system/createBox',
      '@mui/system/createStyled',
      '@mui/material/styles#createTheme',
      '@mui/system/colorManipulator',
      '@mui/lab/useAutocomplete',
      '@mui/material/useMediaQuery',
      '@mui/material/useScrollTrigger',
      '@mui/utils',
    ],
    upload: !!process.env.CI,
  };
});
