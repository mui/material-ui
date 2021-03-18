const path = require('path');

require('@babel/register')({
  configFile: path.resolve(__dirname, '../../babel.config.js'),
  extensions: ['.js', '.ts', '.tsx'],
});
