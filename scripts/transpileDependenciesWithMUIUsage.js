// Transpile dependencies outside this repository with dependencies in this repository
module.exports = {
  test: /\.(js|mjs|jsx)$/,
  resourceQuery: { not: [/raw/] },
  include:
    /node_modules(\/|\\)(notistack|@mui(\/|\\)x-data-grid|@mui(\/|\\)x-data-grid-pro|@mui(\/|\\)x-license-pro|@mui(\/|\\)x-data-grid-generator|@mui(\/|\\)x-date-pickers-pro|@mui(\/|\\)x-date-pickers)/,
  use: {
    loader: 'babel-loader',
    options: {
      // on the server we use the transpiled commonJS build, on client ES6 modules
      // babel needs to figure out in what context to parse the file
      sourceType: 'unambiguous',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              // All the packages of this repo used in the dependencies outside this repo
              '@mui/material': '../packages/mui-material/src',
              '@mui/icons-material': '../packages/mui-icons-material/lib',
              '@mui/styled-engine': '../packages/mui-styled-engine/src',
              '@mui/styles': '../packages/mui-styles/src',
              '@mui/system': '../packages/mui-system/src',
              '@mui/utils': '../packages/mui-utils/src',
              '@mui/base': '../packages/mui-base/src',
              '@mui/joy': '../packages/mui-joy/src',
            },
            // transformFunctions: ['require'],
          },
        ]
      ]
    },
  },
}
