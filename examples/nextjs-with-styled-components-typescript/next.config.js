const path = require('path');
const withTM = require('next-transpile-modules')(['@mui/material', '@mui/system']) // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    config.module = {
      ...config.module,
      rules: [
        {
          test: /\.js|jsx|ts|tsx$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
              plugins:  [
                [
                  "babel-plugin-styled-components",
                  {
                    "topLevelImportPaths": [
                      "@mui/material",
                      "@mui/material/styles",
                      "@mui/system",
                      "@mui/styled-engine-sc",
                      "@mui/styled-engine"
                    ],
                    "ssr": true
                  }
                ]
              ],
              include: [
                  'node_modules/@mui/',
              ],
              exclude: /node_modules\/(?!@mui).+/
            }
          }
        }
      ]
    }
    return config;
  },
})
