import path from 'path';
import fullConfig from './rollup.config';

// use only esm module generation for development
const esmConfig = fullConfig.find(buildConfig => buildConfig.output.format === 'esm');
esmConfig.plugins = esmConfig.plugins.filter(plugin =>
  ['node-resolve', 'typescript', 'babel'].includes(plugin.name)
);

export default [esmConfig];
