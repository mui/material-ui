module.exports = {
  assumptions: {
    noDocumentAll: true,
    setSpreadProperties: true,
  },
  presets: ['next/babel'],
  plugins: ['babel-plugin-optimize-clsx'],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        ['babel-plugin-react-remove-properties'],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
  },
};
