module.exports = {
  extension: ['js', 'ts', 'tsx'],
  recursive: true,
  slow: 500,
  timeout: (process.env.CIRCLECI === 'true' ? 4 : 2) * 1000, // Circle CI has low-performance CPUs.
  reporter: 'dot',
  require: ['@mui/internal-test-utils/setupBabelPlaywright'],
};
