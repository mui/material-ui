# Bundle Size Checker

A tool to check and track the bundle size of MUI packages.

## Features

- Measures minified and gzipped bundle sizes of packages and components
- Compares bundle sizes between versions
- Generates markdown reports
- Uploads snapshots to S3 for persistent storage and comparison

## Usage

### CLI

```bash
bundle-size-checker [options]
```

Options:

- `--analyze`: Creates a webpack-bundle-analyzer report for each bundle
- `--accurateBundles`: Displays used bundles accurately at the cost of more CPU cycles
- `--output`, `-o`: Path to output the size snapshot JSON file

### Configuration

Create a `bundle-size-checker.config.js` or `bundle-size-checker.config.mjs` file:

```js
import { defineConfig } from '@mui/internal-bundle-size-checker';

export default defineConfig(async () => {
  return {
    entrypoints: [
      // List of packages and components to measure
      '@mui/material', // Will bundle `import * as ... from '@mui/material'`
      '@mui/material/Button', // Will bundle `import * as ... from '@mui/material/Button'`
      '@mui/material#Button', // Will bundle `import Button from '@mui/material'`
      // ...
    ],
    // Optional upload configuration
    upload: {
      project: 'organization/repository',
      branch: 'main', // Optional, defaults to current git branch
      isPullRequest: false, // Optional, defaults to false
    },
  };
});
```

### S3 Upload

When the `upload` configuration is provided, the snapshot will be uploaded to S3 after generation.

The snapshot will be uploaded to:

```bash
s3://mui-org-ci/artifacts/{project}/{commit-sha}/size-snapshot.json
```

The following tags will be applied:

- `isPullRequest`: 'yes' or 'no'
- `branch`: The branch name

Required AWS environment variables:

- `AWS_ACCESS_KEY_ID` or `AWS_ACCESS_KEY_ID_ARTIFACTS`
- `AWS_SECRET_ACCESS_KEY` or `AWS_SECRET_ACCESS_KEY_ARTIFACTS`
- `AWS_REGION` or `AWS_REGION_ARTIFACTS` (defaults to 'eu-central-1')

If the upload fails, the CLI will exit with an error code.

## API

The library exports the following functions:

- `defineConfig`: Helper for defining configuration with TypeScript support
- `loadConfig`: Loads configuration from file
- `calculateSizeDiff`: Calculates size differences between snapshots
- `renderMarkdownReport`: Generates markdown reports from size comparisons
- `fetchSnapshot`: Fetches size snapshots from S3
