import path from 'path';
import fse from 'fs-extra';
import yargs from 'yargs';
import { rimrafSync } from 'rimraf';
import Mustache from 'mustache';
import globAsync from 'fast-glob';
import { fileURLToPath } from 'url';
import { Queue } from '@mui/internal-waterfall';

const currentDirectory = fileURLToPath(new URL('.', import.meta.url));

/**
 * Converts directory separators to slashes, so the path can be used in fast-glob.
 * @param {string} pathToNormalize
 * @returns
 */
function normalizePath(pathToNormalize) {
  return pathToNormalize.replace(/\\/g, '/');
}

/**
 * Return Pascal-Cased component name.
 * @param {string} destPath
 * @returns {string} class name
 */
export function getComponentName(destPath) {
  const splitregex = new RegExp(`[\\${path.sep}-]+`);

  const parts = destPath
    .replace('.js', '')
    .split(splitregex)
    .map((part) => part.charAt(0).toUpperCase() + part.substring(1));

  return parts.join('');
}

function parseDirectoryName(dirName) {
  const parts = dirName.split('-');
  let theme = 'Outlined';
  let weight = 400;

  const third = parts[2];
  const fourth = parts[3];

  if (third && ['outlined', 'rounded', 'sharp'].includes(third)) {
    theme = third.toUpperCase();
    if (fourth && /^\d+$/.test(fourth)) {
      weight = Number(fourth);
    }
  } else if (third && /^\d+$/.test(third)) {
    weight = Number(third);
  }

  return { theme, weight };
}

