import { readdirSync } from 'node:fs';

const MATERIAL = '@mui/material';
const ICONS = '@mui/icons-material';
const SYSTEM = '@mui/system';
const LAB = '@mui/lab';
const CORE = 'Core';
const DOCS = 'Docs';
const BREAKING_CHANGE = 'breaking change';
const packageOrder = [
  MATERIAL,
  ICONS,
  SYSTEM,
  '@mui/utils',
  '@mui/types',
  LAB,
  '@mui/codemod',
  '@mui/material-nextjs',
  '@mui/styled-engine',
  '@mui/styled-engine-sc',
  '@mui/private-theming',
  '@mui/material-pigment-css',
  '@mui/stylis-plugin-rtl',
  '@mui/envinfo',
];
const packageMappings = Object.fromEntries(
  packageOrder.map((name) => [name.slice('@mui/'.length), name]),
);
const componentPackages = Object.fromEntries(
  [SYSTEM, MATERIAL, LAB].flatMap((pkg) =>
    readdirSync(new URL(`../packages/mui-${pkg.slice('@mui/'.length)}/src/`, import.meta.url), {
      withFileTypes: true,
    })
      .filter((entry) => entry.isDirectory() && /^[A-Z]/.test(entry.name))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => [entry.name, pkg]),
  ),
);
Object.assign(componentPackages, {
  Box: SYSTEM,
  Stack: SYSTEM,
  GlobalStyles: SYSTEM,
  LoadingButton: LAB,
  FocusTrap: MATERIAL,
  Hidden: MATERIAL,
  Transitions: MATERIAL,
  Progress: MATERIAL,
  TransferList: MATERIAL,
  Textarea: MATERIAL,
  Toast: MATERIAL,
  NumberField: MATERIAL,
  ToggleGroup: MATERIAL,
});

/** @param {string} name */
function aliases(name) {
  const spaced = name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .toLowerCase();

  return [name, spaced, spaced.replaceAll(' ', '-')];
}

const titleMappings = {
  ...Object.fromEntries(
    Object.keys(componentPackages).flatMap((name) =>
      aliases(name).map((alias) => [alias, [`scope: ${aliases(name)[1]}`]]),
    ),
  ),
  styles: ['scope: styles'],
  theme: ['scope: styles'],
  icons: ['scope: icons'],
  'material-ui': ['package: material-ui'],
  material: ['package: material-ui'],
  l10n: ['package: material-ui'],
  ...Object.fromEntries(
    Object.keys(packageMappings)
      .filter((name) => name !== 'material')
      .map((name) => [name, [`package: ${name}`]]),
  ),
  ...Object.fromEntries(
    ['code-infra', 'docs-infra', 'support-infra', 'back-infra'].map((name) => [
      name,
      [`scope: ${name}`],
    ]),
  ),
  infra: ['scope: code-infra'],
  'api-docs-builder': ['scope: docs-infra'],
  'core-docs': ['scope: docs-infra'],
  core: ['scope: all components'],
  docs: ['docs'],
  website: ['website'],
  test: ['test'],
  internal: ['internal'],
  ci: ['internal'],
};
const scopeMappings = {
  'material-ui': MATERIAL,
  material: MATERIAL,
  system: SYSTEM,
  icons: ICONS,
  'code-infra': CORE,
  'docs-infra': CORE,
  'support-infra': CORE,
  'back-infra': CORE,
};

/** @type {import('@mui/internal-code-infra/changelog').ChangelogConfig} */
export default {
  format: {
    version: '{{version}}',
    preservePrefixes: true,
    changelogMessage: '{{message}} (#{{prNumber}}) @{{author}}',
    sectionTitle: { forPackage: '`{{package}}@{{version}}`' },
  },
  intro: {
    thanksMessage:
      'A big thanks to the {{contributorCount}} contributors who made this release possible. Here are some highlights ✨:',
    highlightsPrefix: 'TODO INSERT HIGHLIGHTS',
  },
  contributors: {
    source: 'filtered',
    message: {
      contributors: 'All contributors of this release in alphabetical order: {{contributors}}',
    },
  },
  filter: {
    customFilter: (commit) =>
      !commit.author ||
      !commit.author.login.endsWith('[bot]') ||
      commit.author.login.includes('copilot') ||
      commit.labels.includes('cherry-pick'),
  },
  categorization: {
    strategy: 'package',
    labels: {
      titleMappings,
      scope: { prefix: ['package: ', 'scope: ', 'component: '] },
      categoryOverrides: {
        docs: DOCS,
        website: DOCS,
        examples: DOCS,
        test: CORE,
      },
      flags: { [BREAKING_CHANGE]: { name: 'Breaking Changes' } },
    },
    packageNaming: {
      layout: 'package',
      omitUnavailable: true,
      genericScopes: [DOCS, CORE],
      mappings: {
        ...Object.fromEntries(
          Object.values(titleMappings)
            .flat()
            .filter((label) => label.includes(':'))
            .map((label) => {
              const scope = label.slice(label.indexOf(':') + 1).trim();
              return [scope, MATERIAL];
            }),
        ),
        ...Object.fromEntries(
          Object.entries(componentPackages).flatMap(([name, pkg]) =>
            aliases(name).map((alias) => [alias, pkg]),
          ),
        ),
        ...packageMappings,
        ...scopeMappings,
      },
    },
    sections: {
      fallbackSection: CORE,
      groupByFlags: [BREAKING_CHANGE],
      order: Object.fromEntries([...packageOrder, DOCS, CORE].map((name, index) => [name, index])),
    },
  },
};
