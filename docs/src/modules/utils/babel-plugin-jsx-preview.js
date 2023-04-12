const fs = require('fs');

const pluginName = 'babel-plugin-jsx-preview';

/**
 * @returns {import('@babel/core').PluginObj}
 */
export default function babelPluginJsxPreview() {
  const wrapperTypes = ['div', 'Box', 'Stack'];

  /**
   * @type {import('@babel/core').types.JSXElement | import('@babel/core').types.JSXElement['children']}
   */
  let previewNode = null;

  return {
    name: pluginName,
    visitor: {
      ExportDefaultDeclaration(path) {
        const { declaration } = path.node;
        if (declaration.type !== 'FunctionDeclaration') {
          return;
        }
        const { body } = declaration.body;
        /**
         * @type {import('@babel/core').types.ReturnStatement[]}
         */
        const [lastReturn] = body
          .filter((statement) => {
            return statement.type === 'ReturnStatement';
          })
          .reverse();

        const returnedJSX = lastReturn.argument;
        if (returnedJSX.type === 'JSXElement') {
          previewNode = returnedJSX;
          if (
            wrapperTypes.includes(previewNode.openingElement.name.name) &&
            previewNode.children.length > 0
          ) {
            // Trim blank JSXText to normalize
            // return (
            //   <div />
            // )
            // and
            // return (
            //   <Stack>
            //     <div />
            // ^^^^ Blank JSXText including newline
            //   </Stack>
            // )
            previewNode = previewNode.children.filter((child, index, children) => {
              const isSurroundingBlankJSXText =
                (index === 0 || index === children.length - 1) &&
                child.type === 'JSXText' &&
                !/[^\s]+/.test(child.value);
              return !isSurroundingBlankJSXText;
            });
          }
        }
      },
    },
    post(state) {
      const { maxLines, outputFilename } = state.opts.plugins.find((plugin) => {
        return plugin.key === pluginName;
      }).options;

      let hasPreview = false;
      if (previewNode !== null) {
        const [startNode, endNode] = Array.isArray(previewNode)
          ? [previewNode[0], previewNode.slice(-1)[0]]
          : [previewNode, previewNode];
        const preview = state.code.slice(startNode.start, endNode.end);

        const previewLines = preview.split(/\n/);
        // The first line is already trimmed either due to trimmed blank JSXText or because it's a single node which babel already trims.
        // The last line is therefore the measure for indentation
        const indentation = previewLines.slice(-1)[0].match(/^\s*/)[0].length;
        const deindentedPreviewLines = preview.split(/\n/).map((line, index) => {
          if (index === 0) {
            return line;
          }
          return line.slice(indentation);
        });

        if (deindentedPreviewLines.length <= maxLines) {
          fs.writeFileSync(outputFilename, deindentedPreviewLines.join('\n'));
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
