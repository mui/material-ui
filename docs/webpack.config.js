const path = require('path');
const webpack = require("webpack");
const rimraf = require('rimraf');

const workspaceRoot = path.join(__dirname, '../');

module.exports = {
  target: ['web', 'es6'],
  entry: {
    index: path.join(__dirname, "src", "MuiDocs.js"),
  },
  output: {
    filename: "MuiDocs.js",
    library: {
      name: 'MuiDocs',
      type: 'commonjs',
    },
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        oneOf: [
          {
            resourceQuery: /@mui\/markdown/,
            use: ['babel-loader', require.resolve('@mui/markdown/loader')],
          },
          {
            type: 'asset/source',
          },
        ],
      },
      {
        test: /\.(js|mjs|jsx)$/,
        resourceQuery: { not: [/raw/] },
        include:
          /node_modules(\/|\\)(notistack|@mui(\/|\\)x-data-grid|@mui(\/|\\)x-data-grid-pro|@mui(\/|\\)x-license-pro|@mui(\/|\\)x-data-grid-generator|@mui(\/|\\)x-date-pickers-pro|@mui(\/|\\)x-date-pickers)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, "..", "babel.config.js"),
            sourceType: 'unambiguous',
            plugins: [
              [
                'babel-plugin-module-resolver',
                {
                  alias: {
                    // all packages in this monorepo
                    '@mui/material': '../packages/mui-material/src',
                    '@mui/docs': '../packages/mui-docs/src',
                    '@mui/icons-material': '../packages/mui-icons-material/lib',
                    '@mui/lab': '../packages/mui-lab/src',
                    '@mui/styled-engine': '../packages/mui-styled-engine/src',
                    '@mui/styles': '../packages/mui-styles/src',
                    '@mui/system': '../packages/mui-system/src',
                    '@mui/private-theming': '../packages/mui-private-theming/src',
                    '@mui/utils': '../packages/mui-utils/src',
                    '@mui/base': '../packages/mui-base/src',
                    '@mui/material-next': '../packages/mui-material-next/src',
                    '@mui/joy': '../packages/mui-joy/src',
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(js|mjs|tsx|ts)$/,
        resourceQuery: { not: [/raw/] },
        include: [workspaceRoot],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, "..", "babel.config.js")
          }
        },
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.SOURCE_CODE_REPO": "'SourceCodeRepo'",
      "process.env.SOURCE_CODE_ROOT_URL": "''",
      "process.env.LIB_VERSION": "'12345'",
      "process.env.COMMIT_REF": "'12345'",
      "process.env.ENABLE_AD_IN_DEV_MODE": "'false'",
      "process.env.GITHUB_AUTH": "'false'",
      "process.env.GIT_REVIEW_ID": "'false'",
      "process.env.NETLIFY_SITE_NAME": "'false'",
      "process.env.PULL_REQUEST": "false",
      "process.env.FEEDBACK_URL": "'false'",
      "process.env.NETLIFY_DEPLOY_URL": "'NetlifyDeployUrl'",
      "process.env.STAGING": "false",
      "process.env.__NEXT_ROUTER_BASEPATH": 'undefined',
      "process.env.__NEXT_SCROLL_RESTORATION": 'undefined',
      "process.env.__NEXT_NEW_LINK_BEHAVIOR": "false",
      "process.env.__NEXT_I18N_SUPPORT": "false",
      "process.env.__NEXT_MANUAL_CLIENT_BASE_PATH": "false",
      "process.env.__NEXT_TRAILING_SLASH": "false",
      "process.env.__NEXT_CROSS_ORIGIN": "false",
      "process.env.__NEXT_OPTIMIZE_FONTS": "false",
      "process.env.__NEXT_HAS_REWRITES": "false",
      "BUILD_ONLY_ENGLISH_LOCALE": "true",
    }),
    new (class {
      apply(compiler) {
        compiler.hooks.done.tap('Remove LICENSE', () => {
          rimraf.sync('./dist/*.LICENSE.txt');
        });
      }
    })(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}
