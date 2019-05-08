const bpmr = require('babel-plugin-module-resolver');

function resolvePath(sourcePath, currentFile, opts) {
  if (sourcePath === 'markdown') {
    const base = currentFile.substring(__dirname.length).slice(0, -3);
    return `${__dirname}/docs/src/${base}/`;
  }

  return bpmr.resolvePath(sourcePath, currentFile, opts);
}

let defaultPresets;

// evergreen build
// see https://next.material-ui.com/guides/minimizing-bundle-size/#evergreen-build
if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        // snapshot of the latest version of evergreen browsers
        targets: {
          chrome: 73,
          edge: 18,
          firefox: 66,
          node: 8,
          safari: '12.1',
        },
      },
    ],
  ];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
      },
    ],
  ];
}

const defaultAlias = {
  '@material-ui/core': './packages/material-ui/src',
  '@material-ui/docs': './packages/material-ui-docs/src',
  '@material-ui/icons': './packages/material-ui-icons/src',
  '@material-ui/lab': './packages/material-ui-lab/src',
  '@material-ui/styles': './packages/material-ui-styles/src',
  '@material-ui/system': './packages/material-ui-system/src',
  '@material-ui/utils': './packages/material-ui-utils/src',
};

const productionPlugins = [
  'babel-plugin-transform-react-constant-elements',
  'babel-plugin-transform-dev-warning',
  ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
];

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    'babel-plugin-optimize-clsx',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    cjs: {
      plugins: productionPlugins,
    },
    coverage: {
      plugins: [
        'babel-plugin-istanbul',
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: defaultAlias,
          },
        ],
      ],
    },
    development: {
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              modules: './modules',
            },
          },
        ],
      ],
    },
    'docs-development': {
      presets: ['next/babel', '@zeit/next-typescript/babel'],
      plugins: [
        'babel-plugin-preval',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              ...defaultAlias,
              '@material-ui/docs': './packages/material-ui-docs/src',
              docs: './docs',
              modules: './modules',
              pages: './pages',
            },
            transformFunctions: ['require', 'require.context'],
            resolvePath,
          },
        ],
      ],
    },
    'docs-production': {
      presets: ['next/babel', '@zeit/next-typescript/babel'],
      plugins: [
        'babel-plugin-preval',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              ...defaultAlias,
              '@material-ui/docs': './packages/material-ui-docs/src',
              docs: './docs',
              modules: './modules',
              pages: './pages',
            },
            transformFunctions: ['require', 'require.context'],
            resolvePath,
          },
        ],
        'babel-plugin-transform-react-constant-elements',
        'babel-plugin-transform-dev-warning',
        ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
    esm: {
      plugins: productionPlugins,
    },
    es: {
      plugins: productionPlugins,
    },
    production: {
      plugins: productionPlugins,
    },
    'production-umd': {
      plugins: productionPlugins,
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: defaultAlias,
          },
        ],
      ],
    },
  },
};
