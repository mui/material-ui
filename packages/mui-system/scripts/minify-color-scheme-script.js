import fs from 'fs/promises';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

/**
 * This script reads `./colorSchemeScript.js` and minified using terser.
 * Some variables are not minified so that they can be mapped with the production code `getInitColorSchemeScript.tsx`
 */
(async function run() {
  try {
    // 1. Read the testable file
    let code = await fs.readFile(
      path.join(process.cwd(), 'packages/mui-system/scripts/colorSchemeScript.js'),
      { encoding: 'utf-8' },
    );
    // 1.1 Remove variable declaration section
    code = code.replace(/remove-start.*remove-end/s, '');

    const vars = [
      'enableColorScheme',
      'enableSystem',
      'defaultLightColorScheme',
      'defaultDarkColorScheme',
      'modeStorageKey',
      'colorSchemeStorageKey',
      'attribute',
    ];

    // 2. Minify the code
    const result = await TerserPlugin.terserMinify({ file: code }, undefined, {
      mangle: { reserved: vars },
    });

    // 2.1 only the content of the function is needed for the minification.
    code = result.code.replace(
      /^export default function getInitColorSchemeScript\([a-zA-Z]+\){(.*)}$/,
      '$1',
    );

    // 2.2 Turn string into variables after the minification
    vars.forEach((variable) => {
      code = code.replace(new RegExp(variable, 'g'), `\${${variable}}`);
    });
    // replace `document.documentElement` with `colorSchemeNode`
    // eslint-disable-next-line no-template-curly-in-string
    code = code.replace(/document\.documentElement/gm, '${colorSchemeNode}');

    // 3. Read the production code and replace the __html: script
    const getInitColorSchemeScriptPath = path.join(
      process.cwd(),
      'packages/mui-system/src/cssVars/getInitColorSchemeScript.tsx',
    );
    let productionCode = await fs.readFile(getInitColorSchemeScriptPath, { encoding: 'utf-8' });

    productionCode = productionCode.replace(
      /__html: `.*`/s,
      `__html: \`(function(){try{${code}}catch(e){}})();\``,
    );

    // 4. Replace the file
    await fs.writeFile(getInitColorSchemeScriptPath, productionCode);
  } catch (error) {
    console.error(error);
  }
})();