async function worker({ progress, outputFile, options, svgTemplate, stringTemplate }) {
  progress();

  const { fileName, variations } = outputFile;
  const {
    componentName,
    fontIconName,
    fontFileName,
    family,
    className,
    staticVariations,
    svgPaths,
  } = variations;

  const outputFileDir = path.dirname(path.join(options.outputDir, fileName));
  await fse.ensureDir(outputFileDir);

  if (fontFileName) {
    const outputFontFileDir = path.dirname(path.join(options.outputDir, fontFileName));
    await fse.ensureDir(outputFontFileDir);
  }

  const SVGs = await Promise.all(
    Object.keys(svgPaths).map(async (variationName) => {
      const svgPath = svgPaths[variationName];
      const SVG = await fse.readFile(svgPath, { encoding: 'utf8' });
      const data = SVG.replace(/<svg\b[^>]*><path d="/i, '') // strip opening tag
        .replace(/"\/><\/svg>/i, '') // strip closing tag
        .trim();

      // we don't need to clean the SVGs singe we assume that Google has done a good job at this already
      // cleaning may result in some kind of distortion considering they have optimized for perfect pixel placement

      return { variationName, data };
    }),
  );

  let variationsObject = '{\n';
  SVGs.forEach(({ variationName, data }) => {
    variationsObject += `    '${variationName}': '${data}',\n`;
  });
  variationsObject += '  }';

  // create the svg file
  const SVGVariableIcon = Mustache.render(svgTemplate, {
    variationsObject,
    componentName,
  });

  await fse.writeFile(path.join(options.outputDir, fileName), SVGVariableIcon);

  // create the icon font version
  if (fontFileName) {
    const StringVariableIcon = Mustache.render(stringTemplate, {
      fontIconName,
      componentName,
      details: `${family ? `'${family}'` : 'undefined'}, ${staticVariations ? `${staticVariations}` : 'undefined'}, ${className ? `'${className}'` : 'undefined'}`,
    });

    await fse.writeFile(path.join(options.outputDir, fontFileName), StringVariableIcon);
  }
}

export async function handler(options) {
  const progress = options.disableLog ? () => {} : () => process.stdout.write('.');

  rimrafSync(`${options.outputDir}/*.js`, { glob: true }); // Clean old files

  let variantCollector = options.variantCollector;
  if (typeof variantCollector === 'string') {
    const variantCollectorModule = await import(variantCollector);
    variantCollector = variantCollectorModule.default;
  }
  if (typeof variantCollector !== 'function') {
    throw new Error('variantCollector must be a function');
  }

  await fse.ensureDir(options.outputDir);

  if (!variantCollector) {
    throw new Error('variantCollector is required');
  }

  const [paths, svgTemplate, stringTemplate] = await Promise.all([
    globAsync(normalizePath(path.join(options.svgDir, options.glob))),
    fse.readFile(path.join(currentDirectory, 'templateVariableIconFromSvg.js'), {
      encoding: 'utf8',
    }),
    fse.readFile(path.join(currentDirectory, 'templateVariableIconFromString.js'), {
      encoding: 'utf8',
    }),
  ]);

  const outputFiles = variantCollector(paths, options.svgDir);

  const queue = new Queue(
    (outputFile) =>
      worker({
        progress,
        outputFile,
        options,
        svgTemplate,
        stringTemplate,
      }),
    { concurrency: 8 },
  );

  queue.push(outputFiles);
  await queue.wait({ empty: true });

  const fontLoadingComponentTemplate = await fse.readFile(
    path.join(currentDirectory, 'templateFontGoogleLoadingComponent.js'),
    {
      encoding: 'utf8',
    },
  );

  // copy the createIcon shortcut
  const directories = await fse.readdir(options.outputDir, { withFileTypes: true });
  const dirs = directories.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
  await Promise.all(
    dirs.map((dir) =>
      (async () => {
        // copy the correct createIcon shortcut to /utils/createIcon.js
        const isFontPackage = dir.startsWith('symbols-font');
        const fontShortcut = path.join(
          currentDirectory,
          isFontPackage ? 'createVariableIconFromString.js' : 'createVariableIconFromSvg.js',
        );
        const fontShortcutOutput = path.join(options.outputDir, dir, 'utils', 'createIcon.js');
        await fse.copy(fontShortcut, fontShortcutOutput, { overwrite: true });

        if (isFontPackage) {
          // generate barrel files for the font packages
          const files = await fse.readdir(path.join(options.outputDir, dir), {
            withFileTypes: true,
          });
          const barrelFile = path.join(options.outputDir, dir, 'index.js');
          const barrelFileContent = files
            .filter(
              (file) => file.isFile() && file.name.endsWith('.js') && file.name !== 'index.js',
            )
            .map(({ name }) => `export { default as ${name.replace('.js', '')} } from './${name}';`)
            .join('\n');
          await fse.writeFile(barrelFile, `${barrelFileContent}\n`, { encoding: 'utf8' });

          // create a font loading component
          const { theme, weight } = parseDirectoryName(dir);
          const variation = `${theme}${weight}`;
          const fontLoadingComponent = Mustache.render(fontLoadingComponentTemplate, {
            variation,
            theme,
            weight,
          });

          await fse.writeFile(
            path.join(options.outputDir, dir, `MUISymbols${variation}GoogleFont.js`),
            fontLoadingComponent,
          );
        }
      })(),
    ),
  );
}

const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url));
const isRunningDirectlyViaCLI = nodePath === modulePath;

if (isRunningDirectlyViaCLI) {
  yargs(process.argv.slice(2))
    .command({
      command: '$0>',
      description: "Build JSX components from SVG's.",
      handler,
      builder: (command) => {
        command
          .option('output-dir', {
            required: true,
            type: 'string',
            describe: 'Directory to output jsx components',
          })
          .option('svg-dir', {
            required: true,
            type: 'string',
            describe: 'Directory to output jsx components',
          })
          .option('glob', {
            type: 'string',
            describe: 'Glob to match inside of --svg-dir',
            default: '**/*.svg',
          })
          .option('inner-path', {
            type: 'string',
            describe:
              '"Reach into" subdirs, since libraries like material-design-symbols' +
              ' use arbitrary build directories to organize icons' +
              ' e.g. "action/svg/production/icon_3d_rotation_24px.svg"',
            default: '',
          })
          .option('file-suffix', {
            type: 'string',
            describe:
              'Filter only files ending with a suffix (pretty much only for @mui/symbols-material)',
          })
          .option('variant-collector', {
            type: 'string',
            describe: 'Path to JS module used to collect variants into a single path.',
          })
          .option('disable-log', {
            type: 'boolean',
            describe: 'If true, does not produce any output in STDOUT.',
            default: false,
          });
      },
    })
    .help()
    .strict(true)
    .version(false)
    .parse();
}
