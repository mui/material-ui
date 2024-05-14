const straightQuotes = require('./packages/markdownlint-rule-mui/straight-quotes');
const gitDiff = require('./packages/markdownlint-rule-mui/git-diff');
const tableAlignment = require('./packages/markdownlint-rule-mui/table-alignment');
const terminalLanguage = require('./packages/markdownlint-rule-mui/terminal-language');
const duplicateH1 = require('./packages/markdownlint-rule-mui/duplicate-h1');
const searchReplace = require('markdownlint-rule-search-replace');

const brandNames = [
  { search: 'Material UI', replace: 'Material&nbsp;UI' },
  { search: 'MUI X', replace: 'MUI&nbsp;X' },
  { search: 'Base UI', replace: 'Base&nbsp;UI' },
  { search: 'MUI System', replace: 'MUI&nbsp;System' },
  { search: 'MUI Store', replace: 'MUI&nbsp;Store' },
  { search: 'MUI Core', replace: 'MUI&nbsp;Core' },
  { search: 'MUI Toolpad', replace: 'Toolpad' },
  { search: 'MUI Toolpad', replace: 'Toolpad' },
  { search: 'MUI Connect', replace: 'MUI&nbsp;Connect' },
  { search: 'Stack Overflow', replace: 'Stack&nbsp;Overflow' },
  { search: 'Pigment CSS', replace: 'Pigment&nbsp;CSS' },
];

// https://github.com/DavidAnson/markdownlint#rules--aliases
module.exports = {
  config: {
    default: true,
    MD004: false, // MD004/ul-style. Buggy
    MD009: {
      // MD009/no-trailing-spaces
      br_spaces: 0,
      strict: true,
      list_item_empty_lines: false,
    },
    MD013: false, // MD013/line-length. Already handled by Prettier.
    MD014: false, // MD014/commands-show-output. It's OK.
    MD024: { siblings_only: true }, // MD024/no-duplicate-heading/no-duplicate-header
    MD025: {
      // Heading level
      level: 1,
      // RegExp for matching title in front matter
      front_matter_title: '',
    },
    MD033: false, // MD033/no-inline-html. We use it from time to time, it's fine.
    MD034: false, // MD034/no-bare-urls. Not a concern for us, our Markdown interpreter supports it.
    MD028: false, // MD028/no-blanks-blockquote prevent double blockquote
    MD029: false, // MD029/ol-prefix. Buggy
    MD031: false, // MD031/blanks-around-fences Some code blocks inside li
    MD036: false, // MD036/no-emphasis-as-heading/no-emphasis-as-header. It's OK.
    MD051: false, // MD051/link-fragments. Many false positives in the changelog.
    MD052: false, // MD052/reference-links-images. Many false positives in the changelog.
    straightQuotes: true,
    gitDiff: true,
    tableAlignment: true,
    terminalLanguage: true,
    duplicateH1: true,
    'search-replace': {
      rules: [
        {
          name: 'non-breaking-space-in-brand-names',
          message: 'Use non-breaking space in brand names.',
          search: brandNames.map((item) => item.search),
          replace: brandNames.map((item) => item.replace),
        },
      ],
    },
  },
  customRules: [
    straightQuotes,
    gitDiff,
    tableAlignment,
    terminalLanguage,
    duplicateH1,
    searchReplace,
  ],
  ignores: [
    'CHANGELOG.old.md',
    '**/node_modules/**',
    '**/*-zh.md',
    '**/*-pt.md',
    '**/build/**',
    '.github/PULL_REQUEST_TEMPLATE.md',
  ],
};
