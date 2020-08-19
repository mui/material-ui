module.exports = {
  extension: ['js', 'ts', 'tsx'],
  recursive: true,
  reporter: 'dot',
  require: [require.resolve('./test/utils/setupBabel'), require.resolve('./test/utils/setupJSDOM')],
};
