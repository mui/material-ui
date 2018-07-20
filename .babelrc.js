const ENV = process.env.BABEL_ENV;
let defaultPresets;

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: 11,
          edge: 14,
          firefox: 45,
          chrome: 49,
          safari: 10,
          node: '6.11',
        },
        modules: ['modules', 'production-umd'].includes(ENV) ? false : 'commonjs',
      },
    ],
  ];
}

module.exports = {
  presets: defaultPresets.concat([
    ['@babel/preset-stage-1', { loose: true }],
    '@babel/preset-react',
    '@babel/flow',
  ]),
  plugins: [
    '@babel/plugin-transform-object-assign',
    ['@babel/plugin-transform-runtime', { polyfill: false, useBuiltIns: true }],
  ],
  env: {
    coverage: {
      plugins: [
        'istanbul',
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@material-ui/core': './packages/material-ui/src',
              '@material-ui/icons': './packages/material-ui-icons/src',
            },
          },
        ],
      ],
    },
    development: {
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              modules: './modules',
            },
          },
        ],
      ],
    },
    'docs-development': {
      plugins: [
        'babel-plugin-preval',
        [
          'module-resolver',
          {
            alias: {
              '@material-ui/core': './packages/material-ui/src',
              '@material-ui/docs': './packages/material-ui-docs/src',
              '@material-ui/icons': './packages/material-ui-icons/src',
              '@material-ui/lab': './packages/material-ui-lab/src',
              docs: './docs',
              modules: './modules',
              pages: './pages',
            },
          },
        ],
      ],
    },
    'docs-production': {
      plugins: [
        'babel-plugin-preval',
        [
          'module-resolver',
          {
            alias: {
              '@material-ui/core': './packages/material-ui/src',
              '@material-ui/docs': './packages/material-ui-docs/src',
              '@material-ui/icons': './packages/material-ui-icons/src',
              '@material-ui/lab': './packages/material-ui-lab/src',
              docs: './docs',
              modules: './modules',
              pages: './pages',
            },
          },
        ],
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        ['transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
    es: {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
      ignore: ['**/*.test*'],
    },
    production: {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
      ignore: ['**/*.test*'],
    },
    'production-umd': {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@material-ui/core': './packages/material-ui/src',
              '@material-ui/icons': './packages/material-ui-icons/src',
            },
          },
        ],
      ],
    },
  },
  ignore: ['scripts/*.js'],
};
