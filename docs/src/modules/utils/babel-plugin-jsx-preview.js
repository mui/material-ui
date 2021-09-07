const fs = require('fs');
const getJsxPreview = require('./getJsxPreview').default;

const pluginName = 'babel-plugin-jsx-preview';

/**
 * @returns {import('@babel/core').PluginObj}
 */
export default function babelPluginJsxPreview() {
  return {
    name: pluginName,
    post(state) {
      const { maxLines, outputFilename } = state.opts.plugins.find((plugin) => {
        return plugin.key === pluginName;
      }).options;

      const preview = getJsxPreview(state.code);
      let hasPreview = false;
      if (preview !== state.code && preview.split(/\n/).length <= maxLines) {
        if ((preview.match(/\n/g) || []).length <= maxLines) {
          fs.writeFileSync(outputFilename, preview.trim());
          hasPreview = true;
        }
      }

      if (!hasPreview) {
        try {
          fs.unlinkSync(outputFilename);
        } catch (error) {
          // Would throw if the file doesn't exist.
          // But we do want to ensure that the file doesn't exist so the error is fine.
        }
      }
    },
  };
}
